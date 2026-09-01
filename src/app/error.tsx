'use client';

import { Button } from 'primereact/button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-column align-items-center justify-content-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold text-red-600 m-0">Ocorreu um erro</h1>
      <p className="text-600 m-0">Algo inesperado aconteceu. Tente novamente.</p>
      <Button label="Tentar novamente" onClick={reset} />
    </div>
  );
}
