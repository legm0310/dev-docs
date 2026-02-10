import { getAllDocSlugs, getDocBySlug } from '@/lib/docs';
import { getSidebarTree } from '@/lib/sidebar';
import DocLayout from '@/components/DocLayout';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const slugs = getAllDocSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const doc = await getDocBySlug(slug);
  const bundle = slug[0].toUpperCase();
  return { title: `${doc.meta.title} - DevBook - ${bundle}` };
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  const bundle = slug[0];
  const doc = await getDocBySlug(slug);
  const sidebarItems = getSidebarTree(bundle);

  return <DocLayout sidebarItems={sidebarItems} content={doc.content} headings={doc.headings} bundleName={bundle} />;
}
