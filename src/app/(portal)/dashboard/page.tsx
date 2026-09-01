import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Exemplo Frontend',
};

export default function DashboardPage() {
  return (
    <div className="flex flex-column gap-4">
      <h1 className="text-2xl font-bold text-900 m-0">Dashboard</h1>
      <p className="text-600 m-0">Pagina inicial do sistema.</p>
    </div>
  );
}
