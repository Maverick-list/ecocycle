# ECOCYCLE — Information Architecture & Sitemap Document

**Project:** ECOCYCLE — Turning Waste Into Worth  
**Role:** Senior UX Architect  
**Structure Model:** Multi-Section Accessible Web Architecture  
**Document Status:** Approved Information Architecture  

---

## 1. Information Architecture Overview

ECOCYCLE's information architecture is structured to provide an intuitive mental model for both first-time exploratory visitors and recurring users performing specific tasks (e.g. searching a waste item or logging a deposit).

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 ECOCYCLE TOP-LEVEL IA                                  │
├─────────┬─────────┬──────────────┬──────────────┬────────────┬───────────┬─────────────┤
│ 1. HOME │ 2.ABOUT │ 3. SMART     │ 4. DIGITAL   │ 5. ECO     │ 6. ECO    │ 7. ECO      │ 8. CONTACT │
│         │         │    SORTING   │    WASTE BANK│    IMPACT  │   ACADEMY │ CHALLENGES  │            │
└─────────┴─────────┴──────────────┴──────────────┴────────────┴───────────┴─────────────┴────────────┘
```

---

## 2. Detailed Page-by-Page Hierarchy & Component Breakdown

### 1. HOME (`/` or Home Tab)
*Purpose: Introduce the platform, communicate the core value proposition, articulate the environmental urgency, preview key solutions, and direct visitors into active workflows.*

- **1.1. Navigation Bar (Global Sticky)**
  - Brand Logo & Slogan ("ECOCYCLE — Turning Waste Into Worth")
  - Navigation Links: Beranda, Tentang Kami, Smart Sorting, Bank Sampah, Dampak, Akademi, Tantangan, Kontak
  - Quick Action CTA: "Mulai Pilah & Setor" (Direct shortcut to Bank Sampah / Smart Sorting)
  - Active Section Indicator & Mobile Drawer Toggle
- **1.2. Hero Section**
  - Bold Value Proposition Headline: *"Ubah Sampah Jadi Berkah, Bangun Masa Depan Lebih Hijau"*
  - Subheading articulating the EcoDigital vision
  - Dual Call-to-Action:
    - Primary CTA: "Mulai Setor Sampah" (Scrolls/routes to Digital Waste Bank)
    - Secondary CTA: "Panduan Pemilahan" (Routes to Smart Sorting)
  - Real-Time Live Commodity & Value Ticker (PET, Kardus, Logam, Minyak Jelantah prices)
  - Hero Floating Metric Cards (Simulated: Total Sampah Terkelola, Pengurangan $CO_2$, Warga Terlibat)
- **1.3. Platform Introduction & Core Mission**
  - Brief introductory narrative bridging digital technology with grassroots environmental stewardship
- **1.4. The Critical Environmental Crisis (Main Problems)**
  - 3 Visual Crisis Cards:
    - *Krisis TPA Overload*: 69% sampah berakhir di TPA tanpa pemilahan.
    - *Emisi Gas Metana*: Timbunan sampah organik menghasilkan gas rumah kaca berbahaya.
    - *Pencemaran Plastik & Mikroplastik*: Ratusan tahun terurai, merusak ekosistem tanah dan air.
- **1.5. The ECOCYCLE Digital Solutions**
  - 4 Pillars Solution Matrix matching the competition criteria:
    - Smart Waste Sorting
    - Digital Waste Bank
    - Environmental Education
    - Community Eco-Challenges
- **1.6. Interactive Feature Previews**
  - Interactive Mini-Calculator widget previewing instant waste valuation
  - Trending Article preview card from Eco Academy
  - Featured Active Challenge highlight
- **1.7. Community Impact Preview & Live Counter**
  - Visual metrics displaying collective community waste diversion stats
  - Interactive Eco-Pledge button with instant celebration toast
- **1.8. Final Call to Action (CTA Banner)**
  - Compelling banner encouraging users to start their first sorting habit today

---

### 2. ABOUT (`/about`)
*Purpose: Provide institutional credibility, articulate vision, mission, circular economy principles, and explain the mechanism behind the platform.*

- **2.1. Page Header & Introduction**
  - Background context on Universitas Kuningan & regional environmental aspirations
- **2.2. Vision and Mission**
  - *Vision:* Menjadi pionir platform ekodigital terdepan di Indonesia yang mentransformasi pengelolaan sampah rumah tangga dan kampus menjadi nilai ekologis dan ekonomi yang terukur.
  - *Mission Statements (3 Strategic Tenets):*
    - Edukasi inklusif dan mudah dipahami untuk seluruh lapisan masyarakat.
    - Digitalisasi pencatatan bank sampah demi transparansi dan akuntabilitas.
    - Pemberdayaan komunitas melalui aksi kolektif dan gamifikasi berkelanjutan.
- **2.3. Environmental Objectives**
  - Measurable targets: Zero unsegregated waste to landfill, local community circularity, carbon footprint mitigation.
- **2.4. How ECOCYCLE Works (The Circular Cycle)**
  - 4-Step Visual Process Pipeline:
    1. *Pilah di Sumber (Sort at Source)*
    2. *Timbang & Catat (Weigh & Record via Digital Bank)*
    3. *Kumpulkan & Setor (Deposit to Local Station)*
    4. *Daur Ulang & Petik Manfaat (Recycle, Earn Points & Offset Carbon)*
- **2.5. Principles & Academic Integrity**
  - Transparency note regarding competition demonstration data.

---

### 3. SMART SORTING (`/sorting`)
*Purpose: Provide an actionable, frictionless guide to classifying, preparing, and managing all common waste items.*

- **3.1. Category Tabs & Visual Classification**
  - 4 Main Stream Badges:
    - 🟢 **Organik** (Sisa Makanan, Dedaunan, Kulit Buah, Ampas Kopi)
    - 🔵 **Anorganik / Daur Ulang** (Plastik PET/HDPE, Kertas, Kardus, Kaleng Aluminium, Botol Kaca)
    - 🔴 **B3 (Bahan Berbahaya & Beracun)** (Baterai, Lampu Neon, Botol Aerosol, Obat Kadaluarsa)
    - 🟣 **E-Waste (Sampah Elektronik)** (Kabel, Ponsel Rusak, Charger, PCB Komponen)
- **3.2. Real-Time Searchable Waste Guide**
  - Instant type-ahead input: "Cari jenis sampah (contoh: botol shampoo, sisa sayur, baterai...)"
  - Filter chips by category and recyclability status
- **3.3. Interactive Waste Item Cards**
  - Item name, photo/icon, category tag
  - Preparation Steps (e.g. *"Kosongkan cairan -> Cuci bersih -> Remas/Pipihkan -> Masukkan tong biru"*).
  - Recyclability indicator (Tinggi, Sedang, Khusus, Tidak Dapat Didaur Ulang)
- **3.4. Sorting Instructions & Common Mistakes (Do's and Don'ts)**
  - Clear visual grid showing dos (e.g., rinse containers) and don'ts (e.g., mixing greasy food boxes into paper bins).
- **3.5. Recycling Recommendations & Disposal Protocols**
  - Specialized instructions for handling hazardous B3 and medical/chemical household waste.

---

### 4. DIGITAL WASTE BANK (`/waste-bank`)
*Purpose: Provide a complete transaction recording system, deposit calculator, ledger history, and data management tool for citizens and waste bank units.*

- **4.1. Waste Bank Balance & Summary Header**
  - Current Simulated EcoPoints Balance
  - Estimated Rupiah (IDR) Value
  - Total Weight Deposited (kg)
  - Quick "Cairkan / Tukar Poin" (Simulated Reward Redemption drawer)
- **4.2. Interactive Waste Deposit Form**
  - Category Dropdown / Visual Grid Selector (PET, HDPE, Kardus, Kaleng, Kaca, Minyak Jelantah, E-Waste)
  - Weight Input in kilograms (supports decimals, e.g., 2.5 kg)
  - Real-time Subtotal calculation:
    $$\text{EcoPoints} = \text{Weight} \times \text{Rate}$$
    $$\text{IDR Value} = \text{Weight} \times \text{Price}$$
    $$\text{CO}_2\text{ Reduction} = \text{Weight} \times \text{Emission Factor}$$
  - Notes field (optional, e.g. "Botol bersih dari acara kampus")
  - Submit Button: "Simpan & Setorkan Sampah" with instant local state update
- **4.3. Total Collected Waste Statistics Bar**
  - Total Kg Collected
  - Total Transactions Logged
  - Net Value Generated
- **4.4. Transaction History Table / Ledger**
  - Data columns: Tanggal & Waktu, Kategori Sampah, Berat (kg), Nilai (IDR), Poin, $CO_2$ Terhindar, Aksi
  - In-row Edit Action: Modal to adjust weight or category
  - In-row Delete Action: Destructive confirmation prompt to remove record safely
  - Filter and sort options (Terbaru, Terlama, Berat Terbesar)
- **4.5. Empty State & Preset Seed Data**
  - Helpful illustration and guidance if no transactions have been logged, with a 1-click "Muat Data Simulasi" button for judges to test immediately.

---

### 5. ECO IMPACT (`/impact`)
*Purpose: Transform logged activity into rigorous, educational, and inspiring visual impact data.*

- **5.1. Aggregate Ecological Metrics**
  - Total Kilograms Diverted from Landfills
  - Equivalent Greenhouse Gas ($CO_2e$) Prevented (kg)
  - Clean Water Conserved (Liters)
  - Tree Planting Equivalents (calculated using scientific conversion rates)
- **5.2. Waste Category Distribution Visualizer**
  - Accessible breakdown chart / segmented progress visualizer displaying proportions (Plastik vs. Kertas vs. Logam vs. Minyak)
- **5.3. Environmental Activity Statistics**
  - Monthly activity trend bars
  - Community participation volume
- **5.4. Educational Impact Calculator**
  - Interactive simulator where users can adjust sliders (e.g. "Jika saya memilah 5 botol plastik per hari...") to see annual environmental savings ($CO_2$, water, and energy).
- **5.5. Transparency & Methodology Notice**
  - Full explanation of mathematical models and environmental formulas used.

---

### 6. ECO ACADEMY (`/academy`)
*Purpose: Serve as the environmental knowledge hub, fulfilling the Content/Article/Gallery competition requirement.*

- **6.1. Knowledge Hub Header & Search**
  - Search bar and category pills: Semua, Daur Ulang, Gaya Hidup Zero Waste, Pengomposan, Krisis Iklim
- **6.2. Featured In-Depth Educational Articles**
  - Articles with high-contrast cover imagery, estimated reading time, author badge, and interactive read modal:
    - *Article 1:* "Anatomi Sebotol Plastik: Berapa Lama Sebenarnya Terurai di Alam?"
    - *Article 2:* "Panduan Praktis Kompos Rumahan: Dari Sisa Dapur Jadi Emas Hitam"
    - *Article 3:* "Bahaya Tersembunyi Sampah Elektronik (E-Waste) dan Cara Penanganannya"
    - *Article 4:* "5 Langkah Menuju Dapur Zero-Waste Tanpa Ribet"
- **6.3. Interactive Myth vs. Fact Environmental Cards**
  - Interactive flip or reveal cards dispelling common misconceptions (e.g., *"Mitos: Semua plastik berlogo segitiga bisa didaur ulang"* vs. *"Fakta: Angka di dalam segitiga menentukan jenis resin dan hanya tipe 1, 2, dan 5 yang bernilai ekonomis tinggi"*).
- **6.4. Infographic Gallery & Visual Learning**
  - Zoomable high-clarity visual infographics explaining the Circular Economy loop and waste flow in West Java / Kuningan watershed areas.

---

### 7. ECO CHALLENGES (`/challenges`)
*Purpose: Drive recurring engagement, behavioral habituation, and gamified community action.*

- **7.1. Challenge Overview & User Level**
  - Gamification status: Current Eco-Rank (e.g., *Pemula Hijau*, *Pejuang Daur Ulang*, *Pahlawan Sirkular*)
  - Completed challenges count
- **7.2. Active Community Challenges**
  - Challenge Cards featuring:
    - Challenge Title & Description
    - Difficulty & Duration (e.g., 7 Hari, 14 Hari, 30 Hari)
    - Action Checklist / Progress Bar
    - Interactive "Ikuti Tantangan" / "Tandai Selesai" button
  - Examples:
    - *Tantangan 1:* "7 Hari Bebas Kantong Plastik Sekali Pakai"
    - *Tantangan 2:* "Pilah 5kg Sampah Kering untuk Bank Sampah"
    - *Tantangan 3:* "Mulai Wadah Kompos Organik Pertama"
    - *Tantangan 4:* "Tukar 3 Liter Minyak Jelantah"
- **7.3. Achievement & Digital Badges Showcase**
  - Unlockable badges earned upon challenge completion with celebration animation.

---

### 8. CONTACT (`/contact`)
*Purpose: Satisfy the mandatory Contact page requirement with interactive communication and location support.*

- **8.1. Header & Direct Channels**
  - Secretariat address (Fakultas Ilmu Komputer, Universitas Kuningan, Jawa Barat)
  - Email: `kontak@ecocycle.id` (Demonstration contact)
  - Operating hours & community support hotline
- **8.2. Interactive Contact & Inquiry Form**
  - Field inputs: Nama Lengkap, Alamat Email, Kategori Pesan (Pertanyaan, Usulan Bank Sampah Baru, Kemitraan Kampus, Laporan Teknis), Isi Pesan
  - Real-time client-side validation with instant inline error states
  - Interactive Submit with loading state and successful dispatch toast
- **8.3. Simulated Drop-Off Stations Directory**
  - Interactive directory listing simulated neighborhood and campus waste bank units in Kuningan with accepted waste types and operating schedules.
- **8.4. Interactive FAQ Accordion**
  - 5 key questions addressing deposit procedures, point redemption, and partnership inquiries.
- **8.5. Social Media & Community Links**
  - GitHub Repository, Instagram, YouTube, and LinkedIn channels.

---

## 3. Global Footer Architecture

- **Col 1 — Brand & Purpose:** Logo, tagline, and mission statement.
- **Col 2 — Quick Navigation:** Direct links to the 8 core sections.
- **Col 3 — Resources & Guides:** Panduan Pemilahan, Kalkulator Karbon, Unduh Infografis, Regulasi Persampahan.
- **Col 4 — Competition Attribution:** Created for Web Design Competition Techno Versary Vol. II 2026, HIMA TI FKOM Universitas Kuningan.
- **Copyright & Transparency Watermark:** *"© 2026 ECOCYCLE. Built for Academic & Competition Demonstration."*
