'use client';

import { useSession } from 'next-auth/react';

interface PessoaLogada {
  nome: string;
  email: string;
  autenticado: boolean;
  carregando: boolean;
}

export function usePessoaLogada(): PessoaLogada {
  const { data: session, status } = useSession();

  return {
    nome: session?.user?.name ?? '',
    email: session?.user?.email ?? '',
    autenticado: status === 'authenticated',
    carregando: status === 'loading',
  };
}
