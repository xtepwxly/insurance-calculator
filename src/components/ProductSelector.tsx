import React from 'react';
import { Product } from '../utils/insuranceTypes';

interface ProductSelectorProps {
  selectedProduct: Product;
  setSelectedProduct: (product: Product) => void;
  products: Product[];
}

const ProductSelector: React.FC<ProductSelectorProps> = ({ selectedProduct, setSelectedProduct, products }) => {
  return (
    <div className="w-full overflow-x-auto bg-gray-100">
      <div className="flex space-x-2 p-2">
        {products.map((product) => (
          <button
            key={product}
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out whitespace-nowrap
              ${selectedProduct === product
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            onClick={() => setSelectedProduct(product)}
          >
            {getProductIcon(product)}
            <span className="ml-2">{product}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const getProductIcon = (product: Product): string => {
  switch (product) {
    case 'LTD': return '🛡️';
    case 'STD': return '🏥';
    case 'Life / AD&D': return '💼';
    case 'Accident': return '🚑';
    case 'Vision': return '👁️';
    case 'Dental': return '🦷';
    case 'Critical Illness/Cancer': return '🏥';
    default: return '📊';
  }
};

export default ProductSelector;