'use client';

import { signIn } from 'next-auth/react';
import { Button } from 'primereact/button';

export default function LoginPage() {
  const handleLogin = () => {
    signIn('keycloak', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="flex align-items-center justify-content-center min-h-screen surface-ground">
      <div className="w-full md:w-4 surface-card border-round shadow-2 p-5">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-900 mb-2">Exemplo Frontend</h1>
          <p className="text-600">Acesse com suas credenciais institucionais</p>
        </div>
        <Button onClick={handleLogin} className="w-full">
          Entrar com SSO
        </Button>
      </div>
    </div>
  );
}
