export default function DashboardMenu() {
  return (
    <div className="bg-bytebank-white h-full rounded-lg py-3 px-6 menu-dashboard w-[180px]">
        <div className="flex flex-col text-base text-black font-normal no-underline">
            <div className="py-4 options-wrap w-full flex justify-center">
                <a href="#" className="hover:font-bold hover:text-bytebank-green">Início</a>
            </div>
            <div className="py-4 px-auto options-wrap w-full flex justify-center">
                <a href="#" className="hover:font-bold hover:text-bytebank-green">Transferência</a>
            </div>
            <div className="py-4 px-auto options-wrap w-full flex justify-center">
                <a href="#" className="hover:font-bold hover:text-bytebank-green">Investimentos</a>
            </div>
            <div className="py-4 px-auto options-wrap w-full flex justify-center">
               <a href="#" className="hover:font-bold hover:text-bytebank-green">Outros serviços</a>
            </div>
        </div>
    </div>
  );
}