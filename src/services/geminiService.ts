// ECOCYCLE Intelligence Service — Circular Knowledge & Decision Advisory Engine

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  isStreaming?: boolean;
}

const SYSTEM_INSTRUCTION = `
Anda adalah ECOCYCLE Intelligence, spesialis konsultan tata kelola material sirkular dan kalkulator reduksi karbon resmi platform ECOCYCLE.
Misi utama ECOCYCLE: "Turning Waste Into Worth" — Mengubah aliran material terbuang menjadi neraca sumber daya terverifikasi dan bernilai ekonomi nyata. Berbicaralah dengan nada profesional, ramah, berbasis data ilmiah presisi, dan solutif.

Pengetahuan Lengkap Domain Platform ECOCYCLE:
1. Kategori Sampah & Tarif Komoditas Terverifikasi (per kilogram):
   - Plastik PET (Botol bening bersih): Rp3.500/kg | Faktor reduksi: ~1.5 kg CO2e/kg | Konservasi air: 20 L/kg
   - Kardus & Kertas Arsip: Rp3.000/kg | Faktor reduksi: ~1.05 kg CO2e/kg | Konservasi air: 25 L/kg
   - Kaleng Logam & Aluminium: Rp3.000/kg | Faktor reduksi: ~3.2 kg CO2e/kg | Konservasi air: 18 L/kg
   - Botol Kaca Utuh: Rp2.000/kg | Faktor reduksi: ~0.5 kg CO2e/kg | Konservasi air: 10 L/kg
   - Minyak Jelantah Dapur: Rp8.000/kg | Faktor reduksi: ~2.6 kg CO2e/kg | Konservasi air: 35 L/kg
   - Limbah Elektronik (E-Waste): Rp10.000/kg | Faktor reduksi: ~4.5 kg CO2e/kg | Konservasi air: 50 L/kg

2. Metodologi Sains & Dampak Lingkungan:
   - Mengadopsi model ilmiah US EPA WARM (Waste Reduction Model) v15.
   - Rumus Reduksi Emisi: Total Berat (kg) x Koefisien Emisi Terhindar Spesifik Material = Total kg CO2e terhindar.
   - Ekuivalensi Serapan Pohon: 1 pohon dewasa menyerap sekitar 22 kg CO2e per tahun.
   - Standar Tata Kelola: Pedoman Nasional SNI 19-3983-1995 untuk operasional bank sampah terstandar.

3. Fitur Utama Platform:
   - Formulir Setor Sampah Mandiri (/setor-sampah): Pengguna mencatat estimasi bobot, memilih jenis material, memilih titik drop-point, dan mengunggah foto bukti untuk mendapatkan nomor manifest registrasi dan poin instan.
   - Bank Sampah Digital (/bank-sampah): Buku tabungan digital warga, riwayat setoran, saldo rupiah, dan EcoPoints.
   - Neraca Karbon & Sains Dampak (/dampak-ekologis): Kalkulator saintifik dampak gas rumah kaca.
   - Pusat Analitik (/analitik): Visualisasi grafik alur material dan ekspor data CSV/JSON.
   - Eco Academy (/akademi): Modul literasi ekonomi sirkular, mitos vs fakta seputar daur ulang.
   - Tantangan & Papan Peringkat (/tantangan): Gamifikasi ramah lingkungan dan penghargaan lencana kehormatan.
   - Pusat Panduan & Video (/panduan): Video tutorial operasional dan tur layar interaktif.
   - Tanya Jawab FAQ (/faq): Pusat bantuan resmi.

4. Jaringan Drop-Point / Hub Sirkular Resmi:
   - Bale RW 04 Menteng (Jakarta Pusat)
   - Gedung Serbaguna Kuningan (Kuningan, Jawa Barat)
   - Kampus Terpadu UNIKU (Kuningan, Jawa Barat)
   - Bank Sampah Mandiri Cigugur (Kuningan, Jawa Barat)
   - Sentra Sirkular Cilimus (Kuningan, Jawa Barat)

5. Panduan Menjawab:
   - Gunakan Bahasa Indonesia yang ramah, sopan, antusias, dan inspiratif.
   - Jawaban harus padat, informatif, dan terstruktur rapi (gunakan poin-poin jika menjelaskan langkah atau tarif).
   - Jangan memberikan informasi yang bertentangan dengan data resmi di atas.
   - Jika ditanya hal umum di luar website, arahkan kembali dengan hangat ke pelestarian lingkungan dan fitur ECOCYCLE.
`;

