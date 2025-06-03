export default function Footer() {
  return (
    <footer className="h-[224px] bg-black text-white text-base w-full">
        <div className="container mx-auto px-4 h-full">
          <div className="grid grid-cols-1 md:grid-cols-3 justify-between h-full">
            <div className="flex flex-col gap-y-3 justify-center">
              <span className="font-bold">Serviços</span>
              <a href="#">Conta Corrente</a>
              <a href="#">Conta PJ</a>
              <a href="#">Cartão de crédito</a>
            </div>

            <div className="flex items-center justify-center">
              <div className="flex flex-col gap-y-3">
                <span className="font-bold">Contato</span>
                <span>0800 004 250 08</span>
                <span>meajuda@bytebank.com.br</span>
                <span>ouvidoria@bytebank.com.br</span>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="flex flex-col items-center gap-y-4 justify-center">
                <span className="font-bold">Desenvolvido por Alura</span>
                <span>
                  <img src="/images/LogoBytebankBranco.png"/>
                </span>
                <div className="flex gap-x-5 items-center">
                  <a href="#"><img src="/images/Instagram.png"/></a>
                  <a href="#"><img src="/images/Whatsapp.png"/></a>
                  <a href="#"><img src="/images/Youtube.png"/></a>
                </div>
              </div>
            </div>
          </div>
        </div>
    </footer>
  );
}