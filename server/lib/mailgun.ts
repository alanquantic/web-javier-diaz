import Mailgun from 'mailgun.js';
import formData from 'form-data';

const mailgun = new Mailgun(formData);

let mg: any = null;

export const initMailgun = () => {
  if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
    console.warn('Missing Mailgun configuration: MAILGUN_API_KEY or MAILGUN_DOMAIN');
    return null;
  }

  if (!mg) {
    mg = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY,
    });
  }

  return mg;
};

export interface EmailData {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  from?: string;
}

export const sendEmail = async (emailData: EmailData) => {
  const client = initMailgun();
  
  if (!client) {
    throw new Error('Mailgun not configured properly');
  }

  const domain = process.env.MAILGUN_DOMAIN!;
  
  const messageData = {
    from: emailData.from || `Javier Díaz <noreply@${domain}>`,
    to: emailData.to,
    subject: emailData.subject,
    text: emailData.text,
    html: emailData.html,
  };

  try {
    const result = await client.messages.create(domain, messageData);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};