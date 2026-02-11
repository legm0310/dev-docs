import Link from 'next/link';

export default function Header({ bundleName }: { bundleName: string }) {
  return (
    <header className="h-14 shrink-0 border-b border-gray-200 bg-white flex items-center px-6">
      <Link href="/" className="text-lg font-bold text-gray-900">
        DevBook
        <span className="text-blue-600"> {bundleName.toUpperCase()}</span>
      </Link>
    </header>
  );
}
