import Link from 'next/link';

const menuItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Cadastros', href: '/cadastros' },
];

export function Sidebar() {
  return (
    <aside className="flex flex-column border-right-1 surface-border surface-card" style={{ width: '16rem' }}>
      <div className="flex align-items-center justify-content-center border-bottom-1 surface-border" style={{ height: '4rem' }}>
        <span className="text-xl font-bold text-primary">MPMS</span>
      </div>
      <nav className="flex-1 p-3">
        <ul className="list-none p-0 m-0 flex flex-column gap-1">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block border-round px-3 py-2 text-sm text-700 no-underline hover:surface-hover"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
