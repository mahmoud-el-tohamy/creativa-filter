import * as XLSX from "xlsx";

export interface Person {
  name: string;
  nationalId: string;
  phone?: string;
  email?: string;
}

// قراءة شيت Excel وإرجاع array
export async function readExcel(file: File): Promise<Person[]> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<any[]>(sheet, { header: 1 });

    // أول سطر هيدر، باقي الصفوف بيانات
    const people: Person[] = rows
      .slice(1)
      .map((row) => ({
        name: String(row[0] || "").trim(),
        nationalId: String(row[1] || "").trim(),
        phone: row[2] ? String(row[2]) : undefined,
        email: row[3] ? String(row[3]) : undefined,
      }))
      .filter((p) => p.name && p.nationalId);

    return people;
  } catch (err: any) {
    console.error("Excel processing error:", err);
    
    // Check for specific error types if possible
    let message = "تعذر قراءة الملف. يرجى التأكد من أن الملف غير مفتوح في برنامج آخر.";
    if (err.name === 'NotReadableError') {
      message = "الملف غير قابل للقراءة. تأكد من إغلاقه في البرامج الأخرى (مثل إكسيل) قبل رفعه.";
    } else if (err.message?.includes("corrupt")) {
      message = "يبدو أن الملف تالف. يرجى المحاولة باستخدام ملف آخر.";
    }

    throw new Error(message);
  }
}

// كتابة Excel وتحميله
export function downloadExcel(people: Person[], filename: string) {
  const rows = [
    ["الاسم", "الرقم القومي", "رقم التواصل", "الإيميل"],
    ...people.map((p) => [p.name, p.nationalId, p.phone || "", p.email || ""]),
  ];
  const ws = XLSX.utils.aoa_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "المقبولون");
  XLSX.writeFile(wb, filename);
}
