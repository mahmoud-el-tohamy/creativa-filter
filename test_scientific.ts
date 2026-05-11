import * as XLSX from 'xlsx';

const finalData: (string | number)[][] = [];
finalData.push(["National ID"]);
finalData.push(["29905221202335"]); // String
finalData.push([29905221202335]); // Number

const ws = XLSX.utils.aoa_to_sheet(finalData);

const range = XLSX.utils.decode_range(ws["!ref"] || "A1:A1");
for (let R = range.s.r; R <= range.e.r; ++R) {
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
    if (!ws[cellRef]) continue;

    console.log(`Before: ${cellRef} =`, ws[cellRef]);

    ws[cellRef].t = "s";
    ws[cellRef].z = "@";
    ws[cellRef].v = String(ws[cellRef].v ?? "");

    console.log(`After: ${cellRef} =`, ws[cellRef]);
  }
}

const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Test");
XLSX.writeFile(wb, "test_sci.xlsx");
