/* ============================================
   DATA
   ============================================ */

const PERSONAL = {
  name: 'Kihara Jimmy Chege',
  shortName: 'Jimmy Chege',
  title: 'Software Engineer & Cybersecurity Specialist',
  location: 'Nairobi, Kenya',
  email: 'jimmykihara05@gmail.com',
  github: 'https://github.com/chege-5',
  linkedin: 'https://linkedin.com/in/kihara-chege',
  website: 'https://jimmysite.me',
};

const TYPEWORDS = [
  'Software Engineer',
  'Cybersecurity Specialist',
  'Full-Stack Developer',
  'API Architect',
];

const SKILLS = [
  {
    id: 'frontend',
    label: 'Frontend',
    color: '#00FF88',
    technologies: [
      { name: 'React', icon: '⚛', detail: 'Component-based UIs and modern state management' },
      { name: 'JavaScript', icon: '🧐', detail: 'ES6+ and modern DOM APIs' },
      { name: 'JSX', icon: '📋', detail: 'React template syntax' },
      { name: 'Vite', icon: '⚡', detail: 'Fast builds and DX' },
      { name: 'HTML', icon: '📝', detail: 'Semantic markup' },
      { name: 'CSS', icon: '🌈', detail: 'Modern layout and custom properties' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    color: '#00D66F',
    technologies: [
      { name: 'C#', icon: '🔷', detail: '.NET ecosystem services' },
      { name: 'Python', icon: '🐍', detail: 'FastAPI scripting and AI tooling' },
      { name: 'Node.js', icon: '🟢', detail: 'JavaScript runtime and services' },
      { name: 'Express.js', icon: '🚂', detail: 'Lightweight API routing' },
      { name: 'ASP.NET Core', icon: '🧱', detail: 'Enterprise web APIs' },
      { name: '.NET', icon: '🛠', detail: 'Full stack framework' },
      { name: 'REST APIs', icon: '🔗', detail: 'Resource-oriented interfaces' },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    color: '#22C55E',
    technologies: [
      { name: 'PostgreSQL', icon: '🐘', detail: 'Relational database' },
      { name: 'MySQL', icon: '🌞', detail: 'Relational database' },
      { name: 'MongoDB', icon: '🌿', detail: 'Document store' },
      { name: 'Redis', icon: '🔴', detail: 'Caching and message broker' },
      { name: 'Prisma', icon: '🔮', detail: 'Type-safe ORM' },
      { name: 'EF Core', icon: '🗄', detail: '.NET ORM' },
    ],
  },
  {
    id: 'security',
    label: 'Security',
    color: '#FF7A18',
    technologies: [
      { name: 'Cybersecurity', icon: '🛡', detail: 'Defensive mindset' },
      { name: 'SAST', icon: '🔍', detail: 'Static analysis' },
      { name: 'DAST', icon: '🧪', detail: 'Dynamic testing' },
      { name: 'Web Security', icon: '🌍', detail: 'XSS, CSRF, injection defense' },
      { name: 'API Security', icon: '🔐', detail: 'Authz, rate limiting, validation' },
      { name: 'CVE/CWE', icon: '🔻', detail: 'Vulnerability research' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    color: '#16A34A',
    technologies: [
      { name: 'Git', icon: '📖', detail: 'Version control' },
      { name: 'GitHub', icon: '🐚', detail: 'Open source and collaboration' },
      { name: 'VS Code', icon: '💻', detail: 'Primary editor' },
      { name: 'Linux/CLI', icon: '🐜', detail: 'Server and automation' },
      { name: 'AI Coding Tools', icon: '🤖', detail: 'Assisted development' },
      { name: 'API Testing', icon: '🧻', detail: 'Endpoint validation' },
    ],
  },
];

const SKILL_LEVELS = [
  { name: 'Frontend', value: 92 },
  { name: 'Backend', value: 88 },
  { name: 'Database', value: 85 },
  { name: 'Security', value: 82 },
  { name: 'DevOps', value: 78 },
  { name: 'Architecture', value: 87 },
  { name: 'Testing', value: 80 },
  { name: 'Security Ops', value: 76 },
  { name: 'API Design', value: 90 },
  { name: 'AI/ML', value: 68 },
];

const PROJECTS = [
  {
    id: 'vulnnexus',
    title: 'VulNexus',
    subtitle: 'Hybrid AI-Based Cryptographic Auditing System',
    description:
      'A hybrid AI-powered security auditing platform combining SAST/DAST analysis, external threat intelligence, and AI-assisted mitigation guidance.',
    summary:
      'VulNexus models the end-to-end audit lifecycle. Authorized endpoints feed a crawler/scanner that performs security analysis, TLS/HTTPS inspection, protocol and configuration checks, and CVE/CWE/NVD correlation before presenting AI-assisted mitigation guidance in a dashboard.',
    architecture: [
      'Authorized endpoint',
      'Crawler / scanner',
      'Security analysis',
      'TLS / HTTPS analysis',
      'Protocol / configuration analysis',
      'External intelligence',
      'CVE / CWE / NVD matching',
      'AI-assisted mitigation',
      'Dashboard',
    ],
    technologies: ['FastAPI', 'Python', 'PostgreSQL', 'Celery', 'Redis', 'React', 'AI', 'CVE/CWE', 'NVD', 'Censys', 'Shodan'],
    features: [
      'Automated endpoint discovery and crawling',
      'TLS/SSL configuration and certificate analysis',
      'CVE/CWE/NVD correlation against scan findings',
      'Background scan jobs via Celery and Redis',
      'AI-assisted mitigation recommendations',
      'REST API and React dashboard integration',
    ],
    challenge:
      'Most vulnerability scanners are siloed—either static analysis, dynamic checks, or external intelligence. Unifying these into a coherent workflow with AI-augmented remediation guidance was the core challenge.',
    solution:
      'A pipeline architecture where Celery workers process scan jobs, Redis handles the message broker, FastAPI serves results, and React visualizes findings alongside external intelligence and AI mitigation advice.',
    visualType: 'security',
    accent: 'green',
  },
  {
    id: 'sacco-management',
    title: 'SACCO Management Platform',
    subtitle: 'Enterprise Financial Management System',
    description:
      'A full-stack financial management system for members, accounts, loans, transactions, authentication, authorization, financial records, and administrative workflows.',
    summary:
      'A serious enterprise-style application that handles authentication with JWT, role-based access control, member lifecycle, accounts, loans, transactions, financial ledgers, and dashboards across multiple privileged roles.',
    architectureObj: {
      frontend: 'React',
      backend: 'ASP.NET Core / .NET',
      database: 'PostgreSQL',
      orm: 'Entity Framework Core',
      auth: 'JWT access and refresh tokens',
      authorization: 'RBAC',
    },
    technologies: ['React', 'ASP.NET Core', '.NET', 'PostgreSQL', 'Entity Framework Core', 'JWT', 'RBAC', 'REST APIs'],
    features: [
      'JWT authentication with refresh tokens',
      'Role-based access control (RBAC)',
      'Member, account, loan, and transaction management',
      'Financial ledger and administrative workflows',
      'Admin dashboards and reporting views',
      'Secure password handling and OTP workflows',
    ],
    roles: ['ADMIN', 'EXECUTIVE_MANAGER', 'CREDIT_OFFICER', 'TELLER', 'LOAN_OFFICER', 'MEMBER', 'AUDITOR', 'TREASURER', 'SECRETARY'],
    challenge:
      'Migrating a mature financial system required maintaining data integrity, strict authorization semantics, and zero-downtime behavior across a reference Node.js/Express implementation and a .NET rewrite.',
    solution:
      'A clear API-first contract between the Node.js/Express source and the ASP.NET Core implementation, with consistent RBAC models, PostgreSQL persistence, and secure token handling across both stacks.',
    visualType: 'financial',
    accent: 'orange',
  },
  {
    id: 'transwest',
    title: 'Transwest',
    subtitle: 'Enterprise Application with C#/.NET and React',
    description:
      'A full-stack enterprise software project demonstrating C#/.NET backend services, React frontend architecture, REST API integration, and polished user experience.',
    summary:
      'Transwest highlights the full engineering cycle: domain modeling in C#, database integration, RESTful service design, and a responsive React frontend that communicates cleanly with the backend.',
    architectureObj: {
      frontend: 'React',
      backend: 'C#/.NET',
      api: 'REST APIs',
      database: 'Relational database integration',
    },
    technologies: ['C#', '.NET', 'React', 'REST APIs', 'SQL Server'],
    features: [
      'C#/.NET REST API layer',
      'React frontend with component architecture',
      'Database integration and domain modeling',
      'Responsive enterprise UI',
      'Role-aware views and workflows',
    ],
    challenge:
      'Translating enterprise business rules into maintainable API endpoints and a frontend that stays fast under complex data shapes.',
    solution:
      'A strongly typed C# API with clear resource contracts, combined with a React frontend that normalizes and caches data locally, resulting in a smooth UX and reliable backend communication.',
    visualType: 'enterprise',
    accent: 'green',
  },
  {
    id: 'mastered-seed',
    title: 'Mastered Seed / Auto Spares',
    subtitle: 'Automotive Spare-Parts Intelligence Platform',
    description:
      'A technology-driven automotive spare-parts platform involving product discovery, data collection, normalization, matching, and regional sourcing.',
    summary:
      'The platform gathers part numbers, pricing, images, and availability from regional markets, normalizes the data, and matches parts across sources such as Kenya, Japan, the USA, the UK, and China.',
    architectureObj: {
      core: 'Web scraping & data normalization',
      matching: 'Part number parsing & fuzzy matching',
      sources: 'Regional market aggregation',
      data: 'Structured product database',
    },
    technologies: ['Web scraping', 'Data normalization', 'Fuzzy matching', 'Regional aggregation', 'Structured data'],
    features: [
      'Multi-source part discovery and scraping',
      'Part number normalization and matching',
      'Regional source grouping (Kenya, Japan, USA, UK, China)',
      'Pricing aggregation and image extraction',
      'Automated product catalog pipelines',
    ],
    challenge:
      'Automotive parts data is messy, inconsistent across sources, and requires mapping identifiers that do not share a common schema.',
    solution:
      'A normalization pipeline that parses part numbers, extracts pricing and images, groups regional sources, and applies fuzzy matching to present unified product records.',
    visualType: 'automotive',
    accent: 'orange',
  },
];
