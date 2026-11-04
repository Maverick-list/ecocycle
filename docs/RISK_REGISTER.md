# ECOCYCLE — Risk Register & Mitigation Strategy

**Project:** ECOCYCLE — Turning Waste Into Worth  
**Competition:** Web Design Competition Techno Versary Vol. II 2026  
**Organizer:** HIMA TI FKOM Universitas Kuningan  
**Risk Assessment Standard:** Comprehensive Impact-Likelihood Matrix  

---

## 1. Risk Scoring Matrix

| Impact \ Likelihood | Low (1) | Medium (2) | High (3) |
|---|---|---|---|
| **Critical (3)** | Moderate (3) | High (6) | **Severe (9)** |
| **Moderate (2)** | Low (2) | Moderate (4) | High (6) |
| **Low (1)** | Minimal (1) | Low (2) | Moderate (3) |

---

## 2. Risk Register & Action Plan

| ID | Risk Category | Risk Description | Likelihood | Impact | Severity Score | Preventive Mitigation Strategy | Contingency Action |
|---|---|---|---|---|---|---|---|
| **RSK-01** | **Compliance** | Missing one of the mandatory pages (Home, About, Content/Article/Gallery, Contact). | Low (1) | Critical (3) | **3 (Moderate)** | Architecture enforces explicit 4-page navigation manifest with automated compliance unit test in route map. | Verify presence in route switcher before final release freeze. |
| **RSK-02** | **Compliance** | Disqualification risk due to paid templates, closed-source UI packs, or third-party theme assets. | Low (1) | Critical (3) | **3 (Moderate)** | 100% custom UI component development using open-source primitives (React + Tailwind CSS + Lucide Icons). All dependencies inspected via `npm ls` and license scanner. | Replace any flagged component with native SVG and pure Tailwind styling immediately. |
| **RSK-03** | **Data Integrity** | Accusation of fabricating real-world statistics, fake institutional partners, or fictitious recycling drop-off centers. | Medium (2) | Critical (3) | **6 (High)** | Explicitly annotate all demonstration data with standard badge: `[Mode Simulasi / Competition Demonstration Data]`. Document all mathematical conversion models in `docs/TECHNICAL_DECISIONS.md`. | Clarify transparently during Q&A round that the platform provides a scalable simulation engine ready for real municipal data integration. |
| **RSK-04** | **Technical** | Evaluator clones repo on an older/different Node.js version resulting in installation or build failure. | Medium (2) | Critical (3) | **6 (High)** | Use standard Vite + React with zero native C++ bindings (`node-gyp`), pinned clean `package-lock.json`, and explicit `engines` declaration in `package.json`. | Provide explicit README instructions with step-by-step commands (`npm install`, `npm run dev`) and include a verified static preview URL. |
| **RSK-05** | **Performance** | Lighthouse score drops below 95 on mobile due to heavy assets, unoptimized images, or layout shift. | Medium (2) | Moderate (2) | **4 (Moderate)** | Strict asset budget: use vector SVGs for illustrations, modern system font fallbacks, zero heavy external fonts, and enforce explicit `width`/`height` on images to avoid CLS. | Run automated Chrome DevTools audit and eliminate render-blocking CSS/JS before submission. |
| **RSK-06** | **Aesthetics & UX** | Interface looks like a generic environmental landing page, failing visual design scoring (20–25%). | Medium (2) | High (3) | **6 (High)** | Implement a bespoke visual identity ("Eco-Brutalism meets Botanical Glassmorphism"), live data tickers, animated micro-interactions, dark emerald/bio-mint palette, and custom interactive widgets. | Conduct peer visual critique and compare against winning web design references before feature freeze. |
| **RSK-07** | **Accessibility** | Poor text-to-background contrast on dark green surfaces leading to deduction in UX/Testing criteria. | Medium (2) | Moderate (2) | **4 (Moderate)** | Enforce WCAG 2.1 AA standard: ensure minimum 4.5:1 contrast ratio for normal text and 3:1 for large display text. Test with color-contrast analyzers. | Adjust text shades to `#F8FAFC` or `#ECFDF5` over dark greens; darken text to `#0F172A` over light greens. |
| **RSK-08** | **Final Demo Failure** | Live demonstration breaks during presentation due to lack of internet connection or broken API endpoints. | Medium (2) | Critical (3) | **6 (High)** | Architecture is 100% client-contained with `localStorage` persistence. Zero external API calls required for full interactive demonstration. | Presenter can run entirely offline on `localhost` or from a static bundle without needing venue WiFi. |
| **RSK-09** | **Judges Q&A** | Inability to answer technical architecture or scalability questions from FKOM computer science faculty judges. | Medium (2) | Moderate (2) | **4 (Moderate)** | Prepare a dedicated **Judges Defense Sheet** covering scalability (REST API/Microservices migration), database schema, IoT smart-bin integration, and carbon calculation methodology. | PM & Tech Lead reference prepared technical rationale directly. |

---

## 3. Risk Monitoring Protocol

- **Weekly Audit**: At the end of each development phase, re-evaluate the risk scores.
- **Pre-Submission Freeze**: Mandatory complete checklist audit 48 hours prior to the submission deadline.
