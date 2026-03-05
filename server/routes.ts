import "dotenv/config";
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertContactSchema, 
  insertNewsletterSchema,
  insertCourseEnrollmentSchema
} from "@shared/schema";
import { ZodError } from "zod";
import { sendEmail, generateEnrollmentEmail, generateReminderEmail } from "./emails";
import { sendPurchaseNotificationEmails } from "./purchaseNotification";
import { addEnrollmentToSheet, type EnrollmentData } from "./googleSheets";
import Stripe from "stripe";

// Initialize Stripe
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-07-30.basil",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for handling form submissions
  
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      
      // Send email notification via Mailgun
      try {
        // Send to multiple recipients
        const recipients = ['alan@ceosnm.com', 'javier@javierdiaz.com.mx'];
        
        for (const recipient of recipients) {
          await sendEmail({
            to: recipient,
            subject: `Nuevo contacto: ${contactData.requestType || 'Consulta general'}`,
            html: `
              <h2>Nuevo mensaje de contacto</h2>
              <p><strong>Nombre:</strong> ${contactData.name}</p>
              <p><strong>Email:</strong> ${contactData.email}</p>
              <p><strong>Teléfono:</strong> ${contactData.phone || 'No proporcionado'}</p>
              <p><strong>Empresa:</strong> ${contactData.company || 'No especificada'}</p>
              <p><strong>Tipo de solicitud:</strong> ${contactData.requestType || 'Consulta general'}</p>
              <p><strong>Método de contacto preferido:</strong> ${contactData.contactMethod || 'No especificado'}</p>
              <p><strong>Fecha preferida para contacto:</strong> ${contactData.appointmentDate || 'Sin fecha específica'}</p>
              <p><strong>Asunto:</strong> ${contactData.subject || 'Sin asunto'}</p>
              <p><strong>Mensaje:</strong></p>
              <p>${contactData.message || 'Sin mensaje adicional'}</p>
            `
          });
        }
      } catch (emailError) {
        console.error("Error sending email notification:", emailError);
        // Don't fail the request if email fails
      }
      
      res.status(201).json({
        message: "Mensaje enviado con éxito. Nos pondremos en contacto pronto.",
        contact
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          message: "Error en los datos enviados",
          errors: error.errors
        });
      } else {
        console.error("Error processing contact:", error);
        res.status(500).json({ 
          message: "Error al procesar la solicitud. Intente nuevamente más tarde."
        });
      }
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      const newsletterData = insertNewsletterSchema.parse(req.body);
      
      // Check if email is already subscribed
      const existingSubscription = await storage.getNewsletterByEmail(newsletterData.email);
      
      if (existingSubscription) {
        return res.status(200).json({
          message: "¡Ya estás suscrito a nuestra newsletter!",
          subscription: existingSubscription
        });
      }
      
      const subscription = await storage.createNewsletter(newsletterData);
      
      // Send welcome email via Mailgun
      try {
        await sendEmail({
          to: newsletterData.email,
          subject: 'Bienvenido a la newsletter de Javier Díaz',
          html: `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Bienvenido a nuestra comunidad</title>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: white; padding: 30px; border: 1px solid #e5e7eb; color: #333; }
                    .footer { background: #f3f4f6; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 14px; color: #6b7280; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div style="margin-bottom: 20px;">
                            <img src="${process.env.NODE_ENV === 'production' ? 'https://your-domain.com' : 'http://localhost:5000'}/javier-diaz-logo.png" alt="Javier Díaz" style="max-width: 250px; height: auto;" />
                        </div>
                        <h2>¡Bienvenido a nuestra comunidad!</h2>
                    </div>
                    
                    <div class="content">
                        <p>Hola ${newsletterData.name},</p>
                        <p>Gracias por suscribirte a nuestra newsletter. Recibirás contenido exclusivo sobre ventas, liderazgo y crecimiento personal.</p>
                        <p>¡Prepárate para multiplicar tus ventas y liderar tu vida!</p>
                        <br>
                        <p>Saludos,</p>
                        <p><strong>Javier Díaz</strong><br>
                        <em>Fundador - Escuela de Vendedores Profesionales</em></p>
                    </div>
                    
                    <div class="footer">
                        <p>© 2025 Escuela de Vendedores Profesionales. Todos los derechos reservados.</p>
                    </div>
                </div>
            </body>
            </html>
          `
        });
      } catch (emailError) {
        console.error("Error sending welcome email:", emailError);
        // Don't fail the request if email fails
      }
      
      res.status(201).json({
        message: "¡Gracias por suscribirte a nuestra newsletter!",
        subscription
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          message: "Error en los datos enviados",
          errors: error.errors
        });
      } else {
        console.error("Error processing newsletter subscription:", error);
        res.status(500).json({ 
          message: "Error al procesar la suscripción. Intente nuevamente más tarde."
        });
      }
    }
  });

  // Check discount availability and calculate final price
  app.post("/api/check-discount", async (req, res) => {
    try {
      const { courseName, originalPrice } = req.body;
      
      if (courseName !== "Escuela de Vendedores Profesionales") {
        return res.json({
          discountAvailable: false,
          originalPrice: originalPrice,
          finalPrice: originalPrice,
          discountAmount: 0,
          discountPercentage: 0,
          remainingSpots: 0
        });
      }

      // Count completed enrollments with discount for this course
      const completedWithDiscount = await storage.getCompletedEnrollmentsWithDiscount(courseName);
      const maxDiscountSpots = 50;
      const remainingSpots = Math.max(0, maxDiscountSpots - completedWithDiscount);
      const discountAvailable = remainingSpots > 0;

      if (!discountAvailable) {
        return res.json({
          discountAvailable: false,
          originalPrice: originalPrice,
          finalPrice: originalPrice,
          discountAmount: 0,
          discountPercentage: 0,
          remainingSpots: 0
        });
      }

      // Apply $50 USD fixed discount for Escuela de Vendedores Profesionales
      // Using Stripe coupon "KEnrA857" with $50 fixed amount discount
      const discountAmount = 50; // Fixed $50 USD discount
      const finalPrice = Math.max(0, originalPrice - discountAmount); // Ensure price doesn't go negative
      const discountPercentage = Math.round((discountAmount / originalPrice) * 100);

      res.json({
        discountAvailable: true,
        originalPrice: originalPrice,
        finalPrice: finalPrice,
        discountAmount: discountAmount,
        discountPercentage: discountPercentage,
        remainingSpots: remainingSpots
      });
    } catch (error: any) {
      console.error('Error checking discount:', error);
      res.status(500).json({ message: "Error checking discount availability: " + error.message });
    }
  });

  // Create Stripe Payment Intent for course enrollment
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, courseName, discountApplied } = req.body;
      
      console.log('Creating payment intent for:', { amount, courseName, discountApplied });
      console.log('Stripe key starts with:', process.env.STRIPE_SECRET_KEY?.substring(0, 8));
      
      const paymentIntentParams: any = {
        amount: Math.round(amount * 100), // Convert to cents (amount should already be final price)
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          courseName: courseName || "Escuela de Vendedores Profesionales",
          discountApplied: discountApplied ? "true" : "false"
        },
      };

      // For Escuela de Vendedores Profesionales with discount, the amount already includes the discount
      // We'll track the discount in metadata and apply it during invoice creation
      if (courseName === "Escuela de Vendedores Profesionales" && discountApplied) {
        // Double-check discount availability before applying
        const completedWithDiscount = await storage.getCompletedEnrollmentsWithDiscount(courseName);
        if (completedWithDiscount >= 50) {
          console.log('Discount no longer available - reached 50 limit');
          return res.status(400).json({ message: "Discount no longer available. Please refresh and try again." });
        }
        console.log('Processing payment with $50 discount applied to final amount');
        paymentIntentParams.metadata.couponApplied = "KEnrA857";
        paymentIntentParams.metadata.discountAmount = "50";
      }
      
      const paymentIntent = await stripe.paymentIntents.create(paymentIntentParams);
      
      console.log('Payment intent created:', paymentIntent.id);
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      console.error('Stripe error:', error);
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Course enrollment - create pending enrollment (before payment)
  app.post("/api/create-course-payment", async (req, res) => {
    try {
      const enrollmentData = insertCourseEnrollmentSchema.parse(req.body);
      
      // Create course enrollment record with pending status
      const enrollment = await storage.createCourseEnrollment(enrollmentData);
      
      res.status(201).json({
        message: "Enrollment created, awaiting payment",
        enrollment
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          message: "Error en los datos enviados",
          errors: error.errors
        });
      } else {
        console.error("Error creating enrollment:", error);
        res.status(500).json({ 
          message: "Error al crear la inscripción."
        });
      }
    }
  });

  // Confirm course payment - complete enrollment after successful payment
  app.post("/api/confirm-course-payment", async (req, res) => {
    try {
      const enrollmentData = insertCourseEnrollmentSchema.extend({
        paymentIntentId: z.string()
      }).parse(req.body);
      
      // Create course enrollment record
      const enrollment = await storage.createCourseEnrollment(enrollmentData);
      
      // Mark payment as completed with real payment intent ID
      await storage.updatePaymentStatus(enrollment.id, "completed", enrollmentData.paymentIntentId);
      
      // Get updated enrollment
      const updatedEnrollment = await storage.getCourseEnrollment(enrollment.id);
      if (!updatedEnrollment) {
        throw new Error("Enrollment not found");
      }

      // Prepare session data for email
      const sessions = [
        { date: "2 de octubre", title: "Módulo 1: Introducción a las ventas profesionales", time: "5:00 PM - 7:00 PM" },
        { date: "7 de octubre", title: "Módulo 1: Introducción a las ventas profesionales", time: "5:00 PM - 7:00 PM" },
        { date: "9 de octubre", title: "Módulo 1: La Imagen del Vendedor Profesional", time: "5:00 PM - 7:00 PM" },
        { date: "15 de octubre", title: "Módulo 1: Las mejores estrategias de los grandes vendedores", time: "5:00 PM - 7:00 PM" },
        { date: "16 de octubre", title: "Módulo 1: Retroalimentación", time: "5:00 PM - 6:00 PM" }
      ];

      // Send confirmation email
      const confirmationEmailHtml = generateEnrollmentEmail(
        enrollmentData.name,
        enrollmentData.courseName,
        updatedEnrollment.zoomLink,
        sessions
      );

      try {
        await sendEmail({
          to: enrollmentData.email,
          subject: `🎉 ¡Gracias por tu inscripción al Curso Virtual "Escuela de Vendedores Profesionales"!`,
          html: confirmationEmailHtml
        });

        // Send purchase notification emails to admin team
        await sendPurchaseNotificationEmails({
          ...enrollmentData,
          zoomLink: updatedEnrollment.zoomLink,
          stripePaymentIntentId: updatedEnrollment.stripePaymentIntentId
        });
      } catch (emailError) {
        console.error("Error sending confirmation email:", emailError);
      }

      // Add enrollment data to Google Sheets
      const sheetsData: EnrollmentData = {
        name: enrollmentData.name,
        email: enrollmentData.email,
        phone: enrollmentData.phone,
        company: enrollmentData.company || undefined,
        courseName: enrollmentData.courseName,
        coursePrice: enrollmentData.coursePrice / 100, // Convert from cents to dollars
        paymentStatus: "Completado",
        createdAt: new Date().toLocaleString('es-MX', { 
          timeZone: 'America/Mexico_City',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      try {
        await addEnrollmentToSheet(sheetsData);
        console.log("Enrollment data successfully added to Google Sheets");
      } catch (sheetsError) {
        console.error("Error adding data to Google Sheets:", sheetsError);
      }

      // Reminder emails are automatically scheduled by the reminder system
      
      res.status(201).json({
        message: "Pago procesado exitosamente",
        enrollment: updatedEnrollment
      });

    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          message: "Error en los datos enviados",
          errors: error.errors
        });
      } else {
        console.error("Error processing course payment:", error);
        res.status(500).json({ 
          message: "Error al procesar el pago. Intente nuevamente más tarde."
        });
      }
    }
  });

  // Get course enrollments (for admin)
  app.get("/api/course-enrollments", async (req, res) => {
    try {
      const enrollments = await storage.getAllCourseEnrollments();
      res.json(enrollments);
    } catch (error) {
      console.error("Error fetching course enrollments:", error);
      res.status(500).json({ message: "Error al obtener las inscripciones" });
    }
  });

  // Test endpoint to verify Stripe connection
  app.get("/api/stripe-test", async (req, res) => {
    try {
      const account = await stripe.accounts.retrieve();
      res.json({ 
        success: true, 
        accountId: account.id,
        keyType: process.env.STRIPE_SECRET_KEY?.startsWith('sk_test') ? 'test' : 'live'
      });
    } catch (error: any) {
      res.status(500).json({ 
        success: false, 
        error: error.message,
        keyType: process.env.STRIPE_SECRET_KEY?.startsWith('sk_test') ? 'test' : 'live'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

