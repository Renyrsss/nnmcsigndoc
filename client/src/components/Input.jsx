import { memo, forwardRef } from 'react';

/**
 * Переиспользуемый компонент поля ввода
 */
const Input = memo(forwardRef(function Input({ 
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  error,
  className = '',
  ...props 
}, ref) {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-semibold leading-6 text-gray-900"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="mt-2">
        <input
          ref={ref}
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm 
            ring-1 ring-inset placeholder:text-gray-400 
            focus:ring-2 focus:ring-inset focus:ring-indigo-600 
            sm:text-sm sm:leading-6
            ${error ? 'ring-red-500' : 'ring-gray-300'}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}));

export default Input;
