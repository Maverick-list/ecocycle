// ECOCYCLE Agentic Engine — Autonomous Multi-Tool Circular & Carbon Advisory System
// Powered by Gemini 2.5 Flash architecture and deterministic SNI 19-3983-1995 & EPA WARM v15 logic

import { WasteStreamType } from '../types';
import { WASTE_CATEGORIES } from '../data/wasteData';
import { DROP_POINTS } from '../data/locationsData';
import { WasteBankService } from './wasteBankService';

export interface AgentToolTrace {
  tool: string;
  title: string;
  input: Record<string, any>;
  output: Record<string, any>;
  status: 'completed' | 'failed';
  executionTimeMs: number;
}

export interface AgentActionCard {
  type: 'deposit_draft' | 'carbon_certificate' | 'drop_point_card' | 'sorting_audit';
  title: string;
  data: Record<string, any>;
  actionButton?: {
    label: string;
    actionKey: 'confirm_deposit' | 'navigate_drop_point' | 'view_ledger';
  };
}

export interface AgentResult {
  text: string;
  agentCalls: AgentToolTrace[];
  actionCard?: AgentActionCard;
}

export class EcoAgentService {
  /**
   * Tool 1: Calculate Carbon Avoidance & Economic Valuation (US EPA WARM v15)
   */
  public static calculateCarbonAndValuation(material: WasteStreamType, weightKg: number) {
    const estimates = WasteBankService.calculateEstimates(material, weightKg);
    const treeEquiv = parseFloat((estimates.co2OffsetKg / 22).toFixed(2));

    return {
      material,
      weightKg,
      unitPriceIdr: estimates.unitPrice,
      totalValueIdr: estimates.valueIdr,
      pointsEarned: estimates.points,
      co2AvoidedKg: estimates.co2OffsetKg,
      waterSavedLiters: estimates.waterSavedLiters,
      treeEquivAnnual: treeEquiv,
      modelStandard: 'US EPA WARM v15 & SNI 19-3983-1995',
      summary: `${weightKg} kg ${material} menghasilkan Rp ${estimates.valueIdr.toLocaleString('id-ID')} (+${estimates.points} EcoPoints) dan mencegah pelepasan ~${estimates.co2OffsetKg} kg CO₂e (setara serapan ${treeEquiv} pohon dewasa/tahun).`
    };
  }

  /**
   * Tool 2: Material Classification & Decontamination Diagnosis
   */
  public static checkMaterialClassification(query: string) {
    const q = query.toLowerCase();

    let matchedCategory: WasteStreamType = 'Plastik PET';
    let resinCode = '#1 PET (Polyethylene Terephthalate)';
    let recyclability: 'Tinggi' | 'Sedang' | 'Khusus' = 'Tinggi';
    let streamType: 'Anorganik' | 'Organik' | 'B3' | 'E-Waste' = 'Anorganik';

    if (q.includes('kardus') || q.includes('karton') || q.includes('kertas') || q.includes('buku') || q.includes('arsip')) {
      matchedCategory = 'Kardus & Kertas';
      resinCode = '#20 PAP / #22 PAP (Fiberboard & Paper)';
      recyclability = 'Tinggi';
    } else if (q.includes('kaleng') || q.includes('logam') || q.includes('besi') || q.includes('aluminium') || q.includes('soda')) {
      matchedCategory = 'Kaleng Logam';
      resinCode = '#41 ALU / #40 FE (Aluminium & Steel)';
      recyclability = 'Tinggi';
    } else if (q.includes('kaca') || q.includes('beling') || q.includes('sirup') || q.includes('marjan')) {
      matchedCategory = 'Botol Kaca';
      resinCode = '#70 GL (Colorless / Green Glass)';
      recyclability = 'Tinggi';
    } else if (q.includes('jelantah') || q.includes('minyak') || q.includes('goreng')) {
      matchedCategory = 'Minyak Jelantah';
      resinCode = 'UCO (Used Cooking Oil for Hydrotreated Biodiesel)';
      recyclability = 'Sedang';
    } else if (q.includes('elektronik') || q.includes('kabel') || q.includes('charger') || q.includes('hp') || q.includes('laptop') || q.includes('baterai')) {
      matchedCategory = 'Limbah Elektronik';
      resinCode = 'WEEE Standard (Waste Electrical and Electronic Equipment)';
      recyclability = 'Khusus';
      streamType = 'E-Waste';
    } else if (q.includes('organik') || q.includes('sayur') || q.includes('kulit buah') || q.includes('daun')) {
      matchedCategory = 'Sampah Organik';
      resinCode = 'Kompos Aktif (Biokonversi BSF / Biopori)';
      streamType = 'Organik';
      recyclability = 'Tinggi';
    }

    const config = WASTE_CATEGORIES.find((c) => c.name === matchedCategory) || WASTE_CATEGORIES[0];

    return {
      query,
      matchedCategory,
      resinCode,
      streamType,
      recyclability,
      pricePerKg: config.pricePerKg,
      prepSteps: config.prepSteps,
      verdict: 'Diterima di seluruh Drop-Point resmi ECOCYCLE.',
    };
  }

