# ECOCYCLE — React Component & Page Implementation Plan

**Project:** ECOCYCLE — Turning Waste Into Worth  
**Role:** Senior Frontend Architect & UI/UX Engineer  
**Source Specification:** Stitch Reference (`editorial_ecological_tech/DESIGN.md` & HTML Mockups)  
**Target Architecture:** React 19 + TypeScript + Tailwind CSS (Vite SPA)  
**Document Status:** Approved Implementation Blueprint  

---

## 1. Architectural Strategy

To translate the Google Stitch design package into a production-grade, maintainable, and deterministic React application without losing any aesthetic fidelity, we employ an **Atomic Component & Token-Driven Architecture**:

```
src/
├── assets/                          # Localized images and SVG icons
├── components/
│   ├── layout/                      # Global persistent chrome
│   │   ├── Navbar.tsx               # Stitch Header (h-20, logo, nav, CTA button)
│   │   └── Footer.tsx               # Stitch Footer (primary dark, 4-col, legal)
│   ├── ui/                          # Design system primitives
│   │   ├── BentoCard.tsx            # Layer 1/2 white containers with hairline borders
│   │   ├── Button.tsx               # Primary, Secondary, Kinetic Lime, Ghost
│   │   ├── Badge.tsx                # Status pills with live dot, category tags
│   │   ├── FilterChip.tsx           # Category selector pills (9999px)
│   │   ├── MetricDisplay.tsx        # Tabular number metrics with label-caps
│   │   ├── ProgressBar.tsx          # Circular & segmented horizontal bars
│   │   ├── Modal.tsx                # Accessible backdrop overlay
│   │   └── StepperInput.tsx         # +/- numerical weight adjuster
│   └── features/                    # Domain-specific interactive widgets
│       ├── WasteDepositModal.tsx    # Formulir Setor Sampah (Stitch lines 428-540)
│       ├── MiniCalculator.tsx       # Interactive waste-to-value estimator
│       ├── SortingDirectory.tsx     # Filterable waste item catalog
│       ├── TransactionLedger.tsx    # Bank sampah data table with Edit/Delete
│       └── ImpactCalculator.tsx     # Annual carbon & resource scenario sliders
├── pages/                           # Screen-level route views
│   ├── HomePage.tsx                 # Screen 1: Beranda Utama
│   ├── WasteBankPage.tsx            # Screen 2: Bank Sampah Digital
│   ├── SortingPage.tsx              # Screen 3: Pemilahan Pintar
│   ├── ImpactPage.tsx               # Screen 4: Dampak Ekologis
│   ├── AcademyPage.tsx              # Screen 6: Akademi Sirkular
│   ├── ChallengesPage.tsx           # Screen 7: Tantangan Komunitas
│   └── ContactPage.tsx              # Screen 8: Tentang & Kontak
├── context/
│   └── WasteBankContext.tsx         # Centralized reactive state + LocalStorage
└── types/
    └── index.ts                     # Strict TypeScript interfaces
```

---

## 2. Page-by-Page Translation Blueprint

### Screen 1: Homepage (`HomePage.tsx`)
- **Stitch Reference:** `ecocycle_beranda_utama/code.html`
- **Component Decomposition:**
  - `HeroSection`: 7+5 column editorial grid. Left column features the headline `"Ubah Sampah Menjadi Nilai Nyata"`, primary CTA button in Fresh Lime (`#CBF075`), secondary ghost CTA, and trust markers (14.820+ Ton Material, 482 Hub, 99.4% Akurasi Audit). Right column holds the live material monitoring card with animated sparkline SVG.
  - `CircularCycleSection` (`#siklus-sirkular`): 4-phase interactive process diagram (Pilah di Sumber $\rightarrow$ Timbang & Valuasi $\rightarrow$ Logistik Drop-Point $\rightarrow$ Manufaktur Sirkular).
  - `PillarsBentoGrid`: Showcase of the 4 core platform capabilities with high-resolution imagery and metric callouts.
  - `TestimonialAndPledgeSection`: Community impact proof, Indonesian user avatars, and the interactive Eco-Pledge commitment counter.
  - `CtaBanner`: Full-width primary container with instant "Mulai Setor" launch button.

### Screen 2: Digital Waste Bank (`WasteBankPage.tsx`)
- **Stitch Reference:** `ecocycle_bank_sampah_digital/code.html`
- **Component Decomposition:**
  - `BalanceOverviewBar`: Total EcoPoints accumulated, estimated Rupiah balance, and verified kg collected.
  - `DepositShortcutTile`: Quick trigger opening `WasteDepositModal`.
  - `CategoryDistributionBento`: Segmented progress visualizer showing percentage split across Plastik, Kardus, Logam, Kaca, Minyak, and E-Waste.
  - `DropPointCard`: Simulated local collection hub (e.g., Bale RW 04 Menteng) with operating hours and accepted streams.
  - `TransactionLedgerTable`: Chronological data table displaying Date, Waste Stream, Weight (kg), EcoPoints, Value (IDR), and Status, with interactive Edit and Delete safeguards.
  - `SeedDataButton`: 1-click button to load realistic demonstration data for judges.

### Screen 3: Smart Waste Sorting (`SortingPage.tsx`)
- **Stitch Reference:** `ecocycle_pemilahan_pintar/code.html`
- **Component Decomposition:**
  - `SortingHero`: Headline, search input bar, and kitchen sorting visual.
  - `CategoryFilterPills`: 4-stream selectors (Semua, Organik, Anorganik, B3, E-Waste).
  - `WasteItemGrid`: Responsive cards showing item thumbnail, preparation instruction badges, and economic recyclability rating.
  - `ItemDetailDrawer`: Sliding inspection panel displaying detailed handling protocols (Kaidah Higienitas, Kompresi Volume, Manfaat Nyata Keluarga).
  - `SortingGuidelinesAccordion`: Visual Do's & Don'ts matrix preventing bin contamination.

