
'use server';

import nodemailer from 'nodemailer';
import { getAuthenticatedUser } from '@/lib/auth-helper';

export async function sendContactEmail(formData: { name: string, email: string, subject: string, message: string }) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return { success: false, error: 'You must be logged in to send a message' };
  }

  if (user.role === 'admin') {
    return { success: false, error: 'Admins cannot send contact messages' };
  }

  // Enforce email from the authenticated database session
  formData.email = user.email;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rushilmarvaniya@gmail.com',
      pass: 'udfl mwny gbrr ivae',
    },
  });

  try {
    // 1. Send "Thank You" email to the user (Auto-responder)
    await transporter.sendMail({
      from: '"Marvaniya Rusilkumar | Vertex Studio" <rushilmarvaniya@gmail.com>',
      to: formData.email,
      subject: `Thank you for your message, ${formData.name}!`,
      text: `Hi ${formData.name},\n\nThank you for sending a message. We have received it and will reply as soon as possible.\n\nBest regards,\nMarvaniya Rusilkumar P.\nVertex Studio`,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #4DE0FF;">Vertex Studio</h2>
          <p>Hi <strong>${formData.name}</strong>,</p>
          <p>Thank you for reaching out! This is an automated confirmation that your message has been successfully received.</p>
          <p style="background: #f9f9f9; padding: 15px; border-left: 4px solid #4DE0FF; font-style: italic;">
            "Thank you for sending message. We are reply as soon as possible."
          </p>
          <p>I have received your details regarding <strong>${formData.subject}</strong> and will get back to you shortly.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #888;">Marvaniya Rusilkumar P.<br/>Computer Science Engineer & Technical Architect</p>
        </div>
      `,
    });

    // 2. Send notification to Rusil (the site owner)
    await transporter.sendMail({
      from: '"Portfolio Lead" <rushilmarvaniya@gmail.com>',
      to: 'rushilmarvaniya@gmail.com',
      subject: `New Contact Form Submission: ${formData.subject}`,
      text: `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`,
    });

    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: 'Failed to send email' };
  }
}
