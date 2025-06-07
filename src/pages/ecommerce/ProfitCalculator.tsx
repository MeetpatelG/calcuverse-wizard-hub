
import { useState } from "react";
import { TrendingUp, Calculator } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ProfitCalculator = () => {
  const [revenue, setRevenue] = useState("");
  const [cogs, setCogs] = useState("");
  const [platformFees, setPlatformFees] = useState("");
  const [shippingCosts, setShippingCosts] = useState("");
  const [marketingCosts, setMarketingCosts] = useState("");
  const [otherExpenses, setOtherExpenses] = useState("");
  const [results, setResults] = useState<{
    grossProfit: number;
    netProfit: number;
    profitMargin: number;
    totalExpenses: number;
  } | null>(null);
  const [calculated, setCalculated] = useState(false);

  const calculateProfit = () => {
    if (!revenue || !cogs) return;

    const totalRevenue = parseFloat(revenue);
    const costOfGoods = parseFloat(cogs);
    const platform = parseFloat(platformFees) || 0;
    const shipping = parseFloat(shippingCosts) || 0;
    const marketing = parseFloat(marketingCosts) || 0;
    const other = parseFloat(otherExpenses) || 0;
    
    const grossProfit = totalRevenue - costOfGoods;
    const totalExpenses = platform + shipping + marketing + other;
    const netProfit = grossProfit - totalExpenses;
    const profitMargin = (netProfit / totalRevenue) * 100;

    setResults({
      grossProfit,
      netProfit,
      profitMargin,
      totalExpenses: totalExpenses + costOfGoods
    });
    setCalculated(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <span>Home</span> / <span>E-commerce Calculators</span> / <span className="text-foreground">E-commerce Profit Calculator</span>
        </div>

        <div className="text-center mb-8">
          <TrendingUp className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">E-commerce Profit Calculator</h1>
          <p className="text-xl text-muted-foreground">
            Calculate your true profit including all fees and expenses
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Calculator className="h-6 w-6 text-primary" />
                <CardTitle>Revenue & Expenses</CardTitle>
              </div>
              <CardDescription>
                Enter your revenue and all associated costs.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="revenue">Total Revenue ($)</Label>
                <Input
                  id="revenue"
                  type="number"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  placeholder="10000"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cogs">Cost of Goods Sold ($)</Label>
                <Input
                  id="cogs"
                  type="number"
                  value={cogs}
                  onChange={(e) => setCogs(e.target.value)}
                  placeholder="4000"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="platform">Platform Fees ($)</Label>
                <Input
                  id="platform"
                  type="number"
                  value={platformFees}
                  onChange={(e) => setPlatformFees(e.target.value)}
                  placeholder="300"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shipping">Shipping Costs ($)</Label>
                <Input
                  id="shipping"
                  type="number"
                  value={shippingCosts}
                  onChange={(e) => setShippingCosts(e.target.value)}
                  placeholder="500"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="marketing">Marketing Costs ($)</Label>
                <Input
                  id="marketing"
                  type="number"
                  value={marketingCosts}
                  onChange={(e) => setMarketingCosts(e.target.value)}
                  placeholder="800"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="other">Other Expenses ($)</Label>
                <Input
                  id="other"
                  type="number"
                  value={otherExpenses}
                  onChange={(e) => setOtherExpenses(e.target.value)}
                  placeholder="200"
                  step="0.01"
                />
              </div>

              <Button onClick={calculateProfit} className="w-full" disabled={!revenue || !cogs}>
                Calculate Profit
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profit Analysis</CardTitle>
              <CardDescription>Your detailed profit breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              {calculated && results ? (
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground mb-2">Net Profit</div>
                    <div className={`text-3xl font-bold ${results.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${results.netProfit.toFixed(2)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted p-3 rounded">
                      <div className="text-xs text-muted-foreground">Gross Profit</div>
                      <div className="font-semibold">${results.grossProfit.toFixed(2)}</div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <div className="text-xs text-muted-foreground">Total Expenses</div>
                      <div className="font-semibold">${results.totalExpenses.toFixed(2)}</div>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-3 rounded text-center">
                    <div className="text-xs text-muted-foreground">Profit Margin</div>
                    <div className={`font-semibold ${results.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {results.profitMargin.toFixed(1)}%
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter revenue and costs to calculate profit</p>
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

export default ProfitCalculator;
