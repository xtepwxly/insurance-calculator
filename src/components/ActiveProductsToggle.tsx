import React from 'react';
import { Product, CostView } from '../utils/insuranceTypes';
import { CardTitle, Card, CardContent, CardHeader } from './ui/card';

interface ActiveProductsListProps {
  products: Record<Product, boolean>;
  premiums: Record<Product, number>;
  costView: CostView;
}

const ActiveProductsList: React.FC<ActiveProductsListProps> = ({
  products,
  premiums,
  costView,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {Object.entries(products)
            .filter(([_, isActive]) => isActive)
            .map(([product]) => (
              <div key={product} className="flex items-center justify-between">
                <span className="font-medium">{product}</span>
                <span className="text-sm">
                  ${premiums[product as Product]?.toFixed(2) || '0.00'} / {costView.toLowerCase()}
                </span>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveProductsList;