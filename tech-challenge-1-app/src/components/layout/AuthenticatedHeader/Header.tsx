import { UserIcon } from '@heroicons/react/24/outline';

export default function AuthenticatedHeader() {
  return (
    <div className="header-base bg-bytebank-black">
      <div className='container mx-4 flex items-center justify-end'>
          <div className="flex items-center justify-end">
            <span className="text-bytebank-sm text-white font-semibold">Áquila Borges Moreira</span>
            <div className="mr-5 ml-10">
              <div className="w-10 h-10 bg-transparent rounded-full flex items-center justify-center border border-bytebank-orange">
                <UserIcon className="w-6 h-6 text-bytebank-orange" />
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}