import nodemailer from 'nodemailer';

export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOtpEmail(email: string, otp: string, type: 'register' | 'login') {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rushilmarvaniya@gmail.com',
      pass: 'udfl mwny gbrr ivae',
    },
  });

  const actionText = type === 'register' ? 'verify your registration' : 'authenticate your login';
  const actionTitle = type === 'register' ? 'Verify Your Account' : 'Confirm Your Login';

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0A0A0A; color: #E0E0E0; max-width: 600px; margin: 0 auto; border: 1px solid #1A1A1A; padding: 40px; border-radius: 16px; box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);">
      <div style="text-align: center; margin-bottom: 30px;">
        <h2 style="color: #FFFFFF; font-size: 28px; font-weight: 800; letter-spacing: -0.05em; margin: 0; text-transform: uppercase;">
          VERTEX<span style="color: #4DE0FF;">.</span>
        </h2>
        <p style="color: #888888; font-size: 10px; text-transform: uppercase; letter-spacing: 0.3em; margin-top: 5px; font-weight: 700;">Digital depth</p>
      </div>
      
      <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); padding: 30px; border-radius: 12px; text-align: center; margin-bottom: 30px;">
        <h3 style="color: #FFFFFF; font-size: 20px; font-weight: 600; margin-top: 0; margin-bottom: 15px;">${actionTitle}</h3>
        <p style="color: #A0A0A0; font-size: 14px; line-height: 1.6; margin-bottom: 25px;">
          You requested to ${actionText}. Use the verification code below to complete the process. This code is valid for <strong>10 minutes</strong>.
        </p>
        
        <div style="font-size: 36px; font-weight: 800; letter-spacing: 0.25em; color: #4DE0FF; background: #111111; border: 1px dashed rgba(77, 224, 255, 0.3); padding: 15px 25px; display: inline-block; border-radius: 8px; margin-bottom: 10px;">
          ${otp}
        </div>
      </div>
      
      <p style="color: #666666; font-size: 12px; text-align: center; line-height: 1.5; margin-bottom: 0;">
        If you did not request this code, you can safely ignore this email. Someone may have typed your email address by mistake.
      </p>
      
      <hr style="border: none; border-top: 1px solid #1F1F1F; margin: 35px 0 25px 0;" />
      
      <div style="text-align: center;">
        <p style="font-size: 11px; color: #444444; margin: 0;">
          Marvaniya Rusilkumar P. &copy; 2026 Vertex Studio. All rights reserved.
        </p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: '"Vertex Studio" <rushilmarvaniya@gmail.com>',
      to: email,
      subject: `[Vertex] ${otp} is your verification code`,
      text: `Your Vertex verification code is: ${otp}. It is valid for 10 minutes.`,
      html: htmlContent,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send OTP email:', error);
    return { success: false, error };
  }
}
