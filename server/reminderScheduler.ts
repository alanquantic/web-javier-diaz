import { storage } from "./storage";
import { sendEmail, generateReminderEmail } from "./emails";

// Helper function to parse Spanish date format to comparable format
function parseDateToCompareFormat(dateStr: string): string {
  const months: { [key: string]: string } = {
    'enero': '01', 'febrero': '02', 'marzo': '03', 'abril': '04',
    'mayo': '05', 'junio': '06', 'julio': '07', 'agosto': '08',
    'septiembre': '09', 'octubre': '10', 'noviembre': '11', 'diciembre': '12'
  };
  
  // Parse "2 de octubre" format
  const parts = dateStr.toLowerCase().split(' de ');
  if (parts.length === 2) {
    const day = parts[0].padStart(2, '0');
    const month = months[parts[1]];
    if (month) {
      // Assume current year (2025 for the course)
      return `2025-${month}-${day}`;
    }
  }
  
  return dateStr; // fallback
}

// Function to check if today is one day before the session date
function isReminderDate(sessionDate: string): boolean {
  const today = new Date();
  const sessionDateFormatted = parseDateToCompareFormat(sessionDate);
  const sessionDateObj = new Date(sessionDateFormatted);
  
  // Calculate yesterday (one day before session)
  const reminderDate = new Date(sessionDateObj);
  reminderDate.setDate(reminderDate.getDate() - 1);
  
  // Check if today matches the reminder date
  return today.toDateString() === reminderDate.toDateString();
}

// Function to get session number for the reminder
function getSessionNumberForDate(sessionDate: string, courseName: string): number {
  const sessionDates = [
    "2 de octubre",   // Session 1
    "7 de octubre",   // Session 2
    "9 de octubre",   // Session 3
    "15 de octubre",  // Session 4
    "16 de octubre"   // Session 5
  ];
  
  return sessionDates.indexOf(sessionDate) + 1;
}

// Main function to check and send reminders
export async function checkAndSendReminders(): Promise<void> {
  try {
    console.log('Checking for reminder emails to send...');
    
    // Get all enrollments that are completed (payment successful)
    const enrollments = await storage.getEnrollmentsNeedingReminders();
    
    // Get all course sessions
    const allSessions = await storage.getAllCourseSessions();
    
    for (const enrollment of enrollments) {
      // Get sessions for this specific course
      const courseSessions = allSessions.filter(
        session => session.courseName === enrollment.courseName
      );
      
      for (const session of courseSessions) {
        // Check if today is the reminder date for this session
        if (isReminderDate(session.sessionDate)) {
          const sessionNumber = getSessionNumberForDate(session.sessionDate, enrollment.courseName);
          
          // Check if we've already sent this specific reminder
          // We use remindersSent as a bitmask to track which sessions have been sent
          const reminderBit = 1 << (sessionNumber - 1);
          const alreadySent = (enrollment.remindersSent & reminderBit) !== 0;
          
          if (!alreadySent) {
            console.log(`Sending reminder for session ${sessionNumber} to ${enrollment.email}`);
            
            // Generate and send reminder email
            const reminderEmail = generateReminderEmail(
              enrollment.name,
              session.sessionTitle,
              session.sessionDate,
              session.sessionTime,
              enrollment.zoomLink,
              sessionNumber
            );
            
            const emailSent = await sendEmail({
              to: enrollment.email,
              subject: `🔔 Recordatorio: Sesión ${sessionNumber} mañana - ${session.sessionTitle}`,
              html: reminderEmail
            });
            
            if (emailSent) {
              // Mark this specific reminder as sent using bitmask
              const updatedRemindersSent = enrollment.remindersSent | reminderBit;
              await storage.updateRemindersSent(enrollment.id, updatedRemindersSent);
              console.log(`Reminder sent successfully for session ${sessionNumber} to ${enrollment.email}`);
            } else {
              console.error(`Failed to send reminder for session ${sessionNumber} to ${enrollment.email}`);
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('Error checking and sending reminders:', error);
  }
}

// Function to start the reminder scheduler
export function startReminderScheduler(): void {
  console.log('Starting reminder scheduler...');
  
  // Check immediately on startup
  checkAndSendReminders();
  
  // Schedule to run every day at 9 AM
  const checkReminders = () => {
    const now = new Date();
    const hours = now.getHours();
    
    // Run at 9 AM every day
    if (hours === 9) {
      checkAndSendReminders();
    }
  };
  
  // Check every hour
  setInterval(checkReminders, 60 * 60 * 1000); // 1 hour in milliseconds
  
  console.log('Reminder scheduler started. Will check daily at 9 AM.');
}