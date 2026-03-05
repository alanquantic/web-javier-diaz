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

export interface EmailData {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail(emailData: EmailData): Promise<boolean> {
  if (!mg || !process.env.MAILGUN_DOMAIN) {
    console.log('Email would be sent:', emailData);
    return true; // Simular éxito en desarrollo
  }

  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: emailData.from || `Javier Díaz - Escuela de Vendedores Profesionales <noreply@${process.env.MAILGUN_DOMAIN}>`,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
    });
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

export function generateEnrollmentEmail(
  name: string,
  courseName: string,
  zoomLink: string,
  sessions: Array<{ date: string; title: string; time: string }>
): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Inscripción</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        .content { background: white; padding: 30px; border: 1px solid #e5e7eb; color: #333; }
        .course-details { background: #f0f9ff; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .schedule { background: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .session { border-bottom: 1px solid #e5e7eb; padding: 10px 0; }
        .session:last-child { border-bottom: none; }
        .important-note { background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 15px; margin: 20px 0; }
        .footer { background: #f3f4f6; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 14px; color: #6b7280; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div style="margin-bottom: 20px;">
                <img src="${process.env.NODE_ENV === 'production' ? 'https://your-domain.com' : 'http://localhost:5000'}/javier-diaz-logo.png" alt="Javier Díaz" style="max-width: 250px; height: auto;" />
            </div>
            <div class="logo">📚 Escuela de Vendedores Profesionales</div>
            <p>🎉 ¡Gracias por tu inscripción!</p>
        </div>
        
        <div class="content">
            <h2>Hola ${name},</h2>
            
            <p>¡Gracias por inscribirte al Curso Virtual <strong>"${courseName}"</strong>!<br>
            Tu lugar ya está reservado para este programa online que te ayudará a perfeccionar tus habilidades y aumentar tus ventas de manera profesional.</p>
            
            <div class="course-details">
                <h3>🔑 Detalles del curso:</h3>
                <p><strong>Duración total:</strong> 9 horas<br>
                <strong>Modalidad:</strong> Virtual vía Zoom<br>
                <strong>Incluye:</strong> Diploma de participación + acceso a bolsa de trabajo</p>
            </div>
            
            <div class="schedule">
                <h3>📅 Fechas y sesiones:</h3>
                <div class="session">
                    <strong>Sesión 1:</strong> 2 de octubre – Módulo 1: Introducción a las ventas profesionales (5:00 a 7:00 PM)
                </div>
                <div class="session">
                    <strong>Sesión 2:</strong> 7 de octubre – Módulo 1: Introducción a las ventas profesionales (5:00 a 7:00 PM)
                </div>
                <div class="session">
                    <strong>Sesión 3:</strong> 9 de octubre – Módulo 1: La Imagen del Vendedor Profesional (5:00 a 7:00 PM)
                </div>
                <div class="session">
                    <strong>Sesión 4:</strong> 15 de octubre – Módulo 1: Las mejores estrategias de los grandes vendedores (5:00 a 7:00 PM)
                </div>
                <div class="session">
                    <strong>Sesión 5:</strong> 16 de octubre – Módulo 1: Retroalimentación (5:00 a 6:00 PM)
                </div>
            </div>
            
            <p><strong>💲 Inversión:</strong> $199 USD (tu compra ha sido confirmada).</p>
            
            <div class="important-note">
                <p><strong>📌 Importante:</strong><br>
                Una semana antes de la primera sesión recibirás un correo con el enlace de acceso a Zoom y las instrucciones para conectarte.</p>
            </div>
            
            <p>Estamos muy emocionados de que formes parte de esta experiencia.<br>
            ¡Prepárate para llevar tus ventas al siguiente nivel! 🚀</p>
            
            <p>Un gusto contar contigo,<br>
            <strong>Javier Díaz</strong><br>
            <em>Fundador - Escuela de Vendedores Profesionales</em></p>
        </div>
        
        <div class="footer">
            <p>Este correo fue enviado porque te inscribiste al curso de Escuela de Vendedores Profesionales.</p>
            <p>© 2025 Escuela de Vendedores Profesionales. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
  `;
}

export function generateReminderEmail(
  name: string,
  sessionTitle: string,
  sessionDate: string,
  sessionTime: string,
  zoomLink: string,
  sessionNumber: number = 1
): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recordatorio de Sesión</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        .content { background: white; padding: 30px; border: 1px solid #e5e7eb; color: #333; }
        .reminder-box { background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
        .zoom-link { display: inline-block; background: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 10px 0; }
        .footer { background: #f3f4f6; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 14px; color: #6b7280; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div style="margin-bottom: 20px;">
                <img src="${process.env.NODE_ENV === 'production' ? 'https://your-domain.com' : 'http://localhost:5000'}/javier-diaz-logo.png" alt="Javier Díaz" style="max-width: 250px; height: auto;" />
            </div>
            <div class="logo">📚 Escuela de Vendedores Profesionales</div>
            <p>Recordatorio de Sesión ${sessionNumber}</p>
        </div>
        
        <div class="content">
            <h2>¡Hola ${name}!</h2>
            
            <div class="reminder-box">
                <h3>⏰ ¡Tu sesión ${sessionNumber} es muy pronto!</h3>
                <p><strong>Sesión ${sessionNumber}: ${sessionTitle}</strong></p>
                <p><strong>${sessionDate}</strong> a las <strong>${sessionTime}</strong></p>
                <p>Hora de México (UTC-6)</p>
            </div>
            
            <p>No olvides conectarte usando tu enlace de Zoom:</p>
            <div style="text-align: center;">
                <a href="${zoomLink}" class="zoom-link">Unirse a la Sesión</a>
            </div>
            
            <h3>💡 Recomendaciones para la sesión:</h3>
            <ul>
                <li>Conéctate 5 minutos antes del inicio</li>
                <li>Ten listos papel y lápiz para tomar notas</li>
                <li>Asegúrate de tener buena conexión a internet</li>
                <li>Encuentra un lugar tranquilo y sin distracciones</li>
            </ul>
            
            <p>¡Te esperamos!</p>
            
            <p>Saludos cordiales,<br>
            <strong>Javier Díaz</strong><br>
            <em>Fundador - Escuela de Vendedores Profesionales</em></p>
        </div>
        
        <div class="footer">
            <p>© 2025 Escuela de Vendedores Profesionales. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
  `;
}