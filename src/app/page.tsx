import { redirect } from 'next/navigation';
import { getAllBundles, getFirstDocSlug } from '@/lib/sidebar';

export default function Home() {
  const bundles = getAllBundles();
  const firstBundle = bundles[0];
  if (!firstBundle) redirect('/docs');

  const firstDoc = getFirstDocSlug(firstBundle);
  redirect(firstDoc ? `/docs/${firstDoc}` : `/docs/${firstBundle}`);
}
