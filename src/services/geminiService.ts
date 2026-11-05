// ECOCYCLE Intelligence Service — Circular Knowledge & Decision Advisory Engine
// Powered by Gemini 2.5 Flash (Maven JARVIS standard) and Autonomous EcoAgent Architecture

import { EcoAgentService, AgentToolTrace, AgentActionCard } from './ecoAgentService';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  isStreaming?: boolean;
  agentCalls?: AgentToolTrace[];
  actionCard?: AgentActionCard;
}

const PRIMARY_MODEL = 'gemini-2.5-flash';
const FALLBACK_MODELS = ['gemini-2.0-flash', 'gemini-1.5-flash'];

const SYSTEM_INSTRUCTION = `
Anda adalah ECOCYCLE Intelligence, spesialis konsultan tata kelola material sirkular dan kalkulator reduksi karbon resmi platform ECOCYCLE berbasis arsitektur model Gemini 2.5 Flash.
Misi utama ECOCYCLE: "Turning Waste Into Worth" — Mengubah aliran material terbuang menjadi neraca sumber daya terverifikasi dan bernilai ekonomi nyata. Berbicaralah dengan nada profesional, ramah, berbasis data ilmiah presisi, dan solutif.

Pengetahuan Lengkap Domain Platform ECOCYCLE:
1. Kategori Sampah & Tarif Komoditas Terverifikasi (per kilogram):
   - Plastik PET (Botol bening bersih): Rp3.500/kg | Faktor reduksi: ~1.5 kg CO2e/kg | Konservasi air: 24 L/kg
   - Kardus & Kertas Arsip: Rp3.000/kg | Faktor reduksi: ~1.1 kg CO2e/kg | Konservasi air: 28 L/kg
   - Kaleng Logam & Aluminium: Rp3.000/kg | Faktor reduksi: ~3.2 kg CO2e/kg | Konservasi air: 40 L/kg
   - Botol Kaca Utuh: Rp2.000/kg | Faktor reduksi: ~0.5 kg CO2e/kg | Konservasi air: 12 L/kg
   - Minyak Jelantah Dapur: Rp8.000/kg | Faktor reduksi: ~2.6 kg CO2e/kg | Konservasi air: 35 L/kg
   - Limbah Elektronik (E-Waste): Rp10.000/kg | Faktor reduksi: ~4.5 kg CO2e/kg | Konservasi air: 50 L/kg
   - Sampah Organik (Kompos/Biopori): Rp1.500/kg | Faktor reduksi: ~0.8 kg CO2e/kg | Konservasi air: 5 L/kg

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
   - Autentikasi Multi-Metode (/masuk, /daftar): Google OAuth, Facebook Login, Email/Password, dan SMS OTP Telepon.

4. Jaringan Drop-Point / Hub Sirkular Resmi:
   - Bale RW 04 Menteng (Jakarta Pusat)
   - Bank Sampah Induk Tebet Barat (Jakarta Selatan)
   - Gedung Serbaguna Kuningan (Kuningan, Jawa Barat)
   - Kampus Terpadu UNIKU (Kuningan, Jawa Barat)
   - Pusat Daur Ulang Mandiri Kuningan (Kuningan, Jawa Barat)

5. Panduan Menjawab:
   - Gunakan Bahasa Indonesia yang ramah, sopan, bernas, dan saintifik.
   - Selalu sebutkan bahwa perhitungan karbon mengacu pada US EPA WARM v15 dan SNI 19-3983-1995 jika menghitung emisi.
`;

export class GeminiService {
  public static readonly ACTIVE_MODEL = PRIMARY_MODEL;

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

  /**
   * Primary Agentic Generation method returning synthesized text,
   * autonomous tool execution traces, and interactive action cards.
   */
  public static async generateAgenticResponse(
    prompt: string,
    history: { role: 'user' | 'model'; parts: { text: string }[] }[] = []
  ): Promise<{ text: string; agentCalls: AgentToolTrace[]; actionCard?: AgentActionCard }> {
    // 1. Run Autonomous EcoAgent workflow to check intent & invoke real platform tools
    const agentResult = await EcoAgentService.executeAgenticWorkflow(prompt);

    const apiKey = this.getApiKey();

    // 2. First attempt: call secure Serverless Proxy (/api/chat) on Vercel to protect API keys
    try {
      const toolContextSummary = agentResult.agentCalls.length > 0
        ? `\n\n[Hasil Eksekusi Tool EcoAgent]:\n${JSON.stringify(agentResult.agentCalls.map(c => ({ tool: c.tool, out: c.output })))}`
        : '';

      const proxyRes = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `${prompt}${toolContextSummary}`,
          history,
          customApiKey: apiKey,
        }),
      });

      if (proxyRes.ok) {
        const proxyData = await proxyRes.json();
        if (proxyData?.text && proxyData.text.trim().length > 0) {
          return {
            text: proxyData.text.trim(),
            agentCalls: agentResult.agentCalls,
            actionCard: agentResult.actionCard,
          };
        }
      }
    } catch {
      // Non-blocking: will fallback to direct client call if key exists, or deterministic EcoAgent
    }

    // 3. Fallback: If client key is explicitly configured and server proxy was unreachable
    if (apiKey) {
      const modelsToTry = [PRIMARY_MODEL, ...FALLBACK_MODELS];
      for (const model of modelsToTry) {
        try {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

          const toolContextSummary = agentResult.agentCalls.length > 0
            ? `\n\n[Hasil Eksekusi Tool EcoAgent]:\n${JSON.stringify(agentResult.agentCalls.map(c => ({ tool: c.tool, out: c.output })))}`
            : '';

          const contents = [
            ...history,
            {
              role: 'user',
              parts: [{ text: `${prompt}${toolContextSummary}` }],
            },
          ];

          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents,
              systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 750,
              },
            }),
          });

          if (response.ok) {
            const data = await response.json();
            const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (generatedText && generatedText.trim().length > 0) {
              return {
                text: generatedText.trim(),
                agentCalls: agentResult.agentCalls,
                actionCard: agentResult.actionCard,
              };
            }
          }
        } catch (err) {
          console.warn(`[GeminiService] Model ${model} request failed, attempting fallback:`, err);
        }
      }
    }

    // 3. Deterministic verified response from EcoAgent
    return agentResult;
  }

  /**
   * Backward-compatible simple text response generator
   */
  public static async generateResponse(
    prompt: string,
    history: { role: 'user' | 'model'; parts: { text: string }[] }[] = []
  ): Promise<string> {
    const res = await this.generateAgenticResponse(prompt, history);
    return res.text;
  }
}
