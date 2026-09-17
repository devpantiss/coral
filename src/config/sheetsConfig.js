/**
 * Google Sheets configuration for the workforce register.
 *
 * HOW TO SET UP
 * ─────────────
 * 1. Open your Google Sheet and share it publicly (File → Share → Publish to web).
 * 2. Copy the Sheet ID from the URL:
 *      https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit
 * 3. Paste it as VITE_GOOGLE_SHEET_ID in your .env.local file:
 *      VITE_GOOGLE_SHEET_ID=your_sheet_id_here
 *      VITE_GOOGLE_SHEET_NAME=Workforce          ← tab name (optional)
 *
 * EXPECTED COLUMN ORDER IN THE SHEET (row 1 = header, row 2+ = data)
 * ────────────────────────────────────────────────────────────────────
 *  A  Name
 *  B  Job Role
 *  C  District
 *  D  Block
 *  E  Aadhar
 *  F  Gender
 *  G  Certification
 *  H  Experience Years   (number)
 *  I  Experience Companies  (number)
 *  J  Last Package       (number, in rupees — e.g. 350000)
 */

const SHEET_ID   = import.meta.env.VITE_GOOGLE_SHEET_ID  || "YOUR_SHEET_ID_HERE";
const SHEET_NAME = import.meta.env.VITE_GOOGLE_SHEET_NAME || "Workforce";

/**
 * Returns the gviz/tq JSON endpoint URL for the configured sheet.
 * The response wraps JSON in a callback; we strip that wrapper in the hook.
 */
export function getSheetUrl() {
  const encoded = encodeURIComponent(SHEET_NAME);
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encoded}`;
}

export const SHEET_CONFIGURED = SHEET_ID !== "YOUR_SHEET_ID_HERE";
