import { redirect } from 'next/navigation';
import { getAllDocSlugs, getDocBySlug } from '@/lib/docs';
import { getAllBundles, getFirstDocSlug, getSidebarTree } from '@/lib/sidebar';
import DocLayout from '@/components/DocLayout';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const slugs = getAllDocSlugs();
  const bundles = getAllBundles();
  return [
    ...bundles.map((b) => ({ slug: [b] })),
    ...slugs.map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  if (slug.length === 1) {
    return { title: `DevBook - ${slug[0].toUpperCase()}` };
  }
  const doc = await getDocBySlug(slug);
  const bundle = slug[0].toUpperCase();
  return { title: `${doc.meta.title} - DevBook - ${bundle}` };
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  const bundle = slug[0];

  // Bundle-only path (e.g., /docs/zk-vote) → redirect to first document
  if (slug.length === 1) {
    const firstDoc = getFirstDocSlug(bundle);
    redirect(firstDoc ? `/docs/${firstDoc}` : '/');
  }

  const doc = await getDocBySlug(slug);
  const sidebarItems = getSidebarTree(bundle);

  return <DocLayout sidebarItems={sidebarItems} content={doc.content} headings={doc.headings} bundleName={bundle} />;
}
