// src/components/ProductSelector.tsx

import React from 'react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { Product } from '../utils/insuranceTypes';

interface ProductSelectorProps {
  selectedProduct: Product;
  setSelectedProduct: (product: Product) => void;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({ selectedProduct, setSelectedProduct }) => {
  const handleTabChange = (tab: Product) => {
    setSelectedProduct(tab);
  };

  return (
    <Tabs>
      <TabsList>
        <TabsTrigger onClick={() => handleTabChange('LTD')}>LTD</TabsTrigger>
        <TabsTrigger onClick={() => handleTabChange('STD')}>STD</TabsTrigger>
        <TabsTrigger onClick={() => handleTabChange('Life / AD&D')}>Life / AD&D</TabsTrigger>
        <TabsTrigger onClick={() => handleTabChange('Accidents')}>Accidents</TabsTrigger>
        <TabsTrigger onClick={() => handleTabChange('Dental')}>Dental</TabsTrigger>
        <TabsTrigger onClick={() => handleTabChange('Vision')}>Vision</TabsTrigger>
        <TabsTrigger onClick={() => handleTabChange('Critical Illness/Cancer')}>Critical Illness/Cancer</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ProductSelector;
