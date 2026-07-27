const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  // Send email
  async sendEmail({ to, subject, html, text }) {
    try {
      const mailOptions = {
        from: process.env.SMTP_FROM || 'noreply@bikeflow.com',
        to: to,
        subject: subject,
        html: html || text,
        text: text || html
      };

      const info = await this.transporter.sendMail(mailOptions);
      return {
        success: true,
        messageId: info.messageId
      };
    } catch (error) {
      console.error('Email sending failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Send OTP email
  async sendOTP(email, otp, name = 'User') {
    const subject = 'Your OTP for BikeFlow';
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { padding: 30px; background: #f8fafc; border-radius: 0 0 10px 10px; }
          .otp-code { font-size: 32px; font-weight: bold; color: #2563eb; text-align: center; padding: 20px; letter-spacing: 8px; }
          .footer { text-align: center; margin-top: 20px; color: #64748b; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏍️ BikeFlow</h1>
          </div>
          <div class="content">
            <h2>Hello ${name},</h2>
            <p>Your OTP for verification is:</p>
            <div class="otp-code">${otp}</div>
            <p>This OTP is valid for 10 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 BikeFlow. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject: subject,
      html: html
    });
  }

  // Send booking confirmation email
  async sendBookingConfirmation(email, bookingDetails, customerName) {
    const subject = 'Booking Confirmed - BikeFlow';
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { padding: 30px; background: #f8fafc; border-radius: 0 0 10px 10px; }
          .details { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #64748b; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏍️ Booking Confirmed!</h1>
          </div>
          <div class="content">
            <h2>Hello ${customerName},</h2>
            <p>Your booking has been confirmed successfully!</p>
            <div class="details">
              <p><strong>Booking ID:</strong> ${bookingDetails.bookingId}</p>
              <p><strong>Bike:</strong> ${bookingDetails.bikeName}</p>
              <p><strong>Start Date:</strong> ${new Date(bookingDetails.startDate).toLocaleString()}</p>
              <p><strong>End Date:</strong> ${new Date(bookingDetails.endDate).toLocaleString()}</p>
              <p><strong>Total Amount:</strong> $${bookingDetails.totalAmount}</p>
            </div>
            <p>Thank you for choosing BikeFlow!</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 BikeFlow. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject: subject,
      html: html
    });
  }

  // Send password reset email
  async sendPasswordReset(email, resetLink, name = 'User') {
    const subject = 'Password Reset - BikeFlow';
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { padding: 30px; background: #f8fafc; border-radius: 0 0 10px 10px; }
          .reset-link { text-align: center; margin: 30px 0; }
          .footer { text-align: center; margin-top: 20px; color: #64748b; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Password Reset</h1>
          </div>
          <div class="content">
            <h2>Hello ${name},</h2>
            <p>We received a request to reset your password.</p>
            <div class="reset-link">
              <a href="${resetLink}" style="background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 30px; font-weight: bold;">Reset Password</a>
            </div>
            <p>This link is valid for 1 hour.</p>
            <p>If you didn't request this, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 BikeFlow. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject: subject,
      html: html
    });
  }
}

module.exports = new EmailService();