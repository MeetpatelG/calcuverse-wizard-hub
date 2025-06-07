
import { useState } from "react";
import { BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfitMarginFormProps {
  onCalculate: (data: {
    profit: number;
    profitMargin: number;
    markupPercentage: number;
  }) => void;
}

const ProfitMarginForm = ({ onCalculate }: ProfitMarginFormProps) => {
  const [costPrice, setCostPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");

  const calculateProfitMargin = () => {
    if (!costPrice || !sellingPrice) return;

    const cost = parseFloat(costPrice);
    const selling = parseFloat(sellingPrice);
    
    const profit = selling - cost;
    const profitMargin = (profit / selling) * 100;
    const markupPercentage = (profit / cost) * 100;

    onCalculate({
      profit,
      profitMargin,
      markupPercentage
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <CardTitle>Profit Margin Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate profit, profit margin, and markup percentage for your business.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="costPrice">Cost Price ($)</Label>
          <Input
            id="costPrice"
            type="number"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
            placeholder="100"
            className="text-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sellingPrice">Selling Price ($)</Label>
          <Input
            id="sellingPrice"
            type="number"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            placeholder="150"
            className="text-lg"
          />
        </div>

        <Button onClick={calculateProfitMargin} className="w-full" disabled={!costPrice || !sellingPrice}>
          Calculate Profit Margin
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfitMarginForm;
