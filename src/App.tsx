import { useEffect, useMemo, useState } from "react";
import type { FormEvent, PointerEvent, ReactNode } from "react";
import {
  FiActivity,
  FiArrowDownRight,
  FiArrowRight,
  FiArrowUpRight,
  FiCheck,
  FiChevronDown,
  FiCode,
  FiCommand,
  FiCopy,
  FiExternalLink,
  FiGithub,
  FiLinkedin,
  FiMenu,
  FiSearch,
  FiX,
} from "react-icons/fi";
import { projects } from "../data/projects";
import { profile } from "../data/profile";
import { toolkit, toolkitCategories } from "../data/toolkit";
import type { ToolkitCategory } from "../data/toolkit";
import InteractiveCorner from "./components/InteractiveCorner";
import ProjectCard from "./components/ProjectCard";
import TechIcon from "./components/TechIcon";

const navigation = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Projects" },
  { id: "ai", label: "AI / ML" },
  { id: "contact", label: "Contact" },
];

const buildAreas = [
  {
    id: "web",
    number: "01",
    title: "Frontend & web",
    description:
      "Interfaces that feel considered, work across screen sizes, and make the important path easy to find.",
    details: ["Responsive UI systems", "Product flows and dashboards", "Accessible interaction patterns"],
    icon: "react",
  },
  {
    id: "ai",
    number: "02",
    title: "AI & intelligent systems",
    description:
      "Useful interfaces around models: clear inputs, relevant context, visible outputs, and sensible boundaries.",
    details: ["LLM-powered features", "Prompt and context design", "Exploratory NLP workflows"],
    icon: "brain",
  },
  {
    id: "backend",
    number: "03",
    title: "Backend & APIs",
    description:
      "The routes, data models, and authentication that help an interface become a real application.",
    details: ["REST endpoints", "Database-backed workflows", "Authentication and permissions"],
    icon: "server",
  },
  {
    id: "data",
    number: "04",
    title: "Data & analytics",
    description:
      "Turning files and raw records into understandable information that people can explore and act on.",
    details: ["Data cleanup and transformation", "Charts and exploratory analysis", "ETL fundamentals"],
    icon: "chart",
  },
  {
    id: "automation",
    number: "05",
    title: "Automation & product thinking",
    description:
      "Reducing repetitive steps and connecting technical details to the person who needs the result.",
    details: ["Task-focused tooling", "Practical prototypes", "End-to-end workflow thinking"],
    icon: "code",
  },
];

const aiPipelines = {
  chat: {
    label: "A conversation",
    summary: "A model response is shaped by the prompt, the chosen model, and the way the application handles the result.",
    nodes: [
      { title: "User input", body: "A question, instruction, or request enters the application." },
      { title: "Prompt", body: "The application combines instructions with the user's input and relevant context." },
      { title: "Model / API", body: "A language model receives the structured request and generates a response." },
      { title: "Response", body: "The application presents the result, with appropriate validation and follow-up." },
    ],
  },
  rag: {
    label: "Retrieval-augmented generation",
    summary: "RAG adds retrieved information to a model request so responses can use a chosen knowledge source.",
    nodes: [
      { title: "Source text", body: "Documents are split into smaller passages that can be retrieved later." },
      { title: "Embeddings", body: "Passages are represented as vectors for similarity-based search." },
      { title: "Retrieval", body: "A query finds the passages most relevant to the current request." },
      { title: "Context", body: "Retrieved passages are added to the prompt as supporting material." },
      { title: "LLM response", body: "The model uses the input and retrieved context to produce an answer." },
    ],
  },
} as const;

type PipelineKey = keyof typeof aiPipelines;
type GitHubProfile = {
  public_repos: number;
  followers: number;
  following: number;
};

function useIndiaClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    };
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return time;
}

function MagneticLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className: string;
}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setOffset({
      x: (event.clientX - bounds.left - bounds.width / 2) * 0.12,
      y: (event.clientY - bounds.top - bounds.height / 2) * 0.12,
    });
  };

  return (
    <a
      className={className}
      href={href}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
      onPointerMove={handleMove}
      style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
    >
      {children}
    </a>
  );
}

function Hero() {
  const clock = useIndiaClock();
  const [imageFailed, setImageFailed] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const roleWords = ["FULL STACK DEVELOPER", "AI / ML EXPLORER", "DATA CURIOUS"];
  const [firstName, ...restOfName] = profile.name.split(" ");

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;
    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roleWords.length);
    }, 3_200);
    return () => window.clearInterval(timer);
  }, [roleWords.length]);

  return (
    <section className="hero-section section-shell" id="home">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="eyebrow-line" />
            <span>INDEPENDENT DEVELOPER / INDIA</span>
          </div>
          <p className="hero-kicker">BUILDING ON THE WEB, THINKING BEYOND IT.</p>
          <h1>
            {firstName}
            <br />
            <span className="hero-last-name">{restOfName.join(" ")}</span>
            <span className="hero-period">.</span>
          </h1>
          <p className="hero-role" aria-label="Full Stack Developer, AI and ML explorer, data curious">
            <span className="hero-role-prefix">I AM A</span>
            <span className="hero-role-value" key={roleIndex}>{roleWords[roleIndex]}</span>
          </p>
          <p className="hero-intro">{profile.intro}</p>
          <div className="hero-actions">
            <MagneticLink className="button-primary" href="#projects">
              Explore my work <FiArrowDownRight aria-hidden="true" />
            </MagneticLink>
            <a className="button-quiet" href="#contact">
              Say hello <FiArrowUpRight aria-hidden="true" />
            </a>
          </div>
          <div className="hero-socials">
            <a href={profile.social.github} rel="noreferrer" target="_blank">
              <FiGithub aria-hidden="true" /> GitHub <FiExternalLink aria-hidden="true" className="external-mini" />
            </a>
            <a href={profile.social.linkedin} rel="noreferrer" target="_blank">
              <FiLinkedin aria-hidden="true" /> LinkedIn <FiExternalLink aria-hidden="true" className="external-mini" />
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-visual-topline">
            <span>PORTFOLIO / {new Date().getFullYear()}</span>
            <span className="hero-visual-index">01 — 06</span>
          </div>
          <div className="portrait-frame">
            <div className="portrait-crosshair portrait-crosshair-top" />
            <div className="portrait-crosshair portrait-crosshair-bottom" />
            {imageFailed ? (
              <div className="portrait-fallback" aria-label="Profile photo placeholder">
                <span>R</span>
                <small>ADD YOUR PHOTO</small>
              </div>
            ) : (
              <img
                alt={`${profile.name}, developer`}
                className="portrait-image"
                onError={() => setImageFailed(true)}
                src={profile.photo}
              />
            )}
            <div className="portrait-index">FIG. 01 <span>RITESH / INDIA</span></div>
            <div className="portrait-coordinate">BASED IN / INDIA</div>
          </div>
          <div className="hero-visual-footer">
            <div className="availability-line">
              <span className="availability-dot" />
              <span>OPEN TO OPPORTUNITIES</span>
            </div>
            <span className="india-clock">{clock || "--:--"} <small>IST</small></span>
          </div>
          <div className="hero-index-mark" aria-hidden="true">R / 01</div>
        </div>
      </div>
      <div className="hero-bottomline">
        <span>SCROLL TO EXPLORE</span>
        <span className="hero-scroll-line" />
        <span>01 — 06</span>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about-section section-shell" id="about">
      <div className="section-heading">
        <span className="section-index">01 / ABOUT</span>
        <h2>
          The web is my <span>workshop.</span>
        </h2>
      </div>
      <div className="about-layout">
        <div className="about-lead">
          <p>
            I like moving between the visible and invisible parts of a product: the interface someone touches,
            the system that responds, and the data or model that makes it useful.
          </p>
          <a className="text-link" href="#projects">
            A few things I’ve built <FiArrowRight aria-hidden="true" />
          </a>
        </div>
        <div className="about-aside">
          <span className="micro-label">THE SHORT VERSION</span>
          <p>
            I’m Ritesh, a developer based in India. I work across frontend and backend development, and I’m
            curious about practical AI and data workflows. This portfolio is a record of experiments, prototypes,
            and the engineering ideas behind them.
          </p>
          <div className="about-facts">
            <div><span>BASED IN</span><strong>India</strong></div>
            <div><span>FOCUS</span><strong>Build · Learn · Iterate</strong></div>
          </div>
        </div>
      </div>
      <div className="opportunity-strip">
        <span className="micro-label">OPEN TO</span>
        {profile.opportunities.map((item) => (
          <span className="opportunity-chip" key={item}><FiCheck aria-hidden="true" /> {item}</span>
        ))}
        <span className="opportunity-note">Say hello if there’s something interesting to build.</span>
      </div>
    </section>
  );
}

