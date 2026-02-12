import type { ReactNode } from 'react';

export function Stepper({ children }: { children: ReactNode }) {
  return (
    <div className="doc-stepper" role="list">
      {children}
    </div>
  );
}
