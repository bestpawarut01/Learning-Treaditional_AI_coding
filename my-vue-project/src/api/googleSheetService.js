import axios from 'axios';

const API_KEY = process.env.GOOGLE_SHEET_KEY ; // If using API key
// For OAuth 2.0, you'll need additional setup for token management

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
const SHEET_NAME = 'ชีต1';

const GoogleSheetsService = {
  async addRow(rowData) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}:append?valueInputOption=RAW&key=${API_KEY}`;
    const data = {
      values: [rowData],
    };
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      console.error('Error adding row to Google Sheets:', error);
      throw error;
    }
  },
};

export default GoogleSheetsService;
