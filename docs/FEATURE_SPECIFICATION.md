# ECOCYCLE — Feature Specification & Priority Matrix

**Project:** ECOCYCLE — Turning Waste Into Worth  
**Role:** Senior Digital Product Strategist & Tech Lead  
**Classification:** MoSCoW Prioritization (Must-Have vs. Should/Could-Have)  
**Document Status:** Approved Feature Specification  

---

## 1. Feature Priority Classification Framework

To guarantee award-winning execution within the competition timeline, features are classified into:
- **P0 — Essential (Must Have / Core Competition Requirements):** Mandatory features that directly fulfill the competition guidebook rules, judging criteria, and core user journeys. A failure in any P0 item compromises the project's eligibility or score.
- **P1 — Strategic Enhancements (Should Have / High Value):** Differentiating features that elevate the platform from a "standard student submission" to an "award-winning innovation".
- **P2 — Optional Delighters (Could Have / Polish):** Aesthetic or secondary interactive enhancements executed if time permits.

```
┌────────────────────────────────────────────────────────────────────────┐
│                      FEATURE PRIORITY BREAKDOWN                        │
├────────────────────┬───────────────────┬───────────────────────────────┤
│ Tier               │ Category          │ Impact on Scoring             │
├────────────────────┼───────────────────┼───────────────────────────────┤
│ P0: Essential      │ Core Requirements │ Baseline Eligibility (100%)   │
│ P1: Strategic      │ Differentiators   │ Innovation & UX Boost (+15-20%)│
│ P2: Polish         │ Micro-Delighters  │ Visual Polish & Aesthetics    │
└────────────────────┴───────────────────┴───────────────────────────────┘
```

---

## 2. Feature Specification Matrix

