export const personalInfo = {
  name: 'Vaibhav Gupta',
  title: 'Software Engineer',
  tagline: 'Building distributed systems, backend infrastructure & AI-powered tooling',
  email: 'vaibhav.gupta.22031@iitgoa.ac.in',
  phone: '+91 9219545449',
  location: 'Bengaluru, India',
  availability: 'Open to Onsite & Remote',
  github: 'https://github.com/vaibhavgupta856',
  linkedin: 'https://linkedin.com/in/vaibhav-gupta-6ba288256',
  leetcode: 'https://leetcode.com/u/gupta__vaibhav__/',
  codeforces: 'https://codeforces.com/profile/Vaibhav_Gupta_22',
  resume: 'https://drive.google.com/file/d/1d4KEYa98v__4pQAC0DgRBuUT0pLrMFcE/view',
  profileImage: '/profile.jpg',
}

export const stats = [
  {
    label: 'Codeforces',
    value: '1841',
    suffix: 'Expert',
    href: 'https://codeforces.com/profile/Vaibhav_Gupta_22',
  },
  {
    label: 'LeetCode',
    value: '2104',
    suffix: 'Knight',
    href: 'https://leetcode.com/u/gupta__vaibhav__/',
  },
  { label: 'DSA Solved', value: '1200+', suffix: 'Problems' },
]

export const summary =
  'Computer Science graduate from IIT Goa with dual Siemens EDA internships building backend infrastructure, distributed systems, and AI-integrated tooling — including a 2,000+ option configuration system that improved runtime performance by 20%. Strong foundation in algorithms and system design.'

export const education = {
  school: 'Indian Institute of Technology (IIT), Goa',
  degree: 'B.Tech, Computer Science and Engineering',
  period: 'Nov 2022 — May 2026',
  gpa: '7.79/10',
}

