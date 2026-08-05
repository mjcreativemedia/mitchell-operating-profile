"use client";

import { useMemo, useState } from "react";
import projectData from "../data/projects.json";

type Project = (typeof projectData.projects)[number];

const categories = ["All", "Projects", "Client work", "Tools", "Systems", "Experiments"];

const skillGroups = [
  { title: "Software", skills: ["SwiftUI", "JavaScript", "TypeScript", "React", "Astro", "HTML / CSS", "Node", "REST APIs", "Cloudflare", "GitHub"] },
  { title: "Systems", skills: ["AI workflows", "Automation", "Search", "Data analysis", "Local-first apps", "Content systems", "Technical SEO"] },
  { title: "Hands-on", skills: ["Computer repair", "Network setup", "Bike repair", "Maintenance", "Troubleshooting", "General repairs"] },
  { title: "Business", skills: ["Marketing", "UX", "Customer service", "Sales", "Operations", "Client delivery"] },
];

const timeline = [
  ["2017", "Started programming", "Began learning how software turns ideas into working systems."],
  ["Purdue", "Built the foundation", "University experience, structured learning, and increasingly ambitious projects."],
  ["Clients", "Shipped work for real businesses", "Websites and systems for fitness, home services, media, food, and local operators."],
  ["Products", "Moved from pages to tools", "Native apps, search products, recording software, and repeatable business workflows."],
  ["Now", "Building from Chicago", "Software development, courier fieldwork, automation, and practical local problem solving."],
];