function ToolkitSection() {
  const [category, setCategory] = useState<ToolkitCategory>("All");
  const [query, setQuery] = useState("");
  const [selectedName, setSelectedName] = useState("Python");

  const visibleItems = useMemo(() => toolkit.filter((item) => {
    const matchesCategory = category === "All" || item.category === category;
    const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  }), [category, query]);
  const selectedItem = visibleItems.find((item) => item.name === selectedName) ?? visibleItems[0];

  return (
    <section className="toolkit-section section-shell" id="stack">
      <div className="section-heading section-heading-split">
        <div>
          <span className="section-index">02 / TOOLKIT</span>
          <h2>
            Tools for <span>curiosity.</span>
          </h2>
        </div>
        <p className="section-heading-note">
          A working map of the languages, frameworks, and concepts I explore. No proficiency scores — just
          the tools I’m learning and building with.
        </p>
      </div>
      <div className="toolkit-console">
        <div className="toolkit-console-top">
          <div className="console-title"><FiCommand aria-hidden="true" /> <span>TOOLKIT / FILTERABLE INDEX</span></div>
          <label className="toolkit-search">
            <FiSearch aria-hidden="true" />
            <input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find a technology..."
              aria-label="Filter technologies by name"
              type="search"
              value={query}
            />
            <kbd>/</kbd>
          </label>
        </div>
        <div className="toolkit-body">
          <aside className="toolkit-categories" aria-label="Technology categories">
            <span className="micro-label">DIRECTORY</span>
            {toolkitCategories.map((item, index) => (
              <button
                aria-pressed={category === item}
                className={category === item ? "active" : ""}
                key={item}
                onClick={() => setCategory(item)}
                type="button"
              >
                <span className="category-index">0{index}</span>
                {item}
                <span className="category-count">
                  {item === "All" ? toolkit.length : toolkit.filter((skill) => skill.category === item).length}
                </span>
              </button>
            ))}
          </aside>
          <div className="toolkit-content">
            <div className="toolkit-grid">
              {visibleItems.length ? visibleItems.map((item, index) => (
                <button
                  aria-pressed={selectedItem?.name === item.name}
                  className={`toolkit-item${selectedItem?.name === item.name ? " selected" : ""}`}
                  key={`${item.name}-${item.category}-${index}`}
                  onClick={() => setSelectedName(item.name)}
                  type="button"
                >
                  <TechIcon className="toolkit-icon" name={item.icon} />
                  <span>{item.name}</span>
                  <span className="toolkit-item-arrow">↗</span>
                </button>
              )) : (
                <div className="toolkit-empty">
                  <FiSearch aria-hidden="true" />
                  <span>No match for “{query}”</span>
                  <button onClick={() => setQuery("")} type="button">Clear search</button>
                </div>
              )}
            </div>
            {selectedItem && (
              <div className="toolkit-detail" aria-live="polite">
                <span className="toolkit-detail-icon"><TechIcon name={selectedItem.icon} /></span>
                <div>
                  <span className="micro-label">{selectedItem.category} / SELECTED</span>
                  <p><strong>{selectedItem.name}</strong> — {selectedItem.note}</p>
                </div>
                <FiArrowUpRight aria-hidden="true" className="toolkit-detail-arrow" />
              </div>
            )}
          </div>
        </div>
        <div className="toolkit-console-footer">
          <span><i /> {visibleItems.length} ITEMS SHOWN</span>
          <span>SELECT A TECHNOLOGY TO SEE A NOTE</span>
          <span>INDEX / 02</span>
        </div>
      </div>
    </section>
  );
}

