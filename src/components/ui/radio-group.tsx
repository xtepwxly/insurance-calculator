import React from 'react';

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange: (value: string) => void;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ children, value, onValueChange, className = '', ...props }) => (
  <div className={`flex ${className}`} {...props}>
    {React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { groupValue: value, onValueChange } as any);
      }
      return child;
    })}
  </div>
);

interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  groupValue?: string;
  onValueChange?: (value: string) => void;
}

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({ children, value, groupValue, onValueChange, className = '', ...props }) => (
  <label className={`inline-flex items-center ${className}`}>
    <input
      type="radio"
      className="form-radio h-4 w-4 text-blue-600"
      checked={value === groupValue}
      onChange={() => onValueChange && onValueChange(value as string)}
      value={value}
      {...props}
    />
    <span className="ml-2">{children}</span>
  </label>
);