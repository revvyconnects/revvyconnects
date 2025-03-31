const nodemailer = require('nodemailer');
const mjml2html = require('mjml');
const fs = require('fs').promises;
const path = require('path');

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify email configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

class EmailService {
  async loadTemplate(templateName) {
    const templatePath = path.join(__dirname, '..', 'templates', `${templateName}.mjml`);
    return await fs.readFile(templatePath, 'utf8');
  }

  compileTemplate(mjmlContent, variables) {
    // Replace variables in the template
    let compiledTemplate = mjmlContent;
    Object.entries(variables).forEach(([key, value]) => {
      compiledTemplate = compiledTemplate.replace(
        new RegExp(`{{${key}}}`, 'g'),
        value
      );
    });

    // Convert MJML to HTML
    const { html } = mjml2html(compiledTemplate);
    return html;
  }

  async sendPasswordResetEmail(to, { name, resetUrl, requestIP }) {
    try {
      const mjmlTemplate = await this.loadTemplate('passwordReset');
      const html = this.compileTemplate(mjmlTemplate, {
        name,
        resetUrl,
        requestIP,
        year: new Date().getFullYear()
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to,
        subject: 'Reset Your Revvy Password',
        html
      });

      return true;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  }

  // Add more email sending methods here as needed
  // For example: sendWelcomeEmail, sendVerificationEmail, etc.
}

module.exports = new EmailService(); 