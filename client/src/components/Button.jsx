import { memo } from 'react';

/**
 * Переиспользуемый компонент кнопки
 */
const Button = memo(({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary',
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseStyles = 'block rounded-md px-4 py-2.5 text-center text-sm font-semibold shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer';
  
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600',
    secondary: 'bg-gray-600 text-white hover:bg-gray-500 focus-visible:outline-gray-600',
    disabled: 'bg-gray-400 text-white cursor-not-allowed',
  };
  
  const currentVariant = disabled ? 'disabled' : variant;
  
  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[currentVariant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
