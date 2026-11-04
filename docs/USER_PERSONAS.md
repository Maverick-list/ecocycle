# ECOCYCLE — User Research & Personas Document

**Project:** ECOCYCLE — Turning Waste Into Worth  
**Role:** Senior Product Designer & Digital Product Strategist  
**Target Context:** Indonesian University Students, Academic Communities, Urban Families, and Environmentally Conscious Beginners  
**Document Status:** Approved Product Specification  

---

## 1. Research Overview & Context

Effective waste management is not merely an infrastructural problem in Indonesia; it is fundamentally a **behavioral and informational problem**. Most urban and campus waste is dumped unsegregated into landfills (*TPA*) because citizens experience three primary mental barriers:
1. **Ambiguity Friction**: "Is this container recyclable? Does it need to be washed first? Which bin does it go into?"
2. **Invisible Value**: "Why should I spend 10 minutes washing and sorting bottles if it has zero visible return?"
3. **Cognitive Overload**: Existing guides are either too academic, too punitive, or overly technical.

ECOCYCLE dismantles these friction points through a digital-first, human-centered experience that rewards positive habits and provides instant clarity.

---

## 2. Primary User Personas

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ECOCYCLE USER SPECTRUM                          │
├────────────────────┬───────────────────┬───────────────┬───────────────┤
│ Persona 1          │ Persona 2         │ Persona 3     │ Persona 4     │
│ Farhan (Student)   │ Ibu Ratna (Parent)│ Nabila (Eco)  │ Pak Joko (RT) │
│ Campus Tech-Savvy  │ Family Household  │ Youth Activist│ Community Lead│
└────────────────────┴───────────────────┴───────────────┴───────────────┘
```

### Persona 1: Farhan — The Busy University Student
- **Demographics:** 20 years old, 3rd-year Informatics Engineering student living in a boarding house (*kos-kosan*) near campus in Kuningan/Cirebon.
- **Tech Literacy:** High (uses smartphones for food delivery, banking, study, social media).
- **Environmental Literacy:** Moderate (knows plastic is bad, but often mixes drink cups and snack wrappers due to lack of separate bins).
- **Core Problems:**
  - Boarding houses produce significant single-use plastic waste (instant noodles, boba cups, delivery packages).
  - No clear recycling collection point near his dorm.
  - Feels individual actions are too small to make a difference.
- **User Goals:**
  - Find quick sorting answers in $<10$ seconds.
  - Earn tangible digital points or rewards for collecting bulk plastic bottles.
  - Participate in friendly campus eco-challenges with friends.
- **Pain Points:**
  - Long, text-dense environmental websites.
  - Complex waste bank processes that require physical ledgers and cash books.
- **How ECOCYCLE Solves It:**
  - Searchable **Smart Sorting** guide with instant type-ahead filtering.
  - **Digital Waste Bank Simulator** showing instant monetary & EcoPoint valuation.
  - Gamified **Eco Challenges** with digital badges for campus bragging rights.

---

### Persona 2: Ibu Ratna — The Urban Family Household Manager
- **Demographics:** 38 years old, mother of two school-aged children, manages household budgeting and grocery shopping.
- **Tech Literacy:** Moderate (uses WhatsApp, Instagram, Shopee; avoids overly complex or jargon-filled apps).
- **Environmental Literacy:** Beginner to Moderate (wants a clean, hygienic home, separates cardboard boxes from online shopping, but unsure about food scraps and sachets).
- **Core Problems:**
  - Kitchen and pantry waste pile up quickly (vegetable scraps, milk jugs, detergent refill pouches).
  - Cluttered storage when waiting for weekly trash pickup.
  - Children need practical environmental education at home.
- **User Goals:**
  - Clear, visual instructions on household waste separation that her kids can also understand.
  - Track how much waste her family diverts each month.
  - Turn recyclables into secondary household value (points or extra savings).
- **Pain Points:**
  - Smelly, unmanaged waste; conflicting guidelines on what recyclers actually accept.
  - Websites with tiny fonts, complex charts, or technical chemical acronyms (e.g., PS, PP, PETE).
- **How ECOCYCLE Solves It:**
  - Highly visual **4-Stream Color-Coded Sorting Guide** with explicit Do's and Don'ts.
  - **Eco Impact Family Dashboard** showing cumulative kilograms diverted and tree equivalents in simple analogies.
  - Step-by-step DIY composting and zero-waste kitchen articles in **Eco Academy**.

---

### Persona 3: Nabila — The Eco-Conscious Youth Activist & Educator
- **Demographics:** 23 years old, environmental science enthusiast, active in university green clubs and volunteering.
- **Tech Literacy:** High (active on TikTok, LinkedIn, Notion, Canva).
- **Environmental Literacy:** Advanced (understands circular economy, carbon equivalents, composting methods).
- **Core Problems:**
  - Frustrated by greenwashing and lack of data transparency.
  - Struggles to find credible, engaging Indonesian-language infographics to share with her community.
- **User Goals:**
  - Access scientifically grounded yet beautifully designed educational content.
  - Inspire peers to join zero-waste lifestyle challenges.
  - Verify calculations for $CO_2$ offsets and waste diversion metrics.
- **Pain Points:**
  - Boring PDF reports and dry academic whitepapers that youth ignore.
  - Lack of centralized community challenge tracking.
- **How ECOCYCLE Solves It:**
  - **Eco Academy** with bite-sized myth-busters, shareable infographics, and verified carbon calculation formulas.
  - **Eco Challenges** board allowing her to motivate peer groups to participate in monthly plastic reduction targets.
  - Transparent data models with scientific citations.

---

### Persona 4: Pak Joko — The Neighborhood Unit / Waste Bank Leader (*Pengurus Bank Sampah Unit*)
- **Demographics:** 52 years old, active neighborhood chairman (Ketua RT / Pengurus Bank Sampah RW).
- **Tech Literacy:** Low to Moderate (prefers simple buttons, high-contrast text, clear confirmation modals).
- **Environmental Literacy:** Practical (knows local junk collectors /*pengepul*/ prices, deals with neighborhood waste collection).
- **Core Problems:**
  - Recording deposits manually on paper causes lost receipts, arithmetic errors, and calculation disputes with residents.
  - Difficulty summarizing monthly recycling volume to present at neighborhood meetings.
- **User Goals:**
  - A clean, simple tool to record member deposits (weight, type, points) with edit and delete capabilities.
  - A high-level monthly dashboard showing total collected volume by category.
- **Pain Points:**
  - Software that requires complex installations, database logins, or credit cards.
  - Accidental data deletion with no recovery or confirmation prompt.
- **How ECOCYCLE Solves It:**
  - **Digital Waste Bank Record Keeper**: Easy weight entry with immediate subtotal and total tally.
  - Edit & delete transactions with clear confirmation modals.
  - Clear export-ready summary of total kilograms and category distribution.

---

## 3. Comparative Problem-Solution Matrix

| Identified User Problem | Root Friction Point | ECOCYCLE Architectural Solution |
|---|---|---|
| *"I don't know if this plastic cup can be recycled."* | Obscure recycling codes and varied cleanliness rules. | **Smart Sorting Interactive Engine**: Search by plain item name ("Gelas Kopi Plastik") with instant visual bin categorization, preparation tips (e.g., "Bilas & Keringkan"). |
| *"Sorting waste takes effort with zero reward."* | Absence of immediate positive feedback loop. | **Digital Waste Bank Simulator**: Real-time conversion to EcoPoints, simulated Rupiah, and personal impact badges. |
| *"Environmental articles are boring and full of jargon."* | Academic tone, heavy walls of text. | **Eco Academy**: High-contrast cards, reading time indicators, Myth vs. Fact interactive revealers, and visual infographic galleries. |
| *"I don't know if my small actions actually matter."* | Inability to visualize personal contribution. | **Eco Impact Visualizer**: Dynamic mathematical converter turning kilograms into $CO_2$ avoided, liters of clean water conserved, and trees saved. |
| *"Habit change is difficult alone."* | Lack of social accountability and gamification. | **Eco Challenges**: Actionable weekly/monthly tasks with progress tracking, completion toggles, and milestone badges. |
