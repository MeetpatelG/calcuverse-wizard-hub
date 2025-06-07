
import { useState } from "react";
import { BarChart3, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CapRate = () => {
  const [propertyPrice, setPropertyPrice] = useState("");
  const [annualRent, setAnnualRent] = useState("");
  const [expenses, setExpenses] = useState("");
  const [results, setResults] = useState<{
    netOperatingIncome: number;
    capRate: number;
    monthlyNOI: number;
    expenseRatio: number;
  } | null>(null);
  const [calculated, setCalculated] = useState(false);

  const calculateCapRate = () => {
    if (!propertyPrice || !annualRent) return;

    const price = parseFloat(propertyPrice);
    const rent = parseFloat(annualRent);
    const totalExpenses = parseFloat(expenses) || 0;
    
    const netOperatingIncome = rent - totalExpenses;
    const capRate = (netOperatingIncome / price) * 100;
    const monthlyNOI = netOperatingIncome / 12;
    const expenseRatio = (totalExpenses / rent) * 100;

    setResults({
      netOperatingIncome,
      capRate,
      monthlyNOI,
      expenseRatio
    });
    setCalculated(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <span>Home</span> / <span>Real Estate Calculators</span> / <span className="text-foreground">Cap Rate Calculator</span>
        </div>

        <div className="text-center mb-8">
          <BarChart3 className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Cap Rate Calculator</h1>
          <p className="text-xl text-muted-foreground">
            Calculate capitalization rate for investment property analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                <CardTitle>Investment Property Details</CardTitle>
              </div>
              <CardDescription>
                Enter property price, rental income, and operating expenses.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="propertyPrice">Property Purchase Price ($)</Label>
                <Input
                  id="propertyPrice"
                  type="number"
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(e.target.value)}
                  placeholder="250000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="annualRent">Annual Rental Income ($)</Label>
                <Input
                  id="annualRent"
                  type="number"
                  value={annualRent}
                  onChange={(e) => setAnnualRent(e.target.value)}
                  placeholder="24000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expenses">Annual Operating Expenses ($)</Label>
                <Input
                  id="expenses"
                  type="number"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                  placeholder="6000"
                />
                <div className="text-xs text-muted-foreground">
                  Include property taxes, insurance, maintenance, management fees, etc.
                </div>
              </div>

              <Button onClick={calculateCapRate} className="w-full" disabled={!propertyPrice || !annualRent}>
                Calculate Cap Rate
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cap Rate Analysis</CardTitle>
              <CardDescription>Investment performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              {calculated && results ? (
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground mb-2">Capitalization Rate</div>
                    <div className="text-3xl font-bold text-primary">
                      {results.capRate.toFixed(2)}%
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-muted p-4 rounded">
                      <div className="text-xs text-muted-foreground">Net Operating Income (Annual)</div>
                      <div className="font-semibold text-lg">${results.netOperatingIncome.toLocaleString()}</div>
                    </div>
                    <div className="bg-muted p-4 rounded">
                      <div className="text-xs text-muted-foreground">Net Operating Income (Monthly)</div>
                      <div className="font-semibold text-lg">${results.monthlyNOI.toLocaleString()}</div>
                    </div>
                    <div className="bg-muted p-4 rounded">
                      <div className="text-xs text-muted-foreground">Expense Ratio</div>
                      <div className="font-semibold text-lg">{results.expenseRatio.toFixed(1)}%</div>
                    </div>
                  </div>
                  
                  <div className="bg-card border p-4 rounded">
                    <h4 className="font-semibold mb-2">Cap Rate Guidelines</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Excellent:</span> 
                        <span className={results.capRate >= 10 ? "text-green-600 font-semibold" : ""}>
                          10%+
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Good:</span> 
                        <span className={results.capRate >= 8 && results.capRate < 10 ? "text-green-600 font-semibold" : ""}>
                          8-10%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average:</span> 
                        <span className={results.capRate >= 6 && results.capRate < 8 ? "text-yellow-600 font-semibold" : ""}>
                          6-8%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Below Average:</span> 
                        <span className={results.capRate < 6 ? "text-red-600 font-semibold" : ""}>
                          &lt;6%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter property details to calculate cap rate</p>
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

export default CapRate;
