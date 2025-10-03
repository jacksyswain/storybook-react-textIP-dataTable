import React, { useState, useEffect } from 'react';

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  showClear?: boolean;
  password?: boolean;
  className?: string;
}

const sizeMap: Record<string,string> = {
  sm: 'text-sm px-2 py-1',
  md: 'text-base px-3 py-2',
  lg: 'text-lg px-4 py-3',
};

const variantMap: Record<string,string> = {
  filled: 'bg-gray-100 dark:bg-gray-800 border-transparent',
  outlined: 'bg-white dark:bg-gray-900 border',
  ghost: 'bg-transparent border-transparent',
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'md',
  showClear = false,
  password = false,
  className = '',
}) => {
  const [internal, setInternal] = useState(value ?? '');
  const [showPwd, setShowPwd] = useState(false);

  useEffect(()=> {
    if (value !== undefined) setInternal(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternal(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    const fakeEvent = { target: { value: '' } } as unknown as React.ChangeEvent<HTMLInputElement>;
    setInternal('');
    onChange?.(fakeEvent);
  };

  const rootClasses = [
    'w-full rounded-md flex items-center gap-2',
    variantMap[variant],
    invalid ? 'border-red-500' : 'border-gray-300 dark:border-gray-700',
    disabled ? 'opacity-60 cursor-not-allowed' : 'opacity-100',
    sizeMap[size],
    className,
  ].join(' ');

  return (
    <label className="block w-full">
      {label && (
        <div className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">{label}</div>
      )}
      <div className={rootClasses} aria-disabled={disabled}>
        <input
          type={password && !showPwd ? 'password' : 'text'}
          value={internal}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={invalid}
          aria-label={label ?? placeholder}
          className="flex-1 bg-transparent outline-none"
        />

        {showClear && (internal) && !disabled && (
          <button
            aria-label="Clear input"
            onClick={handleClear}
            type="button"
            className="text-sm opacity-80 hover:opacity-100 focus:outline-none"
          >
            ✕
          </button>
        )}

        {password && (
          <button
            aria-label={showPwd ? 'Hide password' : 'Show password'}
            onClick={() => setShowPwd((s) => !s)}
            type="button"
            className="text-sm opacity-80 hover:opacity-100 focus:outline-none"
          >
            {showPwd ? 'Hide' : 'Show'}
          </button>
        )}

      </div>

      <div className="mt-1 flex items-center justify-between">
        <p className={`text-xs ${invalid ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
          {invalid ? errorMessage ?? 'Invalid' : helperText}
        </p>
      </div>
    </label>
  );
};

export default InputField;
