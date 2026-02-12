import type { ReactNode } from 'react';

export function CodeBlock({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <figure className="doc-code-block">
      {title ? (
        <figcaption className="doc-code-title">{title}</figcaption>
      ) : null}
      <div className="doc-code-content">{children}</div>
    </figure>
  );
}
