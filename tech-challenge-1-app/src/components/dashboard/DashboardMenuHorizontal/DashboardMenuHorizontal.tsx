'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function DashboardMenuHorizontal() {
  const pathname = usePathname();

  const menuItems = [
    { label: 'Início', href: '/dashboard' },
    { label: 'Transferência', href: '/dashboard/transferencia' },
    { label: 'Investimentos', href: '/dashboard/investimentos' },
    { label: 'Outros serviços', href: '/dashboard/servicos' },
  ];

  return (
    <div className="flex text-base items-center text-black font-normal no-underline">
    {menuItems.map(({ label, href }) => {
        const isActive = pathname.startsWith(href);

        return (
        <div
            key={href}
            className={`${isActive ? 'font-bold border-b border-bytebank-green text-bytebank-green' : ''} pb-4 w-full flex justify-center`}
            >
            <Link href={href}>
                {label}
            </Link>
        </div>
        );
    })}
    </div>
  );
}