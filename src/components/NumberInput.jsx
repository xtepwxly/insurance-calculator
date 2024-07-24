import React from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

const NumberInput = ({ value, onChange, min = 0, max = 10 }) => {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        className="w-12 text-center border rounded-l"
      />
      <div className="flex flex-col">
        <button
          onClick={handleIncrement}
          className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-tr"
        >
          <ChevronUpIcon className="h-4 w-4" />
        </button>
        <button
          onClick={handleDecrement}
          className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-br"
        >
          <ChevronDownIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default NumberInput;