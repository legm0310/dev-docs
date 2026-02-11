export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <article
      className="prose prose-gray max-w-none
        prose-headings:scroll-mt-20
        prose-a:text-blue-600 prose-a:no-underline
        prose-pre:p-0 prose-pre:bg-transparent
        prose-code:before:content-none prose-code:after:content-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
