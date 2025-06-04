'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Bars3Icon, UserIcon } from '@heroicons/react/24/outline';

export default function AuthenticatedHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Transferência', href: '/dashboard/perfil' },
    { label: 'Investimentos', href: '/dashboard/configuracoes' },
    { label: 'Outros serviços', href: '/logout' },
  ];

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <div className="header-base bg-bytebank-black relative z-50">
      <div className="container mx-4 flex items-center justify-between sm:justify-end py-2">
        <div className="relative sm:hidden">
          <button onClick={toggleMenu} aria-label="Abrir menu">
            <Bars3Icon className="w-8 h-8 text-bytebank-orange cursor-pointer" />
          </button>

          {menuOpen && (
            <div
              className="absolute top-10 left-0 bg-[#E4EDE3] rounded-md shadow-md overflow-hidden"
              style={{ width: 'auto', height: 'auto' }}
            >
              <div className="flex flex-col justify-center h-full text-black">
                {menuItems.map(({ label, href }) => {
                  const isActive = pathname.startsWith(href);

                  return (
                    <div
                      key={href}
                      className={`mx-5 px-4 py-4 border-b last:border-none ${
                        isActive
                          ? 'border-bytebank-green font-bold text-bytebank-orange'
                          : 'border-black'
                      }`}
                    >
                      <Link href={href} className="block w-full text-center hover:underline">
                        {label}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-x-4">
          <span className="hidden sm:inline text-bytebank-sm text-white font-semibold">
            Áquila Borges Moreira
          </span>
          <div className="w-10 h-10 rounded-full flex items-center justify-center border border-bytebank-orange mr-0 sm:mr-4">
            <UserIcon className="w-6 h-6 text-bytebank-orange" />
          </div>
        </div>
      </div>
    </div>
  );
}