export const skills = [
  {
    category: 'Languages',
    items: ['C/C++', 'Go', 'Python', 'Java', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    category: 'Frameworks & Infra',
    items: [
      'REST APIs',
      'Microservices',
      'React',
      'FastAPI',
      'Express.js',
      'Docker',
      'Redis',
      'PostgreSQL',
      'MongoDB',
      'AWS',
      'CI/CD',
    ],
  },
  {
    category: 'AI / ML',
    items: [
      'LLM Integration',
      'RAG Pipelines',
      'Multi-agent Systems',
      'Agentic AI',
      'Vector Databases',
    ],
  },
  {
    category: 'CS Core',
    items: [
      'Data Structures & Algorithms',
      'Operating Systems',
      'Machine Learning',
      'Distributed Systems',
      'System Design',
    ],
  },
]

export const experience = [
  {
    role: 'Research and Development Intern',
    company: 'Siemens EDA',
    location: 'Bengaluru',
    period: 'Jan 2026 — Jun 2026',
    highlights: [
      'Engineered a centralized C registry system managing 2,000+ runtime configuration options in Questa Sim, consolidating feature-flag resolution into a single configurable system.',
      'Boosted Questa Sim runtime performance by 20% with a rollback mechanism and cached feature lookups, enabling newer builds to adopt older release behavior without backend code modifications.',
      'Built type-checking and regression testing workflows covering 100+ feature switches into Questa Sim\'s release pipeline, catching backward-compatibility breaks.',
    ],
  },
  {
    role: 'Software Engineer Intern',
    company: 'Siemens EDA',
    location: 'Bengaluru',
    period: 'May 2025 — Jul 2025',
    highlights: [
      'Decreased VHDL compiler memory utilization by 15% by restructuring datatype storage layouts to enforce optimal alignment.',
      'Identified compiler-specific alignment discrepancies across 3 C compiler toolchains by authoring 15 VHDL test cases.',
      'Expanded production build pipelines to generate 2 debug-only artifacts, enabling customer-facing debugging for Questa Sim.',
    ],
  },
]

export type Project = {
  name: string
  subtitle: string
  period: string
  tech: string[]
  description: string
  highlights: string[]
  gradient: string
  github?: string
  demo?: string
}

export const projects: Project[] = [
  {
    name: 'VOLTFORGE',
    subtitle: 'OCPP 2.1 Charge Point Lab',
    period: '2026',
    tech: ['Node.js', 'Express', 'React', 'Three.js', 'OCPP 2.1', 'Socket.IO'],
    description:
      'Browser-based EVSE lab that simulates a real charge point: React/Three.js operator console, Node ChargePoint engine, and OCPP 2.1 JSON over WebSocket to a CSMS — REST + Socket.IO for control, never OCPP in the browser.',
    highlights: [
      'ChargePoint21 engine with connector FSM, meter simulation, auth modes, and CMS command handlers',
      '3D yard HMI (React Three Fiber) plus commission flow wired to Helios WSS bases on Render or local lab TLS',
      'Live OCPP trace, Socket.IO state sync, demo preview mode, and Render-deployed production lab',
    ],
    gradient: 'from-rose-500 via-red-500 to-amber-400',
    github: 'https://github.com/vaibhavgupta856/voltforge-ocpp-lab',
    demo: 'https://voltforge-ocpp-lab.onrender.com/',
  },
  {
    name: 'HELIOS',
    subtitle: 'OCPP 2.1 CSMS Platform',
    period: '2026',
    tech: ['Node.js', 'Express', 'React', 'OCPP 2.1', 'Socket.IO', 'IAM'],
    description:
      'Central System Management Software for EV charging: enrolls charge points, receives BootNotification and TransactionEvent traffic, and exposes a full operator console with digital twin, sessions, RFID, and tariffs.',
    highlights: [
      'WebSocket CSMS at `/ocpp/2.1/{stationId}` with security profiles, WSS pairing card, and live message trace',
      'Dashboard KPIs, station org tree, remote operations queue with Approve workflow, and Ask Helios AI copilot',
      'Paired with Voltforge in production — hosted on Render with edge TLS and multi-theme operator UI',
    ],
    gradient: 'from-sky-400 via-blue-500 to-indigo-500',
    github: 'https://github.com/vaibhavgupta856/helios-ocpp21-cms',
    demo: 'https://helios-ocpp21-cms.onrender.com/#/dashboard',
  },
  {
    name: 'CHESS ARENA',
    subtitle: '3D Real-Time Chess Platform',
    period: '2026',
    tech: ['Go', 'React', 'Three.js', 'WebSocket', 'SQLite'],
    description:
      'Server-authoritative chess platform with a cinematic 3D board, real-time multiplayer, bot opponents, accounts, friends, ELO ratings, and an in-game coach — backed by a custom Go engine.',
    highlights: [
      'Custom Go chess engine with full rules, UCI/SAN moves, and WebSocket live sync',
      'React Three Fiber 3D board with animated pieces, Valhalla capture platforms, and 2D fallback',
      'Hot-seat, online rooms, adjustable bots, JWT auth, friends, rated ELO, and coach (local/bot)',
    ],
    gradient: 'from-amber-400 via-orange-500 to-rose-500',
    github: 'https://github.com/vaibhavgupta856/chess_arena',
    demo: 'https://chessarena-vaibhavgupta856.vercel.app/',
  },
  {
    name: 'REPO PILOT',
    subtitle: 'LLM-Powered Coding Agent',
    period: 'Jun 2025',
    tech: ['FastAPI', 'React', 'TypeScript', 'Tree-sitter', 'GitPython'],
    description:
      'Autonomous coding agent with a 4-stage pipeline (Plan → Code → Test → Self-Heal) and multi-provider LLM routing across 5 inference backends.',
    highlights: [
      'JWT-authenticated isolated workspaces with integrated terminals and live diff reviews',
      'Repository intelligence engine using Tree-sitter and GitPython for dependency graph parsing',
      'Multi-provider routing across OpenAI, Anthropic, Gemini, OpenRouter, and Ollama',
    ],
    gradient: 'from-emerald-500 via-teal-500 to-cyan-400',
    github: 'https://github.com/vaibhavgupta856/REPOPILOT',
    demo: 'https://repopilot-vaibhavgupta856s-projects.vercel.app/',
  },
  {
    name: 'SENTINEL',
    subtitle: 'AIOps Load Balancer',
    period: 'Mar 2026 — May 2026',
    tech: ['Python', 'C++', 'FastAPI', 'React', 'SQLite'],
    description:
      'Distributed AIOps orchestration system scalable to 1,000+ nodes with CPU-aware load balancing, circuit breakers, and self-healing recovery under chaos engineering.',
    highlights: [
      '3-second telemetry polling with circuit breakers at 85% CPU and 3-retry fault-tolerant job rerouting',
      'React/TypeScript observability dashboard with SQLite time-series storage for real-time monitoring',
      'Validated self-healing recovery under chaos engineering fault injection',
    ],
    gradient: 'from-indigo-500 via-purple-500 to-cyan-400',
    github: 'https://github.com/vaibhavgupta856/SENTINEL-AIOps_Load_Balancer',
    demo: 'https://dashboard-zeta-five-78.vercel.app/',
  },
  {
    name: 'AI WEBSITE BUILDER',
    subtitle: 'Gemini-Powered Code Generation',
    period: '2025',
    tech: ['React', 'TypeScript', 'Express', 'Gemini AI', 'WebContainer'],
    description:
      'Full-stack AI tool that generates complete websites from text prompts — with an interactive file explorer, Monaco editor, and in-browser live preview.',
    highlights: [
      'Google Gemini integration for end-to-end React/Node project scaffolding from natural language',
      'Monaco editor with syntax highlighting and WebContainer API for real-time in-browser execution',
      'Express backend with template detection, chat-based codegen, and deploy-ready Vercel/Railway configs',
    ],
    gradient: 'from-violet-500 via-fuchsia-500 to-pink-400',
    github: 'https://github.com/vaibhavgupta856/AI_Website_Builder',
  },
  {
    name: 'PYNQ CLUSTER',
    subtitle: 'Heterogeneous FPGA Cluster Tutorial',
    period: '2025',
    tech: ['Python', 'MPI', 'PYNQ', 'FPGA', 'Distributed Systems'],
    description:
      'Tutorial for connecting multiple PYNQ-Z2 boards into a heterogeneous cluster — combining ARM CPUs and FPGA accelerators for parallel distributed computing.',
    highlights: [
      'Step-by-step cluster setup with Ethernet networking, power, and SD card provisioning',
      'Distributed matrix multiplication via MPI across boards with optional FPGA offload',
      'Distributed KNN classification with workload partitioning across the cluster',
    ],
    gradient: 'from-orange-500 via-amber-500 to-yellow-400',
    github: 'https://github.com/vaibhavgupta856/PYNQ-Z2-Cluster',
  },
]

export const achievements = [
  {
    title: 'LeetCode Rating',
    value: '2104 (Knight)',
    icon: 'code',
    href: 'https://leetcode.com/u/gupta__vaibhav__/',
  },
  {
    title: 'Codeforces Rating',
    value: '1841 (Expert)',
    icon: 'zap',
    href: 'https://codeforces.com/profile/Vaibhav_Gupta_22',
  },
]

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]