function ProjectLinks({ project }: { project: Project }) {
  if (!project.github && !project.demo) return <span className="project-state">{project.status}</span>;
  return (
    <div className="project-links">
      {project.demo && <a href={project.demo} target="_blank" rel="noreferrer">Live ↗</a>}
      {project.github && <a href={project.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
    </div>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const featured = projectData.projects.filter((project) => project.featured).slice(0, 6);
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return projectData.projects.filter((project) => {
      const inCategory = category === "All" || project.category === category;
      const text = [project.name, project.description, project.category, project.status, ...project.tags].join(" ").toLowerCase();
      return inCategory && (!needle || text.includes(needle));
    });
  }, [query, category]);

  return (
    <main>
      <nav className="topbar" aria-label="Primary navigation">
        <a className="wordmark" href="#top">MA<span>.</span></a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#index">Index</a>
          <a href="#about">About</a>
          <a className="nav-contact" href="mailto:mjcreativemedia1@gmail.com">Contact ↗</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="live-dot" /> Chicago, Illinois · Available for useful work</p>
          <h1>Mitchell<br />Argamasilla</h1>
          <p className="role-line">Software developer <span>•</span> Problem solver <span>•</span> Bike courier <span>•</span> Builder</p>
          <p className="hero-intro">I build software, solve real-world problems, and take on difficult work. From native apps and websites to delivery operations and hands-on repair, I focus on practical solutions that hold up outside the demo.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">View selected work ↓</a>
            <a className="button" href="mailto:mjcreativemedia1@gmail.com">Email Mitchell ↗</a>
            <a className="text-link" href="https://github.com/mjcreativemedia" target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </div>
        <div className="portrait-wrap">
          <div className="portrait-frame">
            <img src="/profile.jpeg" alt="Mitchell Argamasilla wearing a white hoodie" />
          </div>
          <div className="portrait-caption"><span>01</span><p>Developer by practice.<br />Courier by motion.<br />Builder by default.</p></div>
        </div>
      </section>

      <section className="stats-band" aria-label="Quick facts">
        <div><strong>{projectData.projectCount}</strong><span>local software projects indexed</span></div>
        <div><strong>9 yrs</strong><span>programming since 2017</span></div>
        <div><strong>Chicago</strong><span>current operating base</span></div>
        <div><strong>Purdue</strong><span>university foundation</span></div>
        <div><strong>Courier</strong><span>current field occupation</span></div>
      </section>

      <section className="section" id="work">
        <div className="section-heading">
          <div><p className="eyebrow">Selected systems</p><h2>What I build</h2></div>
          <p>Products and platforms chosen from the local project archive. Each one started with a concrete problem.</p>
        </div>
        <div className="featured-grid">
          {featured.map((project, index) => (
            <article className={`featured-card card-${index + 1}`} key={project.name}>
              <div className="card-image">
                {project.image ? <img src={project.image} alt={`${project.name} project preview`} /> : <span>{String(index + 1).padStart(2, "0")}</span>}
              </div>
              <div className="card-copy">
                <div className="card-kicker"><span>{String(index + 1).padStart(2, "0")}</span><span>{project.status}</span></div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <ProjectLinks project={project} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="search-section" id="index">
        <div className="section-heading light">
          <div><p className="eyebrow">The working archive</p><h2>Search everything</h2></div>
          <p>Try “delivery,” “Bible,” “Swift,” “client,” or “automation.” The index is generated from project evidence on this machine.</p>
        </div>
        <div className="search-box">
          <span aria-hidden="true">⌕</span>
          <label className="sr-only" htmlFor="project-search">Search projects</label>
          <input id="project-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the project archive…" />
          <kbd>{filtered.length} found</kbd>
        </div>
        <div className="filters" aria-label="Filter projects by type">
          {categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
        <div className="project-list">
          {filtered.slice(0, query || category !== "All" ? 30 : 12).map((project, index) => (
            <article className="project-row" key={`${project.name}-${index}`}>
              <span className="project-number">{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{project.name}</h3><p>{project.description}</p></div>
              <div className="row-tags">{project.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
              <ProjectLinks project={project} />
            </article>
          ))}
          {!filtered.length && <p className="empty-state">Nothing matched that search yet. Try a technology, industry, or problem.</p>}
        </div>
        {!query && category === "All" && <p className="index-note">Showing 12 of {projectData.projectCount}. Search or choose a category to inspect the full index.</p>}
      </section>

      <section className="section client-section">
        <div className="section-heading">
          <div><p className="eyebrow">Client delivery</p><h2>Work built for other people</h2></div>
          <p>Sites and systems for operators with real customers, schedules, media, and service areas.</p>
        </div>
        <div className="client-grid">
          {["Muscle Wolf Gang Fitness", "Happy Nails Hyde Park", "Lakeshore Outdoor Services", "Daniel’s Plumbing", "Forever Young Tree Services", "Dough Boyz Party Snacks"].map((name, index) => (
            <div className="client-card" key={name}><span>0{index + 1}</span><h3>{name}</h3><p>{index < 2 ? "Brand, content, and website system" : "Local service website and proof system"}</p></div>
          ))}
        </div>
      </section>

      <section className="skills-section">
        <div className="section-heading">
          <div><p className="eyebrow">Capabilities</p><h2>Software and real-world systems</h2></div>
          <p>I am most useful where technical work touches operations, people, and physical constraints.</p>
        </div>
        <div className="skill-grid">
          {skillGroups.map((group, index) => <div className="skill-group" key={group.title}><span>0{index + 1}</span><h3>{group.title}</h3><ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></div>)}
        </div>
      </section>

      <section className="chicago-section">
        <div className="chicago-map" aria-label="Chicago operating base illustration">
          <span className="lake">LAKE MICHIGAN</span><span className="map-label north">NORTH SIDE</span><span className="map-label loop">THE LOOP</span><span className="map-label south">SOUTH SIDE</span><span className="route-dot" />
        </div>
        <div className="chicago-copy"><p className="eyebrow">Field base · 41.8781° N</p><h2>Chicago is part of the work.</h2><p>Bike courier fieldwork keeps me close to routing, weather, time pressure, customer expectations, and the small failures software tends to ignore.</p><p>Available for local software work, IT support, maintenance, and consulting.</p><a className="button button-primary" href="mailto:mjcreativemedia1@gmail.com?subject=Chicago%20work">Start a conversation ↗</a></div>
      </section>

      <section className="section about-section" id="about">
        <div className="about-lead"><p className="eyebrow">Operating principles</p><h2>I like work that leaves evidence.</h2><p>I learn difficult systems, reduce the problem to something workable, and keep moving until there is a result someone else can use. That applies to code, repair, delivery, media, and business operations.</p></div>
        <div className="principles">
          {[["01", "Build the useful version", "Start with the smallest form that solves the actual problem."], ["02", "Learn in public reality", "Test ideas against real constraints, not only clean examples."], ["03", "Own the handoff", "A result is not finished until another person can understand and use it."], ["04", "Stay physically capable", "Movement, repair work, and courier miles reinforce patience and discipline."]].map(([n, title, copy]) => <div key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></div>)}
        </div>
      </section>

      <section className="timeline-section">
        <div className="section-heading light"><div><p className="eyebrow">Working timeline</p><h2>Built one system at a time</h2></div></div>
        <div className="timeline">{timeline.map(([date, title, copy]) => <div className="timeline-item" key={date}><strong>{date}</strong><span className="timeline-node" /><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div>
      </section>

      <section className="media-section">
        <p className="eyebrow">Media shelf</p><h2>Lessons, videos, and field notes are next.</h2><p>The structure is ready for YouTube, recorded builds, courier analysis, talks, and livestreams without making unfinished links look finished.</p>
      </section>

      <footer id="contact">
        <div><p className="eyebrow">Have a real problem?</p><h2>Let’s build the useful version.</h2></div>
        <div className="footer-links"><a href="mailto:mjcreativemedia1@gmail.com">Email ↗</a><a href="https://github.com/mjcreativemedia" target="_blank" rel="noreferrer">GitHub ↗</a><a href="#top">Back to top ↑</a></div>
        <p className="footer-note">Mitchell Argamasilla · Chicago · Project index generated {new Date(projectData.generatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
      </footer>
    </main>
  );
}
