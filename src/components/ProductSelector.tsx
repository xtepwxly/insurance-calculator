// components/ProductSelector.js
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { PRODUCTS } from '../utils/insuranceUtils';

const ProductSelector = ({ selectedProduct, setSelectedProduct }) => {
  return (
    <Tabs value={selectedProduct} onValueChange={setSelectedProduct} className="w-full">
      <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
        {PRODUCTS.map(product => (
          <TabsTrigger 
            key={product} 
            value={product}
            className="w-full"
          >
            {product}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default ProductSelector;
