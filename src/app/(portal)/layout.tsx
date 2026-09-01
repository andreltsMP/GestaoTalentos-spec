import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-column flex-1">
        <Header />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
