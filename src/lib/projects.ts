import projectData from "../../content/projects.json";

export type Project = (typeof projectData.projects)[number];
export const projects = projectData.projects;
export const projectCount = projectData.projectCount;
export const generatedAt = projectData.generatedAt;
export const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
