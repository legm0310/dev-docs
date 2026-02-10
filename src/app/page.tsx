import { redirect } from 'next/navigation';
import { getAllBundles } from '@/lib/sidebar';

export default function Home() {
  const bundles = getAllBundles();
  const firstBundle = bundles[0] || 'zk';
  redirect(`/docs/${firstBundle}/getting-started`);
}
