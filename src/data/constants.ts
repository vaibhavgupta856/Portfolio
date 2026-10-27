// order = keycap layout, 6 per row
export enum SkillNames {
  CPP = "cpp",
  PYTHON = "python",
  TS = "ts",
  JS = "js",
  GO = "go",
  JAVA = "java",
  REACT = "react",
  NEXTJS = "nextjs",
  THREEJS = "threejs",
  VITE = "vite",
  NODEJS = "nodejs",
  EXPRESS = "express",
  FASTAPI = "fastapi",
  POSTGRES = "postgres",
  MONGODB = "mongodb",
  REDIS = "redis",
  RABBITMQ = "rabbitmq",
  LINUX = "linux",
  DOCKER = "docker",
  AWS = "aws",
  GCP = "gcp",
  GIT = "git",
  GITHUB_ACTIONS = "githubactions",
  CLAUDE = "claude",
}
export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
  /** Optional local artwork for the 3D key; falls back to icon. */
  keyboardIcon?: string;
  /** Plastic color of the 3D keycap; independent of the HTML brand accent. */
  keyboardColor?: string;
  /** Browser KeyboardEvent.code, e.g. KeyJ. Defaults to the displayed key order. */
  shortcut?: string;
};
export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.CPP]: {
    id: 1,
    name: "cpp",
    label: "C / C++",
    shortDescription:
      "Questa Sim compiler work at Siemens EDA, plus 1,200+ competitive programming problems.",
    color: "#00599c",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    keyboardIcon: "/assets/keyboard/logos/cpp.svg",
    keyboardColor: "#00599c",
  },
  [SkillNames.PYTHON]: {
    id: 2,
    name: "python",
    label: "Python",
    shortDescription:
      "FastAPI services, the Sentinel job router and LightGBM demand forecasting.",
    color: "#3776ab",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    keyboardIcon: "/assets/keyboard/logos/python.svg",
    keyboardColor: "#3776ab",
  },
  [SkillNames.TS]: {
    id: 3,
    name: "ts",
    label: "TypeScript",
    shortDescription:
      "Default for anything with a UI or a Node service behind it.",
    color: "#007acc",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    keyboardIcon: "/assets/keyboard/logos/ts.svg",
    keyboardColor: "#008fd5",
  },
  [SkillNames.JS]: {
    id: 4,
    name: "js",
    label: "JavaScript",
    shortDescription: "The language under every browser feature I've shipped.",
    color: "#f0db4f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    keyboardIcon: "/assets/keyboard/logos/js.svg",
    keyboardColor: "#ff9408",
  },
  [SkillNames.GO]: {
    id: 5,
    name: "go",
    label: "Go",
    shortDescription:
      "Server-authoritative chess engine behind ChessArena's realtime games.",
    color: "#00add8",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg",
    keyboardIcon: "/assets/keyboard/logos/go.svg",
    keyboardColor: "#00add8",
  },
  [SkillNames.JAVA]: {
    id: 6,
    name: "java",
    label: "Java",
    shortDescription: "Object oriented design and coursework staple.",
    color: "#f89820",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    keyboardIcon: "/assets/keyboard/logos/java.svg",
    keyboardColor: "#e76f00",
  },
  [SkillNames.REACT]: {
    id: 7,
    name: "react",
    label: "React",
    shortDescription:
      "32-screen EV charging operator console, simulators and dashboards.",
    color: "#61dafb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    keyboardIcon: "/assets/keyboard/logos/react.svg",
    keyboardColor: "#00cce8",
  },
  [SkillNames.NEXTJS]: {
    id: 8,
    name: "nextjs",
    label: "Next.js",
    shortDescription: "Server-rendered React, including this portfolio.",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    keyboardIcon: "/assets/keyboard/logos/nextjs.svg",
    keyboardColor: "#333537",
  },
  [SkillNames.THREEJS]: {
    id: 9,
    name: "threejs",
    label: "Three.js / R3F",
    shortDescription:
      "3D chess board in ChessArena and the VoltForge charger yard.",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
    keyboardIcon: "/assets/keyboard/logos/threejs.svg",
    keyboardColor: "#1b1f2e",
  },
  [SkillNames.VITE]: {
    id: 10,
    name: "vite",
    label: "Vite",
    shortDescription: "Fast builds for the React front ends I ship.",
    color: "#646cff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
    keyboardIcon: "/assets/keyboard/logos/vite.svg",
    keyboardColor: "#646cff",
  },
  [SkillNames.NODEJS]: {
    id: 11,
    name: "nodejs",
    label: "Node.js",
    shortDescription:
      "Production EV charging services and a 19-command charger simulator.",
    color: "#6cc24a",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    keyboardIcon: "/assets/keyboard/logos/nodejs.svg",
    keyboardColor: "#00952c",
  },
  [SkillNames.EXPRESS]: {
    id: 12,
    name: "express",
    label: "Express",
    shortDescription: "REST APIs with role based access across 53 permissions.",
    color: "#fff",
    icon: "https://cdn.simpleicons.org/express/9CA3AF",
    keyboardIcon: "/assets/keyboard/logos/express.svg",
    keyboardColor: "#343638",
  },
  [SkillNames.FASTAPI]: {
    id: 13,
    name: "fastapi",
    label: "FastAPI",
    shortDescription: "Backends for Repo Pilot and the Sentinel load balancer.",
    color: "#009688",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    keyboardIcon: "/assets/keyboard/logos/fastapi.svg",
    keyboardColor: "#009688",
  },
  [SkillNames.POSTGRES]: {
    id: 14,
    name: "postgres",
    label: "PostgreSQL",
    shortDescription:
      "Schema design and keyset pagination that made a core page 20x faster.",
    color: "#336791",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    keyboardIcon: "/assets/keyboard/logos/postgres.svg",
    keyboardColor: "#146888",
  },
  [SkillNames.MONGODB]: {
    id: 15,
    name: "mongodb",
    label: "MongoDB",
    shortDescription: "Document storage when the schema needs to flex.",
    color: "#47a248",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    keyboardIcon: "/assets/keyboard/logos/mongodb.svg",
    keyboardColor: "#00c51b",
  },
  [SkillNames.REDIS]: {
    id: 16,
    name: "redis",
    label: "Redis",
    shortDescription: "Caching and fast shared state between services.",
    color: "#dc382d",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    keyboardIcon: "/assets/keyboard/logos/redis.svg",
    keyboardColor: "#dc382d",
  },
  [SkillNames.RABBITMQ]: {
    id: 17,
    name: "rabbitmq",
    label: "RabbitMQ",
    shortDescription: "Message queues for decoupled, retryable work.",
    color: "#ff6600",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rabbitmq/rabbitmq-original.svg",
    keyboardIcon: "/assets/keyboard/logos/rabbitmq.svg",
    keyboardColor: "#ff6600",
  },
  [SkillNames.LINUX]: {
    id: 18,
    name: "linux",
    label: "Linux",
    shortDescription: "Where the builds, servers and compilers actually run.",
    color: "#fff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    keyboardIcon: "/assets/keyboard/logos/linux.svg",
    keyboardColor: "#333537",
  },
  [SkillNames.DOCKER]: {
    id: 19,
    name: "docker",
    label: "Docker",
    shortDescription: "Reproducible services from laptop to deploy.",
    color: "#2496ed",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    keyboardIcon: "/assets/keyboard/logos/docker.svg",
    keyboardColor: "#009fe8",
  },
  [SkillNames.AWS]: {
    id: 20,
    name: "aws",
    label: "AWS",
    shortDescription: "Cloud hosting and managed infrastructure.",
    color: "#ff9900",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    keyboardIcon: "/assets/keyboard/logos/aws.svg",
    keyboardColor: "#ff9208",
  },
  [SkillNames.GCP]: {
    id: 21,
    name: "gcp",
    label: "Google Cloud",
    shortDescription: "Cloud compute and storage on Google's side.",
    color: "#4285f4",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
    keyboardIcon: "/assets/keyboard/logos/gcp.svg",
    keyboardColor: "#008fd5",
  },
  [SkillNames.GIT]: {
    id: 22,
    name: "git",
    label: "Git",
    shortDescription: "Version control for every line above.",
    color: "#f1502f",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    keyboardIcon: "/assets/keyboard/logos/git.svg",
    keyboardColor: "#ff4622",
  },
  [SkillNames.GITHUB_ACTIONS]: {
    id: 23,
    name: "githubactions",
    label: "CI/CD",
    shortDescription:
      "Pipelines with type checking, verification and regression tests before release.",
    color: "#2088ff",
    icon: "https://cdn.simpleicons.org/githubactions/2088FF",
    keyboardIcon: "/assets/keyboard/logos/githubactions.svg",
    keyboardColor: "#2088ff",
  },
  [SkillNames.CLAUDE]: {
    id: 24,
    name: "claude",
    label: "LLM Agents",
    shortDescription:
      "Repo Pilot routes across 5 model providers so one outage never stops a run.",
    color: "#d97757",
    icon: "https://cdn.simpleicons.org/claude/D97757",
    keyboardIcon: "/assets/keyboard/logos/claude.svg",
    keyboardColor: "#d97757",
  },
};

