
import { useState } from "react";
import { Percent, DollarSign } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Refinance = () => {
  const [currentBalance, setCurrentBalance] = useState("");
  const [currentRate, setCurrentRate] = useState("");
  const [currentTerm, setCurrentTerm] = useState("");
  const [newRate, setNewRate] = useState("");
  const [newTerm, setNewTerm] = useState("");
  const [closingCosts, setClosingCosts] = useState("");
  const [results, setResults] = useState<{
    currentPayment: number;
    newPayment: number;
    monthlySavings: number;
    totalInterestCurrent: number;
    totalInterestNew: number;
    interestSavings: number;
    breakEvenMonths: number;
  } | null>(null);
  const [calculated, setCalculated] = useState(false);

  const calculatePayment = (principal: number, rate: number, term: number) => {
    const monthlyRate = rate / 100 / 12;
    const numPayments = term * 12;
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  };

  const calculateRefinance = () => {
    if (!currentBalance || !currentRate || !currentTerm || !newRate || !newTerm) return;

    const balance = parseFloat(currentBalance);
    const currentRateNum = parseFloat(currentRate);
    const currentTermNum = parseFloat(currentTerm);
    const newRateNum = parseFloat(newRate);
    const newTermNum = parseFloat(newTerm);
    const costs = parseFloat(closingCosts) || 0;
    
    const currentPayment = calculatePayment(balance, currentRateNum, currentTermNum);
    const newPayment = calculatePayment(balance, newRateNum, newTermNum);
    const monthlySavings = currentPayment - newPayment;
    
    const totalInterestCurrent = (currentPayment * currentTermNum * 12) - balance;
    const totalInterestNew = (newPayment * newTermNum * 12) - balance;
    const interestSavings = totalInterestCurrent - totalInterestNew;
    
    const breakEvenMonths = monthlySavings > 0 ? costs / monthlySavings : 0;

    setResults({
      currentPayment,
      newPayment,
      monthlySavings,
      totalInterestCurrent,
      totalInterestNew,
      interestSavings,
      breakEvenMonths
    });
    setCalculated(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <span>Home</span> / <span>Real Estate Calculators</span> / <span className="text-foreground">Refinance Calculator</span>
        </div>

        <div className="text-center mb-8">
          <Percent className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Refinance Calculator</h1>
          <p className="text-xl text-muted-foreground">
            Determine if refinancing your mortgage will save you money
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-6 w-6 text-primary" />
                <CardTitle>Loan Comparison</CardTitle>
              </div>
              <CardDescription>
                Compare your current loan with the new loan terms.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Current Loan</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentBalance">Current Balance ($)</Label>
                    <Input
                      id="currentBalance"
                      type="number"
                      value={currentBalance}
                      onChange={(e) => setCurrentBalance(e.target.value)}
                      placeholder="250000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentRate">Current Rate (%)</Label>
                    <Input
                      id="currentRate"
                      type="number"
                      value={currentRate}
                      onChange={(e) => setCurrentRate(e.target.value)}
                      placeholder="6.5"
                      step="0.01"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentTerm">Remaining Term (years)</Label>
                    <Input
                      id="currentTerm"
                      type="number"
                      value={currentTerm}
                      onChange={(e) => setCurrentTerm(e.target.value)}
                      placeholder="25"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold">New Loan</h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newRate">New Rate (%)</Label>
                    <Input
                      id="newRate"
                      type="number"
                      value={newRate}
                      onChange={(e) => setNewRate(e.target.value)}
                      placeholder="5.5"
                      step="0.01"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newTerm">New Term (years)</Label>
                    <Input
                      id="newTerm"
                      type="number"
                      value={newTerm}
                      onChange={(e) => setNewTerm(e.target.value)}
                      placeholder="30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="closingCosts">Closing Costs ($)</Label>
                    <Input
                      id="closingCosts"
                      type="number"
                      value={closingCosts}
                      onChange={(e) => setClosingCosts(e.target.value)}
                      placeholder="3000"
                    />
                  </div>
                </div>
              </div>

              <Button onClick={calculateRefinance} className="w-full" disabled={!currentBalance || !currentRate || !currentTerm || !newRate || !newTerm}>
                Calculate Refinance Savings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Refinance Analysis</CardTitle>
              <CardDescription>Compare your current and new loan payments</CardDescription>
            </CardHeader>
            <CardContent>
              {calculated && results ? (
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground mb-2">Monthly Savings</div>
                    <div className="text-3xl font-bold text-primary">
                      ${results.monthlySavings.toFixed(0)}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted rounded">
                      <span className="text-sm">Current Payment</span>
                      <span className="font-semibold">${results.currentPayment.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded">
                      <span className="text-sm">New Payment</span>
                      <span className="font-semibold">${results.newPayment.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded">
                      <span className="text-sm">Break-even Point</span>
                      <span className="font-semibold">{results.breakEvenMonths.toFixed(0)} months</span>
                    </div>
                  </div>
                  
                  <div className="bg-card border p-4 rounded">
                    <h4 className="font-semibold mb-2">Interest Comparison</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Current Total Interest:</span> 
                        <span>${results.totalInterestCurrent.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>New Total Interest:</span> 
                        <span>${results.totalInterestNew.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Interest Savings:</span> 
                        <span className={results.interestSavings > 0 ? "text-green-600" : "text-red-600"}>
                          ${results.interestSavings.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border p-4 rounded">
                    <h4 className="font-semibold mb-2">Recommendation</h4>
                    <div className="text-sm">
                      {results.monthlySavings > 0 ? (
                        <p className="text-green-600">
                          ✓ Refinancing could save you money. Break-even point is {results.breakEvenMonths.toFixed(0)} months.
                        </p>
                      ) : (
                        <p className="text-red-600">
                          ✗ Refinancing would increase your monthly payment. Consider if the new terms meet other goals.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <Percent className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter loan details to analyze refinance benefits</p>
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

export default Refinance;
