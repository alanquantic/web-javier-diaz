import { google } from 'googleapis';

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Extract spreadsheet ID from the URL
const SPREADSHEET_ID = '1Cjtb5PbfBRz2tze25ICC2Jm4fraTjxoRihGKi-vdQG0';

export interface EnrollmentData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  courseName: string;
  coursePrice: number;
  paymentStatus: string;
  createdAt: string;
}

export async function addEnrollmentToSheet(data: EnrollmentData): Promise<boolean> {
  try {
    // First, check if headers exist, if not add them
    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'A1:H1',
    });

    if (!headerResponse.data.values || headerResponse.data.values.length === 0) {
      // Add headers if they don't exist
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: 'A1:H1',
        valueInputOption: 'RAW',
        requestBody: {
          values: [['Fecha', 'Nombre', 'Email', 'Teléfono', 'Empresa', 'Curso', 'Precio', 'Estado de Pago']],
        },
      });
    }

    // Add the new enrollment data
    const values = [
      data.createdAt,
      data.name,
      data.email,
      data.phone,
      data.company || '',
      data.courseName,
      `$${data.coursePrice}`,
      data.paymentStatus,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'A:H',
      valueInputOption: 'RAW',
      requestBody: {
        values: [values],
      },
    });

    console.log('Enrollment data successfully added to Google Sheets');
    return true;
  } catch (error) {
    console.error('Error adding data to Google Sheets:', error);
    return false;
  }
}