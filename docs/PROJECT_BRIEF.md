# ECOCYCLE — Project Brief & Product Inception Document

**Project Name:** ECOCYCLE — Turning Waste Into Worth  
**Competition:** Web Design Competition Techno Versary Vol. II 2026  
**Organizer:** HIMA TI FKOM Universitas Kuningan  
**Theme:** EcoDigital For Environment  
**Role:** Principal Product Manager & Technical Lead  
**Document Version:** 1.0.0  
**Status:** Approved for Architecture & Scaffolding Phase  

---

## 1. Executive Summary & Vision

**ECOCYCLE** is an award-oriented, cutting-edge environmental digital platform engineered to bridge the gap between ecological awareness and concrete socio-economic action. Guided by the theme *"EcoDigital For Environment"*, ECOCYCLE transforms the paradigm of household and community waste management from a burdensome disposal task into a transparent, quantifiable, and reward-yielding ecological asset.

Rather than presenting another passive environmental landing page with static slogans, ECOCYCLE delivers an **interactive, end-to-end digital ecosystem** combining:
1. A **Digital Waste Bank (*Bank Sampah Digital*)** simulator with real-time conversion valuing.
2. A **Smart Waste Management & Sorting Intelligence Guide**.
3. A **High-Impact Environmental Knowledge Hub & Gamified Education Engine**.
4. A **Sustainable Community Action & Eco-Pledge Network**.

---

## 2. Core Problem Statement

Traditional environmental initiatives and waste banks in Indonesia suffer from several systemic friction points:
- **Opacity in Value**: Ordinary citizens do not understand the tangible market and ecological value of their segregated waste.
- **Sorting Friction**: Sorting guidelines are frequently abstract, text-heavy, and confusing to non-technical individuals.
- **Lack of Immediate Incentives**: Recycling often feels like unpaid labor with no immediate positive feedback or community recognition.
- **Disconnected Local Initiatives**: Local neighborhood waste banks (*Bank Sampah Unit*) operate in silos with fragmented record-keeping and lack digital touchpoints for modern youth.

---

## 3. Product Principles

To maximize scoring across both **Preliminary (Relevance 30%, Visual Design 20%, Performance 15%, UX 25%, Functionality 10%)** and **Final (Presentation 30%, Demo 25%, UX 20%, Innovation 15%, Q&A 10%)** stages, ECOCYCLE is constructed around 8 unyielding principles:

1. **Genuinely Useful**: Every tool, calculator, and table must provide immediate, tangible utility to the visitor.
2. **Distinctively Original**: Zero paid templates, no cookie-cutter layouts. Visual identity combines natural biological warmth with modern precision typography and micro-interactions.
3. **Visually Distinctive**: A signature aesthetic featuring deep forest botanical tones (`#0F291E`), radiant bio-mint accents (`#10B981`), earth clay neutrals (`#F7F9F6`), and crisp data cards.
4. **Intuitive for Non-Technical Users**: Clear visual affordances, high-contrast typography, step-by-step wizards, and plain-language terminology.
5. **Interactive & Educational**: Learning through doing (dynamic sliders, interactive waste categorization filter, simulated waste drop-off transactions, live CO₂ offset calculations).
6. **Technically Reliable & Deterministic**: Zero runtime crashes, resilient local persistence (mock database in `localStorage`), sub-1.5s First Contentful Paint, and fluid 60fps animations.
7. **Transparent Demonstration Integrity**: All mock statistics, simulated exchange rates, and fictional waste bank nodes are explicitly watermarked and annotated as **"Simulasi Demonstrasi Kompetisi / Competition Demo Data"** to maintain absolute academic and competition integrity.
8. **Fully Responsive by Default**: Tested and pixel-perfect across mobile (360px–430px), tablet (768px–1024px), and desktop (1280px–1920px).

---

## 4. The Four Functional Pillars

