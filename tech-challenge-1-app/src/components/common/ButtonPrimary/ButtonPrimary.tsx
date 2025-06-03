type ButtonPrimaryProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  color?: string; // Ex: 'bytebank-green', 'bytebank-black'
  disabled?: boolean;
  isLoading?: boolean;
};

export default function ButtonPrimary({
  children,
  onClick,
  type = 'button',
  color = 'bytebank-black',
  disabled = false,
  isLoading = false,
}: ButtonPrimaryProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`bg-${color} btn-base text-white min-w-[250px] hover:bg-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isLoading ? "Carregando..." : children}
    </button>
  );
}