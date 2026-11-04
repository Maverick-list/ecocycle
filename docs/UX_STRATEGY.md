# ECOCYCLE — UX Strategy & Design System Guidelines

**Project:** ECOCYCLE — Turning Waste Into Worth  
**Role:** Senior Product Designer & UX Architect  
**Design Standard:** Human-Centered, High-Accessibility, Cognitive-Friction-Minimizing Architecture  
**Document Status:** Approved Design Strategy  

---

## 1. UX Strategic Tenets

Great web design for public environmental action must not create artificial barriers. To achieve the highest marks in **User Experience (25%)**, **Visual Design (20%)**, and **Website Demo (25%)**, ECOCYCLE is built upon eight UX strategy pillars:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ECOCYCLE UX PILLARS                             │
├────────────────────┬───────────────────┬───────────────────────────────┤
│ 1. Zero-Friction   │ 2. Transparent    │ 3. Instant Reactive           │
│    Exploration     │    Hierarchy      │    Feedback                   │
├────────────────────┼───────────────────┼───────────────────────────────┤
│ 4. Accessible      │ 5. Cognitive      │ 6. Helpful                    │
│    by Default      │    Simplicity     │    Empty States               │
├────────────────────┼───────────────────┼───────────────────────────────┤
│ 7. Humane Error    │ 8. Purposeful     │                               │
│    Prevention      │    Micro-Motion   │                               │
└────────────────────┴───────────────────┴───────────────────────────────┘
```

---

## 2. Detailed UX Principles & Patterns

### 2.1. Zero-Friction Exploration (No Login Wall for Demo)
- **Problem:** Many student and web competition projects require complex registration forms, email verification, or third-party sign-in just to view core tools. This creates high bounce rates and frustrates judges who want to test features within minutes.
- **ECOCYCLE Strategy:** The platform provides **immediate utility on first click**. Any visitor can immediately search the waste catalog, test the deposit simulator, log test transactions, calculate carbon footprints, and complete eco-challenges. All data is persisted in the visitor's browser (`localStorage`), with an opt-in reset/seed control.

### 2.2. Clear Visual Hierarchy & Scannability
- **Type Scale:** Fluid typography using `clamp()` ensuring headings remain balanced across small mobile displays (360px) and large desktop monitors (1920px).
- **Z-Pattern & F-Pattern Scanning:** Key metrics and critical actions are placed along natural eye paths:
  - High-impact data badges at the top-right of cards.
  - Action buttons positioned in consistent right-aligned or full-width mobile containers.
  - Distinctive visual containers (card borders, subtle glass elevations) grouping related concepts without visual clutter.

### 2.3. Consistent Interaction Patterns
- **Primary Actions:** Solid botanical green (`#10B981` / `#0F3323`) with high-contrast white text, subtle hover lift, and clear active state.
- **Secondary Actions:** Outlined or ghost buttons with `#10B981` border and transparent backdrop.
- **Destructive Actions:** Warm warning red (`#EF4444`) used exclusively for deleting records or resetting data, always guarded by a confirmation prompt.
- **Form Controls:** Generous touch targets ($\ge 48\text{px}$ height on mobile), visible borders, explicit labels, and descriptive helper text.

### 2.4. Accessible Interface (WCAG 2.1 AA Compliance)
- **Contrast Ratios:**
  - Dark surfaces: `#0B2519` (Forest Deep) paired with `#F8FAFC` or `#ECFDF5` text produces an extraordinary contrast ratio $> 14:1$, well above the required $4.5:1$.
  - Light surfaces: `#F7F9F5` (Warm Clay) paired with `#0F172A` (Slate Charcoal) produces a contrast ratio $> 15:1$.
  - Vibrant green accents (`#10B981`) are used for large display text, badges, or buttons with dark contrasting text (`#064E3B`).
- **Keyboard Navigation:** Full focus-visible rings (`ring-2 ring-emerald-500 ring-offset-2`) across all interactive buttons, inputs, tabs, and modals.
- **Screen Reader Readiness:** Semantic HTML tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`), descriptive ARIA labels (`aria-expanded`, `aria-controls`, `aria-label`) on all icon-only buttons.

### 2.5. Instant Reactive Feedback (Toasts & State Transitions)
- Every user action produces an immediate sensory confirmation:
  - Adding a deposit: Floating success toast + animated update of wallet counter + immediate row addition in the transaction table.
  - Signing an eco-pledge: Heart animation + incrementing community counter + success message.
  - Copying contact email: "Tersalin ke clipboard!" toast.
  - Sending contact message: Button switches to loading spinner $\rightarrow$ checkmark $\rightarrow$ clear success alert.

### 2.6. Helpful Empty States with 1-Click Seed Controls
- When a user first opens the **Digital Waste Bank** or when their search query yields zero results:
  - An engaging illustration appears rather than a blank white canvas.
  - Clear message: *"Belum ada catatan setoran sampah. Mulai catat setoran pertama Anda atau muat data simulasi untuk melihat cara kerjanya."*
  - A prominent 1-click button: **"Muat Contoh Data Simulasi (Preset)"** allows competition judges to populate 5 realistic waste deposits instantly to test charts and calculators without manual typing.

### 2.7. Humane Error Prevention & Meaningful Messages
- **Prevent Errors Proactively:**
  - Weight inputs restrict negative numbers or non-numeric characters.
  - Category selectors default to a sensible first option (Plastik PET).
- **Graceful Inline Feedback:**
  - If weight is left empty: *"Harap masukkan berat sampah minimal 0,1 kg"* appears directly beneath the input in amber/red text, without jarring page reloads.
- **Confirmation Safeguards:**
  - Deleting a transaction triggers a modal: *"Hapus Riwayat Setoran? Tindakan ini akan mengurangi 45 EcoPoints dari saldo Anda."* with clear "Batal" (Cancel) and "Hapus" (Delete) choices.

### 2.8. Purposeful Micro-Motion & Polish
- Motion is applied only to convey hierarchy, state changes, or feedback:
  - Tab switching uses smooth opacity and subtle translate transitions.
  - Accordion items expand and collapse smoothly.
  - Counters animate numbers up (`0 -> 145`) when scrolling into viewport.
  - All motion strictly respects the user's `prefers-reduced-motion` setting.

---

## 3. UI Component Style Guide & Token Mapping

```
┌────────────────────────────────────────────────────────┐
│             DESIGN SYSTEM TOKENS AT A GLANCE           │
├───────────────────┬────────────────────────────────────┤
│ Border Radius     │ rounded-2xl (16px) for cards       │
│                   │ rounded-xl (12px) for inputs/btns  │
│                   │ rounded-full for badges & avatars  │
├───────────────────┼────────────────────────────────────┤
│ Elevation/Shadows │ shadow-sm for input fields         │
│                   │ shadow-lg shadow-emerald-950/5 for │
│                   │ floating cards                     │
├───────────────────┼────────────────────────────────────┤
│ Glassmorphism     │ backdrop-blur-md bg-white/80       │
│                   │ border border-emerald-900/10       │
└───────────────────┴────────────────────────────────────┘
```
