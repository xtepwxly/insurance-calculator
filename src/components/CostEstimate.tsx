import React from 'react';
import { CostView } from '../utils/insuranceTypes';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';


interface CostEstimateProps {
  totalPremium: number;
  costView: CostView;
  businessEmployees: number;
}

const CostEstimate: React.FC<CostEstimateProps> = ({
  totalPremium,
  costView,
  businessEmployees,
}) => {
  const getTotalCost = () => {
    switch (costView) {
      case 'Weekly':
        return totalPremium * 52;
      case 'Semi-Monthly':
        return totalPremium * 24;
      case 'Monthly':
        return totalPremium * 12;
      case 'Annual':
        return totalPremium;
      default:
        return totalPremium * 12;
    }
  };

  const getPerEmployeeCost = () => {
    const totalCost = getTotalCost();
    return totalCost / (businessEmployees + 1); // +1 for the owner
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost Estimate</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Total {costView} Cost: </span>
            ${totalPremium.toFixed(2)}
          </p>
          <p>
            <span className="font-semibold">Total Annual Cost: </span>
            ${getTotalCost().toFixed(2)}
          </p>
          <p>
            <span className="font-semibold">Annual Cost per Individual: </span>
            ${getPerEmployeeCost().toFixed(2)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostEstimate;