
import { GoogleGenAI } from "@google/genai";
import { MOCK_IPM_DATA, MOCK_ECONOMIC_DATA, TOPICS } from "../constants";

export const askGemini = async (prompt: string, history: {role: string, content: string}[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const modelName = 'gemini-3-flash-preview';
    
    // Siapkan ringkasan data aktual untuk konteks AI
    const latestIpm = MOCK_IPM_DATA[MOCK_IPM_DATA.length - 1];
    const latestEco = MOCK_ECONOMIC_DATA[0];
    const availableTopics = TOPICS.map(t => t.name).join(", ");

    const systemInstruction = `
      Anda adalah "Haltim Data Analyst", asisten AI resmi untuk portal "Satu Data Halmahera Timur".
      Tugas utama Anda adalah membantu masyarakat dan instansi dalam memahami data pembangunan Kabupaten Halmahera Timur.

      REFERENSI DATA TERKINI:
      - Tahun Data Utama: ${latestIpm.year}
      - Indeks Pembangunan Manusia (IPM): ${latestIpm.ipm} Poin (UHH: ${latestIpm.uhh}, HLS: ${latestIpm.hls}, RLS: ${latestIpm.rls})
      - Angka Kemiskinan: ${latestIpm.kemiskinan}%
      - Pertumbuhan Ekonomi (${latestEco.year}): ${latestEco.growth}%
      - Tingkat Pengangguran Terbuka: ${latestEco.unemployment}%
      - Kategori Data Sektoral yang Tersedia: ${availableTopics}

      PANDUAN INTERAKSI:
      1. Akurasi Faktual: Gunakan angka di atas sebagai referensi utama. Jangan mengarang statistik pembangunan daerah.
      2. Interpretasi Data: Jika pengguna bertanya tentang "makna" IPM, jelaskan secara singkat dampaknya terhadap kualitas hidup masyarakat Haltim.
      3. Navigasi Katalog: Jika pengguna menanyakan data sangat mikro (misal: "jumlah perawat di puskesmas wasile"), arahkan mereka untuk mengunjungi halaman "Katalog Dataset" atau menggunakan fitur filter kategori "Kesehatan".
      4. Bahasa: Gunakan Bahasa Indonesia yang sopan, profesional, namun mudah dipahami oleh masyarakat umum.
      5. Ajakan Bertindak: Selalu akhiri dengan menawarkan bantuan lain atau menyarankan pengguna untuk mengunduh laporan PDF di halaman terkait.
    `.trim();

    const response = await ai.models.generateContent({
      model: modelName,
      contents: [
        ...history.map(h => ({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content }]
        })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.3, // Menurunkan temperature untuk jawaban yang lebih stabil dan faktual
        topP: 0.9,
        topK: 40,
      }
    });

    return response.text || "Mohon maaf, terjadi kendala teknis dalam memproses pertanyaan Anda. Silakan hubungi admin portal jika masalah berlanjut.";
  } catch (error) {
    console.error("Gemini AI Integration Error:", error);
    return "Maaf, saat ini asisten AI sedang sibuk. Silakan coba kembali beberapa saat lagi atau akses data melalui katalog manual kami.";
  }
};
