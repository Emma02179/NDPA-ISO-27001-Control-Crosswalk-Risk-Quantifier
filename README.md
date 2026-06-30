# NDPA 2023 ↔ ISO/IEC 27001:2022 Control Crosswalk & FAIR Risk Quantifier

An advanced, engineering-focused Governance, Risk, and Compliance (GRC) tool designed to bridge compliance status tracking and operational financial risk forecasting. This single-page application cross-maps 18 core security obligations from the statutory **Nigeria Data Protection Act (NDPA) 2023** directly onto technical controls from **ISO/IEC 27001:2022 (Annex A)**.

Rather than relying on vague, qualitative "High/Medium/Low" risk matrices, the tool features an integrated, mathematical simulation engine based on the open-standard **FAIR (Factor Analysis of Information Risk)** framework to quantify operational threat exposures into real financial variables in Nigerian Naira (₦).

---

## 🚀 Core Architectural Features

- **Sequential Statutory Mappings:** Outlines 18 distinct regulatory vectors starting dynamically from baseline compliance principles (NDPA Sections 24–25), data retention limitations, data processing agreements, to Section 48 revenue fines.
- **FAIR Monte Carlo Engine:** Simulates 10,000 trial years per scenario using a Poisson distribution for threat event iteration and an automated triangular distribution for loss impact curves to output Annualized Loss Expectancy (ALE).
- **In-Line Vector Automation:** Includes a "Quantify This Gap" direct context loop button on compliance cards that passes variables straight into the algorithmic modeling register.
- **Persistent Data State Tracker:** Uses client-side `localStorage` to manage persistent state records natively alongside a full offline backup configuration tool via structural JSON import/export routines.
