import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Usuarios base para autenticación
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  role: text("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Contactos de formulario de contacto
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  company: text("company"),
  message: text("message"),
  contactMethod: text("contact_method").default("whatsapp").notNull(),
  appointmentDate: text("appointment_date"),
  requestType: text("request_type").default("info").notNull(),
  subject: text("subject"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  processed: boolean("processed").default(false).notNull(),
});

// Suscripciones a newsletter
export const newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  active: boolean("active").default(true).notNull(),
});

// Compras de cursos
export const courseEnrollments = pgTable("course_enrollments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  company: text("company"),
  cardholderName: text("cardholder_name"),
  courseName: text("course_name").notNull(),
  coursePrice: integer("course_price").notNull(), // precio en centavos
  discountApplied: boolean("discount_applied").default(false).notNull(),
  finalPrice: integer("final_price").notNull(), // precio final después del descuento
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  paymentStatus: text("payment_status").default("pending").notNull(), // pending, completed, failed
  zoomLink: text("zoom_link").default("https://zoom.us/j/1234567890?pwd=example").notNull(),
  remindersSent: integer("reminders_sent").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Sesiones de cursos con fechas específicas
export const courseSessions = pgTable("course_sessions", {
  id: serial("id").primaryKey(),
  courseName: text("course_name").notNull(),
  sessionNumber: integer("session_number").notNull(),
  sessionTitle: text("session_title").notNull(),
  sessionDate: text("session_date").notNull(), // formato "2 de octubre"
  sessionTime: text("session_time").notNull(), // formato "5:00 PM - 7:00 PM"
  duration: text("duration").notNull(), // formato "2 horas"
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Esquemas de inserción
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
  phone: true,
  role: true,
});

export const insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  phone: true,
  company: true,
  message: true,
  contactMethod: true,
  appointmentDate: true,
  requestType: true,
  subject: true,
});

export const insertNewsletterSchema = createInsertSchema(newsletters).pick({
  name: true,
  email: true,
});

export const insertCourseEnrollmentSchema = createInsertSchema(courseEnrollments).pick({
  name: true,
  email: true,
  phone: true,
  company: true,
  courseName: true,
  coursePrice: true,
  finalPrice: true,
  discountApplied: true,
  stripePaymentIntentId: true,
});

export const insertCourseSessionSchema = createInsertSchema(courseSessions).pick({
  courseName: true,
  sessionNumber: true,
  sessionTitle: true,
  sessionDate: true,
  sessionTime: true,
  duration: true,
});

// Tipos
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type Newsletter = typeof newsletters.$inferSelect;

export type InsertCourseEnrollment = z.infer<typeof insertCourseEnrollmentSchema>;
export type CourseEnrollment = typeof courseEnrollments.$inferSelect;

export type InsertCourseSession = z.infer<typeof insertCourseSessionSchema>;
export type CourseSession = typeof courseSessions.$inferSelect;
