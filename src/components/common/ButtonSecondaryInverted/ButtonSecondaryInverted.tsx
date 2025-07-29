type ButtonSecondaryProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
};

export default function ButtonSecondaryInverted({
  children,
  onClick,
  type = 'button',
  disabled = false,
  isLoading = false,
  className = '',
}: ButtonSecondaryProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`btn-base border border-black text-black disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? 'Carregando...' : children}
    </button>
  );
}