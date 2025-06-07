
import { useState } from "react";
import { PiggyBank, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DownPayment = () => {
  const [homePrice, setHomePrice] = useState("");
  const [downPaymentPercent, setDownPaymentPercent] = useState("20");
  const [currentSavings, setCurrentSavings] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [results, setResults] = useState<{
    downPaymentAmount: number;
    remainingNeeded: number;
    monthsToSave: number;
    yearsToSave: number;
    totalMonthlySavings: number;
  } | null>(null);
  const [calculated, setCalculated] = useState(false);

  const calculateDownPayment = () => {
    if (!homePrice) return;

    const price = parseFloat(homePrice);
    const percent = parseFloat(downPaymentPercent) / 100;
    const savings = parseFloat(currentSavings) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    
    const downPaymentAmount = price * percent;
    const remainingNeeded = Math.max(downPaymentAmount - savings, 0);
    
    let monthsToSave = 0;
    let yearsToSave = 0;
    
    if (remainingNeeded > 0 && monthly > 0) {
      monthsToSave = Math.ceil(remainingNeeded / monthly);
      yearsToSave = monthsToSave / 12;
    }

    setResults({
      downPaymentAmount,
      remainingNeeded,
      monthsToSave,
      yearsToSave,
      totalMonthlySavings: monthly
    });
    setCalculated(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <span>Home</span> / <span>Real Estate Calculators</span> / <span className="text-foreground">Down Payment Calculator</span>
        </div>

        <div className="text-center mb-8">
          <PiggyBank className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Down Payment Calculator</h1>
          <p className="text-xl text-muted-foreground">
            Calculate your down payment and savings timeline
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Target className="h-6 w-6 text-primary" />
                <CardTitle>Savings Information</CardTitle>
              </div>
              <CardDescription>
                Enter your home purchase and savings details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="homePrice">Home Price ($)</Label>
                <Input
                  id="homePrice"
                  type="number"
                  value={homePrice}
                  onChange={(e) => setHomePrice(e.target.value)}
                  placeholder="350000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="downPaymentPercent">Down Payment (%)</Label>
                <Input
                  id="downPaymentPercent"
                  type="number"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(e.target.value)}
                  placeholder="20"
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentSavings">Current Savings ($)</Label>
                <Input
                  id="currentSavings"
                  type="number"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(e.target.value)}
                  placeholder="15000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyContribution">Monthly Savings ($)</Label>
                <Input
                  id="monthlyContribution"
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value)}
                  placeholder="1000"
                />
              </div>

              <Button onClick={calculateDownPayment} className="w-full" disabled={!homePrice}>
                Calculate Down Payment
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Down Payment Results</CardTitle>
              <CardDescription>Your savings plan and timeline</CardDescription>
            </CardHeader>
            <CardContent>
              {calculated && results ? (
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground mb-2">Required Down Payment</div>
                    <div className="text-3xl font-bold text-primary">
                      ${results.downPaymentAmount.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-muted p-4 rounded">
                      <div className="text-xs text-muted-foreground">Still Need to Save</div>
                      <div className="font-semibold text-lg">${results.remainingNeeded.toLocaleString()}</div>
                    </div>
                    {results.monthsToSave > 0 && (
                      <>
                        <div className="bg-muted p-4 rounded">
                          <div className="text-xs text-muted-foreground">Months to Save</div>
                          <div className="font-semibold text-lg">{results.monthsToSave} months</div>
                        </div>
                        <div className="bg-muted p-4 rounded">
                          <div className="text-xs text-muted-foreground">Years to Save</div>
                          <div className="font-semibold text-lg">{results.yearsToSave.toFixed(1)} years</div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="bg-card border p-4 rounded">
                    <h4 className="font-semibold mb-2">Savings Breakdown</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Home Price:</span> <span>${parseFloat(homePrice).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Down Payment %:</span> <span>{downPaymentPercent}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Current Savings:</span> <span>${(parseFloat(currentSavings) || 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Savings:</span> <span>${(parseFloat(monthlyContribution) || 0).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <PiggyBank className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter your savings information to calculate down payment</p>
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

export default DownPayment;