export type Experience = {
  id: number;
  // multiple periods = returning stint, avoids a duplicate card
  periods: { start: string; end: string }[];
  title: string;
  company: string;
  description: string[];
  skills: SkillNames[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    periods: [{ start: "Jul 2026", end: "Present" }],
    title: "Product Development and Management",
    company: "Massive Mobility · Gurugram",
    description: [
      "Shipped an EV charging platform from an empty repository to 32 screens in daily use, designing the Postgres schema, Node/Express services and React/TypeScript UI single-handedly.",
      "Turned the operator console into one screen for live charger status, multi-currency billing and a natural language assistant, scoped by 53 permissions across 4 roles.",
      "Cut hardware out of the test loop with a charger simulator, so the team could integration-test all 19 charger commands before any physical unit existed.",
      "Gave operations a next-day demand forecast at 97% accuracy across 1,000+ sites, using LightGBM with prediction intervals and a dashboard around it.",
      "Made a core page 20x faster (20 queries / 48 ms to 11 queries / 2.4 ms) by switching to keyset pagination and dropping an unused count query.",
      "Traced 190,000+ sessions to 47 charger models that never report a disconnect, and specified the fix for a double-billing defect.",
    ],
    skills: [
      SkillNames.TS,
      SkillNames.REACT,
      SkillNames.NODEJS,
      SkillNames.EXPRESS,
      SkillNames.POSTGRES,
      SkillNames.PYTHON,
    ],
  },
  {
    id: 2,
    periods: [{ start: "Jan 2026", end: "Jun 2026" }],
    title: "Research and Development Intern",
    company: "Siemens EDA · Bengaluru",
    description: [
      "Built the version control layer that lets any new Questa Sim build reproduce an older release's behavior with no backend code changes, and made it 20% faster by caching feature lookups.",
      "Centralized 2,000+ runtime configuration options into one registry in C, replacing feature flag checks scattered across the codebase.",
      "Caught compatibility breaks before release across 100+ feature switches by adding type checking, verification and regression testing to the build pipeline.",
    ],
    skills: [SkillNames.CPP, SkillNames.LINUX, SkillNames.GITHUB_ACTIONS, SkillNames.GIT],
  },
  {
    id: 3,
    periods: [{ start: "May 2025", end: "Jul 2025" }],
    title: "Software Engineer Intern",
    company: "Siemens EDA · Bengaluru",
    description: [
      "Reduced VHDL compiler memory use by 15% by restructuring how datatypes are stored so they align optimally.",
      "Exposed divergent offset calculation across 3 C compiler toolchains with 15 test cases checking datatype alignment under each.",
    ],
    skills: [SkillNames.CPP, SkillNames.LINUX],
  },
];

