import React, { ReactElement, ReactNode } from 'react';
import { CostView } from 'utils/insuranceTypes';

interface SelectProps<T> extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onValueChange?: (value: T) => void;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps<any>>( // don't like this "any"
  <T,>({ children, onValueChange, ...props } : SelectProps<T>, ref: React.Ref<HTMLSelectElement>) => (
    <select
      ref={ref}
      className={`rounded-lg p-1 ${Select || ''}`} // Add rounded-xl class here
      onChange={(e) => onValueChange && onValueChange(e.target.value as unknown as T)}
      {...props}
    >
      {children}
    </select>
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