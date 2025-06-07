
import { useState } from "react";
import { TrendingUp, BarChart3 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ProfitMargin = () => {
  const [costPrice, setCostPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [profit, setProfit] = useState(0);
  const [profitMargin, setProfitMargin] = useState(0);
  const [markupPercentage, setMarkupPercentage] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const calculateProfitMargin = () => {
    if (!costPrice || !sellingPrice) return;

    const cost = parseFloat(costPrice);
    const selling = parseFloat(sellingPrice);
    
    const profitValue = selling - cost;
    const marginPercentage = (profitValue / selling) * 100;
    const markupValue = (profitValue / cost) * 100;

    setProfit(profitValue);
    setProfitMargin(marginPercentage);
    setMarkupPercentage(markupValue);
    setCalculated(true);
  };

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <span>Home</span> / <span>Business Calculators</span> / <span className="text-foreground">Profit Margin Calculator</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                      {profit > 0 && "Great! You're making a profit on this item."}
                      {profit === 0 && "You're breaking even on this item."}
                      {profit < 0 && "Warning: You're losing money on this item."}
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
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfitMargin;
