type ButtonPrimaryProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  bgColorClass?: string;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
};

export default function ButtonPrimary({
  children,
  onClick,
  type = 'button',
  bgColorClass = 'bg-bytebank-black',
  disabled = false,
  isLoading = false,
  className = '',
}: ButtonPrimaryProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${bgColorClass} btn-base text-white hover:bg-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? "Carregando..." : children}
    </button>
  );
}