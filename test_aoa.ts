import * as XLSX from 'xlsx';

const ws = XLSX.utils.aoa_to_sheet([
  [new Date(2026, 4, 2, 22, 3), 30603231200844]
]);

console.log(ws["A1"]);
console.log(ws["B1"]);
