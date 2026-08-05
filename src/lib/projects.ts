import projectData from "../../content/projects.json";

export type Project = (typeof projectData.projects)[number];
export const projects = projectData.projects;
export const projectCount = projectData.projectCount;
export const appProjects = projects.filter((project) => project.category !== "Client work");
export const appProjectCount = appProjects.length;
export const generatedAt = projectData.generatedAt;
export const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
