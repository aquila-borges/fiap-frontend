import Footer from "@/components/layout/Footer/Footer";
import PublicHeader from "@/components/layout/PublicHeader/HeaderHome";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="bg-gradient-to-b from-bytebank-black to-white pt-5 flex flex-col flex-grow">
        <div className="container mx-auto px-4 flex flex-col">
          <div className="grid lg:grid-cols-2 md:grid-cols-1 justify-between items-center">
            <div className="flex items-center justify-center lg:justify-start mb-6 lg:max-w-[450px]">
              <span className="font-bold text-[28px] leading-tight text-center md:text-left">
                Experimente mais liberdade no controle da sua vida financeira.
                Crie sua conta com a gente!
              </span>
            </div>
            
            <div className="flex flex-grow justify-end">
              <img
                src="/images/Ilustracao-Banner.png"
                className="max-h-full object-contain"
              />
            </div>
          </div>

          <div className="text-center text-black text-[25px] font-bold mt-10">
            <span>Vantagens do nosso banco:</span>
          </div>

          <div className="flex justify-between pt-8 pb-25 gap-x-12">
            <div className="flex flex-col items-center">
              <img src="/images/IconePresente.png" className="w-[73px]" />
              <span className="font-bold text-bytebank-green my-3">Conta e cartão gratuitos</span>
              <span className="text-bytebank-home-marketing">
                Isso mesmo, nossa conta é digital,
                sem custo fixo e mais que isso: sem
                tarifa de manutenção.
              </span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/images/IconeSaque.png" className="w-[73px]" />
              <span className="font-bold text-bytebank-green my-3">Conta e cartão gratuitos</span>
              <span className="text-bytebank-home-marketing">
                Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.
              </span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/images/IconePontos.png" className="w-[73px]" />
              <span className="font-bold text-bytebank-green my-3">Conta e cartão gratuitos</span>
              <span className="text-bytebank-home-marketing">
                Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!
              </span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/images/IconeDispositivos.png" className="w-[73px]" />
              <span className="font-bold text-bytebank-green my-3">Conta e cartão gratuitos</span>
              <span className="text-bytebank-home-marketing">
                Seus dispositivos móveis (computador e laptop) protegidos por uma mensalidade simbólica.
              </span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}