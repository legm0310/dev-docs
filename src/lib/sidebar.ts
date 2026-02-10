import fs from "fs";
import path from "path";
import matter from "gray-matter";

const DOCS_DIR = path.join(process.cwd(), "docs");

export interface SidebarItem {
  title: string;
  slug: string;
  order: number;
  children: SidebarItem[];
}

function readFrontmatter(filePath: string): { title: string; order: number } {
  const content = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(content);
  return {
    title: data.title || path.basename(filePath, ".md"),
    order: data.order ?? 999,
  };
}

function buildTree(dir: string, basePath: string = ""): SidebarItem[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const items: SidebarItem[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const indexPath = path.join(fullPath, "index.md");
      const hasIndex = fs.existsSync(indexPath);
      const meta = hasIndex
        ? readFrontmatter(indexPath)
        : { title: entry.name, order: 999 };

      const slug = basePath ? `${basePath}/${entry.name}` : entry.name;
      const children = buildTree(fullPath, slug).filter(
        (child) => child.slug !== slug
      );

      items.push({
        title: meta.title,
        slug,
        order: meta.order,
        children,
      });
    } else if (entry.name.endsWith(".md") && entry.name !== "index.md") {
      const name = entry.name.replace(/\.md$/, "");
      const meta = readFrontmatter(fullPath);
      const slug = basePath ? `${basePath}/${name}` : name;

      items.push({
        title: meta.title,
        slug,
        order: meta.order,
        children: [],
      });
    }
  }

  return items.sort((a, b) => a.order - b.order);
}

export function getAllBundles(): string[] {
  return fs
    .readdirSync(DOCS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

export function getSidebarTree(bundle: string): SidebarItem[] {
  const bundleDir = path.join(DOCS_DIR, bundle);
  if (!fs.existsSync(bundleDir)) return [];
  return buildTree(bundleDir, bundle);
}
