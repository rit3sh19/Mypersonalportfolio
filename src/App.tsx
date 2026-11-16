import { useMemo, useState } from "react";
import { projects } from "../data/projects";
import type { Project } from "../data/projects";
import ProjectCard from "./components/ProjectCard";

const filters = [
  "All work",
  "Applied AI & media",
  "Wellbeing & community",
  "Full stack & data",
  "Frontend prototype",
  "Needs verification",
] as const;

function matchesSearch(project: Project, search: string) {
  const haystack = [
    project.title,
    project.subtitle,
    project.category,
    project.summary,
    project.problem,
    project.implementation,
    project.stack.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(search.toLowerCase());
}

export default function App() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>(
    "All work",
  );
  const [search, setSearch] = useState("");

  const visibleProjects = useMemo(
    () =>
      projects.filter((project) => {
        const categoryMatches =
          activeFilter === "All work" || project.category === activeFilter;
        return categoryMatches && matchesSearch(project, search.trim());
      }),
    [activeFilter, search],
  );

  return (
    <div className="site-shell">
      <header className="topbar">
        <a aria-label="rit3sh19 home" className="brand" href="#home">
          <span className="brand-mark">r.</span>
          <span className="brand-name">
            RIT3SH19 <small>DEVELOPER PORTFOLIO</small>
          </span>
        </a>
        <nav aria-label="Main navigation" className="main-nav">
          <a href="#work">Selected work</a>
          <a href="#approach">Approach</a>
        </nav>
        <a
          className="github-link"
          href="https://github.com/rit3sh19"
          rel="noreferrer"
          target="_blank"
        >
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main>
        <section aria-labelledby="hero-title" className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-dot" />
              FULL STACK <span>/</span> APPLIED AI <span>/</span> DATA
            </p>
            <h1 id="hero-title">
              Good ideas deserve
              <br />
              <span>working software.</span>
            </h1>
            <p className="hero-description">
              I like taking a problem from interface to implementation—whether
              that means shaping a data workflow, connecting an API, or trying
              out a model in a useful product.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                Explore the projects <span aria-hidden="true">↓</span>
              </a>
              <a
                className="text-link"
                href="https://github.com/rit3sh19"
                rel="noreferrer"
                target="_blank"
              >
                Browse GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
            <p className="hero-note">
              Five supplied repositories reviewed · claims kept close to source
            </p>
          </div>

          <div aria-label="Project themes" className="hero-art">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="hero-art-grid" />
            <div className="orbit-core">
              <span className="core-kicker">BUILD</span>
              <span className="core-title">with intent</span>
              <span className="core-mark">✳</span>
            </div>
            <div className="orbit-label orbit-label-top">
              <span className="orbit-icon orbit-icon-lime">01</span>
              <span>Data workflows</span>
            </div>
            <div className="orbit-label orbit-label-right">
              <span className="orbit-icon orbit-icon-blue">02</span>
              <span>Applied AI</span>
            </div>
            <div className="orbit-label orbit-label-bottom">
              <span className="orbit-icon orbit-icon-peach">03</span>
              <span>Product UI</span>
            </div>
            <span className="hero-art-caption">IDEAS → SYSTEMS → ITERATION</span>
          </div>

          <div className="hero-index">
            <span>01</span>
            <span className="index-line" />
            <span>PORTFOLIO / 2026</span>
          </div>
        </section>

        <section aria-label="Portfolio facts" className="signal-strip">
          <div>
            <strong>05</strong>
            <span>repositories audited</span>
          </div>
          <div>
            <strong>03</strong>
            <span>engineering threads</span>
          </div>
          <div>
            <strong>00</strong>
            <span>unverified live demos</span>
          </div>
          <p>Source first. Credit accurately.</p>
        </section>

        <section aria-labelledby="work-title" className="work-section" id="work">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A CURATED LOOK</p>
              <h2 id="work-title">Selected work<span>.</span></h2>
            </div>
            <p className="section-intro">
              A few different kinds of problems, with the implementation
              details—and the unfinished parts—left in view.
            </p>
          </div>

          <div className="work-controls">
            <div aria-label="Filter projects" className="filter-list">
              {filters.map((filter) => (
                <button
                  aria-pressed={activeFilter === filter}
                  className={`filter-chip${activeFilter === filter ? " is-active" : ""}`}
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  type="button"
                >
                  {filter}
                </button>
              ))}
            </div>
            <label className="search-field">
              <span aria-hidden="true">⌕</span>
              <input
                aria-label="Search projects"
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search projects"
                type="search"
                value={search}
              />
              <kbd>/</kbd>
            </label>
          </div>

          {visibleProjects.length > 0 ? (
            <div className="project-grid">
              {visibleProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span>Nothing in this slice yet.</span>
              <button
                onClick={() => {
                  setActiveFilter("All work");
                  setSearch("");
                }}
                type="button"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <section aria-labelledby="approach-title" className="approach" id="approach">
          <div className="approach-heading">
            <p className="eyebrow">HOW I LIKE TO WORK</p>
            <h2 id="approach-title">
              Make it useful.
              <br />
              <span>Make it understandable.</span>
            </h2>
          </div>
          <div className="approach-copy">
            <p>
              The projects here move between UI, APIs, data, and model-backed
              ideas. The common thread is curiosity about how a useful feature
              actually works—not just how it looks in a demo.
            </p>
            <div className="approach-note">
              <span className="note-star">✳</span>
              <span>
                <strong>Honest by design</strong>
                <small>
                  Forks, prototypes, and unverified claims are identified in
                  each project.
                </small>
              </span>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="footer-brand" href="#home">
          <span className="brand-mark">r.</span>
          <span>rit3sh19</span>
        </a>
        <p>Built with curiosity. Reviewed against the code.</p>
        <a href="https://github.com/rit3sh19" rel="noreferrer" target="_blank">
          Find me on GitHub <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </div>
  );
}
