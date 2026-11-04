# ECOCYCLE — Technical Architecture & Architectural Decision Records (ADR)

**Project:** ECOCYCLE — Turning Waste Into Worth  
**Role:** Technical Lead  
**Document Status:** Approved Architecture  

---

## 1. Architectural Principles

1. **Deterministic Local Execution**: The project must clone, install, and execute with zero errors on any evaluator's or judge's machine running standard Node.js without proprietary cloud runtime prerequisites.
2. **Instant Hot Module Replacement (HMR)**: Sub-second feedback loop during development and smooth live demonstration.
3. **Zero Paid or Proprietary Dependencies**: Strictly open-source libraries under MIT, Apache 2.0, or BSD licenses.
4. **Performance by Construction**: Zero runtime memory leaks, minimal layout thrashing, sub-1.5s First Contentful Paint (FCP), and 60fps animations.
5. **Progressive Accessibility (a11y)**: Built from day one with WCAG 2.1 AA standards, high-contrast ratios, keyboard focus states, and semantic HTML5 elements.

---

## 2. Technology Stack Evaluation & Selection

### 2.1. Core Framework: Vite + React 19 + TypeScript
- **Selected:** `Vite` (Build Tool) + `React 19` + `TypeScript`
- **Alternatives Considered:**
  - *Next.js (App Router)*: Evaluated for SSR benefits. Rejected because competition judges typically clone repositories to run `npm install && npm run dev` locally or host on static staging environments (GitHub Pages, Vercel Static, Netlify). Next.js introduces heavier build output, node version dependencies, and potential hydration mismatch pitfalls during local offline reviews.
  - *Vanilla HTML/CSS/JS*: Evaluated for simplicity. Rejected because ECOCYCLE requires sophisticated interactive state (interactive waste deposit calculator, instant multi-stream sorting filtering, dynamic carbon offset calculations, and persistent localStorage simulated ledgers) which becomes brittle in raw vanilla DOM manipulation.
- **Decision Rationale:**
  - Lightning-fast startup (<300ms) with Vite.
  - Strict type-safety with TypeScript eliminates undefined variable errors during live judging.
  - Generates clean static build output that can be inspected, audited, and served anywhere.

### 2.2. Styling Architecture: Tailwind CSS + Custom Design System Tokens
- **Selected:** `Tailwind CSS` with bespoke theme extension.
- **Alternatives Considered:**
  - *Bootstrap / Semantic UI*: Rejected due to generic aesthetic appearance that violates the "visually distinctive" and "no generic templates" criteria.
  - *Chakra UI / MUI / Mantine*: Rejected due to heavy runtime bundle overhead and pre-styled components that risk looking cookie-cutter to design judges.
- **Decision Rationale:**
  - Full control over every CSS utility class, zero unused CSS in production build.
  - Enables custom design system tokens (Deep Forest `#0C2B1E`, Bio-Mint `#10B981`, Earth Stone `#F7F9F5`).
  - Seamless responsive design utility variants (`sm:`, `md:`, `lg:`, `xl:`).

### 2.3. Iconography & Animation Libraries
- **Icons:** `Lucide React` (Permissive MIT license, SVG-based, zero bloat, tree-shakeable, 1000+ modern cohesive environmental & UI icons).
- **Animations:** `Framer Motion` (Industry standard for fluid spring animations, page transitions, accordion collapse, and accessible micro-interactions that degrade gracefully if reduced-motion is requested).

### 2.4. Client State & Persistence Engine
- **State Pattern:** Centralized React custom hooks with `localStorage` synchronization.
- **Persistent Data Collections:**
  - `ecocycle_user_balance`: Simulated EcoPoints balance and Rupiah conversion.
  - `ecocycle_deposit_history`: Array of simulated user deposits with timestamp, waste category, weight, and carbon offset.
  - `ecocycle_pledges`: Community pledge counts and active user signatures.
  - `ecocycle_bookmarked_articles`: User's saved educational reads.
- **Decision Rationale:**
  - Eliminates external database dependency while providing judges with a realistic, fully interactive persistent experience where their test transactions persist across page refreshes.

---

## 3. Design System & Token Specifications

### 3.1. Color Palette

