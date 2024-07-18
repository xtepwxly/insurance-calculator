import React from 'react';
import { Product } from '../utils/insuranceTypes';
import '../styles/ProductTabs.css';

interface ProductSelectorProps {
  selectedProduct: Product;
  setSelectedProduct: (product: Product) => void;
  products: Product[];
}

const ProductSelector: React.FC<ProductSelectorProps> = ({ selectedProduct, setSelectedProduct, products }) => {
  return (
    <div className="product-tabs product-selector">
  <ul className="product-tabs-list">
    {products.map((product) => (
      <li
        key={product}
        className={`product-tab-item ${selectedProduct === product ? 'active' : ''}`}
        onClick={() => setSelectedProduct(product)}
      >
        <a href="#" onClick={(e) => e.preventDefault()} className="product-tab-link">
          {product}
        </a>
      </li>
    ))}
  </ul>
</div>
  );
};

export default ProductSelector;