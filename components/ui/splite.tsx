'use client'

import { forwardRef, useEffect, useRef, useImperativeHandle } from 'react'
import dynamic from 'next/dynamic'

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <span className="loader"></span>
    </div>
  ),
})

interface SplineSceneProps {
  scene: string
  className?: string
}

export const SplineScene = forwardRef<HTMLDivElement, SplineSceneProps>(
  ({ scene, className }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const splineAppRef = useRef<any>(null)
    const lastMouseRef = useRef({ x: 0, y: 0 })

    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement)

    useEffect(() => {
      // Set up global mouse tracking that persists and passes to Spline canvas
      const handlePointerMove = (e: PointerEvent) => {
        lastMouseRef.current = { x: e.clientX, y: e.clientY }
        if (containerRef.current) {
          const canvas = containerRef.current.querySelector('canvas')
          if (canvas && e.target !== canvas) {
            // Replicate pointer move to the canvas for global tracking
            const event = new PointerEvent('pointermove', {
              clientX: e.clientX,
              clientY: e.clientY,
              bubbles: true,
              cancelable: true,
              view: window,
              pointerId: e.pointerId,
              pointerType: e.pointerType,
              isPrimary: e.isPrimary
            });
            canvas.dispatchEvent(event);
          }
        }
      }

      window.addEventListener('pointermove', handlePointerMove, true)
      return () => window.removeEventListener('pointermove', handlePointerMove, true)
    }, [])

    useEffect(() => {
      // Reapply mouse tracking whenever splineAppRef updates
      if (splineAppRef.current && lastMouseRef.current && containerRef.current) {
        const canvas = containerRef.current.querySelector('canvas')
        if (canvas) {
          const e = new PointerEvent('pointermove', {
            clientX: lastMouseRef.current.x,
            clientY: lastMouseRef.current.y,
            bubbles: true,
            cancelable: true,
            view: window
          })
          canvas.dispatchEvent(e)
        }
      }
    }, [splineAppRef.current])

    return (
      <div ref={containerRef} className={className}>
        <Spline 
          scene={scene}
          onLoad={(splineApp: any) => {
            splineAppRef.current = splineApp
            // Apply last known mouse position immediately after load
            if (lastMouseRef.current && containerRef.current) {
               const canvas = containerRef.current.querySelector('canvas')
               if (canvas) {
                 const e = new PointerEvent('pointermove', {
                   clientX: lastMouseRef.current.x,
                   clientY: lastMouseRef.current.y,
                   bubbles: true,
                   cancelable: true,
                   view: window
                 })
                 canvas.dispatchEvent(e)
               }
            }
          }}
        />
      </div>
    )
  }
)

SplineScene.displayName = 'SplineScene'
