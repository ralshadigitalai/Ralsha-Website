# Google Sheets Integration Guide for Ralsha Leads

All client form data submitted from the Ralsha landing page is formatted into a structured JSON payload ready to be saved into a Google Sheet using Google Apps Script or any webhook service.

## Data Payload Structure

When a client submits the form, the following fields are dispatched:

| Field Name | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `submittedAt` | ISO String | Date & Time of submission | `2026-08-26T16:20:00.000Z` |
| `fullName` | String | Client's full name | `Jane Doe` |
| `phone` | String | Contact phone number | `+91 98765 43210` |
| `email` | String | Email address | `jane@company.com` |
| `monthlySpend` | String | Selected ad spend budget | `$2,000 – $10,000 / month` |
| `sellingDetail` | String | Business summary | `SaaS AI marketing platform` |
| `apiKey` | String | Authorization API key | `VITE_LEADS_API_KEY` |

---

## 2-Minute Setup Instructions for Google Sheets

### Step 1: Create a Google Sheet
1. Open [Google Sheets](https://sheets.new) and name your spreadsheet `Ralsha Client Leads`.
2. Add these column headers in **Row 1**:
   - Column A: `Submitted At`
   - Column B: `Full Name`
   - Column C: `Phone`
   - Column D: `Email`
   - Column E: `Monthly Ad Spend`
   - Column F: `Selling Detail`

### Step 2: Add Google Apps Script
1. In your Google Sheet, click **Extensions** -> **Apps Script**.
2. Replace all code in `Code.gs` with the snippet below:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Append lead row to spreadsheet
    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.fullName || '',
      data.phone || '',
      data.email || '',
      data.monthlySpend || '',
      data.sellingDetail || ''
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** (disk icon).
4. Click **Deploy** -> **New deployment**.
5. Select type: **Web app**.
6. Set **Execute as**: *Me*.
7. Set **Who has access**: *Anyone*.
8. Click **Deploy** and copy the **Web App URL**.

### Step 3: Configure Environment Variables
In your local `.env.local` (and in your Vercel Dashboard project environment settings):

```env
VITE_LEADS_SHEET_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
VITE_LEADS_API_KEY=YOUR_OPTIONAL_API_KEY
```
