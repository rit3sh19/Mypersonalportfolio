import { FiArrowUpRight, FiChevronDown, FiGitBranch, FiGithub } from "react-icons/fi";
import type { Project } from "../../data/projects";
import ProjectPreview from "./ProjectPreview";

const statusLabels = {
  verified: "SOURCE REVIEWED",
  prototype: "PROTOTYPE",
  fork: "FORK / ATTRIBUTION NOTED",
  unavailable: "SOURCE UNAVAILABLE",
} as const;

type Props = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: Props) {
  return (
    <article
      className={`showcase-project${index % 2 === 1 ? " showcase-project-reverse" : ""}${project.featured ? " showcase-project-featured" : ""}${project.status === "unavailable" ? " showcase-project-unavailable" : ""}`}
    >
      <div className="showcase-visual">
        <div className="showcase-visual-index">
          <span>PROJECT / {String(index + 1).padStart(2, "0")}</span>
          <span className={`status-mark status-${project.status}`}><i /> {statusLabels[project.status]}</span>
        </div>
        <ProjectPreview kind={project.preview} />
        {project.rank && <span className="showcase-rank">CURATED / PRIORITY 0{project.rank}</span>}
      </div>

      <div className="showcase-content">
        <div className="showcase-heading">
          <div>
            <p className="project-category">{project.category}</p>
            <h3>{project.title}</h3>
            <p className="project-subtitle">{project.subtitle}</p>
          </div>
          <span className="showcase-number">0{index + 1}</span>
        </div>
        <p className="project-summary">{project.summary}</p>
        <div className="showcase-problem">
          <span className="detail-label">THE PROBLEM</span>
          <p>{project.problem}</p>
        </div>
        <div className="showcase-implementation">
          <span className="detail-label">THE IMPLEMENTATION</span>
          <p>{project.implementation}</p>
        </div>

        <div className="showcase-stack" aria-label="Identified technology stack">
          <span className="detail-label">IDENTIFIED STACK</span>
          <div className="tag-list">
            {project.stack.length > 0 ? (
              project.stack.map((technology) => (
                <span className="tech-tag" key={technology}>{technology}</span>
              ))
            ) : (
              <span className="tech-tag tech-tag-muted">Stack unverified</span>
            )}
          </div>
        </div>

        <details className="showcase-details">
          <summary>
            <span><FiGitBranch aria-hidden="true" /> Technical highlights & attribution</span>
            <FiChevronDown aria-hidden="true" className="details-toggle" />
          </summary>
          <div className="showcase-details-body">
            <span className="detail-label">TECHNICAL HIGHLIGHTS</span>
            <ul>
              {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>
            <div className="showcase-provenance">
              <span className="detail-label">ATTRIBUTION & STATUS</span>
              <p>{project.provenance}</p>
            </div>
          </div>
        </details>

        <div className="showcase-links">
          <a className="repository-link" href={project.repository} rel="noreferrer" target="_blank">
            <FiGithub aria-hidden="true" />
            {project.status === "unavailable" ? "Check repository" : "View repository"}
            <FiArrowUpRight aria-hidden="true" />
          </a>
          {project.liveDemo && (
            <a className="demo-link" href={project.liveDemo} rel="noreferrer" target="_blank">
              Live demo <FiArrowUpRight aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
