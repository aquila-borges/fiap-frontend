type ButtonSecondaryProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
};

export default function ButtonSecondary({
  children,
  onClick,
  type = 'button',
}: ButtonSecondaryProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-black btn-base text-bytebank-green min-w-[250px] hover:bg-bytebank-green hover:text-black transition-colors border-2 border-bytebank-green duration-300"
    >
      {children}
    </button>
  );
}