| Module | Feature Name | Priority Tier | User Story & Functional Description | Technical & Data Requirements |
|---|---|---|---|---|
| **Global** | **Responsive Navigation Bar** | **P0 (Essential)** | As a user on any device, I want a sticky header to navigate between all 8 sections smoothly with an active indicator. | Semantic `<nav>`, mobile hamburger drawer, keyboard accessible. |
| **Global** | **Competition Disclaimer** | **P0 (Essential)** | As a competition judge, I want clear disclosure that demonstration data is simulated for competition purposes. | Fixed header pill or persistent badge: `[Mode Simulasi Kompetisi]`. |
| **Home** | **Hero Value Proposition** | **P0 (Essential)** | As a first-time visitor, I want a clear, compelling headline and CTAs so I understand ECOCYCLE's purpose immediately. | High-contrast typography, dual CTAs linking to Bank Sampah and Smart Sorting. |
| **Home** | **Live Commodity Ticker** | **P1 (Strategic)** | As a visitor, I want to see real-time simulated prices for recyclables to understand their immediate economic worth. | Animated ticker component displaying prices per kg (PET, HDPE, Cardboard, etc.). |
| **Home** | **Interactive Mini-Calc** | **P1 (Strategic)** | As a user, I want a 1-click calculator on the homepage to preview my waste's value without navigating away. | Dynamic formula updating Rupiah and EcoPoints upon typing weight. |
| **Home** | **Eco-Pledge Counter** | **P0 (Essential)** | As a visitor, I want to click an eco-pledge button and see the community counter increment in real-time. | `localStorage` persistent state with visual toast feedback. |
| **About** | **Vision & Mission** | **P0 (Essential)** | As an evaluator, I want to read the foundational philosophy and environmental objectives of the project. | Clear typography cards with structured circular economy diagrams. |
| **About** | **How It Works Pipeline** | **P0 (Essential)** | As a beginner user, I want a 4-step visual flow explaining how household waste moves from home to recycled product. | Step-by-step numbered progress cards with intuitive icons. |
| **Sorting** | **4-Stream Category Tabs** | **P0 (Essential)** | As a user, I want to filter waste into Organik, Anorganik, B3, and E-Waste streams easily. | Category state filter with accessible color-coded badges. |
| **Sorting** | **Instant Searchable Guide** | **P0 (Essential)** | As a student or parent, I want to type an everyday item name to immediately find its correct bin and preparation rules. | Debounced text query filtering over 25+ common Indonesian household items. |
| **Sorting** | **Do's & Don'ts Matrix** | **P1 (Strategic)** | As a beginner, I want clear visual examples of common sorting mistakes to avoid contaminating recycling bins. | 2-column comparative grid with checkmarks and warning signs. |
| **Waste Bank**| **Interactive Deposit Form**| **P0 (Essential)** | As a user or bank operator, I want to input waste type and weight in kg to see instant value and log the deposit. | Controlled inputs, validation (weight $>0$), dynamic calculation. |
| **Waste Bank**| **Transaction History Ledger**| **P0 (Essential)**| As a user, I want to view a chronological table of past deposits with date, category, weight, value, and points. | Dynamic table with sortable columns and responsive card view on mobile. |
| **Waste Bank**| **Edit & Delete Records** | **P0 (Essential)** | As a user, I want to correct a mistaken weight entry or delete an accidental deposit safely. | Modal dialog with confirmation safeguard to prevent accidental deletion. |
| **Waste Bank**| **Seed Demo Data Button** | **P1 (Strategic)** | As a competition judge evaluating the site, I want a 1-click button to load realistic sample deposits immediately. | Pre-populated realistic JSON fixtures loaded into state with 1 click. |
| **Waste Bank**| **Simulated Reward Redeem**| **P1 (Strategic)** | As a user with accumulated EcoPoints, I want to view a catalog of redeemable rewards (e-wallet credit, tree seedlings). | Modal showcase with simulated "Tukarkan" action and balance deduction. |
| **Eco Impact**| **Aggregate Ecological Stats**| **P0 (Essential)**| As an eco-conscious citizen, I want to see cumulative kg diverted, $CO_2$ avoided, and tree planting equivalents. | Real-time mathematical aggregation of all logged transactions. |
| **Eco Impact**| **Category Distribution Bar**| **P0 (Essential)**| As a visitor, I want a visual chart showing what percentage of my waste is plastic vs. paper vs. metal. | Proportional multi-colored progress bar with percentage tags. |
| **Eco Impact**| **Educational Calculator** | **P1 (Strategic)** | As a student or educator, I want interactive sliders to estimate annual savings from adopting specific waste habits. | Multi-slider widget calculating annual resource conservation. |
| **Academy** | **Categorized Article Hub** | **P0 (Essential)** | As a visitor, I want to read bite-sized articles on zero-waste living, composting, and recycling processes. | Multi-category card grid with reading time estimates. |
| **Academy** | **Interactive Myth vs. Fact**| **P1 (Strategic)**| As a reader, I want to click myth cards to reveal the real scientific facts behind recycling misconceptions. | Interactive flip/reveal cards with smooth animation. |
| **Academy** | **Infographic Showcase** | **P0 (Essential)** | As a visual learner, I want rich infographics displaying circular economy flows in West Java and campus settings. | Responsive SVG/WebP gallery modal with zoom capability. |
| **Challenges**| **Actionable Challenge Cards**| **P0 (Essential)**| As a student, I want to select weekly green challenges with step-by-step checklists to form sustainable habits. | State-backed challenge cards with toggleable milestones. |
| **Challenges**| **Badges & Achievements** | **P1 (Strategic)** | As a user completing challenges, I want unlockable digital badges to reward my consistency. | Dynamic badge grid with unlocked/locked states and celebration modal. |
| **Contact** | **Validated Contact Form** | **P0 (Essential)** | As a visitor, I want to send an inquiry or propose a new waste bank location with instant feedback. | Real-time client-side validation (email regex, required fields) and dispatch toast. |
| **Contact** | **Drop-Off Station Directory**| **P0 (Essential)**| As a resident of Kuningan, I want to see local simulated drop-off points with accepted categories and opening hours. | Searchable directory cards with category tags and opening hours. |
| **Contact** | **Interactive FAQ Accordion**| **P0 (Essential)**| As a beginner, I want answers to common questions about waste banks, sorting rules, and points redemption. | Accessible collapsible accordion with smooth animated expand/collapse. |
| **Global** | **Dark / Light Theme Toggle**| **P2 (Optional)** | As a visitor, I want to switch between dark botanical and crisp light modes. | CSS variables/Tailwind class switcher. |
| **Global** | **Export Ledger to CSV** | **P2 (Optional)** | As a waste bank admin, I want to download my transaction table as a `.csv` file. | Client-side blob generation. |

---

## 3. Essential vs. Optional Classification Summary

### Mandatory Essential Core (Must-Have for Competition Win)
1. **Full 8-Section Information Architecture** (Home, About, Smart Sorting, Digital Waste Bank, Eco Impact, Eco Academy, Eco Challenges, Contact).
2. **Interactive Digital Waste Bank** with live formula calculation, transaction creation, editing, and deletion with persistent storage.
3. **Smart Sorting Catalog** with real-time text search and 4-stream classification.
4. **Eco Impact Dashboard** calculating accurate $CO_2$ offsets, water conservation, and tree equivalents.
5. **Interactive Eco Academy** with educational articles and visual infographics satisfying the Content/Gallery requirement.
6. **Eco Challenges & Badges** driving sustainable community activities.
7. **Contact Page** with validated form, FAQ accordion, and drop-off directory.
8. **100% Responsive Design** and WCAG 2.1 AA accessible contrast.

### Optional Enhancements (Deferred to Final Polish if Time Permits)
1. CSV export for transaction history.
2. Dark / Light mode toggle switch.
3. Sound effects on pledge or badge unlock (must respect system preferences).
