import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

// Renders a brand SVG from /public as a monochrome glyph that inherits the
// surrounding text color (the skill dock styles every icon via currentColor).
const MaskIcon = ({ src, title }: { src: string; title?: string }) => (
  <span
    role="img"
    aria-label={title}
    className="block bg-current"
    style={{
      width: "1em",
      height: "1em",
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
    }}
  />
);

const ProjectsLinks = ({ live, repo }: { live?: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      {live && live !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={live}
        >
          <Button variant={"default"} size={"sm"}>
            Visit Website
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
      {repo && repo !== "#" && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};
// Mono brand SVGs in /public/assets/logos, rendered via MaskIcon so each one
// inherits the dock's currentColor.
const brand = (title: string, file: string): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon: <MaskIcon src={`/assets/logos/${file}`} title={title} />,
});
const textMark = (title: string, mark: string): Skill => ({
  title,
  bg: "black",
  fg: "white",
  icon: <span className="text-xs font-bold">{mark}</span>,
});
const PROJECT_SKILLS = {
  node: brand("Node.js", "nodedotjs-mono.svg"),
  python: brand("Python", "python-mono.svg"),
  cpp: brand("C++", "cplusplus-mono.svg"),
  go: brand("Go", "go-mono.svg"),
  fastapi: brand("FastAPI", "fastapi-mono.svg"),
  postgres: brand("PostgreSQL", "postgresql-mono.svg"),
  sqlite: brand("SQLite", "sqlite-mono.svg"),
  express: brand("Express", "express-mono.svg"),
  sockerio: brand("Socket.io", "socketdotio-mono.svg"),
  ts: brand("TypeScript", "typescript-mono.svg"),
  react: brand("React.js", "react-mono.svg"),
  three: brand("Three.js / R3F", "threedotjs-mono.svg"),
  vite: brand("Vite", "vite-mono.svg"),
  gemini: brand("Gemini", "googlegemini-mono.svg"),
  anthropic: brand("Anthropic Claude", "anthropic-mono.svg"),
  ollama: brand("Ollama", "ollama-mono.svg"),
  ocpp: textMark("OCPP 2.1", "OCPP"),
  ws: textMark("WebSockets", "WS"),
  mpi: textMark("MPI", "MPI"),
  fpga: textMark("PYNQ FPGA", "FPGA"),
};
export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};
const projects: Project[] = [
  {
    id: "helios",
    category: "EV charging CSMS",
    title: "Helios",
    src: "/assets/projects-screenshots/helios/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [PROJECT_SKILLS.ts, PROJECT_SKILLS.react],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.express,
        PROJECT_SKILLS.sockerio,
        PROJECT_SKILLS.ocpp,
      ],
    },
    live: "https://helios-ocpp21-cms.onrender.com/#/dashboard",
    github: "https://github.com/vaibhavgupta856/helios-ocpp21-cms",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Central system management software for EV charging, speaking OCPP
            2.1.
          </TypographyP>
          <TypographyP className="font-mono ">
            Helios enrolls charge points, receives BootNotification and
            TransactionEvent traffic over a WebSocket CSMS at
            <code> /ocpp/2.1/&#123;stationId&#125;</code>, and gives operators a
            full console: digital twin, sessions, RFID, tariffs, customer
            accounts and RBAC.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Operator console</TypographyH3>
          <p className="font-mono mb-2">
            Dashboard KPIs for delivered energy and realised revenue, a station
            org tree, a remote operations queue with an approve workflow, a live
            OCPP message trace, and the &quot;Ask Helios&quot; assistant for
            natural language questions about the fleet.
          </p>
          <TypographyH3 className="my-4 mt-8">Paired with VoltForge</TypographyH3>
          <p className="font-mono mb-2">
            Runs in production on Render with edge TLS and security profiles,
            and pairs with the VoltForge charge point lab over WSS so the whole
            charging flow can be exercised end to end without hardware.
          </p>
        </div>
      );
    },
  },
  {
    id: "voltforge",
    category: "OCPP charge point lab",
    title: "VoltForge",
    src: "/assets/projects-screenshots/voltforge/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [PROJECT_SKILLS.ts, PROJECT_SKILLS.react, PROJECT_SKILLS.three],
      backend: [
        PROJECT_SKILLS.node,
        PROJECT_SKILLS.express,
        PROJECT_SKILLS.sockerio,
        PROJECT_SKILLS.ocpp,
      ],
    },
    live: "https://voltforge-ocpp-lab.onrender.com/",
    github: "https://github.com/vaibhavgupta856/voltforge-ocpp-lab",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            A browser-based EVSE lab that simulates a real charge point.
          </TypographyP>
          <TypographyP className="font-mono ">
            A React and Three.js operator console drives a Node ChargePoint
            engine, which speaks OCPP 2.1 JSON over WebSocket to a CSMS. The
            browser only talks REST and Socket.IO; it never opens OCPP itself.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Charge point engine</TypographyH3>
          <p className="font-mono mb-2">
            A connector state machine, meter simulation, auth modes and CSMS
            command handlers, so integration tests can cover every charger
            command before a physical unit exists.
          </p>
          <TypographyH3 className="my-4 mt-8">3D yard HMI</TypographyH3>
          <p className="font-mono mb-2">
            A React Three Fiber charger cabinet with HMI, RFID reader, guns and
            E-stop, plus a commissioning flow wired to Helios, a live OCPP
            trace and a demo mode for exploring without a backend.
          </p>
        </div>
      );
    },
  },
  {
    id: "chessarena",
    category: "Realtime 3D multiplayer",
    title: "ChessArena",
    src: "/assets/projects-screenshots/chessarena/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [PROJECT_SKILLS.ts, PROJECT_SKILLS.react, PROJECT_SKILLS.three],
      backend: [PROJECT_SKILLS.go, PROJECT_SKILLS.ws, PROJECT_SKILLS.sqlite],
    },
    live: "https://chessarena-vaibhavgupta856.vercel.app/",
    github: "https://github.com/vaibhavgupta856/chess_arena",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Multiplayer chess on a fully interactive 3D board.
          </TypographyP>
          <TypographyP className="font-mono ">
            A server-authoritative Go engine covers all 6 piece types and the
            awkward rules like castling and en passant, and keeps every client
            in sync over WebSockets.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Game modes</TypographyH3>
          <p className="font-mono mb-2">
            Hot-seat, online rooms with share links, adjustable bots, accounts
            with JWT auth, friends, rated ELO and an in-game coach for hints and
            move review.
          </p>
          <TypographyH3 className="my-4 mt-8">3D board</TypographyH3>
          <p className="font-mono mb-2">
            Built in react-three-fiber with animated pieces, themes, free and
            fixed cameras, and a 2D fallback for low-end devices.
          </p>
        </div>
      );
    },
  },
  {
    id: "repopilot",
    category: "Autonomous coding agent",
    title: "Repo Pilot",
    src: "/assets/projects-screenshots/repopilot/landing.png",
    screenshots: ["landing.png"],
    skills: {
      frontend: [PROJECT_SKILLS.ts, PROJECT_SKILLS.react],
      backend: [
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.fastapi,
        PROJECT_SKILLS.anthropic,
        PROJECT_SKILLS.ollama,
      ],
    },
    live: "https://repopilot-vaibhavgupta856s-projects.vercel.app/",
    github: "https://github.com/vaibhavgupta856/REPOPILOT",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            An AI agent that plans, writes, tests and repairs its own code.
          </TypographyP>
          <TypographyP className="font-mono ">
            Work flows through a 4-stage pipeline (plan, code, test, self-heal),
            routing between 5 model providers so a single outage never stops a
            run.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Built for non-experts</TypographyH3>
          <p className="font-mono mb-2">
            Authenticated sign in, isolated workspaces, an embedded terminal and
            side-by-side diff review of every change the agent made.
          </p>
          <TypographyH3 className="my-4 mt-8">Repository intelligence</TypographyH3>
          <p className="font-mono mb-2">
            Tree-sitter and GitPython parse the repository into a dependency
            graph so the agent edits with context instead of guessing.
          </p>
        </div>
      );
    },
  },
  {
    id: "sentinel",
    category: "Distributed AIOps",
    title: "Sentinel",
    src: "/assets/projects-screenshots/sentinel/landing.jpg",
    screenshots: ["landing.jpg"],
    skills: {
      frontend: [PROJECT_SKILLS.ts, PROJECT_SKILLS.react],
      backend: [
        PROJECT_SKILLS.python,
        PROJECT_SKILLS.cpp,
        PROJECT_SKILLS.fastapi,
        PROJECT_SKILLS.sqlite,
      ],
    },
    live: "https://dashboard-zeta-five-78.vercel.app/",
    github: "https://github.com/vaibhavgupta856/SENTINEL-AIOps_Load_Balancer",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            A distributed job router that heals itself under chaos.
          </TypographyP>
          <TypographyP className="font-mono ">
            Scales to 1,000+ nodes with CPU-aware scheduling, circuit breakers
            that trip at 85% load and 3-retry rerouting of failed jobs.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
          <TypographyH3 className="my-4 mt-8">Chaos lab</TypographyH3>
          <p className="font-mono mb-2">
            Fault injection spikes latency, drops packets, overloads CPUs and
            kills nodes, while a React observability dashboard polls telemetry
            every 3 seconds over SQLite time-series storage to show recovery.
          </p>
        </div>
      );
    },
  },
  {
    id: "ai-website-builder",
    category: "Generative codegen",
    title: "AI Website Builder",
    src: "/assets/projects-screenshots/ai-website-builder/card.svg",
    screenshots: [],
    skills: {
      frontend: [PROJECT_SKILLS.ts, PROJECT_SKILLS.react],
      backend: [PROJECT_SKILLS.node, PROJECT_SKILLS.express, PROJECT_SKILLS.gemini],
    },
    live: "#",
    github: "https://github.com/vaibhavgupta856/AI_Website_Builder",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Generates complete websites from a text prompt.
          </TypographyP>
          <TypographyP className="font-mono ">
            Gemini scaffolds full React and Node projects from natural language,
            shown in an interactive file explorer and Monaco editor, with a live
            in-browser preview running on the WebContainer API.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },
  {
    id: "pynq-cluster",
    category: "FPGA cluster computing",
    title: "PYNQ Cluster",
    src: "/assets/projects-screenshots/pynq-cluster/card.svg",
    screenshots: [],
    skills: {
      frontend: [],
      backend: [PROJECT_SKILLS.python, PROJECT_SKILLS.mpi, PROJECT_SKILLS.fpga],
    },
    live: "#",
    github: "https://github.com/vaibhavgupta856/PYNQ-Z2-Cluster",
    get content() {
      return (
        <div>
          <TypographyP className="font-mono text-2xl text-center">
            Multiple PYNQ-Z2 boards wired into one heterogeneous cluster.
          </TypographyP>
          <TypographyP className="font-mono ">
            A tutorial combining ARM CPUs and FPGA accelerators for parallel
            work: distributed matrix multiplication over MPI with optional FPGA
            offload, and distributed KNN classification with workload
            partitioning across the boards.
          </TypographyP>
          <ProjectsLinks live={this.live} repo={this.github} />
        </div>
      );
    },
  },
];
export default projects;