### Screen 4: Ecological Impact (`ImpactPage.tsx`)
- **Stitch Reference:** `ecocycle_dampak_ekologis/code.html`
- **Component Decomposition:**
  - `ImpactSummaryHeader`: Macro metrics (Total Diverted, $CO_2e$ Avoided, Tree Equivalents, Water Conserved).
  - `LifecycleFlowDiagram`: Visual material loop showing energy conservation percentages.
  - `InteractiveCarbonEstimator`: Sliders adjusting household recycling habits and calculating annual greenhouse gas mitigation.
  - `AuditLogTable`: Formal material verification ledger aligned with ISO 14001:2015 audit standards.

### Screen 5 (Integrated): Waste Deposit Form (`WasteDepositModal.tsx`)
- **Stitch Reference:** `ecocycle_bank_sampah_digital/code.html` (lines 428–540)
- **Component Decomposition:**
  - Accessible modal dialog (`role="dialog"` with `aria-modal="true"`).
  - Category selection grid (6 visual pills with Material icons).
  - Stepper input with `-` and `+` buttons and direct numerical input.
  - Dynamic subtotal preview calculating Points, IDR, and avoided $CO_2$.
  - Date input and drop-off station selector.
  - Form validation: Prevents submission if weight $\le 0$ kg.
  - Dispatch event updating global `WasteBankContext` with persistent storage.

### Screen 6: Eco Academy (`AcademyPage.tsx`)
- **Design System Alignment:** Built using the exact `Editorial Ecological Tech` tokens (`#FAF7F0` canvas, `#002517` headers, `#006C48` active states).
- **Component Decomposition:**
  - Category tabs: Semua, Panduan Daur Ulang, Gaya Hidup Zero Waste, Pengomposan, Krisis Iklim.
  - Featured Article Bento: Deep-dive article with reading time, author tag, and full-screen reading modal.
  - Interactive Myth vs. Fact Cards: Flip/reveal cards dispelling recycling misconceptions.
  - Infographic Gallery: Visual circular economy blueprints.

### Screen 7: Eco Challenges (`ChallengesPage.tsx`)
- **Design System Alignment:** Built with Stitch bento cards, status badges, and kinetic lime accents.
- **Component Decomposition:**
  - User Eco-Rank indicator (*Pemula Hijau*, *Pejuang Daur Ulang*, *Pahlawan Sirkular*).
  - Active Challenge Cards: Checklist tasks with interactive check-boxes and progress bars.
  - Achievement Badge Grid: Unlockable badges with celebratory modal upon completion.

### Screen 8: About & Contact (`ContactPage.tsx` / `AboutContactPage.tsx`)
- **Design System Alignment:** Follows Stitch `tentang-dan-kontak` specification.
- **Component Decomposition:**
  - Institutional Manifesto & Circular Vision statement.
  - Direct inquiry form with live input validation and dispatch toast.
  - Drop-off location directory card for Kuningan and West Java hubs.
  - Collapsible FAQ Accordion.

---

## 3. Tailwind Configuration Alignment

The application will use the exact Tailwind configuration extracted from Stitch:

```typescript
// tailwind.config.ts
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: '#fafaf3',
        'surface-dim': '#dadad4',
        'surface-bright': '#fafaf3',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f4f4ed',
        'surface-container': '#eeeee7',
        'surface-container-high': '#e8e9e2',
        'surface-container-highest': '#e3e3dc',
        'surface-variant': '#e3e3dc',
        'on-surface': '#1a1c18',
        'on-surface-variant': '#414844',
        primary: '#002517',
        'primary-container': '#123b2a',
        'on-primary': '#ffffff',
        'on-primary-container': '#7ca68f',
        'primary-fixed': '#c0edd4',
        'primary-fixed-dim': '#a5d0b8',
        secondary: '#006c48',
        'secondary-container': '#94f6c4',
        'on-secondary-container': '#00734d',
        'secondary-fixed': '#94f6c4',
        'secondary-fixed-dim': '#78d9aa',
        tertiary: '#172200',
        'tertiary-container': '#293900',
        'tertiary-fixed': '#cbf075',
        'tertiary-fixed-dim': '#b0d35c',
        'on-tertiary-fixed': '#151f00',
        error: '#ba1a1a',
        'error-container': '#ffdad6',
        outline: '#717973',
        'outline-variant': '#c1c8c2',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        md: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
        full: '9999px',
      },
      spacing: {
        'space-xs': '0.25rem',
        'space-sm': '0.5rem',
        'space-md': '1rem',
        'space-lg': '1.5rem',
        'space-xl': '2.5rem',
        margin: '3rem',
        'margin-sm': '1.25rem',
        gutter: '1.5rem',
        'gutter-sm': '1rem',
      },
    },
  },
};
```

---

## 4. Asset Localization & Offline Strategy

To prevent broken images or font pop-in during local judge evaluation:
1. Download all 8 external Google CDN images into `/public/assets/images/` and reference them via relative paths.
2. Embed Google Fonts (`Plus Jakarta Sans`, `Manrope`, and `Material Symbols Outlined`) via standard preconnect headers in `index.html`.
3. Provide fallback SVG icons using `lucide-react` for instant offline icon rendering.
