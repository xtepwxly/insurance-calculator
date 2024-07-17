import React, { ReactElement } from 'react';

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange: (value: string) => void;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ children, value, onValueChange, className = '', ...props }) => (
  <div className={`flex ${className}`} {...props}>
    {React.Children.map(children, child => {
      if (React.isValidElement<RadioGroupItemProps>(child)) {
        return React.cloneElement(child, {
          ...child.props,
          checked: child.props.value === value,
          onChange: () => onValueChange(child.props.value)
        });
      }
      return child;
    })}
  </div>
);

interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  children?: React.ReactNode;
  value: string;
  checked?: boolean;
  onChange?: () => void;
}

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({ 
  children, 
  value,
  checked,
  onChange,
  className = '', 
  ...props 
}) => (
  <label className={`inline-flex items-center ${className}`}>
    <input
      type="radio"
      className="form-radio h-4 w-4 text-blue-600"
      value={value}
      checked={checked}
      onChange={onChange}
      {...props}
    />
    {children && <span className="ml-2">{children}</span>}
  </label>
);