// Local intelligent response engine when API key is not yet supplied
const KNOWLEDGE_RESPONSES: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['tarif', 'harga', 'berapa rupiah', 'biaya', 'dapat berapa'],
    answer: `Berikut daftar tarif resmi perolehan komoditas di ECOCYCLE:
• Plastik PET: Rp 3.500/kg (+35 EcoPoints)
• Kardus & Kertas: Rp 3.000/kg (+30 EcoPoints)
• Kaleng Logam: Rp 3.000/kg (+30 EcoPoints)
• Botol Kaca: Rp 2.000/kg (+20 EcoPoints)
• Minyak Jelantah: Rp 8.000/kg (+80 EcoPoints)
• Limbah Elektronik: Rp 10.000/kg (+100 EcoPoints)

Anda dapat langsung mencatat setoran Anda di menu "Setor Sampah" untuk kalkulasi nilai rupiah dan EcoPoints otomatis!`,
  },
  {
    keywords: ['setor', 'cara setor', 'formulir', 'mencatat', 'setoran'],
    answer: `Cara mencatat setoran sampah mandiri sangat mudah:
1. Buka menu "Setor Sampah" di navigasi atas.
2. Pilih kategori material (misal Plastik PET atau Kardus).
3. Atur estimasi bobot timbangan (minimal 0.1 kg).
4. Pilih tanggal dan titik Drop-Point tujuan terdekat.
5. Unggah foto bukti material bersih (opsional namun direkomendasikan).
6. Tekan "Konfirmasi & Simpan Setoran".

Sistem akan langsung menerbitkan nomor manifest setoran dan menambahkan saldo estimasi ke buku tabungan digital Anda!`,
  },
  {
    keywords: ['co2', 'karbon', 'emisi', 'rumus', 'hitung', 'sains', 'warm', 'epa'],
    answer: `Perhitungan reduksi emisi karbon di ECOCYCLE mengadopsi model ilmiah US EPA WARM (Waste Reduction Model) v15:
• Plastik PET menghindari ~1.50 kg CO₂e per kg
• Kaleng Logam menghindari ~3.20 kg CO₂e per kg
• Kardus menghindari ~1.05 kg CO₂e per kg
• Minyak Jelantah menghindari ~2.60 kg CO₂e per kg

Angka ini merepresentasikan gas rumah kaca yang dicegah terlepas ke atmosfer jika material didaur ulang alih-alih ditimbun di TPA. Anda bisa menjelajahi kalkulator interaktif lengkapnya di menu "Sains & Dampak"!`,
  },
  {
    keywords: ['lokasi', 'drop point', 'hub', 'alamat', 'dimana', 'tempat'],
    answer: `Jaringan Drop-Point resmi ECOCYCLE saat ini mencakup:
• Bale RW 04 Menteng — Jl. Teuku Umar No. 12, Menteng, Jakarta Pusat
• Gedung Serbaguna Kuningan — Jl. Siliwangi No. 88, Kuningan, Jawa Barat
• Kampus Terpadu UNIKU — Kompleks Kampus 1 Cigugur, Kuningan
• Bank Sampah Mandiri Cigugur — Jl. Raya Cigugur No. 45, Kuningan
• Sentra Sirkular Cilimus — Jl. Raya Bojong No. 10, Cilimus, Kuningan

Semua hub dilengkapi timbangan terkalibrasi berstandar SNI 19-3983-1995.`,
  },
  {
    keywords: ['ecopoints', 'poin', 'tukar', 'saldo', 'hadiah', 'tarik'],
    answer: `EcoPoints adalah poin reputasi ekologis Anda di ECOCYCLE:
• Diperoleh setiap kali Anda menyetor sampah terpilah (10 Poin per Rp1.000 nilai sampah).
• Dapat dikonversi menjadi saldo rupiah di menu "Bank Sampah Digital".
• Dapat ditukarkan dengan insentif hijau seperti kupon sembako ramah lingkungan, bibit tanaman buah, dan diskon transportasi bersih.
• Poin juga menaikkan peringkat Anda di "Papan Peringkat Tantangan Komunitas"!`,
  },
  {
    keywords: ['sni', 'standar', 'keamanan', 'privasi', 'rls', 'database'],
    answer: `ECOCYCLE menerapkan standar operasional dan keamanan data tingkat tinggi:
• Tata Kelola Bank Sampah: Memenuhi standar SNI 19-3983-1995 (Tata Cara Pengelolaan Sampah Perkotaan).
• Keamanan Data: Arsitektur cloud Google Firebase & Supabase dengan Row Level Security (RLS) mutlak.
• Privasi: Data kontak privat dan riwayat penimbangan Anda terenkripsi dan hanya dapat diakses oleh akun Anda sendiri.`,
  },
  {
    keywords: ['halo', 'hai', 'siapa', 'kamu', 'perkenalan', 'bantuan'],
    answer: `Halo! Saya ECOCYCLE Intelligence, spesialis konsultan sirkular terpadu platform ECOCYCLE. 
Saya siap membantu Anda seputar:
• Informasi jenis & tarif 8 kategori material bernilai ekonomi
• Panduan pemilahan higienis standar industri
• Tata cara pencatatan setoran & konversi EcoPoints
• Sains reduksi emisi karbon (model EPA WARM v15)
• Lokasi Drop-Point hub terdekat

Apa yang ingin Anda konsultasikan hari ini?`,
  },
];

