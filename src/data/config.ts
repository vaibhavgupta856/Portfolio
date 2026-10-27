const config = {
  title: "Vaibhav Gupta | Software Engineer",
  description: {
    long: "Portfolio of Vaibhav Gupta, a software engineer from IIT Goa building production backend and full-stack systems. Currently shipping an EV charging platform at Massive Mobility; previously two internships at Siemens EDA on the Questa Sim compiler. Projects include Helios, VoltForge, ChessArena, Repo Pilot and Sentinel.",
    short:
      "Vaibhav Gupta, a software engineer from IIT Goa building production backend and full-stack systems.",
  },
  keywords: [
    "Vaibhav Gupta",
    "portfolio",
    "software engineer",
    "backend engineer",
    "full-stack developer",
    "IIT Goa",
    "Siemens EDA",
    "Massive Mobility",
    "Node.js",
    "PostgreSQL",
    "React",
    "TypeScript",
    "Python",
    "C++",
    "Go",
    "distributed systems",
  ],
  author: "Vaibhav Gupta",
  email: "vaibhav.gupta.22031@iitgoa.ac.in",
  site: "https://portfolio-pink-delta-48.vercel.app",
  resume:
    "https://drive.google.com/file/d/14XTooKXJdCDl1Ut4cvzrOAM3eV-SS3Dg/view?usp=sharing",

  // for github stars button
  githubUsername: "vaibhavgupta856",
  githubRepo: "Portfolio",

  get ogImg() {
    return this.site + "/assets/me.jpg";
  },
  social: {
    linkedin: "https://linkedin.com/in/vaibhav-gupta-6ba288256",
    github: "https://github.com/vaibhavgupta856",
    leetcode: "https://leetcode.com/u/gupta__vaibhav__/",
    codeforces: "https://codeforces.com/profile/Vaibhav_Gupta_22",
  },
};
export { config };