  /**
   * Tool 3: Find Closest Drop-Point Hub
   */
  public static findNearestDropPoint(query: string) {
    const q = query.toLowerCase();
    let matches = DROP_POINTS.filter(
      (dp) =>
        dp.name.toLowerCase().includes(q) ||
        dp.city.toLowerCase().includes(q) ||
        dp.subdistrict.toLowerCase().includes(q) ||
        dp.address.toLowerCase().includes(q)
    );

    if (matches.length === 0) {
      matches = DROP_POINTS.slice(0, 2);
    }

    return {
      searchQuery: query,
      foundCount: matches.length,
      primaryHub: matches[0],
      allHubs: matches.map((m) => ({
        id: m.id,
        name: m.name,
        address: `${m.address}, ${m.city}`,
        hours: m.hours,
        status: m.status,
        contact: m.contact,
        acceptedTypes: m.acceptedTypes,
      })),
    };
  }

  /**
   * Tool 4: Generate Verified Deposit Draft
   */
  public static createDepositDraft(
    material: WasteStreamType,
    weightKg: number,
    dropPointName?: string,
    notes?: string
  ) {
    const hub = dropPointName || DROP_POINTS[0].name;
    const estimates = WasteBankService.calculateEstimates(material, weightKg);
    const draftCode = `DFT-${Math.floor(100000 + Math.random() * 900000)}`;
    const manifestCode = `ECO-SNI-${Math.floor(1000 + Math.random() * 9000)}`;

    return {
      draftId: draftCode,
      manifestCode,
      wasteType: material,
      weightKg,
      dropPoint: hub,
      estimatedValueIdr: estimates.valueIdr,
      estimatedPoints: estimates.points,
      co2OffsetKg: estimates.co2OffsetKg,
      waterSavedLiters: estimates.waterSavedLiters,
      notes: notes || 'Draf terbitan autonomous EcoAgent',
      createdAt: new Date().toISOString(),
      status: 'Siap Konfirmasi',
      actionPayload: {
        wasteType: material,
        weightKg,
        dropPoint: hub,
        notes: notes || 'Setoran otomatis via EcoAgent Desk',
      },
    };
  }

  /**
   * Tool 5: Audit Sorting Quality & Contamination Grade
   */
  public static auditSortingQuality(description: string) {
    const text = description.toLowerCase();
    let grade: 'Grade A (Prima)' | 'Grade B (Cukup)' | 'Grade C (Perlu Dekontaminasi Ulang)' = 'Grade A (Prima)';
    let purity = 98;
    let deduction = 0;
    const recommendations: string[] = [];

    if (text.includes('kotor') || text.includes('berminyak') || text.includes('sisa kuah') || text.includes('berisi air') || text.includes('basah')) {
      grade = 'Grade C (Perlu Dekontaminasi Ulang)';
      purity = 65;
      deduction = 25;
      recommendations.push('Kosongkan cairan sepenuhnya untuk mencegah pembusukan dan lalat.');
      recommendations.push('Bilas dengan air sabun ringan dan jemur hingga kering sebelum disetor.');
    } else if (text.includes('label') || text.includes('tutup') || text.includes('lakban') || text.includes('selotip')) {
      grade = 'Grade B (Cukup)';
      purity = 88;
      deduction = 5;
      recommendations.push('Lepaskan selotip/lakban plastik pada kardus untuk mempermudah proses pulping di pabrik daur ulang.');
      recommendations.push('Tutup botol HDPE dan botol PET sebaiknya dipisahkan karena memiliki titik leleh polimer berbeda.');
    } else {
      recommendations.push('Material memenuhi standar higienis SNI 19-3983-1995.');
      recommendations.push('Kualitas prima berhak atas 100% perolehan EcoPoints dan nilai rupiah penuh.');
    }

    return {
      description,
      grade,
      purityPercent: purity,
      valueDeductionPercent: deduction,
      recommendations,
    };
  }

