export type ProjectPreview =
  | "censoring"
  | "wellbeing"
  | "spreadsheet"
  | "blog"
  | "coding";

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  rank: number | null;
  featured: boolean;
  preview: ProjectPreview;
  summary: string;
  problem: string;
  implementation: string;
  highlights: string[];
  stack: string[];
  repository: string;
  liveDemo: string | null;
  provenance: string;
  status: "verified" | "prototype" | "fork";
};

export const projects: Project[] = [
  {
    id: "video-censorship-studio",
    title: "Video Censorship Studio",
    subtitle: "Speech processing · Applied AI",
    category: "Applied AI & media",
    rank: 1,
    featured: true,
    preview: "censoring",
    summary:
      "A Streamlit prototype that extracts a clip's audio, transcribes word-level timestamps with Whisper, and replaces selected profanity windows with beep tones.",
    problem:
      "Muting or bleeping language in a clip is usually a manual editing job. This experiment uses speech timestamps to locate audio spans for tone replacement.",
    implementation:
      "The Streamlit app accepts video files, MoviePy extracts the audio, and local Whisper transcription supplies word timings. The current UI checks those words against a fixed list and passes matching ranges to PyDub. A separate command-line helper contains a Toxic-BERT pipeline, but the UI does not call it.",
    highlights: [
      "Word-level transcription timestamps drive the edit ranges.",
      "PyDub processes ranges in reverse time order and overlays a generated sine beep.",
      "The app returns a censored audio file; it does not mux that audio back into the video.",
    ],
    stack: [
      "Python",
      "Streamlit",
      "Whisper",
      "MoviePy",
      "PyDub",
      "Transformers (separate helper path)",
    ],
    repository: "https://github.com/rit3sh19/mini-project",
    liveDemo: null,
    provenance:
      "Non-fork repository under your account; the UI credits Ritesh and Deepthi, so individual division of work is not established.",
    status: "prototype",
  },
  {
    id: "zenzone",
    title: "ZenZone",
    subtitle: "Wellbeing tools · AI chat",
    category: "Wellbeing & community",
    rank: 2,
    featured: true,
    preview: "wellbeing",
    summary:
      "A Next.js wellbeing prototype bringing mood and journal tracking, self-guided tools, community routes, and a Gemini-backed chat flow together.",
    problem:
      "The project explores how lightweight reflection and self-guided tools might live in one place instead of being split across separate apps.",
    implementation:
      "Next.js App Router pages handle the UI and route handlers. Gemini is called for chat; MongoDB is used by auth and community endpoints. Mood, journal, CBT, sleep, and appointment data are largely stored in browser localStorage. Sentiment labels and crisis flags use keyword rules rather than a trained model.",
    highlights: [
      "A server route calls Gemini 2.0 Flash and returns a separate support-resource response when its keyword list matches.",
      "Community posts are read and written through a MongoDB route; most personal tools remain client-side.",
      "Your fork's visible changes include sleep-aid hydration/localStorage handling, dashboard edits, and app metadata.",
    ],
    stack: [
      "Next.js 15",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "Google Gemini",
      "shadcn/ui",
    ],
    repository: "https://github.com/rit3sh19/lastZENZONE",
    liveDemo: null,
    provenance:
      "Fork of ranjanvivesh/lastZENZONE. Three commits are attributed to rit3sh19; most application features are inherited. Source also contains a hard-coded database credential; it is intentionally omitted and should be rotated.",
    status: "fork",
  },
  {
    id: "excel-analytics",
    title: "Excel Analytics Platform",
    subtitle: "Full stack · Spreadsheet workflows",
    category: "Full stack & data",
    rank: 3,
    featured: false,
    preview: "spreadsheet",
    summary:
      "A full-stack spreadsheet exploration app with workbook upload/history, column-based charts, export controls, role-protected APIs, and a Gemini summary endpoint.",
    problem:
      "The app aims to give spreadsheet users a quick way to inspect workbook rows, plot selected columns, and request a short natural-language summary.",
    implementation:
      "A React client reads the first worksheet for previews and charts, while an Express API accepts Excel files, parses the first sheet, stores file metadata in MongoDB, and exposes history and download routes. The insight controller sends up to ten rows to Gemini 1.5 Flash with a real-estate analysis prompt.",
    highlights: [
      "Column selectors feed bar, pie, line, doughnut, or scatter visualizations.",
      "The chart page includes PNG/PDF export code; the backend separates routes, controllers, models, and middleware.",
      "Admin endpoints include user/file operations and MongoDB aggregation summaries.",
    ],
    stack: [
      "React",
      "JavaScript",
      "Express",
      "MongoDB / Mongoose",
      "SheetJS",
      "Chart.js",
      "Google Gemini",
      "JWT",
    ],
    repository: "https://github.com/rit3sh19/Excel_Analytics_Plateform",
    liveDemo: null,
    provenance:
      "Fork of mffgbdojvfw/Excel_Analytics_Plateform. At audit time this branch was 28 commits behind and zero commits ahead of upstream, so the implementation should not be presented as solely yours.",
    status: "fork",
  },
  {
    id: "onlydevs",
    title: "OnlyDevs",
    subtitle: "Developer community · Frontend prototype",
    category: "Developer tools & community",
    rank: 4,
    featured: false,
    preview: "coding",
    summary:
      "A collaborative Next.js frontend prototype for developer connections, rooms, help tickets, and coding battles, with a browser-local demo mode.",
    problem:
      "The product brings developer community workflows and coding-practice concepts into a single interface; the repository contains the frontend, not the companion backend.",
    implementation:
      "Next.js App Router pages use Zustand stores and Axios services. In its default demo mode, an Axios adapter simulates auth, community, FAQ, and battle endpoints and persists seeded state in localStorage; a WebSocket shim emits a timed mock match. Live mode expects an API and WebSocket server at the configured backend URL, but no backend source is included.",
    highlights: [
      "The demo adapter gives the UI API-shaped local flows for connections, messages, rooms, FAQ tickets, and battles.",
      "Battle results are canned: any non-empty code submission is treated as a win; code execution, AI judging, and the displayed analysis are not implemented.",
      "The FAQ content is static/help-ticket UI rather than an AI service. Local webcam preview exists, but remote video is a placeholder.",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Axios",
      "Radix UI",
      "Lucide React",
      "Monaco Editor (separate component; battle route uses a textarea)",
    ],
    repository: "https://github.com/rit3sh19/onlydevs-frontend",
    liveDemo: null,
    provenance:
      "Collaborative repository history: the initial implementation commits are attributed to a collaborator; two later commits are attributed to rit3sh19. Those changes add the frontend demo-mode infrastructure and settings/FAQ UI updates, not the entire platform.",
    status: "prototype",
  },
  {
    id: "blog-interface",
    title: "Blog Application UI",
    subtitle: "Frontend · Product interface",
    category: "Frontend prototype",
    rank: 5,
    featured: false,
    preview: "blog",
    summary:
      "A React blogging interface prototype with a rich-text compose screen, static post discovery, and home/profile pages.",
    problem:
      "The interface sketches the main screens a small blogging product might need: discover posts, write a post, and present an author profile.",
    implementation:
      "A React Router single-page app renders four pages. ReactQuill manages the compose field, but the Publish handler only logs the title and content. The post list and profile are hard-coded; no backend or persistent storage is present.",
    highlights: [
      "Rich-text editor configured with formatting, list, link, image, and code-block controls.",
      "Title-only filtering across a static set of sample blog cards.",
      "Framer Motion and a custom cursor-trail component add interaction and visual polish.",
    ],
    stack: [
      "React",
      "JavaScript",
      "React Router",
      "ReactQuill",
      "Tailwind CSS",
      "Framer Motion",
    ],
    repository: "https://github.com/rit3sh19/blog-app",
    liveDemo: null,
    provenance:
      "Non-fork repository under your account. The code is present, but the audit cannot independently establish individual authorship for every component.",
    status: "prototype",
  },
];
