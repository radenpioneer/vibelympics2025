# AGENTS.md

> **Role:** You are an expert Full Stack Engineer and Security Researcher specializing in Software Supply Chain Security.
> **Objective:** Build "Package Ecosystem Auditor" — a web-based tool to analyze npm packages for security risks, focusing on "bad hygiene" and malicious indicators rather than just CVEs.
> **Tone:** **Authoritative and Menacing.** The interface must feel like an Imperial Security Bureau (ISB) terminal, but all findings must have clear technical translations.

---

## @Directive: Consult Next.js Documentation
Before executing any task, you must consult the Next.js documentation via the MCP server defined in `round_2/.mcp.json`. This ensures all actions align with the latest Next.js best practices and configurations.

---

## @Project_Context
The goal is to build a tool that accepts an npm package name (the "asset") and returns a security/risk audit in a highly structured, Imperial-themed report.
- **Ecosystem:** Primary target is **npm**.
- **User Base:** ISB Officers and Cybersecurity Command staff (Front-end view) AND Technical Auditors (Fine Print view).

---

## @Tech_Stack
- **Runtime:** Node.js (via Chainguard images).
- **Framework:** **Next.js (App Router, TypeScript)**.
- **Deployment Mode:** **`output: "standalone"`** must be explicitly set in `next.config.js`.
- **Language:** TypeScript.
- **Styling:** Tailwind CSS (to implement the custom CRT/Imperial look).
- **Containerization:** Docker (Multi-stage).

---

## @Architecture_Components

### 1. The Analyzer (Core Logic)
- **Input:** Package Name String.
- **Data Sources:** npm Registry API, GitHub API (if linked), OpenSSF Scorecard API.
- **Heuristics to Implement:**
    - **Typosquatting:** Check package name against a risk list. **Primary Source** is a hardcoded list of the Top 50 most downloaded/depended-upon npm packages. **Fallback Source** is npm's official package name list.
    - **Install Scripts:** Flag `preinstall`, `install`, `postinstall` presence (High Risk Flag).
    - **Abandonment:** Last publish > 2 years (Dormant Asset Flag).
    - **Metadata Consistency:** Does `repository` field match a real, accessible repo?
    - **Maintainer Hygiene:** "Bus Factor" (number of maintainers).

### 2. The Reporter (Web UI)
- **Input:** Search bar on landing page.
- **Output:** A stylized dashboard matching the ISB specifications below.
    - **The Gauge:** A visual **COMPLIANCE RATING** score (0-100).
    - **The Roast:** The **ISB INTERROGATION TRANSCRIPT** generated text summary.
    - **The Evidence:** Raw data, always accompanied by its technical fine print.

### 3. Deployment (Docker)
- **Constraint 1:** Final image MUST be based on **`cgr.dev/chainguard/node:latest`** (Public Registry).
- **Constraint 2:** Multi-stage build is MANDATORY. Use an official, stable Node image (e.g., `node:20-alpine`) for the **build stage**.
- **Constraint 3:** The final stage must use the **Next.js standalone** output, copying the content of `.next/standalone`, `.next/static`, and `public/` directories.
- **Constraint 4:** The final container should expose port `3000`.
- **Constraint 5:** The final image must run as a non-root user (e.g., set `USER node` and ensure correct permissions/ownership).
- **Constraint 6:** The execution command MUST be `node server.js` to start the standalone Next.js server.

---

## @UI_UX_SPECIFICATION: Imperial Security Bureau Terminal

### 1. Core Aesthetic
- **Color Palette:** Deep charcoal/black background. Primary focus/interactive elements are **Stark White** and **Sharp Cyan** (`#00FFFF`). Critical risks use **Sith Red** (`#990000`).
- **Typography:** Strictly fixed-width/Monospace fonts for data fields. All labels are **uppercase**.
- **Atmospherics:** Implement a subtle, persistent **CRT monitor effect** (scanlines, slight flicker) and use rigid, right-angled grid lines.

### 2. Screen Naming & Jargon
- **Application Title:** `GALACTIC NETWORKS: PACKAGE ASSET AUDIT PORTAL v8.2`
- **Search Prompt:** `ENTER PACKAGE DESIGNATION (e.g., 'CORE-LOGIC-BINDING')`
- **Submit Button:** `:: AUTHORIZE AUDIT ::`

### 3. Report Structure (Three-Column Data Display)

| Imperial Label (UI) | Content & Tone (The Weird) | Fine Print (Technical Translation) |
| :--- | :--- | :--- |
| **COMPLIANCE RATING** | Large circular gauge (ACCEPTABLE $\rightarrow$ EXTREME THREAT). | **Package Health Score (0-100)**: Derived from the combined average of the Analyzer heuristics. |
| **PROTOCOL BREACH STATUS** | List of CVEs. If 0: `STATUS: SECURE`. | **Known Vulnerability Check**: NVD/CVE scan results (Specific vulnerabilities listed). |
| **ASSET VITALITY INDEX** | Shows last activity and maintainer count. Flags: `DORMANT`, `ACTIVE`. | **Maintenance Health Score**: Assesses time since last commit, release cadence, and maintainer "Bus Factor." |
| **SUBORDINATE ASSET CHAIN** | Geometric, angular visualization of the dependency tree. | **Dependency Tree Visualizer**: Mapping of package dependencies (Depth and Breadth analysis). |
| **DECEPTION PROTOCOL ALERT** | `WARNING: Possible INSURGENT/REBEL DECEPTION ATTEMPT detected.` | **Typosquatting/Similarity Check**: Levenshtein distance analysis against curated popular packages. |
| **UNAUTHORIZED CODE INJECTION** | `CRITICAL: Asset contains self-executing payload. Violation of ISB Code 77-B.` | **Execution Risk Check**: Flags presence of `preinstall`, `install`, or `postinstall` NPM lifecycle scripts. |

---

## @Rules_&_Constraints

### 1. The "Get Weird" Clause
- **DO NOT** joke about actual malware, CVEs, or legal licenses. These must be reported factually in the Technical Translation.
- **DO** inject personality into the *interpretation* of the data in the Interrogation Column (e.g., "The Maintainer Count is 1. This asset is entirely reliant on one individual...").

### 2. Docker & Containerization
- **Strictly adhere** to the 6 constraints outlined in `@Architecture_Components: Deployment (Docker)`.

---

## @Task_List
- [ ] Initialize Next.js (App Router, TypeScript) project with Tailwind CSS.
- [ ] Set `output: "standalone"` in `next.config.js`.
- [ ] Implement `getNpmPackageData(name)` fetcher.
- [ ] **Define the initial Top 50 Curated List** for typosquatting checks.
- [ ] Implement `calculateRiskScore(metadata)` logic, prioritizing the **Top 50 Curated List**.
- [ ] Write the **Dockerfile** based on the 6 constraints in the Deployment section.
- [ ] Create UI components based on the `@UI_UX_SPECIFICATION`, ensuring all data fields include the **Fine Print** translation.