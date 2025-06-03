export default function Footer() {
  return (
    <footer className="h-auto bg-black text-white text-base w-full py-10">
      <div className="container mx-auto pl-10 md:pl-0 px-4">
        <div className="flex flex-col md:flex-row md:justify-around lg:justify-between gap-y-10 md:gap-y-0">
          

          <div className="flex flex-col gap-y-3 text-left">
            <span className="font-bold">Serviços</span>
            <a href="#">Conta Corrente</a>
            <a href="#">Conta PJ</a>
            <a href="#">Cartão de crédito</a>
          </div>

          <div className="flex items-center justify-start">
            <div className="flex flex-col gap-y-3 text-left">
              <span className="font-bold">Contato</span>
              <span>0800 004 250 08</span>
              <span>meajuda@bytebank.com.br</span>
              <span>ouvidoria@bytebank.com.br</span>
            </div>
          </div>

          <div className="flex justify-start md:justify-end">
            <div className="flex flex-col items-start gap-y-4">
              <span className="font-bold">Desenvolvido por Alura</span>
              <span>
                <img src="/images/LogoBytebankBranco.png" alt="Logo Bytebank" />
              </span>
              <div className="flex gap-x-5 items-center">
                <a href="#"><img src="/images/Instagram.png" alt="Instagram" /></a>
                <a href="#"><img src="/images/Whatsapp.png" alt="Whatsapp" /></a>
                <a href="#"><img src="/images/Youtube.png" alt="Youtube" /></a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}