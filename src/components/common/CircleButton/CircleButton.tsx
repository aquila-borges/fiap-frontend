import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { ElementType } from 'react';

interface ButtonDeleteProps {
  onClick?: () => void;
  icon?: ElementType;
}

export default function ButtonDelete({ onClick, icon: Icon = QuestionMarkCircleIcon }: ButtonDeleteProps) {
  return (
    <div
      onClick={onClick}
      className="w-10 h-10 rounded-full flex items-center justify-center bg-bytebank-black hover:bg-black transition-colors duration-300 hover:cursor-pointer"
    >
      <Icon className="w-6 h-6 text-white hover:bg-transparent transition-colors duration-300" />
    </div>
  );
}