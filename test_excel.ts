import * as XLSX from 'xlsx';
import * as fs from 'fs';

// Mock data based on user's CSV
const rows = [
  {
    "Timestamp": "5/2/26 22:03",
    "Trainee ID": 112,
    "National ID Number": "30603231200844",
    "Workshop Name": "Cyber Security"
  },
  {
    "Timestamp": "5/2/26 22:03",
    "Trainee ID": 55,
    "National ID Number": 30401011607151, // Simulate number
    "Workshop Name": "Cyber Security"
  },
  {
    "Timestamp": "5/3/26 10:00",
    "Trainee ID": 34,
    "National ID Number": "30604251403314",
    "Workshop Name": "Cyber Security"
  }
];

const headers = ["Timestamp", "Trainee ID", "National ID Number", "Workshop Name"];

const timestampHeader = "Timestamp";
const workshopHeader = "Workshop Name";

const groups = new Map<string, Record<string, unknown>[]>();

rows.forEach((row) => {
  const rawVal = row[workshopHeader];
  const workshopName = typeof rawVal === "string" && rawVal.trim() !== "" ? rawVal.trim() : "غير محدد";
  
  const rawTimestamp = row[timestampHeader];
  let datePart = "";
  if (typeof rawTimestamp === "string") {
    datePart = rawTimestamp.split(" ")[0];
  } else if (rawTimestamp) {
    datePart = String(rawTimestamp).split(" ")[0];
  }

  const groupKey = datePart ? `${workshopName} - ${datePart}` : workshopName;

  if (!groups.has(groupKey)) {
    groups.set(groupKey, []);
  }
  groups.get(groupKey)!.push(row);
});

const sortedKeys = Array.from(groups.keys()).sort((a, b) => {
  if (a === "غير محدد") return 1;
  if (b === "غير محدد") return -1;
  return a.localeCompare(b);
});

const finalData: (string | number)[][] = [];
const merges: XLSX.Range[] = [];

const titleRowIndices = new Set<number>();
const separatorRowIndices = new Set<number>();
const dataRowIndices: { r: number; isEven: boolean }[] = [];

finalData.push(headers);
let currentRowIndex = 1;

sortedKeys.forEach((key, index) => {
  const groupRows = groups.get(key)!;

  // Data rows
  groupRows.forEach((rowObj, dataIndex) => {
    const rowArr: (string | number)[] = headers.map((h) => (rowObj[h] as string | number) ?? "");
    finalData.push(rowArr);
    dataRowIndices.push({ r: currentRowIndex, isEven: dataIndex % 2 === 0 });
    currentRowIndex++;
  });

  // Separator Row
  if (index < sortedKeys.length - 1) {
    const separatorRow: (string | number)[] = new Array(headers.length).fill("");
    finalData.push(separatorRow);
    separatorRowIndices.add(currentRowIndex);
    currentRowIndex++;
  }
});

const ws = XLSX.utils.aoa_to_sheet(finalData);

ws["!merges"] = merges;

const range = XLSX.utils.decode_range(ws["!ref"] || "A1:A1");
for (let R = range.s.r; R <= range.e.r; ++R) {
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
    if (!ws[cellRef]) {
      ws[cellRef] = { t: "s", v: "" };
    }
    
    ws[cellRef].t = "s";
    ws[cellRef].z = "@";
    ws[cellRef].v = String(ws[cellRef].v ?? "");

    // Simplified styling for test
    ws[cellRef].s = { font: { name: "Arial" } };
  }
}

const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Test");
XLSX.writeFile(wb, "test_output.xlsx");
console.log("Done");
