# ECOCYCLE — Development Roadmap & Milestone Schedule

**Project:** ECOCYCLE — Turning Waste Into Worth  
**Competition:** Web Design Competition Techno Versary Vol. II 2026  
**Execution Horizon:** Systematic Multi-Phase Engineering  

---

## 1. Roadmap Overview & Timeline

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       ECOCYCLE DEVELOPMENT PHASES                           │
├──────────────┬──────────────┬──────────────┬──────────────┬─────────────────┤
│   PHASE 0    │   PHASE 1    │   PHASE 2    │   PHASE 3    │     PHASE 4     │
│  Inception   │ Scaffolding  │ Core Pages   │ Interactive  │ Performance, QA │
│  & Planning  │  & Design    │ & Navigation │ & Simulators │ & Final Polish  │
│  (Complete)  │   System     │              │              │                 │
└──────────────┴──────────────┴──────────────┴──────────────┴─────────────────┘
```

---

## 2. Detailed Phase Breakdown

### Phase 0: Workspace Inception & Strategic Requirements (Current Phase)
- [x] Inspect host environment (Node v26.13.0, npm 11.20.0, Linux OS).
- [x] Establish dedicated project workspace at `/home/firza-ilmi/.gemini/antigravity/scratch/ecocycle`.
- [x] Review competition guidelines and scoring criteria from HIMA TI FKOM Universitas Kuningan.
- [x] Author comprehensive project documentation:
  - `docs/PROJECT_BRIEF.md`
  - `docs/COMPETITION_REQUIREMENTS.md`
  - `docs/DEVELOPMENT_ROADMAP.md`
  - `docs/TECHNICAL_DECISIONS.md`
  - `docs/RISK_REGISTER.md`
- [x] Validate zero conflicts with existing local projects.

### Phase 1: Architecture, Scaffolding & Design System Foundations
- [ ] Initialize modern frontend project scaffolding with **Vite + React 19 + TypeScript + Tailwind CSS**.
- [ ] Establish design tokens (custom color palette, typography hierarchy, border radiuses, shadow elevations).
- [ ] Configure Lucide React icons, utility helpers (`clsx`, `tailwind-merge`), and animation primitives (`framer-motion`).
- [ ] Establish atomic component directory structure:
  - `components/ui/` (Buttons, Cards, Inputs, Badges, Modals, Accordions, Tabs, Tooltips)
  - `components/layout/` (Navbar, Footer, Mobile Navigation Drawer, Breadcrumbs)
  - `components/features/` (Waste Calculator, Deposit Simulator, Article Cards, Pledge Counter)
- [ ] Configure strict TypeScript rules and ESLint rules to prevent any type regressions.

### Phase 2: Core Page Layouts & Client-Side Navigation
- [ ] **Home Page (`/` / Home View)**:
  - Hero Section with value proposition, animated metrics banner, and dual CTA (Mulai Setor Sampah / Pelajari Pemilahan).
  - Four Pillars Feature Grid (Digital Waste Bank, Smart Management, Education, Community).
  - Interactive "Live Value Ticker" showcasing recycling exchange rates.
  - Quick Calculator Preview widget.
  - Featured Articles & Community Activity Highlights.
  - Dynamic Eco-Pledge Banner.
- [ ] **About Page (`/about` / About View)**:
  - Vision, Mission, and Socio-Ecological Background.
  - Circular Economy Flowchart & Theoretical Framework.
  - Team & Values (Inclusivity, Transparency, Sustainability, Innovation).
  - Interactive Impact Counter & Demonstration Milestone timeline.
- [ ] **Content & Article / Gallery Page (`/content` / Content View)**:
  - Tabbed interface: "Artikel Edukatif", "Galeri Infografis", and "Mitos vs Fakta Lingkungan".
  - Category filters (Plastik, Organik, B3 & Elektronik, Kompos, Kebijakan).
  - Search input for real-time article querying.
  - Rich reading modal or detailed drawer with citation markers.
- [ ] **Contact Page (`/contact` / Contact View)**:
  - Validated contact & inquiry form with instant client-side feedback.
  - Interactive Directory / Map preview of simulated drop-off points.
  - Interactive FAQ Accordion.
  - Social media and community communication links.

### Phase 3: Interactive Features, Simulation Engines & State
- [ ] **Digital Waste Bank Simulator (`Bank Sampah Digital`)**:
  - Category selector with visual icons.
  - Weight slider and numerical input (kg).
  - Instant calculation: EcoPoints earned + estimated Rupiah value.
  - Simulated Environmental Impact metrics:
    - Grams of CO₂ equivalent avoided.
    - Water conserved in liters.
    - Landfill space saved in cubic meters.
  - "Simulasi Setor" button generating a mock transaction record saved to `localStorage`.
  - Transaction history drawer displaying recent simulated deposits.
- [ ] **Smart Waste Sorting Guide**:
  - Interactive 4-stream matrix: Organik, Anorganik, B3 (Berbahaya & Beracun), E-Waste.
  - Do's and Don'ts visual badges.
  - Search-by-item bar (e.g. search "botol kaca", "baterai", "kulit pisang" to instantly get correct bin and preparation instruction).
- [ ] **Interactive Carbon Footprint Estimator**:
  - 3-step slider questionnaire estimating monthly household waste output and potential recovery rate.
- [ ] **Live Eco-Pledge Signer**:
  - Interactive commitment buttons (e.g. "Bawa Tas Belanja Sendiri", "Pilah Sampah dari Rumah", "Tolak Sedotan Plastik").
  - Persistent counter increment stored locally with animated celebration toast.

### Phase 4: Polish, Accessibility, Performance & Verification
- [ ] **Responsive Design Verification**:
  - Thorough testing across mobile (360px–430px), tablet (768px–1024px), desktop (1280px+).
  - Ensure zero horizontal scrollbars, touch targets $\ge 48\text{px}$, accessible tap navigation.
- [ ] **Accessibility (a11y) & WCAG 2.1 AA Compliance**:
  - High contrast ratios ($\ge 4.5:1$ for normal text, $\ge 3:1$ for large headings).
  - Semantic HTML5 tags (`<main>`, `<nav>`, `<article>`, `<section>`, `<aside>`).
  - Keyboard navigation (tabindex, focus-visible rings on interactive buttons and inputs).
  - ARIA attributes for modals, accordions, and tabs.
- [ ] **Performance & Asset Optimization**:
  - Vector SVG icons and optimized modern image formats.
  - Code splitting and tree-shaking verification.
  - Target: 98–100 score in Google Lighthouse (Performance, Accessibility, Best Practices, SEO).
- [ ] **Zero-Dependency Local Runnability Check**:
  - Verification of `npm run build` and `npm run preview` on standard clean machines.

### Phase 5: Deliverables Packaging & Final Presentation Prep
- [ ] Production of competition-ready `README.md`:
  - Project Title & Overview.
  - Live Demo URL & Local Setup Guide.
  - Feature Architecture & Tech Stack Details.
  - Demonstration Data Disclaimer.
  - Team Attribution.
- [ ] Judges Q&A Defense Script & Technical Rationale Cheat Sheet.
- [ ] Submission bundle verification (Git repository cleanliness, no leftover temporary files).