export const EDUCATION = {
  school: "Indian Institute of Technology (IIT), Goa",
  degree: "B.Tech, Computer Science and Engineering",
  period: { start: "2022", end: "2026" },
  coursework: [
    "Data Structures and Algorithms",
    "Operating Systems",
    "Distributed Systems",
    "System Design",
    "Object Oriented Design",
    "Concurrency",
  ],
};

export type Achievement = {
  label: string;
  value: string;
  detail: string;
  href?: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    label: "Codeforces",
    value: "1848",
    detail: "Expert",
    href: "https://codeforces.com/profile/Vaibhav_Gupta_22",
  },
  {
    label: "LeetCode",
    value: "2104",
    detail: "Knight",
    href: "https://leetcode.com/u/gupta__vaibhav__/",
  },
  {
    label: "Problems solved",
    value: "1,200+",
    detail: "Codeforces, LeetCode, CodeChef",
  },
  {
    label: "JEE Advanced",
    value: "AIR 1335",
    detail: "All India Rank",
  },
];

export const themeDisclaimers = {
  light: [
    "Warning: Light mode emits a gazillion lumens of pure radiance!",
    "Caution: Light mode ahead! Please don't try this at home.",
    "Only trained professionals can handle this much brightness. Proceed with sunglasses!",
    "Brace yourself! Light mode is about to make everything shine brighter than your future.",
    "Flipping the switch to light mode... Are you sure your eyes are ready for this?",
  ],
  dark: [
    "Light mode? I thought you went insane... but welcome back to the dark side!",
    "Switching to dark mode... How was life on the bright side?",
    "Dark mode activated! Thanks you from the bottom of my heart, and my eyes too.",
    "Welcome back to the shadows. How was life out there in the light?",
    "Dark mode on! Finally, someone who understands true sophistication.",
  ],
};
