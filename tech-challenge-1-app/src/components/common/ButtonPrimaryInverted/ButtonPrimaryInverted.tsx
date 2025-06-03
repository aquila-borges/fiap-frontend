type ButtonPrimaryProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  color?: string;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
};

export default function ButtonPrimaryInverted({
  children,
  onClick,
  type = 'button',
  disabled = false,
  isLoading = false,
  className = '',
}: ButtonPrimaryProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`bg-black btn-base text-white hover:bg-bytebank-green transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? "Carregando..." : children}
    </button>
  );
}