```
                       ┌────────────────────────┐
                       │   ECOCYCLE PLATFORM    │
                       └───────────┬────────────┘
         ┌─────────────────┬───────┴─────────┬─────────────────┐
         │                 │                 │                 │
┌────────┴────────┐┌───────┴────────┐┌───────┴────────┐┌───────┴────────┐
│  Pillar 1:      ││  Pillar 2:     ││  Pillar 3:     ││  Pillar 4:     │
│  Digital Waste  ││  Smart Waste   ││  Environmental ││  Sustainable   │
│  Bank Engine    ││  Management    ││  Education Hub ││  Community     │
└─────────────────┘└────────────────┘└────────────────┘└────────────────┘
```

### Pillar 1: Digital Waste Bank (*Bank Sampah Digital*)
- **Interactive Waste Deposit Simulator**: Users can select waste categories (Plastic PET, Cardboard, Aluminum, E-Waste, Glass), enter weight in kilograms, and see instant valuation in EcoPoints and simulated Rupiah (IDR).
- **Virtual Balance & Ledger**: Simulated citizen wallet displaying accrued points, environmental impact metrics (kg waste diverted, trees saved, kg CO₂ avoided), and redeemable rewards (e-wallet credit, community tokens, seedling vouchers).
- **Transparent Waste Pricing Index**: Real-time mock commodity ticker showing current market conversion rates per kg with trend indicators.

### Pillar 2: Smart Waste Management
- **Interactive Segregation Wizard**: 4-stream visual classification guide (Organic, Inorganic, Hazardous B3, E-Waste) with high-detail handling protocols and do's/don'ts.
- **Drop-off Point Locator (Simulated)**: Interactive directory of community drop-off stations with filtering by accepted waste types, operating hours, and mock distance.
- **Pick-up Request Flow**: User-friendly multi-step booking form for scheduling waste pickups by local eco-collectors.

### Pillar 3: Environmental Education & Knowledge Hub
- **Interactive Story Articles & Myth-Busters**: Engaging, bite-sized editorial cards breaking down complex environmental facts (e.g., *"The True Lifecycle of a PET Bottle"*, *"How Compost Cuts Methane"*).
- **Dynamic Carbon Offset Calculator**: Enter daily household consumption patterns to calculate estimated weekly footprint and savings from recycling.
- **Infographic Gallery**: Rich visual diagrams showing circular economy flows and local Kuningan / West Java watershed ecosystems.

### Pillar 4: Sustainable Community Activities
- **Eco-Challenge Board**: Monthly actionable challenges (e.g., *"Zero Single-Use Plastic Week"*, *"10kg Plastic Drop Challenge"*) with participation trackers.
- **Live Eco-Pledge Counter**: Visitors can sign interactive digital pledges, incrementing a live community commitment counter.
- **Community Event Calendar**: Simulated schedule for river cleanups, tree-planting drives, and composting workshops.

---

## 5. Target User Personas

1. **Rina (21, University Student / Youth Eco-Advocate)**
   - *Needs:* Quick mobile experience, clear financial/point incentive, gamified social challenges to share with peers.
   - *Pain Point:* Finds traditional waste banks boring, outdated, and difficult to locate.
2. **Pak Budi (46, Head of Household / Neighbourhood Unit RT)**
   - *Needs:* Simple step-by-step instructions on sorting household rubbish, clear pick-up scheduling, reliable exchange rates.
   - *Pain Point:* Skeptical of complex tech, needs clear text and transparent pricing without confusing jargon.
3. **Dewi (32, School Teacher & Community Organizer)**
   - *Needs:* Visually striking educational materials, accurate lifecycle diagrams, and ready-to-use infographics for classroom teaching.
   - *Pain Point:* Lack of attractive digital environmental resources in Bahasa Indonesia.

---

## 6. Tone, Language & Localization

- **Primary Interface Language:** Bahasa Indonesia (formal yet engaging, accessible to general public and judges in Kuningan/Indonesia).
- **Secondary Tone:** Modern, inspiring, professional, and optimistic — shifting away from doom-and-gloom climate anxiety toward actionable empowerment and circular economy value creation.
- **Branding Slogan:** *"Turning Waste Into Worth — Mengubah Sampah Menjadi Berkah."*
