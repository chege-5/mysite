export const projects = [
  {
    "id": "fairgrid",
    "title": "FairGrid",
    "cardTitle": "FairGrid",
    "subtitle": "Multi-factor electricity price prediction",
    "category": "AI & data",
    "label": "ENERGY & PREDICTIVE ANALYTICS",
    "description": "A Python system predicting electricity prices across areas using multiple data sources and factors beyond consumption alone.",
    "summary": "FairGrid explores electricity pricing as a multi-factor data problem. Built for the EPRA Hackathon, it brings consumption data together with wider contextual inputs to predict prices for different areas. The project placed third and received the Best Use of Data award.",
    "technologies": [
      "Python",
      "Predictive analytics",
      "Data analysis",
      "Multi-source data"
    ],
    "features": [
      "Electricity price prediction across areas",
      "Multiple data sources and contextual factors",
      "Analysis beyond consumption-only inputs"
    ],
    "architecture": [
      "Multiple data sources",
      "Data preparation",
      "Predictive analysis",
      "Area-level price forecasts"
    ],
    "challenge": "Consumption alone gives an incomplete picture of electricity pricing. A more useful approach needs to consider several interacting factors.",
    "solution": "Combine multiple data inputs in a Python-based prediction workflow, using area-level context to inform price forecasts.",
    "visualType": "forecast",
    "badges": [
      "EPRA · 3rd place",
      "Best Use of Data"
    ],
    "featured": true,
    "artworkCaption": "MORE CONTEXT. BETTER QUESTIONS.",
    "github": "https://github.com/chege-5/FairGrid",
    "githubPlaceholder": true
  },
  {
    "id": "vulnnexus",
    "title": "VulNexus",
    "subtitle": "Hybrid AI-Based Cryptographic Auditing System",
    "description": "A hybrid AI-powered security auditing platform combining SAST/DAST analysis, external threat intelligence, and AI-assisted mitigation guidance.",
    "summary": "VulNexus models the end-to-end audit lifecycle. Authorized endpoints feed a crawler/scanner that performs security analysis, TLS/HTTPS inspection, protocol and configuration checks, and CVE/CWE/NVD correlation before presenting AI-assisted mitigation guidance in a dashboard.",
    "architecture": [
      "Authorized endpoint",
      "Crawler / scanner",
      "Security analysis",
      "TLS / HTTPS analysis",
      "Protocol / configuration analysis",
      "External intelligence",
      "CVE / CWE / NVD matching",
      "AI-assisted mitigation",
      "Dashboard"
    ],
    "technologies": [
      "FastAPI",
      "Python",
      "PostgreSQL",
      "Celery",
      "Redis",
      "React",
      "AI",
      "CVE/CWE",
      "NVD",
      "Censys",
      "Shodan"
    ],
    "features": [
      "Automated endpoint discovery and crawling",
      "TLS/SSL configuration and certificate analysis",
      "CVE/CWE/NVD correlation against scan findings",
      "Background scan jobs via Celery and Redis",
      "AI-assisted mitigation recommendations",
      "REST API and React dashboard integration"
    ],
    "challenge": "Most vulnerability scanners are siloed—either static analysis, dynamic checks, or external intelligence. Unifying these into a coherent workflow with AI-augmented remediation guidance was the core challenge.",
    "solution": "A pipeline architecture where Celery workers process scan jobs, Redis handles the message broker, FastAPI serves results, and React visualizes findings alongside external intelligence and AI mitigation advice.",
    "github": "https://github.com/chege-5/vulnexus",
    "demo": "",
    "visualType": "security",
    "accent": "green",
    "cardTitle": "VulNexus",
    "category": "Security",
    "label": "SECURITY & AI"
  },
  {
    "id": "hashx",
    "title": "HashX",
    "cardTitle": "HashX",
    "subtitle": "Hash comparison and matching system",
    "category": "Security",
    "label": "CYBERSECURITY & HASH MATCHING",
    "description": "A cybersecurity utility for comparing hash values and identifying matches clearly.",
    "summary": "HashX is a hash comparison and matching system in my cybersecurity portfolio. It brings hash values into a focused comparison workflow, making it easier to identify matching values and inspect the result.",
    "technologies": [
      "Hash matching",
      "Cybersecurity",
      "Data comparison"
    ],
    "features": [
      "Compare hash values",
      "Identify matching hashes",
      "Present comparison outcomes clearly"
    ],
    "architecture": [
      "Hash values",
      "Comparison",
      "Match results"
    ],
    "challenge": "Manually comparing long hash strings is error-prone and can make matches easy to miss.",
    "solution": "A focused matching workflow that compares hash values and presents the outcome clearly.",
    "visualType": "hash",
    "artworkCaption": "COMPARE. MATCH. UNDERSTAND.",
    "github": "https://github.com/chege-5/HashX",
    "githubPlaceholder": true
  },
  {
    "id": "sentinelx",
    "title": "SentinelX",
    "cardTitle": "SentinelX",
    "subtitle": "Adaptive ML-driven cyber defense agent",
    "category": "Security",
    "label": "MACHINE LEARNING & CYBER DEFENSE",
    "description": "An adaptive cyber defense agent using machine learning to investigate system behavior and anomalies. Still in development.",
    "summary": "SentinelX is an ambitious cyber defense agent under active development. Its architecture brings together behavior-based anomaly detection, log analysis, and adaptive response research. The goal is to learn from system activity and support more informed defensive decisions.",
    "technologies": [
      "Python",
      "Machine learning",
      "Scikit-learn",
      "Pandas",
      "NumPy"
    ],
    "features": [
      "Behavior-based anomaly detection",
      "System and application log analysis",
      "Adaptive learning and response research",
      "Modular defense-agent architecture"
    ],
    "architecture": [
      "System and network activity",
      "Feature preparation",
      "Anomaly detection",
      "Response evaluation",
      "Learning feedback"
    ],
    "challenge": "Threat detection has to distinguish unusual behavior from normal activity while keeping defensive responses proportionate.",
    "solution": "Develop a modular agent that combines learned behavior patterns, log intelligence, and an adaptive feedback loop.",
    "visualType": "agent",
    "status": "In development",
    "github": "https://github.com/chege-5/sentinelX",
    "artworkCaption": "ADAPTIVE DEFENSE · IN DEVELOPMENT"
  },
  {
    "id": "transwest",
    "title": "Transwest — SACCO Management",
    "subtitle": "Enterprise Financial Management System",
    "description": "A SACCO management system bringing members, loans, transactions, and role-based financial workflows together.",
    "summary": "A serious enterprise-style application that handles authentication with JWT, role-based access control, member lifecycle, accounts, loans, transactions, financial ledgers, and dashboards across multiple privileged roles.",
    "architecture": {
      "frontend": "React",
      "backend": "ASP.NET Core / .NET",
      "database": "PostgreSQL",
      "orm": "Entity Framework Core",
      "auth": "JWT access and refresh tokens",
      "authorization": "RBAC"
    },
    "technologies": [
      "React",
      "ASP.NET Core",
      ".NET",
      "PostgreSQL",
      "Entity Framework Core",
      "JWT",
      "RBAC",
      "REST APIs"
    ],
    "features": [
      "JWT authentication with refresh tokens",
      "Role-based access control (RBAC)",
      "Member, account, loan, and transaction management",
      "Financial ledger and administrative workflows",
      "Admin dashboards and reporting views",
      "Secure password handling and OTP workflows"
    ],
    "roles": [
      "ADMIN",
      "EXECUTIVE_MANAGER",
      "CREDIT_OFFICER",
      "TELLER",
      "LOAN_OFFICER",
      "MEMBER",
      "AUDITOR",
      "TREASURER",
      "SECRETARY"
    ],
    "challenge": "Financial workflows need consistent permissions and reliable records across members, accounts, loans, and transactions.",
    "solution": "A React interface connected to a .NET service layer, PostgreSQL persistence, and role-based access controls.",
    "github": "https://github.com/chege-5/Transwest",
    "demo": "",
    "visualType": "financial",
    "accent": "orange",
    "cardTitle": "Transwest",
    "category": "Full-stack",
    "label": "FINANCIAL SOFTWARE",
    "githubPlaceholder": true
  },
  {
    "id": "kodisha",
    "title": "Kodisha",
    "cardTitle": "Kodisha",
    "subtitle": "Rental and property management system",
    "category": "Full-stack",
    "label": "PROPERTY MANAGEMENT",
    "description": "A Node.js rental management system connecting property operations, billing, and tenant workflows.",
    "summary": "Kodisha is a property management platform built around a Node.js and Express backend. It brings rental administration, automated billing, utility tracking, and payment collection into a connected workflow for property managers and tenants.",
    "technologies": [
      "Node.js",
      "Express.js",
      "React",
      "PostgreSQL",
      "Prisma",
      "Redis"
    ],
    "features": [
      "Rental and property administration",
      "Automated billing and utility tracking",
      "Payment collection workflows",
      "Connected manager and tenant experiences"
    ],
    "architecture": {
      "frontend": "React",
      "backend": "Node.js / Express.js",
      "data": "PostgreSQL / Prisma",
      "support": "Redis"
    },
    "challenge": "Rental administration can become fragmented across property records, bills, utilities, and payment follow-up.",
    "solution": "Bring the core rental workflows into one application backed by a structured API and persistent records.",
    "visualType": "rental",
    "github": "https://github.com/chege-5/kodisha",
    "artworkCaption": "PROPERTIES. PEOPLE. CONNECTED."
  },
  {
    "id": "summai",
    "title": "summAI",
    "cardTitle": "summAI",
    "subtitle": "NotebookLM-inspired study workspace",
    "category": "AI & data",
    "label": "AI STUDY WORKSPACE",
    "description": "A NotebookLM-inspired study workspace in the Node.js ecosystem, bringing sources, summaries, and revision interfaces together.",
    "summary": "summAI explores a NotebookLM-inspired approach to studying: organize material, work with sources, and move between chat, summaries, and revision tools in one workspace. The public version is an interface prototype, with the broader AI study experience continuing to evolve.",
    "technologies": [
      "Node.js",
      "JavaScript",
      "React",
      "Vite"
    ],
    "features": [
      "Notebook-style study organization",
      "Source and study-material views",
      "Chat and summary interface concepts",
      "Revision-tool interface exploration"
    ],
    "architecture": [
      "Study sources",
      "Notebook workspace",
      "Summary and chat views",
      "Revision interfaces"
    ],
    "challenge": "Study tools often separate source material from the notes and revision activities that depend on it.",
    "solution": "Design a connected study workspace that keeps sources, summaries, and revision interfaces in context.",
    "visualType": "notes",
    "status": "Prototype",
    "github": "https://github.com/chege-5/summAI",
    "artworkCaption": "SOURCE-LED STUDY WORKSPACE"
  },
  {
    "id": "tutor-ai",
    "title": "Tutor AI",
    "cardTitle": "Tutor AI",
    "subtitle": "FastAPI-powered school revision AI agent",
    "category": "AI & data",
    "label": "EDUCATION & AI",
    "description": "An AI agent for school study and revision, with a Python and FastAPI backend for document-led learning.",
    "summary": "Tutor AI is a study and revision agent built with FastAPI. It organizes learning material into study units, processes documents, and supports source-aware summaries and study conversations, helping learners return to the material behind an explanation.",
    "technologies": [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Celery",
      "pgvector"
    ],
    "features": [
      "Study-unit organization",
      "Document processing workflows",
      "Source-aware summaries and study chat",
      "Background document and AI jobs"
    ],
    "architecture": {
      "api": "Python / FastAPI",
      "data": "PostgreSQL / pgvector",
      "jobs": "Celery / Redis",
      "workflow": "Study material, processing, summaries, and questions"
    },
    "challenge": "Revision support is more useful when explanations stay connected to the learner’s own study material.",
    "solution": "Build a document-led learning workflow with background processing and source-aware AI responses.",
    "visualType": "tutor",
    "github": "https://github.com/chege-5/tutorAI_logic",
    "artworkCaption": "LEARN. QUESTION. REVISE."
  },
  {
    "id": "mastered-seed",
    "title": "Mastered Seed / Auto Spares",
    "subtitle": "Automotive Spare-Parts Intelligence Platform",
    "description": "A technology-driven automotive spare-parts platform involving product discovery, data collection, normalization, matching, and regional sourcing.",
    "summary": "The platform gathers part numbers, pricing, images, and availability from regional markets, normalizes the data, and matches parts across sources such as Kenya, Japan, the USA, the UK, and China.",
    "architecture": {
      "core": "Web scraping & data normalization",
      "matching": "Part number parsing & fuzzy matching",
      "sources": "Regional market aggregation",
      "data": "Structured product database"
    },
    "technologies": [
      "Web scraping",
      "Data normalization",
      "Fuzzy matching",
      "Regional aggregation",
      "Structured data"
    ],
    "features": [
      "Multi-source part discovery and scraping",
      "Part number normalization and matching",
      "Regional source grouping (Kenya, Japan, USA, UK, China)",
      "Pricing aggregation and image extraction",
      "Automated product catalog pipelines"
    ],
    "challenge": "Automotive parts data is messy, inconsistent across sources, and requires mapping identifiers that do not share a common schema.",
    "solution": "A normalization pipeline that parses part numbers, extracts pricing and images, groups regional sources, and applies fuzzy matching to present unified product records.",
    "github": "https://github.com/chege-5/Mastered-Seed",
    "demo": "",
    "visualType": "automotive",
    "accent": "orange",
    "cardTitle": "Mastered Seed",
    "category": "Data & automation",
    "label": "DATA & AUTOMATION",
    "githubPlaceholder": true
  }
]