function BuildAreas() {
  const [openArea, setOpenArea] = useState<string | null>(null);

  return (
    <section className="build-section section-shell" id="build">
      <div className="section-heading section-heading-split">
        <div>
          <span className="section-index">03 / WHAT I BUILD</span>
          <h2>
            Different layers. <span>One product.</span>
          </h2>
        </div>
        <p className="section-heading-note">
          I enjoy working across a product’s surface and its underlying systems. These are the kinds of
          problems I’m drawn to.
        </p>
      </div>
      <div className="build-list">
        {buildAreas.map((area) => {
          const isOpen = openArea === area.id;
          return (
            <article className={`build-item${isOpen ? " open" : ""}`} key={area.id}>
              <button
                aria-controls={`build-detail-${area.id}`}
                aria-expanded={isOpen}
                className="build-trigger"
                onClick={() => setOpenArea(isOpen ? null : area.id)}
                type="button"
              >
                <span className="build-number">{area.number}</span>
                <span className="build-icon"><TechIcon name={area.icon} /></span>
                <span className="build-title">{area.title}</span>
                <span className="build-hint">{isOpen ? "CLOSE" : "EXPLORE"}</span>
                <FiChevronDown aria-hidden="true" className="build-chevron" />
              </button>
              <div className="build-detail" hidden={!isOpen} id={`build-detail-${area.id}`}>
                <p>{area.description}</p>
                <div className="build-tags">
                  {area.details.map((detail) => <span key={detail}>{detail}</span>)}
                </div>
                <span className="build-note">AREAS OF INTEREST — NOT A PROJECT CLAIM</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function AISection() {
  const [pipelineKey, setPipelineKey] = useState<PipelineKey>("chat");
  const [activeNode, setActiveNode] = useState(0);
  const pipeline = aiPipelines[pipelineKey];
  const selectedNode = pipeline.nodes[activeNode] ?? pipeline.nodes[0];

  const changePipeline = (key: PipelineKey) => {
    setPipelineKey(key);
    setActiveNode(0);
  };

  return (
    <section className="ai-section section-shell" id="ai">
      <div className="section-heading section-heading-split">
        <div>
          <span className="section-index">04 / AI & SYSTEMS</span>
          <h2>
            Make the <span>black box legible.</span>
          </h2>
        </div>
        <p className="section-heading-note">
          I’m interested in the full path from an input to a useful answer — and in making each step
          understandable to the person using it.
        </p>
      </div>
      <div className="ai-workspace">
        <div className="ai-workspace-header">
          <div className="console-title"><FiActivity aria-hidden="true" /> <span>MODEL FLOW / CONCEPT MAP</span></div>
          <div className="pipeline-tabs" role="tablist" aria-label="AI flow examples">
            {(Object.keys(aiPipelines) as PipelineKey[]).map((key) => (
              <button
                aria-selected={pipelineKey === key}
                aria-controls="ai-flow-panel"
                className={pipelineKey === key ? "active" : ""}
                id={`pipeline-tab-${key}`}
                key={key}
                onClick={() => changePipeline(key)}
                role="tab"
                type="button"
              >
                {aiPipelines[key].label}
              </button>
            ))}
          </div>
        </div>
        <p className="ai-flow-summary">{pipeline.summary}</p>
        <div
          aria-labelledby={`pipeline-tab-${pipelineKey}`}
          className="ai-flow"
          id="ai-flow-panel"
          role="tabpanel"
        >
          {pipeline.nodes.map((node, index) => (
            <div className="ai-flow-part" key={`${pipelineKey}-${node.title}`}>
              <button
                aria-pressed={activeNode === index}
                className={`ai-flow-node${activeNode === index ? " active" : ""}`}
                onClick={() => setActiveNode(index)}
                type="button"
              >
                <span className="flow-node-number">0{index + 1}</span>
                <span>{node.title}</span>
                <span className="flow-node-dot" />
              </button>
              {index < pipeline.nodes.length - 1 && <span className="flow-connector"><FiArrowRight aria-hidden="true" /></span>}
            </div>
          ))}
        </div>
        {selectedNode && (
          <div className="ai-node-explanation" aria-live="polite">
            <span className="ai-node-check"><FiCheck aria-hidden="true" /></span>
            <div><span className="micro-label">STEP 0{activeNode + 1} / {selectedNode.title.toUpperCase()}</span><p>{selectedNode.body}</p></div>
            <span className="ai-node-index">0{activeNode + 1}—0{pipeline.nodes.length}</span>
          </div>
        )}
        <div className="ai-topics">
          <span className="micro-label">RELATED CONCEPTS</span>
          <div className="ai-topic-list">
            <span><b>01</b> Prompt design</span>
            <span><b>02</b> Tokens & context</span>
            <span><b>03</b> Embeddings</span>
            <span><b>04</b> Retrieval</span>
            <span><b>05</b> Tool calling</span>
            <span><b>06</b> Evaluation</span>
          </div>
        </div>
        <span className="ai-disclaimer">CONCEPTUAL EXPLANATION · DOES NOT REPRESENT A DEPLOYED SYSTEM</span>
      </div>
    </section>
  );
}

function GitHubSection() {
  const [githubProfile, setGithubProfile] = useState<GitHubProfile | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const loadProfile = async () => {
      try {
        const response = await fetch("https://api.github.com/users/rit3sh19", {
          headers: { Accept: "application/vnd.github+json" },
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(response.status === 403 || response.status === 429
            ? "GitHub API rate limit reached. Visit the profile directly for current details."
            : `GitHub returned status ${response.status}.`);
        }
        const data = await response.json() as Partial<GitHubProfile>;
        if (
          typeof data.public_repos !== "number" ||
          typeof data.followers !== "number" ||
          typeof data.following !== "number"
        ) {
          throw new Error("GitHub profile data was incomplete.");
        }
        setGithubProfile({
          public_repos: data.public_repos,
          followers: data.followers,
          following: data.following,
        });
        setStatus("ready");
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Could not load the GitHub profile.", error);
        setErrorMessage(error instanceof Error ? error.message : "Could not load public profile data.");
        setStatus("error");
      }
    };
    void loadProfile();
    return () => controller.abort();
  }, [retryCount]);

  return (
    <section className="github-section section-shell" id="github">
      <div className="section-heading section-heading-split">
        <div>
          <span className="section-index">06 / ON GITHUB</span>
          <h2>
            Open work. <span>Open source.</span>
          </h2>
        </div>
        <a className="text-link github-direct-link" href={profile.social.github} rel="noreferrer" target="_blank">
          Visit my GitHub <FiArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <div className="github-card">
        <div className="github-card-brand">
          <span className="github-mark"><FiGithub aria-hidden="true" /></span>
          <div><span className="micro-label">GITHUB PROFILE</span><strong>@rit3sh19</strong></div>
        </div>
        <div aria-live="polite" className="github-stats">
          {status === "loading" && <p className="github-status"><span className="loading-dot" /> Loading public profile data…</p>}
          {status === "error" && (
            <div className="github-error-state">
              <p className="github-status github-error">
                {errorMessage} The project audit above is limited to the five repositories you provided.
              </p>
              <button onClick={() => setRetryCount((current) => current + 1)} type="button">Retry</button>
            </div>
          )}
          {status === "ready" && githubProfile && (
            <>
              <div><strong>{githubProfile.public_repos}</strong><span>PUBLIC REPOSITORIES</span></div>
              <div><strong>{githubProfile.followers}</strong><span>FOLLOWERS</span></div>
              <div><strong>{githubProfile.following}</strong><span>FOLLOWING</span></div>
            </>
          )}
        </div>
        <a className="github-open-link" href={profile.social.github} rel="noreferrer" target="_blank" aria-label="Open Ritesh's GitHub profile">
          <FiArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <p className="github-scope-note">Profile-level counts only. No repositories beyond the five supplied for this portfolio were inspected or featured.</p>
    </section>
  );
}

function ContactSection() {
  const [formStatus, setFormStatus] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const hasEmail = profile.email.trim().length > 0;

  const copyLink = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus(`${label} link copied.`);
    } catch (error) {
      console.error(`Could not copy the ${label} link.`, error);
      setCopyStatus(`Clipboard unavailable. Open the ${label} link directly.`);
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!hasEmail) {
      setFormStatus("Add a contact email to data/profile.ts to enable message delivery.");
      return;
    }
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const sender = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${sender})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setFormStatus("Your email app should open with the message ready to send.");
  };

  return (
    <section className="contact-section section-shell" id="contact">
      <div className="contact-topline">
        <span className="section-index">07 / CONTACT</span>
        <span className="contact-coordinates">BASED IN INDIA / OPEN TO CONVERSATION</span>
      </div>
      <div className="contact-layout">
        <div className="contact-copy">
          <p className="contact-overline">HAVE A GOOD PROBLEM?</p>
          <h2>
            Let’s make
            <br />
            <span>something useful.</span>
          </h2>
          <p className="contact-description">
            Have an idea, a collaboration in mind, or a role you think could be a fit? I’d be glad to hear
            what you’re working on.
          </p>
          <div className="contact-social-links">
            <div className="contact-social-item">
              <a href={profile.social.linkedin} rel="noreferrer" target="_blank"><FiLinkedin aria-hidden="true" /> LinkedIn <FiArrowUpRight aria-hidden="true" /></a>
              <button aria-label="Copy LinkedIn profile link" onClick={() => void copyLink("LinkedIn", profile.social.linkedin)} type="button"><FiCopy aria-hidden="true" /></button>
            </div>
            <div className="contact-social-item">
              <a href={profile.social.github} rel="noreferrer" target="_blank"><FiGithub aria-hidden="true" /> GitHub <FiArrowUpRight aria-hidden="true" /></a>
              <button aria-label="Copy GitHub profile link" onClick={() => void copyLink("GitHub", profile.social.github)} type="button"><FiCopy aria-hidden="true" /></button>
            </div>
          </div>
          <p aria-live="polite" className="copy-feedback">{copyStatus}</p>
        </div>
        <form className="contact-form" onSubmit={submit}>
          <div className="contact-form-heading">
            <span className="micro-label">SEND A NOTE</span>
            <span className="contact-form-id">FORM / 001</span>
          </div>
          <label>
            <span>YOUR NAME</span>
            <input autoComplete="name" name="name" placeholder="How should I address you?" required />
          </label>
          <label>
            <span>YOUR EMAIL</span>
            <input autoComplete="email" name="email" placeholder="you@example.com" required type="email" />
          </label>
          <label>
            <span>WHAT'S ON YOUR MIND?</span>
            <textarea name="message" placeholder="A little context goes a long way..." required rows={4} />
          </label>
          <button className="contact-submit" type="submit">
            {hasEmail ? "Prepare email" : "Email not configured"}
            <FiArrowUpRight aria-hidden="true" />
          </button>
          {!hasEmail && <p className="contact-config-note">To enable this form, add your email to <code>data/profile.ts</code>.</p>}
          <p aria-live="polite" className="contact-form-status">{formStatus}</p>
        </form>
      </div>
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>DESIGNED TO KEEP BUILDING <FiCode aria-hidden="true" /></span>
        <a href="#home">BACK TO TOP <FiArrowUpRight aria-hidden="true" /></a>
      </footer>
    </section>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) setActiveSection(mostVisible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.1, 0.25, 0.5] },
    );
    navigation.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      return;
    }
    const sections = document.querySelectorAll<HTMLElement>(".section-shell");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.04 },
    );
    sections.forEach((section) => {
      section.classList.add("reveal-pending");
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const target = event.target;
      const isEditing = target instanceof HTMLElement &&
        (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
      if (event.key === "Escape") setMobileMenuOpen(false);
      if (event.key === "/" && !isEditing && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        document.querySelector<HTMLInputElement>(".toolkit-search input")?.focus();
      }
    };
    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <a className="brand-mark" href="#home" aria-label="Ritesh M H, home" onClick={closeMenu}>
          <span>R</span><i>®</i>
        </a>
        <nav className={`main-nav${mobileMenuOpen ? " open" : ""}`} aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              aria-current={activeSection === item.id ? "page" : undefined}
              className={activeSection === item.id ? "active" : ""}
              href={`#${item.id}`}
              key={item.id}
              onClick={closeMenu}
            >
              <span>{item.label}</span>
              {activeSection === item.id && <i />}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="#contact">LET'S TALK <FiArrowUpRight aria-hidden="true" /></a>
        <button
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
          className="menu-toggle"
          onClick={() => setMobileMenuOpen((open) => !open)}
          type="button"
        >
          {mobileMenuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>
      </header>
      <main id="main-content">
        <Hero />
        <div className="section-divider"><span>01 / THE PERSON</span><i /><span>SCROLL FOR MORE</span></div>
        <About />
        <div className="section-divider"><span>02 / THE TOOLKIT</span><i /><span>SELECT TO EXPLORE</span></div>
        <ToolkitSection />
        <div className="section-divider"><span>03 / THE PRACTICE</span><i /><span>HOW I APPROACH IT</span></div>
        <BuildAreas />
        <div className="section-divider"><span>04 / INTELLIGENT SYSTEMS</span><i /><span>FOLLOW THE FLOW</span></div>
        <AISection />
        <div className="section-divider"><span>05 / SELECTED WORK</span><i /><span>FIVE PROJECTS / ONE AUDIT</span></div>
        <section className="projects-section section-shell" id="projects">
          <div className="section-heading section-heading-split">
            <div>
              <span className="section-index">05 / SELECTED WORK</span>
              <h2>
                Built, learned, <span>documented.</span>
              </h2>
            </div>
            <p className="section-heading-note">
              Five projects, reviewed from source. Forks, prototypes, and unavailable code are labeled so the
              work is presented with its real context.
            </p>
          </div>
          <div className="project-list">
            {projects.map((project, index) => (
              <ProjectCard index={index} key={project.id} project={project} />
            ))}
          </div>
          <div className="projects-footnote">
            <span><FiCheck aria-hidden="true" /> SOURCED FROM THE FIVE REPOSITORIES YOU PROVIDED</span>
            <span>NO LIVE DEPLOYMENT VERIFIED</span>
          </div>
        </section>
        <div className="section-divider"><span>06 / IN THE OPEN</span><i /><span>PROFILE DATA / LIVE</span></div>
        <GitHubSection />
        <div className="section-divider"><span>07 / SAY HELLO</span><i /><span>ENDLESS POSSIBILITIES</span></div>
        <ContactSection />
      </main>
      <InteractiveCorner />
    </>
  );
}
