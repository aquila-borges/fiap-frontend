'use client';

import { useEffect, useState } from 'react';
import ButtonPrimary from "@/components/common/ButtonPrimary/ButtonPrimary";
import Footer from "@/components/layout/Footer/Footer";
import PublicHeader from "@/components/layout/PublicHeader/HeaderHome";
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const goHome = () => {
    router.push('/');
  };

  if (!hasMounted) return null; // ⛔️ Evita renderização no server e possível erro de hidratação

  return (
    <div className="min-h-screen flex flex-col">      
      <main className="flex-grow flex flex-col gap-y-6 items-center bg-gradient-to-b from-bytebank-black to-white">
        <PublicHeader />
        <p className="font-bold text-[25px] text-black">Ops! Não encontramos a página...</p>
        <span className="font-normal text-base text-black text-center">
          E olha que exploramos o universo procurando por ela!<br/>
          Que tal voltarmos e tentar novamente?
        </span>

        <ButtonPrimary onClick={goHome} color="bytebank-orange">Volta ao início</ButtonPrimary>
        <div className="flex-grow flex items-center justify-center w-full">
          <img
            src="/images/Ilustracao-404.png"
            className="max-h-full object-contain"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}