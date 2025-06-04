'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function DashboardMenuVertical() {
  const pathname = usePathname();

  const menuItems = [
    { label: 'Início', href: '/dashboard' },
    { label: 'Transferência', href: '/dashboard/transferencia' },
    { label: 'Investimentos', href: '/dashboard/investimentos' },
    { label: 'Outros serviços', href: '/dashboard/servicos' },
  ];

  return (
    <div className="bg-bytebank-white h-full rounded-lg py-3 px-6 menu-dashboard w-[180px]">
      <div className="flex flex-col text-base text-bytebank-black font-normal no-underline">
        {menuItems.map(({ label, href }) => {
          const isActive = pathname.startsWith(href);

          return (
            <div
              key={href}
              className="py-4 w-full flex justify-center options-wrap"
            >
              <Link
                href={href}
                className={`hover:font-bold hover:text-bytebank-green ${
                  isActive ? 'font-bold' : ''
                }`}
              >
                {label}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}