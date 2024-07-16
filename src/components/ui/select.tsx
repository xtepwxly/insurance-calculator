import React, { ReactElement, ReactNode } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onValueChange?: (value: string) => void;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, onValueChange, ...props }, ref) => (
    <select
      ref={ref}
      onChange={(e) => onValueChange && onValueChange(e.target.value)}
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