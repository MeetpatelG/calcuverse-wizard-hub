
import { useState } from "react";
import { TrendingUp, PieChart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Investment = () => {
  const [initialAmount, setInitialAmount] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [annualReturn, setAnnualReturn] = useState("");
  const [years, setYears] = useState("");
  const [futureValue, setFutureValue] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const calculateInvestment = () => {
    if (!initialAmount || !annualReturn || !years) return;

    const principal = parseFloat(initialAmount);
    const monthlyAdd = parseFloat(monthlyContribution) || 0;
    const rate = parseFloat(annualReturn) / 100 / 12;
    const time = parseFloat(years) * 12;

    const futureValueCalc = principal * Math.pow(1 + rate, time) + 
                           monthlyAdd * ((Math.pow(1 + rate, time) - 1) / rate);
    
    const totalContributionsCalc = principal + (monthlyAdd * time);
    const totalEarningsCalc = futureValueCalc - totalContributionsCalc;

    setFutureValue(futureValueCalc);
    setTotalContributions(totalContributionsCalc);
    setTotalEarnings(totalEarningsCalc);
    setCalculated(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <span>Home</span> / <span>Financial Calculators</span> / <span className="text-foreground">Investment Calculator</span>
        </div>

        <div className="text-center mb-8">
          <TrendingUp className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Investment Calculator</h1>
          <p className="text-xl text-muted-foreground">
            Calculate the future value of your investments with compound returns
          </p>
        </div>

        {/* Investment Growth Visualization */}
        <div className="mb-8">
          <img 
            src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=400&fit=crop&crop=center&auto=format&q=80" 
            alt="Investment growth charts and financial analysis"
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                <CardTitle>Investment Calculator</CardTitle>
              </div>
              <CardDescription>
                Calculate the future value of your investments with compound returns.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="initialAmount">Initial Investment ($)</Label>
                <Input
                  id="initialAmount"
                  type="number"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(e.target.value)}
                  placeholder="10000"
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
                <Input
                  id="monthlyContribution"
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value)}
                  placeholder="500"
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="annualReturn">Expected Annual Return (%)</Label>
                <Input
                  id="annualReturn"
                  type="number"
                  value={annualReturn}
                  onChange={(e) => setAnnualReturn(e.target.value)}
                  placeholder="7"
                  step="0.1"
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="years">Investment Period (years)</Label>
                <Input
                  id="years"
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  placeholder="20"
                  className="text-lg"
                />
              </div>

              <Button onClick={calculateInvestment} className="w-full" disabled={!initialAmount || !annualReturn || !years}>
                Calculate Investment
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Investment Results</CardTitle>
              <CardDescription>Your projected investment growth</CardDescription>
            </CardHeader>
            <CardContent>
              {calculated ? (
                <div className="space-y-4">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground">Future Value</div>
                    <div className="text-2xl font-bold text-primary">
                      ${futureValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted p-3 rounded">
                      <div className="text-xs text-muted-foreground">Total Contributions</div>
                      <div className="font-semibold">
                        ${totalContributions.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <div className="text-xs text-muted-foreground">Total Earnings</div>
                      <div className="font-semibold text-green-600">
                        ${totalEarnings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <PieChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter investment details to calculate future value</p>
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

export default Investment;
