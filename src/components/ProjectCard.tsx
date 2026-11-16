import type { Project } from "../../data/projects";
import ProjectPreview from "./ProjectPreview";

const statusLabels = {
  verified: "Source reviewed",
  prototype: "Prototype",
  fork: "Fork · attribution noted",
  unavailable: "Unverified source",
} as const;

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  return (
    <article
      className={`project-card${project.featured ? " project-card-featured" : ""}${project.status === "unavailable" ? " project-card-unavailable" : ""}`}
    >
      <div className="project-card-top">
        <div>
          <p className="project-category">{project.category}</p>
          <h3>{project.title}</h3>
          <p className="project-subtitle">{project.subtitle}</p>
        </div>
        <span className={`status-pill status-${project.status}`}>
          <span className="status-dot" />
          {statusLabels[project.status]}
        </span>
      </div>

      <ProjectPreview kind={project.preview} />

      <div className="project-content">
        <p className="project-summary">{project.summary}</p>

        <div className="problem-block">
          <span className="detail-label">THE PROBLEM</span>
          <p>{project.problem}</p>
        </div>

        <div className="tag-list" aria-label="Technology stack">
          {project.stack.length > 0 ? (
            project.stack.map((technology) => (
              <span className="tech-tag" key={technology}>
                {technology}
              </span>
            ))
          ) : (
            <span className="tech-tag tech-tag-muted">Stack unverified</span>
          )}
        </div>

        <details className="project-details">
          <summary>
            <span>Implementation notes</span>
            <span aria-hidden="true" className="details-toggle">
              +
            </span>
          </summary>
          <div className="details-body">
            <p>{project.implementation}</p>
            <span className="detail-label">TECHNICAL HIGHLIGHTS</span>
            <ul>
              {project.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <div className="provenance-note">
              <span className="detail-label">ATTRIBUTION & STATUS</span>
              <p>{project.provenance}</p>
            </div>
          </div>
        </details>

        <div className="project-links">
          <a
            className="repository-link"
            href={project.repository}
            rel="noreferrer"
            target="_blank"
          >
            {project.status === "unavailable"
              ? "Check repository"
              : "View repository"}
            <span aria-hidden="true">↗</span>
          </a>
          {project.liveDemo && (
            <a
              className="demo-link"
              href={project.liveDemo}
              rel="noreferrer"
              target="_blank"
            >
              Live demo <span aria-hidden="true">↗</span>
            </a>
          )}
          {project.rank && (
            <span className="project-rank">
              PORTFOLIO PRIORITY / 0{project.rank}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
