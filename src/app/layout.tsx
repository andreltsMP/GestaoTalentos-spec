import type { Metadata } from 'next';
import BaseLayout from '@/shared/components/layout/BaseLayout';
import '@mpms/shared-ui/public/css/globals.css';
import '@mpms/shared-ui/public/css/app.css';

export const metadata: Metadata = {
  title: 'Exemplo Frontend - MPMS',
  description: 'Aplicacao modelo da Divisao de Desenvolvimento',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <BaseLayout>{children}</BaseLayout>;
}
