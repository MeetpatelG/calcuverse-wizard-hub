
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface BudgetResultsProps {
  totalIncome: number;
  totalExpenses: number;
  surplus: number;
  savingsRate: number;
  categories: Array<{name: string; amount: number; percentage: number}>;
  calculated: boolean;
}

const BudgetResults = ({ 
  totalIncome, 
  totalExpenses, 
  surplus, 
  savingsRate, 
  categories, 
  calculated 
}: BudgetResultsProps) => {
  if (!calculated) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Budget Analysis</CardTitle>
          <CardDescription>
            Your budget breakdown will appear here after calculation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Enter your income and expenses to see your budget analysis</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getSavingsRateColor = (rate: number) => {
    if (rate >= 20) return "text-green-600";
    if (rate >= 10) return "text-yellow-600";
    return "text-red-600";
  };

  const getSavingsAdvice = (rate: number) => {
    if (rate >= 20) return "Excellent! You're on track for financial independence.";
    if (rate >= 10) return "Good savings rate. Consider increasing to 20% for faster wealth building.";
    if (rate >= 0) return "Consider reducing expenses to increase your savings rate.";
    return "You're spending more than you earn. Review and cut unnecessary expenses.";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Analysis</CardTitle>
        <CardDescription>
          Your monthly budget breakdown and savings analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4 mr-1" />
              Total Income
            </div>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(totalIncome)}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4 mr-1" />
              Total Expenses
            </div>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(totalExpenses)}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center text-muted-foreground">
              {surplus >= 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              Monthly Surplus/Deficit
            </span>
            <span className={surplus >= 0 ? "text-green-600" : "text-red-600"}>
              {savingsRate.toFixed(1)}%
            </span>
          </div>
          <div className={`text-3xl font-bold ${surplus >= 0 ? "text-green-600" : "text-red-600"}`}>
            {formatCurrency(surplus)}
          </div>
          <p className={`text-sm ${getSavingsRateColor(savingsRate)}`}>
            {getSavingsAdvice(savingsRate)}
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">Expense Breakdown</h4>
          {categories.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>{category.name}</span>
                <span className="font-medium">
                  {formatCurrency(category.amount)} ({category.percentage.toFixed(1)}%)
                </span>
              </div>
              <Progress value={category.percentage} className="h-2" />
            </div>
          ))}
        </div>

        <div className="pt-4 border-t">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {((totalExpenses / totalIncome) * 100).toFixed(0)}%
              </div>
              <div className="text-xs text-muted-foreground">Expense Ratio</div>
            </div>
            <div>
              <div className={`text-2xl font-bold ${getSavingsRateColor(savingsRate)}`}>
                {Math.max(0, savingsRate).toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">Savings Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {categories.length}
              </div>
              <div className="text-xs text-muted-foreground">Categories</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetResults;
