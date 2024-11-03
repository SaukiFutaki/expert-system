import { IFormData } from "@/types";



export const generatePrompt = (data: IFormData, input : string) => {
    return `Anda adalah seorang ahli teknik sipil berpengalaman dengan keahlian khusus dalam konstruksi rumah tinggal. Berikan analisis profesional dan rekomendasi berdasarkan spesifikasi rumah berikut:

SPESIFIKASI BANGUNAN:
- Tipe Rumah: ${data.tipeRumah} (meter persegi)
- Jenis Lantai: ${data.jenisLantai}
- Jenis Atap: ${data.jenisAtap}
- Material Dinding: ${data.jenisMaterial}
- ${input}

Berikan analisis mendetail yang mencakup:

1. ANALISIS KESESUAIAN:
- Evaluasi kesesuaian kombinasi material yang dipilih
- Analisis kecocokan material dengan ukuran dan tipe rumah
- Pertimbangan iklim dan kondisi lingkungan secara umum

2. KEKUATAN & DURABILITAS:
- Estimasi umur material
- Ketahanan terhadap cuaca dan kondisi lingkungan
- Potensi masalah struktural yang perlu diwaspadai

3. PEMELIHARAAN:
- Rekomendasi perawatan rutin
- Perkiraan interval pemeliharaan
- Tips pencegahan kerusakan

4. BIAYA:
- Perkiraan rentang biaya material (rendah-tinggi)
- Estimasi biaya pemeliharaan tahunan
- Potensi penghematan atau pembengkakan biaya

5. REKOMENDASI:
- Saran perbaikan atau alternatif material (jika ada)
- Tips implementasi dan konstruksi
- Modifikasi yang disarankan untuk optimalisasi

6. PERINGATAN & CATATAN KHUSUS:
- Potensi masalah yang perlu diwaspadai
- Hal-hal kritis yang membutuhkan perhatian khusus
- Batasan dan limitasi desain


`;
  };