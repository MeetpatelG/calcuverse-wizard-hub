
import { useState } from "react";
import { DollarSign, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ProductPricing = () => {
  const [cost, setCost] = useState("");
  const [desiredMargin, setDesiredMargin] = useState("");
  const [marketingCost, setMarketingCost] = useState("");
  const [operatingCost, setOperatingCost] = useState("");
  const [results, setResults] = useState<{
    sellingPrice: number;
    totalCost: number;
    profit: number;
    marginPercentage: number;
  } | null>(null);
  const [calculated, setCalculated] = useState(false);

  const calculatePricing = () => {
    if (!cost || !desiredMargin) return;

    const productCost = parseFloat(cost);
    const margin = parseFloat(desiredMargin);
    const marketing = parseFloat(marketingCost) || 0;
    const operating = parseFloat(operatingCost) || 0;
    
    const totalCost = productCost + marketing + operating;
    const sellingPrice = totalCost / (1 - margin / 100);
    const profit = sellingPrice - totalCost;
    const actualMargin = (profit / sellingPrice) * 100;

    setResults({
      sellingPrice,
      totalCost,
      profit,
      marginPercentage: actualMargin
    });
    setCalculated(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <span>Home</span> / <span>E-commerce Calculators</span> / <span className="text-foreground">Product Pricing Calculator</span>
        </div>

        <div className="text-center mb-8">
          <DollarSign className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Product Pricing Calculator</h1>
          <p className="text-xl text-muted-foreground">
            Determine optimal product pricing for your e-commerce business
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-6 w-6 text-primary" />
                <CardTitle>Pricing Inputs</CardTitle>
              </div>
              <CardDescription>
                Enter your costs and desired margin to calculate optimal pricing.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="cost">Product Cost ($)</Label>
                <Input
                  id="cost"
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="25.00"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="margin">Desired Margin (%)</Label>
                <Input
                  id="margin"
                  type="number"
                  value={desiredMargin}
                  onChange={(e) => setDesiredMargin(e.target.value)}
                  placeholder="40"
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="marketing">Marketing Cost per Unit ($)</Label>
                <Input
                  id="marketing"
                  type="number"
                  value={marketingCost}
                  onChange={(e) => setMarketingCost(e.target.value)}
                  placeholder="5.00"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="operating">Operating Cost per Unit ($)</Label>
                <Input
                  id="operating"
                  type="number"
                  value={operatingCost}
                  onChange={(e) => setOperatingCost(e.target.value)}
                  placeholder="3.00"
                  step="0.01"
                />
              </div>

              <Button onClick={calculatePricing} className="w-full" disabled={!cost || !desiredMargin}>
                Calculate Pricing
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing Results</CardTitle>
              <CardDescription>Your calculated product pricing</CardDescription>
            </CardHeader>
            <CardContent>
              {calculated && results ? (
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground mb-2">Recommended Selling Price</div>
                    <div className="text-3xl font-bold text-primary">
                      ${results.sellingPrice.toFixed(2)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted p-3 rounded">
                      <div className="text-xs text-muted-foreground">Total Cost</div>
                      <div className="font-semibold">${results.totalCost.toFixed(2)}</div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <div className="text-xs text-muted-foreground">Profit per Unit</div>
                      <div className="font-semibold text-green-600">${results.profit.toFixed(2)}</div>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-3 rounded text-center">
                    <div className="text-xs text-muted-foreground">Actual Margin</div>
                    <div className="font-semibold">{results.marginPercentage.toFixed(1)}%</div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter product details to calculate pricing</p>
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

export default ProductPricing;
