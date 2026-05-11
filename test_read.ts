import * as XLSX from 'xlsx';

// Create a workbook with a date and a large number
const ws = XLSX.utils.aoa_to_sheet([
  ["Timestamp", "National ID"],
  [new Date(2026, 4, 2, 22, 3), 30603231200844]
]);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Test");
const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

// Read it back
const wb2 = XLSX.read(buf, { type: "buffer", cellDates: true });
const ws2 = wb2.Sheets["Test"];

const dataRawTrue = XLSX.utils.sheet_to_json(ws2, { header: 1, raw: true });
console.log("raw: true =>", dataRawTrue[1]);

const dataRawFalse = XLSX.utils.sheet_to_json(ws2, { header: 1, raw: false });
console.log("raw: false =>", dataRawFalse[1]);
