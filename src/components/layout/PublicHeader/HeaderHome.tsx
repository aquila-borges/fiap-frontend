import ButtonPrimary from "@/components/common/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "@/components/common/ButtonSecondary/ButtonSecondary";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function PublicHeader() {
  return (
    <div className="header-base bg-black text-white">
      <div className="container">
        <div className="flex items-center justify-between h-full px-4">

          {/* MOBILE ONLY */}
          <div className="flex w-full items-center justify-between md:hidden flex-row-reverse">
            <img src="/images/Logo.png" alt="Bytebank" className="w-[120px]" />

            <button>
               <Bars3Icon className="w-8 h-8 text-bytebank-green hover:cursor-pointer" />
            </button>
          </div>

          {/* TABLET E DESKTOP */}
          <div className="hidden md:flex items-center justify-between w-full">
            <div className="flex items-center gap-x-10">
              <img
                src="/images/Logo.png"
                alt="Bytebank"
                className="hidden lg:block"
              />

              <img
                src="/images/Logo-Pequena.png"
                alt="Bytebank"
                className="block lg:hidden"
              />

              <a href="#" className="text-bytebank-green font-semibold text-lg">Sobre</a>
              <a href="#" className="text-bytebank-green font-semibold text-lg">Serviços</a>
            </div>

            <div className="flex items-center gap-x-4">
              <ButtonPrimary
                children="Abrir conta"
                bgColorClass="bg-bytebank-green"
                className="md:block lg:hidden"
              />
              <ButtonSecondary
                children="Já tenho conta"
                className="md:block lg:hidden"
              />

              <div className="hidden lg:flex gap-x-4">
                <ButtonPrimary children="Abrir minha conta" bgColorClass="bg-bytebank-green" />
                <ButtonSecondary children="Já tenho conta" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}