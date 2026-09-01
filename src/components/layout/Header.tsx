'use client';

import { Button } from 'primereact/button';
import { signOut, useSession } from 'next-auth/react';

export function Header() {
  const { data: session } = useSession();

  return (
    <header
      className="flex align-items-center justify-content-between border-bottom-1 surface-border surface-card px-4"
      style={{ height: '4rem' }}
    >
      <h2 className="text-lg font-semibold text-700 m-0">Exemplo Frontend</h2>
      <div className="flex align-items-center gap-3">
        {session?.user?.name && (
          <span className="text-sm text-600">{session.user.name}</span>
        )}
        <Button
          label="Sair"
          icon="pi pi-sign-out"
          outlined
          size="small"
          onClick={() => signOut({ callbackUrl: '/login' })}
        />
      </div>
    </header>
  );
}
