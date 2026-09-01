'use client';

import { Button } from 'primereact/button';
import { useSession, signOut } from 'next-auth/react';

export function PortalMenu() {
  const { data: session } = useSession();

  return (
    <div className="flex align-items-center gap-3">
      {session?.user?.name && (
        <span className="text-sm text-700">{session.user.name}</span>
      )}
      <Button
        label="Sair"
        outlined
        size="small"
        icon="pi pi-sign-out"
        onClick={() => signOut({ callbackUrl: '/login' })}
      />
    </div>
  );
}