```
┌────────────────────────────────────────────────────────┐
│              ECOCYCLE COLOR TOKENS                     │
├───────────────────┬──────────────┬─────────────────────┤
│ Token Name        │ Hex Code     │ Semantic Purpose    │
├───────────────────┼──────────────┼─────────────────────┤
│ Forest Deep       │ #0B2519      │ Dark Hero/Footer BG │
│ Forest Dark       │ #0F3323      │ Primary Surface     │
│ Emerald Forest    │ #14532D      │ Structural accents  │
│ Bio-Mint Radiant  │ #10B981      │ Primary CTA & Glow  │
│ Mint Leaf Soft    │ #34D399      │ Accent & Highlights │
│ Mint Vapor        │ #ECFDF5      │ Light surface tint  │
│ Earth Clay Warm   │ #F7F9F5      │ Light Canvas BG     │
│ Earth Sand / Gold │ #F59E0B      │ Points & Warning    │
│ Slate Charcoal    │ #0F172A      │ High-contrast text  │
│ Muted Mist        │ #64748B      │ Secondary copy      │
└───────────────────┴──────────────┴─────────────────────┘
```

### 3.2. Typography Hierarchy
- **Primary Body & Headings Font:** `Plus Jakarta Sans` or modern geometric system stack (`system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`). Highly readable, contemporary, and perfectly suited for Indonesian and international readers.
- **Display Accents & Numbers:** Tabular figures (`font-variant-numeric: tabular-nums`) for currency tickers, counters, and calculator outputs to prevent layout shift during recalculation.

### 3.3. Responsive Breakpoints

| Breakpoint | Min-Width | Target Devices |
|---|---|---|
| `sm` | 640px | Large smartphones in landscape |
| `md` | 768px | Tablets (iPad portrait, large e-readers) |
| `lg` | 1024px | Laptops, iPad Pro landscape |
| `xl` | 1280px | Standard desktop displays |
| `2xl` | 1536px | Ultra-wide monitors |

---

## 4. Algorithmic Models & Data Calculations

### 4.1. Waste-to-Value Conversion Matrix (Simulated Rates)

| Category | Sub-types | Valuation (IDR/kg) | EcoPoints / kg | CO₂e Avoided / kg |
|---|---|---|---|---|
| **Plastik PET** | Botol Air Mineral, Cup Minuman Bersih | Rp 4.500 | 45 Pts | 1.50 kg CO₂ |
| **Plastik HDPE** | Botol Sampo, Wadah Sabun | Rp 3.800 | 38 Pts | 1.35 kg CO₂ |
| **Kardus & Kertas** | Kardus Cokelat, Kertas HVS Bersih | Rp 2.200 | 22 Pts | 1.10 kg CO₂ |
| **Logam & Aluminium**| Kaleng Minuman, Seng, Tembaga | Rp 14.000 | 140 Pts | 3.20 kg CO₂ |
| **Kaca / Beling** | Botol Kaca Utuh, Stoples | Rp 1.200 | 12 Pts | 0.40 kg CO₂ |
| **E-Waste (Elektronik)**| Kabel, PCB Bekas, Ponsel Rusak | Rp 18.000 | 180 Pts | 4.80 kg CO₂ |
| **Minyak Jelantah** | Minyak Goreng Bekas Bersaring | Rp 7.500 | 75 Pts | 2.10 kg CO₂ |

*Note: All conversion factors are grounded in standard circular economy indices and annotated as competition demonstration parameters.*

### 4.2. Impact Formula
$$\text{Total Points} = \sum (\text{Weight}_i \times \text{Rate}_i)$$
$$\text{Total CO}_2\text{e Avoided (kg)} = \sum (\text{Weight}_i \times \text{CO}_2\text{ Factor}_i)$$
$$\text{Equivalent Trees Planted} = \frac{\text{Total CO}_2\text{e Avoided}}{21.77\text{ kg CO}_2/\text{tree/year}}$$

---

## 5. Security, Quality Assurance & Performance Targets

- **Performance**: Lighthouse score $\ge 95$ across Performance, Accessibility, Best Practices, and SEO.
- **Zero Console Errors**: Clean runtime execution in Chrome, Firefox, Safari, and Edge.
- **Client Sanitization**: All form inputs sanitized to prevent XSS.
- **Offline Reliability**: Assets fully bundled; zero reliance on unreliable external CDNs.
