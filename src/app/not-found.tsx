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

        <h1 className="font-bold text-[25px] text-black drop-shadow-md text-center">
          Ops! Não encontramos a página...
        </h1>

        <p className="font-normal text-base text-black text-center max-w-md">
          E olha que exploramos o universo procurando por ela!<br />
          Que tal voltarmos e tentar novamente?
        </p>

        <ButtonPrimary onClick={goHome} bgColorClass="bg-bytebank-orange">
          Volta ao início
        </ButtonPrimary>

        <div className="flex-grow flex items-center justify-center w-full flex-shrink-0 pb-10 md:pb-0">
          <img
            src="/images/Ilustracao-404.png"
            alt="Ilustração divertida de página 404 não encontrada"
            className="max-h-[400px] object-contain"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}