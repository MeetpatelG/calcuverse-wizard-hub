
import { useState } from "react";
import { Calculator, Wallet } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const RentAffordability = () => {
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [otherDebts, setOtherDebts] = useState("");
  const [utilities, setUtilities] = useState("");
  const [savings, setSavings] = useState("");
  const [results, setResults] = useState<{
    maxRent: number;
    recommendedRent: number;
    remainingIncome: number;
    rentToIncomeRatio: number;
  } | null>(null);
  const [calculated, setCalculated] = useState(false);

  const calculateAffordability = () => {
    if (!monthlyIncome) return;

    const income = parseFloat(monthlyIncome);
    const debts = parseFloat(otherDebts) || 0;
    const utilityBudget = parseFloat(utilities) || 100;
    const savingsGoal = parseFloat(savings) || 0;
    
    // 30% rule for maximum rent
    const maxRent = income * 0.3;
    
    // Recommended rent considering other expenses
    const availableForHousing = income - debts - savingsGoal;
    const recommendedRent = Math.min(availableForHousing * 0.28, maxRent) - utilityBudget;
    
    const actualMaxRent = Math.max(recommendedRent, 0);
    const remainingIncome = income - actualMaxRent - debts - utilityBudget - savingsGoal;
    const rentToIncomeRatio = (actualMaxRent / income) * 100;

    setResults({
      maxRent: actualMaxRent,
      recommendedRent: actualMaxRent,
      remainingIncome,
      rentToIncomeRatio
    });
    setCalculated(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <span>Home</span> / <span>Real Estate Calculators</span> / <span className="text-foreground">Rent Affordability Calculator</span>
        </div>

        <div className="text-center mb-8">
          <Calculator className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Rent Affordability Calculator</h1>
          <p className="text-xl text-muted-foreground">
            Determine how much rent you can comfortably afford
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Wallet className="h-6 w-6 text-primary" />
                <CardTitle>Financial Information</CardTitle>
              </div>
              <CardDescription>
                Enter your income and monthly expenses.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="monthlyIncome">Monthly Gross Income ($)</Label>
                <Input
                  id="monthlyIncome"
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  placeholder="5000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="otherDebts">Other Monthly Debts ($)</Label>
                <Input
                  id="otherDebts"
                  type="number"
                  value={otherDebts}
                  onChange={(e) => setOtherDebts(e.target.value)}
                  placeholder="500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="utilities">Estimated Monthly Utilities ($)</Label>
                <Input
                  id="utilities"
                  type="number"
                  value={utilities}
                  onChange={(e) => setUtilities(e.target.value)}
                  placeholder="150"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="savings">Monthly Savings Goal ($)</Label>
                <Input
                  id="savings"
                  type="number"
                  value={savings}
                  onChange={(e) => setSavings(e.target.value)}
                  placeholder="500"
                />
              </div>

              <Button onClick={calculateAffordability} className="w-full" disabled={!monthlyIncome}>
                Calculate Affordability
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Affordability Results</CardTitle>
              <CardDescription>Your recommended rent budget</CardDescription>
            </CardHeader>
            <CardContent>
              {calculated && results ? (
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground mb-2">Maximum Affordable Rent</div>
                    <div className="text-3xl font-bold text-primary">
                      ${results.maxRent.toFixed(0)}/month
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-muted p-4 rounded">
                      <div className="text-xs text-muted-foreground">Rent-to-Income Ratio</div>
                      <div className="font-semibold text-lg">{results.rentToIncomeRatio.toFixed(1)}%</div>
                    </div>
                    <div className="bg-muted p-4 rounded">
                      <div className="text-xs text-muted-foreground">Remaining Monthly Income</div>
                      <div className="font-semibold text-lg">${results.remainingIncome.toFixed(0)}</div>
                    </div>
                  </div>
                  
                  <div className="bg-card border p-4 rounded">
                    <h4 className="font-semibold mb-2">Guidelines</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Ideal ratio:</span> <span>&lt; 30%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Maximum ratio:</span> <span>&lt; 40%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Your ratio:</span> 
                        <span className={results.rentToIncomeRatio > 40 ? "text-red-600" : results.rentToIncomeRatio > 30 ? "text-yellow-600" : "text-green-600"}>
                          {results.rentToIncomeRatio.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter your financial information to calculate affordability</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RentAffordability;