export class GeminiService {
  private static getApiKey(): string {
    if (typeof window !== 'undefined') {
      const customKey = localStorage.getItem('ecocycle_gemini_api_key');
      if (customKey && customKey.trim().length > 0) return customKey.trim();
    }
    return import.meta.env.VITE_GEMINI_API_KEY || '';
  }

  public static setCustomApiKey(key: string): void {
    if (typeof window !== 'undefined') {
      if (key && key.trim().length > 0) {
        localStorage.setItem('ecocycle_gemini_api_key', key.trim());
      } else {
        localStorage.removeItem('ecocycle_gemini_api_key');
      }
    }
  }

  public static hasApiKey(): boolean {
    return this.getApiKey().length > 0;
  }

  public static async generateResponse(
    prompt: string,
    history: { role: 'user' | 'model'; parts: { text: string }[] }[] = []
  ): Promise<string> {
    const apiKey = this.getApiKey();

    // 1. If Gemini API key is configured, call Google Gemini API
    if (apiKey) {
      try {
        // Use Gemini 2.5 Flash / 1.5 Flash endpoint
        const modelName = 'gemini-1.5-flash';
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

        const contents = [
          ...history,
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ];

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents,
            systemInstruction: {
              parts: [{ text: SYSTEM_INSTRUCTION }],
            },
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 600,
            },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generatedText && generatedText.trim().length > 0) {
            return generatedText.trim();
          }
        } else {
          console.warn('Gemini API call returned non-OK status:', response.status);
        }
      } catch (err) {
        console.warn('Gemini API request failed, falling back to local intelligence:', err);
      }
    }

    // 2. Intelligent local fallback engine grounded in ECOCYCLE data
    const normalizedPrompt = prompt.toLowerCase();

    for (const item of KNOWLEDGE_RESPONSES) {
      if (item.keywords.some((kw) => normalizedPrompt.includes(kw))) {
        return item.answer;
      }
    }

    // Default polite intelligent response
    return `Terima kasih atas pertanyaan Anda tentang "${prompt}". 
Di platform ECOCYCLE, Anda dapat memilah 6 jenis material bernilai tinggi (Plastik PET, Kardus, Kaleng, Botol Kaca, Minyak Jelantah, dan E-Waste), mencatat setoran mandiri dengan tarif transparan, mengumpulkan EcoPoints, serta memantau reduksi emisi karbon berbasis model ilmiah US EPA WARM v15.

Silakan pilih menu "Setor Sampah" untuk simulasi penyetoran atau "Tanya Jawab (FAQ)" untuk penjelasan lebih detail!`;
  }
}
