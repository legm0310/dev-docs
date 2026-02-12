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
import rehypeFixBold from "./rehype-fix-bold";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx";

const DOCS_DIR = path.join(process.cwd(), "docs");

function createMarkdownProcessor() {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeFixBold)
    .use(rehypePrettyCode, { theme: "github-dark" })
    .use(rehypeStringify);
}

export interface DocMeta {
  title: string;
  order: number;
  slug: string[];
}

export interface Doc {
  meta: DocMeta;
  content: string | React.ReactNode;
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
  const seen = new Set<string>();

  function key(parts: string[]) {
    return parts.join("/");
  }

  for (const entry of entries) {
    if (entry.isDirectory()) {
      slugs.push(...getMdFiles(path.join(dir, entry.name), [...basePath, entry.name]));
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      const name = entry.name === "index.mdx" ? [] : [entry.name.replace(/\.mdx$/, "")];
      const k = key([...basePath, ...name]);
      if (!seen.has(k)) {
        seen.add(k);
        slugs.push([...basePath, ...name]);
      }
    }
  }
  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith(".md")) {
      const name = entry.name === "index.md" ? [] : [entry.name.replace(/\.md$/, "")];
      const k = key([...basePath, ...name]);
      if (!seen.has(k)) {
        seen.add(k);
        slugs.push([...basePath, ...name]);
      }
    }
  }

  return slugs;
}

export function getAllDocSlugs(): string[][] {
  return getMdFiles(DOCS_DIR);
}

function resolveFilePath(slug: string[]): string {
  const indexPathMdx = path.join(DOCS_DIR, ...slug, "index.mdx");
  if (fs.existsSync(indexPathMdx)) return indexPathMdx;
  const indexPath = path.join(DOCS_DIR, ...slug, "index.md");
  if (fs.existsSync(indexPath)) return indexPath;

  const baseName = slug[slug.length - 1];
  const filePathMdx = path.join(DOCS_DIR, ...slug.slice(0, -1), `${baseName}.mdx`);
  if (fs.existsSync(filePathMdx)) return filePathMdx;
  const filePath = path.join(DOCS_DIR, ...slug.slice(0, -1), `${baseName}.md`);
  if (fs.existsSync(filePath)) return filePath;

  throw new Error(`Document not found: ${slug.join("/")}`);
}

export function getHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  const lines = markdown.split("\n");
  const idCount = new Map<string, number>();

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const baseId = text
        .toLowerCase()
        .replace(/[^\w\s가-힣-]/g, "")
        .replace(/\s+/g, "-");
      const count = idCount.get(baseId) ?? 0;
      idCount.set(baseId, count + 1);
      const id = count === 0 ? baseId : `${baseId}-${count}`;
      headings.push({ id, text, level });
    }
  }

  return headings;
}

export async function getDocBySlug(slug: string[]): Promise<Doc> {
  const filePath = resolveFilePath(slug);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const isMdx = filePath.endsWith(".mdx");

  if (isMdx) {
    const { content, frontmatter } = await compileMDX({
      source: fileContent,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          development: process.env.NODE_ENV === "development",
          remarkPlugins: [remarkGfm],
        },
      },
      components: mdxComponents,
    });

    const raw = matter(fileContent);
    const headings = getHeadings(raw.content);

    return {
      meta: {
        title: (frontmatter?.title as string) || slug[slug.length - 1] || "Untitled",
        order: (frontmatter?.order as number) ?? 999,
        slug,
      },
      content,
      headings,
    };
  }

  const { data, content: markdown } = matter(fileContent);
  const result = await createMarkdownProcessor().process(markdown);
  const headings = getHeadings(markdown);

  return {
    meta: {
      title: data.title || slug[slug.length - 1] || "Untitled",
      order: data.order ?? 999,
      slug,
    },
    content: String(result),
    headings,
  };
}
