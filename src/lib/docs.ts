import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

const DOCS_DIR = path.join(process.cwd(), "docs");

export interface DocMeta {
  title: string;
  order: number;
  slug: string[];
}

export interface Doc {
  meta: DocMeta;
  content: string;
  headings: Heading[];
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

function getMdFiles(dir: string, basePath: string[] = []): string[][] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const slugs: string[][] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      slugs.push(...getMdFiles(path.join(dir, entry.name), [...basePath, entry.name]));
    } else if (entry.name.endsWith(".md")) {
      const name = entry.name === "index.md" ? [] : [entry.name.replace(/\.md$/, "")];
      slugs.push([...basePath, ...name]);
    }
  }

  return slugs;
}

export function getAllDocSlugs(): string[][] {
  return getMdFiles(DOCS_DIR);
}

function resolveFilePath(slug: string[]): string {
  const indexPath = path.join(DOCS_DIR, ...slug, "index.md");
  if (fs.existsSync(indexPath)) return indexPath;

  const filePath = path.join(DOCS_DIR, ...slug.slice(0, -1), `${slug[slug.length - 1]}.md`);
  if (fs.existsSync(filePath)) return filePath;

  throw new Error(`Document not found: ${slug.join("/")}`);
}

export function getHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  const lines = markdown.split("\n");

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s가-힣-]/g, "")
        .replace(/\s+/g, "-");
      headings.push({ id, text, level });
    }
  }

  return headings;
}

export async function getDocBySlug(slug: string[]): Promise<Doc> {
  const filePath = resolveFilePath(slug);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content: markdown } = matter(fileContent);

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypePrettyCode, { theme: "github-dark" })
    .use(rehypeStringify)
    .process(markdown);

  const headings = getHeadings(markdown);

  return {
    meta: {
      title: data.title || slug[slug.length - 1] || "Untitled",
      order: data.order || 999,
      slug,
    },
    content: String(result),
    headings,
  };
}
