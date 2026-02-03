import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Job, JobMeta } from "./types";

const jobsDirectory = path.join(process.cwd(), "content/jobs");

export function getAllJobSlugs(): string[] {
  const fileNames = fs.readdirSync(jobsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

export function getJobBySlug(slug: string): Job {
  const fullPath = path.join(jobsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    transformsTo: data.transformsTo,
    category: data.category,
    content,
  };
}

export function getAllJobs(): JobMeta[] {
  const slugs = getAllJobSlugs();
  const jobs = slugs.map((slug) => {
    const fullPath = path.join(jobsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title,
      transformsTo: data.transformsTo,
      category: data.category,
    };
  });

  return jobs.sort((a, b) => a.title.localeCompare(b.title));
}

export function getJobsByCategory(category: string): JobMeta[] {
  return getAllJobs().filter((job) => job.category === category);
}
