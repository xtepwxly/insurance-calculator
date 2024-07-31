import React, { ReactNode } from 'react';
import { CostView } from 'utils/insuranceTypes';

interface SelectProps<T> extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  onValueChange?: (value: T) => void;
  className?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps<any>>( // Use generics instead of "any"
  <T,>({ children, onValueChange, className, ...props }: SelectProps<T>, ref: React.Ref<HTMLSelectElement>) => (
    <div className="flex justify-center md:mb-1  md:mt-1"> {/* Center the select element within its container */}
      <select
        ref={ref}
        className={`w-full border-solid	rounded-xl p-2 text-center text-base font-medium ${className || ''}`} // Add rounded-xl, padding, text-center, text size, and font weight
        onChange={(e) => onValueChange && onValueChange(e.target.value as unknown as T)}
        {...props}
      >
        {children}
      </select>
    </div>
  )
);

Select.displayName = 'Select';

interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ children, ...props }, ref) => (
    <button ref={ref} {...props}>{children}</button>
  )
);

SelectTrigger.displayName = 'SelectTrigger';

interface SelectValueProps {
  children?: ReactNode;
  placeholder?: string;
}

export const SelectValue: React.FC<SelectValueProps> = ({ children, placeholder }) => (
  <span>{children || placeholder}</span>
);

interface SelectContentProps {
  children: ReactNode;
}

export const SelectContent: React.FC<SelectContentProps> = ({ children }) => {
  if (React.Children.count(children) === 0) {
    return null;
  }
  return <>{children}</>;
};

interface SelectItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  children: ReactNode;
}

export const SelectItem = React.forwardRef<HTMLOptionElement, SelectItemProps>(
  ({ children, ...props }, ref) => (
    <option ref={ref} {...props}>{children}</option>
  )
);

SelectItem.displayName = 'SelectItem';
