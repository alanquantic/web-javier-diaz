import formData from 'form-data';
import Mailgun from 'mailgun.js';

if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
  console.warn('Mailgun credentials not found. Email functionality will be disabled.');
}

const mailgun = new Mailgun(formData);
const mg = process.env.MAILGUN_API_KEY ? mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
}) : null;

export async function sendPurchaseNotificationEmails(enrollmentData: any): Promise<boolean> {
  if (!mg || !process.env.MAILGUN_DOMAIN) {
    console.log('Purchase notification emails would be sent to: yarely@ceosnm.com, lors@ceosnm.com, javier@javierdiaz.com.mx');
    console.log('Enrollment data:', enrollmentData);
    return true; // Simular éxito en desarrollo
  }

  try {
    const notificationEmails = [
      'yarely@ceosnm.com',
      'lors@ceosnm.com', 
      'javier@javierdiaz.com.mx'
    ];

    const discountText = enrollmentData.discountApplied 
      ? `<p><strong>Descuento aplicado:</strong> $50 USD (Precio original: $${enrollmentData.coursePrice / 100} USD)</p>`
      : '';

    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `Escuela de Vendedores Profesionales <noreply@${process.env.MAILGUN_DOMAIN}>`,
      to: notificationEmails,
      subject: `Nueva compra completada - ${enrollmentData.courseName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="${process.env.NODE_ENV === 'production' ? 'https://your-domain.com' : 'http://localhost:5000'}/javier-diaz-logo.png" alt="Javier Díaz" style="max-width: 200px; height: auto;">
          </div>
          
          <h2 style="color: #16a34a; text-align: center;">¡Nueva Compra Completada!</h2>
          
          <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #16a34a;">
            <h3 style="color: #15803d; margin-top: 0;">Detalles de la Compra</h3>
            <p><strong>Curso:</strong> ${enrollmentData.courseName}</p>
            <p><strong>Precio final:</strong> $${enrollmentData.finalPrice / 100} USD</p>
            ${discountText}
            <p><strong>ID de Pago Stripe:</strong> ${enrollmentData.stripePaymentIntentId}</p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Información del Cliente</h3>
            <p><strong>Nombre:</strong> ${enrollmentData.name}</p>
            <p><strong>Email:</strong> ${enrollmentData.email}</p>
            <p><strong>Teléfono:</strong> ${enrollmentData.phone}</p>
            ${enrollmentData.company ? `<p><strong>Empresa:</strong> ${enrollmentData.company}</p>` : ''}
          </div>
          
          <div style="background-color: #dbeafe; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #1e40af;">
              <strong>Enlace de Zoom asignado:</strong><br>
              <a href="${enrollmentData.zoomLink}" style="color: #2563eb; text-decoration: none;">
                ${enrollmentData.zoomLink}
              </a>
            </p>
          </div>
          
          <p><strong>Fecha de compra:</strong> ${new Date().toLocaleString('es-MX')}</p>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280;">
            <p style="margin: 0;">Escuela de Vendedores Profesionales</p>
            <p style="margin: 0;">Sistema de Notificaciones</p>
          </div>
        </div>
      `,
    });

    console.log('Purchase notification emails sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending purchase notification emails:', error);
    return false;
  }
}