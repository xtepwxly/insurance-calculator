import React from 'react';
import { Card, CardHeader, CardContent } from './ui/card';
import { Toggle } from './ui/toggle';

interface CostEstimateProps {
  totalPremium: number;
  costView: 'Month' | 'Bi-weekly';
  setCostView: React.Dispatch<React.SetStateAction<'Month' | 'Bi-weekly'>>;
}

const CostEstimate: React.FC<CostEstimateProps> = ({ totalPremium, costView, setCostView }) => {
  const formattedPremium = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(costView === 'Month' ? totalPremium : totalPremium / 2);

  return (
    <Card className="mb-4 w-full sticky top-4">
      <CardHeader className="flex justify-between items-center">
        <h2 className="md:text-lg font-semibold">Total Premium Per Employee</h2>
        <Toggle
          pressed={costView === 'Month'}
          onPressedChange={() => setCostView(prev => prev === 'Month' ? 'Bi-weekly' : 'Month')}
        >
          {costView}
        </Toggle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-2xl font-bold">
          {formattedPremium} / {costView.toLowerCase()}
        </p>
      </CardContent>
    </Card>
  );
};

export default CostEstimate;