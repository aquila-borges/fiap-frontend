import ButtonPrimary from "@/components/common/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "@/components/common/ButtonSecondary/ButtonSecondary";

export default function PublicHeader() {
  return (
    <footer className="header-base bg-black">
        <div className="container">
          <div className="flex h-full items-center justify-between ">
            
            <div className="flex justify-between items-center w-100">
              <img
                src="/images/Logo.png"
                alt="Bytebank"
              />              
              <a href="#" className="text-bytebank-green font-semibold text-lg">Sobre</a>
              <a href="#" className="text-bytebank-green font-semibold text-lg">Serviços</a>
            </div>

            <div className="flex gap-x-8">
              <ButtonPrimary children="Abrir minha conta" color="bytebank-green"/>
              <ButtonSecondary children="Já tenho conta conta" />
            </div>

          </div>
        </div>
    </footer>
  );
}