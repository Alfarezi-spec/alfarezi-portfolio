import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Data formulir tidak lengkap' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY || !process.env.MY_EMAIL_ADDRESS) {
      return NextResponse.json({ error: 'RESEND_API_KEY atau MY_EMAIL_ADDRESS belum diatur' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Mengirim email menggunakan Resend API
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Email pengirim testing standar Resend
      to: process.env.MY_EMAIL_ADDRESS,
      subject: `Pesan baru dari ${name} (Web Portfolio)`,
      replyTo: email,
      html: `
        <h2>Ada Pesan Baru dari Portofolio!</h2>
        <p><strong>Nama Pengirim:</strong> ${name}</p>
        <p><strong>Email Pengirim:</strong> ${email}</p>
        <p><strong>Isi Pesan:</strong></p>
        <div style="background-color: #f4f4f4; padding: 15px; border-radius: 8px;">
          <p style="white-space: pre-wrap; margin: 0;">${message}</p>
        </div>
      `,
    });

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
