import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon: Icon, iconPosition = 'left', className = '', ...props }, ref) => {
    const baseClasses = 'w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600';
    const errorClasses = error ? 'border-red-500 dark:border-red-400' : '';
    const paddingClasses = Icon ? (iconPosition === 'left' ? 'pl-10 pr-4 py-2' : 'pl-4 pr-10 py-2') : 'px-4 py-2';

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && iconPosition === 'left' && (
            <Icon className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          )}
          <input
            ref={ref}
            className={`${baseClasses} ${errorClasses} ${paddingClasses} ${className}`}
            {...props}
          />
          {Icon && iconPosition === 'right' && (
            <Icon className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;