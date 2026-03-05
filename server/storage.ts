import { 
  users, type User, type InsertUser,
  contacts, type Contact, type InsertContact,
  newsletters, type Newsletter, type InsertNewsletter,
  courseEnrollments, type CourseEnrollment, type InsertCourseEnrollment,
  courseSessions, type CourseSession, type InsertCourseSession
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Contact form methods
  getContact(id: number): Promise<Contact | undefined>;
  getAllContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  markContactAsProcessed(id: number): Promise<Contact | undefined>;

  // Newsletter methods
  getNewsletter(id: number): Promise<Newsletter | undefined>;
  getNewsletterByEmail(email: string): Promise<Newsletter | undefined>;
  getAllNewsletters(activeOnly?: boolean): Promise<Newsletter[]>;
  createNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  toggleNewsletterStatus(id: number, active: boolean): Promise<Newsletter | undefined>;

  // Course enrollment methods
  getCourseEnrollment(id: number): Promise<CourseEnrollment | undefined>;
  getCourseEnrollmentByEmail(email: string): Promise<CourseEnrollment | undefined>;
  getAllCourseEnrollments(): Promise<CourseEnrollment[]>;
  getEnrollmentsNeedingReminders(): Promise<CourseEnrollment[]>;
  getCompletedEnrollmentsWithDiscount(courseName: string): Promise<number>;
  createCourseEnrollment(enrollment: InsertCourseEnrollment): Promise<CourseEnrollment>;
  updatePaymentStatus(id: number, status: string, stripePaymentIntentId?: string): Promise<CourseEnrollment | undefined>;
  incrementRemindersSent(id: number): Promise<CourseEnrollment | undefined>;
  updateRemindersSent(id: number, remindersSent: number): Promise<CourseEnrollment | undefined>;

  // Course session methods
  getCourseSession(id: number): Promise<CourseSession | undefined>;
  getSessionsByCourseName(courseName: string): Promise<CourseSession[]>;
  getAllCourseSessions(): Promise<CourseSession[]>;
  createCourseSession(session: InsertCourseSession): Promise<CourseSession>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, Contact>;
  private newsletters: Map<number, Newsletter>;
  private courseEnrollments: Map<number, CourseEnrollment>;
  private courseSessions: Map<number, CourseSession>;
  
  private userCurrentId: number;
  private contactCurrentId: number;
  private newsletterCurrentId: number;
  private courseEnrollmentCurrentId: number;
  private courseSessionCurrentId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.newsletters = new Map();
    this.courseEnrollments = new Map();
    this.courseSessions = new Map();
    
    this.userCurrentId = 1;
    this.contactCurrentId = 1;
    this.newsletterCurrentId = 1;
    this.courseEnrollmentCurrentId = 1;
    this.courseSessionCurrentId = 1;
    
    // Initialize course sessions for Escuela de Vendedores Profesionales
    this.initializeCourseSessions();
  }

  private initializeCourseSessions() {
    const sessions = [
      {
        courseName: "Escuela de Vendedores Profesionales",
        sessionNumber: 1,
        sessionTitle: "Módulo 1: Introducción a las ventas profesionales",
        sessionDate: "2 de octubre",
        sessionTime: "5:00 PM - 7:00 PM",
        duration: "2 horas"
      },
      {
        courseName: "Escuela de Vendedores Profesionales",
        sessionNumber: 2,
        sessionTitle: "Módulo 1: Introducción a las ventas profesionales",
        sessionDate: "7 de octubre",
        sessionTime: "5:00 PM - 7:00 PM",
        duration: "2 horas"
      },
      {
        courseName: "Escuela de Vendedores Profesionales",
        sessionNumber: 3,
        sessionTitle: "Módulo 1: La Imagen del Vendedor Profesional",
        sessionDate: "9 de octubre",
        sessionTime: "5:00 PM - 7:00 PM",
        duration: "2 horas"
      },
      {
        courseName: "Escuela de Vendedores Profesionales",
        sessionNumber: 4,
        sessionTitle: "Módulo 1: Las mejores estrategias de los grandes vendedores",
        sessionDate: "15 de octubre",
        sessionTime: "5:00 PM - 7:00 PM",
        duration: "2 horas"
      },
      {
        courseName: "Escuela de Vendedores Profesionales",
        sessionNumber: 5,
        sessionTitle: "Módulo 1: Retroalimentación",
        sessionDate: "16 de octubre",
        sessionTime: "5:00 PM - 6:00 PM",
        duration: "1 hora"
      }
    ];

    sessions.forEach(session => {
      const id = this.courseSessionCurrentId++;
      const createdAt = new Date();
      const courseSession: CourseSession = { ...session, id, createdAt };
      this.courseSessions.set(id, courseSession);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const createdAt = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt,
      phone: insertUser.phone || null
    };
    this.users.set(id, user);
    return user;
  }

  // Contact form methods
  async getContact(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.contactCurrentId++;
    const createdAt = new Date();
    const processed = false;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt, 
      processed,
      company: insertContact.company || null,
      message: insertContact.message || null,
      appointmentDate: insertContact.appointmentDate || null,
      subject: insertContact.subject || null
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async markContactAsProcessed(id: number): Promise<Contact | undefined> {
    const contact = this.contacts.get(id);
    if (!contact) return undefined;
    
    const updatedContact: Contact = { ...contact, processed: true };
    this.contacts.set(id, updatedContact);
    return updatedContact;
  }

  // Newsletter methods
  async getNewsletter(id: number): Promise<Newsletter | undefined> {
    return this.newsletters.get(id);
  }

  async getNewsletterByEmail(email: string): Promise<Newsletter | undefined> {
    return Array.from(this.newsletters.values()).find(
      (newsletter) => newsletter.email === email,
    );
  }

  async getAllNewsletters(activeOnly = false): Promise<Newsletter[]> {
    const allNewsletters = Array.from(this.newsletters.values());
    if (activeOnly) {
      return allNewsletters.filter(newsletter => newsletter.active);
    }
    return allNewsletters;
  }

  async createNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const id = this.newsletterCurrentId++;
    const createdAt = new Date();
    const active = true;
    const newsletter: Newsletter = { ...insertNewsletter, id, createdAt, active };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }

  async toggleNewsletterStatus(id: number, active: boolean): Promise<Newsletter | undefined> {
    const newsletter = this.newsletters.get(id);
    if (!newsletter) return undefined;
    
    const updatedNewsletter: Newsletter = { ...newsletter, active };
    this.newsletters.set(id, updatedNewsletter);
    return updatedNewsletter;
  }

  // Course enrollment methods
  async getCourseEnrollment(id: number): Promise<CourseEnrollment | undefined> {
    return this.courseEnrollments.get(id);
  }

  async getCourseEnrollmentByEmail(email: string): Promise<CourseEnrollment | undefined> {
    return Array.from(this.courseEnrollments.values()).find(
      (enrollment) => enrollment.email === email,
    );
  }

  async getAllCourseEnrollments(): Promise<CourseEnrollment[]> {
    return Array.from(this.courseEnrollments.values());
  }

  async createCourseEnrollment(insertEnrollment: InsertCourseEnrollment): Promise<CourseEnrollment> {
    const id = this.courseEnrollmentCurrentId++;
    const createdAt = new Date();
    const paymentStatus = "pending";
    const remindersSent = 0;
    const zoomLink = "https://zoom.us/j/1234567890?pwd=example";
    
    const enrollment: CourseEnrollment = { 
      ...insertEnrollment, 
      id, 
      createdAt, 
      paymentStatus, 
      remindersSent,
      zoomLink,
      company: insertEnrollment.company || null,
      stripePaymentIntentId: insertEnrollment.stripePaymentIntentId || null,
      discountApplied: insertEnrollment.discountApplied || false,
      finalPrice: insertEnrollment.finalPrice || insertEnrollment.coursePrice
    };
    this.courseEnrollments.set(id, enrollment);
    return enrollment;
  }

  async updatePaymentStatus(id: number, status: string, stripePaymentIntentId?: string): Promise<CourseEnrollment | undefined> {
    const enrollment = this.courseEnrollments.get(id);
    if (!enrollment) return undefined;
    
    const updatedEnrollment: CourseEnrollment = { 
      ...enrollment, 
      paymentStatus: status,
      stripePaymentIntentId: stripePaymentIntentId || enrollment.stripePaymentIntentId
    };
    this.courseEnrollments.set(id, updatedEnrollment);
    return updatedEnrollment;
  }

  async incrementRemindersSent(id: number): Promise<CourseEnrollment | undefined> {
    const enrollment = this.courseEnrollments.get(id);
    if (!enrollment) return undefined;
    
    const updatedEnrollment: CourseEnrollment = { 
      ...enrollment, 
      remindersSent: enrollment.remindersSent + 1
    };
    this.courseEnrollments.set(id, updatedEnrollment);
    return updatedEnrollment;
  }

  async updateRemindersSent(id: number, remindersSent: number): Promise<CourseEnrollment | undefined> {
    const enrollment = this.courseEnrollments.get(id);
    if (!enrollment) return undefined;
    
    const updatedEnrollment: CourseEnrollment = { 
      ...enrollment, 
      remindersSent
    };
    this.courseEnrollments.set(id, updatedEnrollment);
    return updatedEnrollment;
  }

  async getEnrollmentsNeedingReminders(): Promise<CourseEnrollment[]> {
    return Array.from(this.courseEnrollments.values()).filter(
      enrollment => enrollment.paymentStatus === "completed"
    );
  }

  // Course session methods
  async getCourseSession(id: number): Promise<CourseSession | undefined> {
    return this.courseSessions.get(id);
  }

  async getSessionsByCourseName(courseName: string): Promise<CourseSession[]> {
    return Array.from(this.courseSessions.values()).filter(
      session => session.courseName === courseName
    );
  }

  async getAllCourseSessions(): Promise<CourseSession[]> {
    return Array.from(this.courseSessions.values());
  }

  async createCourseSession(insertSession: InsertCourseSession): Promise<CourseSession> {
    const id = this.courseSessionCurrentId++;
    const createdAt = new Date();
    const session: CourseSession = { ...insertSession, id, createdAt };
    this.courseSessions.set(id, session);
    return session;
  }

  async getCompletedEnrollmentsWithDiscount(courseName: string): Promise<number> {
    return Array.from(this.courseEnrollments.values()).filter(
      enrollment => 
        enrollment.courseName === courseName && 
        enrollment.paymentStatus === "completed" && 
        enrollment.discountApplied === true
    ).length;
  }
}

export const storage = new MemStorage();
