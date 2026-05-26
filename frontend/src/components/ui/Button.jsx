// ==========================================
// XIII Frontend - Button Component
// ==========================================
// Composant button réutilisable avec variants

function Button({ 
  children,
  type = 'button',
  variant = 'primary',
  onClick,
  disabled = false,
  loading = false,
  className = ''
}) {
  
  // Styles de base communs
  const baseStyles = `
  px-10 py-3
  text-base font-medium
  rounded-lg
  transition-all duration-200
  disabled:opacity-50 disabled:cursor-not-allowed
`;

const variants = {
  primary: `
    bg-carbon text-cream
    hover:bg-opacity-90
  `,
  outline: `
    bg-transparent border-2 border-carbon text-carbon
    hover:bg-carbon hover:text-cream
  `,
    ghost: `
      bg-transparent text-carbon
      hover:bg-gray-100
    `
  };

  return (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled || loading}
    className={`${baseStyles} ${variants[variant]} ${className} relative`}
  >
    {loading && (
      <svg className="animate-spin h-4 w-4 absolute left-1/2 -translate-x-12" viewBox="0 0 24 24">
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
          fill="none"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    )}
    <span className={loading ? 'opacity-80' : ''}>
      {children}
    </span>
  </button>
);
}

export default Button;