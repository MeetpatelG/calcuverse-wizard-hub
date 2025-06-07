
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfitMarginResultsProps {
  profit: number;
  profitMargin: number;
  markupPercentage: number;
  calculated: boolean;
}

const ProfitMarginResults = ({ profit, profitMargin, markupPercentage, calculated }: ProfitMarginResultsProps) => {
  const getProfitColor = () => {
    if (profit > 0) return "text-green-600";
    if (profit < 0) return "text-red-600";
    return "text-gray-600";
  };

  const getProfitBgColor = () => {
    if (profit > 0) return "bg-green-100";
    if (profit < 0) return "bg-red-100";
    return "bg-gray-100";
  };

  const getAnalysisMessage = () => {
    if (profit > 0) return "Great! You're making a profit on this item.";
    if (profit === 0) return "You're breaking even on this item.";
    return "Warning: You're losing money on this item.";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profit Analysis</CardTitle>
        <CardDescription>Your business profit breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        {calculated ? (
          <div className="space-y-4">
            <div className={`${getProfitBgColor()} p-4 rounded-lg`}>
              <div className="text-sm text-muted-foreground">Profit</div>
              <div className={`text-2xl font-bold ${getProfitColor()}`}>
                ${profit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted p-3 rounded">
                <div className="text-xs text-muted-foreground">Profit Margin</div>
                <div className={`font-semibold ${getProfitColor()}`}>
                  {profitMargin.toFixed(2)}%
                </div>
              </div>
              <div className="bg-muted p-3 rounded">
                <div className="text-xs text-muted-foreground">Markup</div>
                <div className={`font-semibold ${getProfitColor()}`}>
                  {markupPercentage.toFixed(2)}%
                </div>
              </div>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Analysis</h4>
              <p className="text-sm text-muted-foreground">
                {getAnalysisMessage()}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Enter cost and selling price to calculate profit margin</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfitMarginResults;
