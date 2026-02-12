import type { ReactNode } from 'react';

export function Step({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <div className="doc-step">
      <div className="doc-step-content">
        {title ? <h4 className="doc-step-title">{title}</h4> : null}
        {children}
      </div>
    </div>
  );
}