  /**
   * Autonomous ReAct Agent Loop:
   * Inspects prompt intent, invokes appropriate tool(s), generates traces, and synthesizes output.
   */
  public static async executeAgenticWorkflow(prompt: string): Promise<AgentResult> {
    const q = prompt.toLowerCase();
    const traces: AgentToolTrace[] = [];
    let actionCard: AgentActionCard | undefined = undefined;

    // 1. Detect weight and material entity for calculation / deposit draft
    const weightMatch = prompt.match(/(\d+(?:[.,]\d+)?)\s*(?:kg|kilo|kilogram)/i);
    const weight = weightMatch ? parseFloat(weightMatch[1].replace(',', '.')) : null;

    // Detect material keywords
    let detectedMaterial: WasteStreamType | null = null;
    if (q.includes('plastik') || q.includes('pet') || q.includes('botol air') || q.includes('aqua') || q.includes('le minerale')) {
      detectedMaterial = 'Plastik PET';
    } else if (q.includes('kardus') || q.includes('kertas') || q.includes('karton') || q.includes('buku') || q.includes('dokumen')) {
      detectedMaterial = 'Kardus & Kertas';
    } else if (q.includes('kaleng') || q.includes('logam') || q.includes('aluminium') || q.includes('soda')) {
      detectedMaterial = 'Kaleng Logam';
    } else if (q.includes('kaca') || q.includes('beling') || q.includes('sirup')) {
      detectedMaterial = 'Botol Kaca';
    } else if (q.includes('jelantah') || q.includes('minyak goreng') || q.includes('minyak bekas')) {
      detectedMaterial = 'Minyak Jelantah';
    } else if (q.includes('elektronik') || q.includes('e-waste') || q.includes('charger') || q.includes('hp')) {
      detectedMaterial = 'Limbah Elektronik';
    } else if (q.includes('organik') || q.includes('sayur') || q.includes('buah')) {
      detectedMaterial = 'Sampah Organik';
    }

    // 2. Scenario A: User wants to create draft or simulate deposit with weight & material
    if ((weight && detectedMaterial) || q.includes('buatkan draf') || q.includes('setor sekarang') || (weight && q.includes('setor'))) {
      const mat = detectedMaterial || 'Plastik PET';
      const wt = weight || 3.5;

      // Tool Call 1: calculateCarbonAndValuation
      const t0 = performance.now();
      const calcResult = this.calculateCarbonAndValuation(mat, wt);
      traces.push({
        tool: 'calculateCarbonAndValuation',
        title: `Kalkulasi EPA WARM & Valuasi SNI (${wt} kg ${mat})`,
        input: { material: mat, weightKg: wt },
        output: calcResult,
        status: 'completed',
        executionTimeMs: Math.round(performance.now() - t0),
      });

      // Tool Call 2: findNearestDropPoint
      const t1 = performance.now();
      const locationResult = this.findNearestDropPoint(prompt);
      traces.push({
        tool: 'findNearestDropPoint',
        title: `Pencarian Drop-Point Terdekat`,
        input: { query: prompt },
        output: { primaryHub: locationResult.primaryHub.name, address: locationResult.primaryHub.address },
        status: 'completed',
        executionTimeMs: Math.round(performance.now() - t1),
      });

      // Tool Call 3: createDepositDraft
      const t2 = performance.now();
      const draftResult = this.createDepositDraft(mat, wt, locationResult.primaryHub.name);
      traces.push({
        tool: 'createDepositDraft',
        title: `Penerbitan Draf Manifest Registrasi Setoran`,
        input: { material: mat, weightKg: wt, dropPoint: locationResult.primaryHub.name },
        output: { draftId: draftResult.draftId, manifestCode: draftResult.manifestCode },
        status: 'completed',
        executionTimeMs: Math.round(performance.now() - t2),
      });

      // Create Action Card
      actionCard = {
        type: 'deposit_draft',
        title: `Draf Manifest Setoran: ${draftResult.manifestCode}`,
        data: draftResult,
        actionButton: {
          label: '✨ Simpan & Konfirmasi ke Bank Sampah Saya',
          actionKey: 'confirm_deposit',
        },
      };

      const responseText = `Saya telah memproses permintaan Anda secara otonom melalui 3 tahapan analisis sirkular:

1. **Hasil Valuasi & Dampak Ekologis:**
   • Komoditas: **${mat}**
   • Bobot Timbangan: **${wt} kg**
   • Estimasi Perolehan Nilai: **Rp ${calcResult.totalValueIdr.toLocaleString('id-ID')}**
   • Estimasi Reward: **+${calcResult.pointsEarned} EcoPoints**
   • Emisi Karbon Terhindar (US EPA WARM v15): **~${calcResult.co2AvoidedKg} kg CO₂e** (setara serapan ${calcResult.treeEquivAnnual} pohon dewasa/tahun)
   • Konservasi Air Bersih: **~${calcResult.waterSavedLiters} Liter**

2. **Rekomendasi Hub Drop-Point:**
   • Lokasi: **${locationResult.primaryHub.name}**
   • Alamat: ${locationResult.primaryHub.address}
   • Jam Operasional: ${locationResult.primaryHub.hours}

3. **Status Manifest:**
   Draf resmi telah diterbitkan dengan kode **${draftResult.manifestCode}**. Anda dapat langsung mengonfirmasi draf ini untuk dicatat ke buku tabungan bank sampah digital Anda melalui tombol di bawah.`;

      return {
        text: responseText,
        agentCalls: traces,
        actionCard,
      };
    }

    // 3. Scenario B: Material diagnosis / recyclability query
    if (q.includes('bisa didaur ulang') || q.includes('jenis apa') || q.includes('cara pilah') || q.includes('kode plastik') || q.includes('bersihkan')) {
      const t0 = performance.now();
      const classResult = this.checkMaterialClassification(prompt);
      traces.push({
        tool: 'checkMaterialClassification',
        title: `Audit Klasifikasi & Residu SNI 19-3983-1995`,
        input: { query: prompt },
        output: classResult,
        status: 'completed',
        executionTimeMs: Math.round(performance.now() - t0),
      });

      const responseText = `Berdasarkan audit standar tata kelola material SNI 19-3983-1995:

• **Kategori Resmi:** ${classResult.matchedCategory}
• **Identifikasi Polimer / Resin Code:** ${classResult.resinCode}
• **Tingkat Daur Ulang:** ${classResult.recyclability} (${classResult.streamType})
• **Tarif Estimasi Saat Ini:** Rp ${classResult.pricePerKg.toLocaleString('id-ID')}/kg
• **Langkah Dekontaminasi Wajib:**
${classResult.prepSteps.map((step, idx) => `   ${idx + 1}. ${step}`).join('\n')}

${classResult.verdict} Pastikan material dalam kondisi bersih dan kering sebelum diserahkan ke drop-point terdekat.`;

      return {
        text: responseText,
        agentCalls: traces,
      };
    }

    // 4. Scenario C: Location query
    if (q.includes('lokasi') || q.includes('drop point') || q.includes('alamat') || q.includes('dimana') || q.includes('cabang')) {
      const t0 = performance.now();
      const locResult = this.findNearestDropPoint(prompt);
      traces.push({
        tool: 'findNearestDropPoint',
        title: `Pencarian Lokasi Hub Drop-Point Terkalibrasi`,
        input: { query: prompt },
        output: { primary: locResult.primaryHub.name, total: locResult.foundCount },
        status: 'completed',
        executionTimeMs: Math.round(performance.now() - t0),
      });

      actionCard = {
        type: 'drop_point_card',
        title: locResult.primaryHub.name,
        data: locResult.primaryHub,
        actionButton: {
          label: 'Buka Navigasi Drop-Point',
          actionKey: 'navigate_drop_point',
        },
      };

      const responseText = `Berikut hub Drop-Point resmi ECOCYCLE terdekat yang terverifikasi standar SNI:

📍 **${locResult.primaryHub.name}**
• Alamat: ${locResult.primaryHub.address}, ${locResult.primaryHub.city}
• Jam Layanan: ${locResult.primaryHub.hours}
• Status: **${locResult.primaryHub.status}**
• Kontak WhatsApp: ${locResult.primaryHub.contact}
• Material Diterima: ${locResult.primaryHub.acceptedTypes.join(', ')}

Seluruh timbangan di lokasi telah dikalibrasi secara berkala untuk menjamin transparansi pencatatan berat sampah Anda.`;

      return {
        text: responseText,
        agentCalls: traces,
        actionCard,
      };
    }

    // 5. Default Intelligent Synthesis
    const t0 = performance.now();
    const defaultCalc = this.calculateCarbonAndValuation('Plastik PET', 1);
    traces.push({
      tool: 'calculateCarbonAndValuation',
      title: 'Inisialisasi Model Baseline EPA WARM v15',
      input: { material: 'Plastik PET', weightKg: 1 },
      output: { baselineCO2ePerKg: defaultCalc.co2AvoidedKg, baselineRate: defaultCalc.unitPriceIdr },
      status: 'completed',
      executionTimeMs: Math.round(performance.now() - t0),
    });

    return {
      text: `Halo! Saya EcoAgent Desk, asisten otonom sirkular Anda.

Sistem Agentic kami siap menjalankan tindakan nyata untuk Anda:
1. **Kalkulasi Emisi Karbon & Nilai Rupiah:** Cukup sebutkan bobot & material (contoh: *"Hitung nilai 4 kg kardus dan 5 kg botol plastik"*).
2. **Penerbitan Draf Manifest Setoran:** Katakan *"Buatkan draf setoran 3 kg plastik di Menteng"*, dan draf akan siap dikonfirmasi dalam 1 klik.
3. **Audit Kualitas Pemilahan:** Tanyakan *"Apakah botol berminyak bisa disetor?"* untuk audit dekontaminasi SNI 19-3983-1995.
4. **Pencarian Hub Terdekat:** Tanyakan lokasi drop-point di kota atau kecamatan Anda.

Silakan berikan instruksi atau pertanyaan Anda!`,
      agentCalls: traces,
    };
  }
}
