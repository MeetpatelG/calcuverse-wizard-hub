
import { useState } from "react";
import { Percent, BarChart3 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ConversionRate = () => {
  const [visitors, setVisitors] = useState("");
  const [conversions, setConversions] = useState("");
  const [revenue, setRevenue] = useState("");
  const [results, setResults] = useState<{
    conversionRate: number;
    revenuePerVisitor: number;
    averageOrderValue: number;
  } | null>(null);
  const [calculated, setCalculated] = useState(false);

  const calculateConversion = () => {
    if (!visitors || !conversions) return;

    const totalVisitors = parseFloat(visitors);
    const totalConversions = parseFloat(conversions);
    const totalRevenue = parseFloat(revenue) || 0;
    
    const conversionRate = (totalConversions / totalVisitors) * 100;
    const revenuePerVisitor = totalRevenue / totalVisitors;
    const averageOrderValue = totalConversions > 0 ? totalRevenue / totalConversions : 0;

    setResults({
      conversionRate,
      revenuePerVisitor,
      averageOrderValue
    });
    setCalculated(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <span>Home</span> / <span>E-commerce Calculators</span> / <span className="text-foreground">Conversion Rate Calculator</span>
        </div>

        <div className="text-center mb-8">
          <Percent className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Conversion Rate Calculator</h1>
          <p className="text-xl text-muted-foreground">
            Track and optimize your website's conversion performance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                <CardTitle>Website Metrics</CardTitle>
              </div>
              <CardDescription>
                Enter your website traffic and conversion data.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="visitors">Total Visitors</Label>
                <Input
                  id="visitors"
                  type="number"
                  value={visitors}
                  onChange={(e) => setVisitors(e.target.value)}
                  placeholder="10000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="conversions">Total Conversions</Label>
                <Input
                  id="conversions"
                  type="number"
                  value={conversions}
                  onChange={(e) => setConversions(e.target.value)}
                  placeholder="250"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="revenue">Total Revenue ($)</Label>
                <Input
                  id="revenue"
                  type="number"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  placeholder="12500"
                  step="0.01"
                />
              </div>

              <Button onClick={calculateConversion} className="w-full" disabled={!visitors || !conversions}>
                Calculate Conversion Rate
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conversion Metrics</CardTitle>
              <CardDescription>Your website performance analysis</CardDescription>
            </CardHeader>
            <CardContent>
              {calculated && results ? (
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground mb-2">Conversion Rate</div>
                    <div className="text-3xl font-bold text-primary">
                      {results.conversionRate.toFixed(2)}%
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-muted p-4 rounded">
                      <div className="text-xs text-muted-foreground">Revenue per Visitor</div>
                      <div className="font-semibold text-lg">${results.revenuePerVisitor.toFixed(2)}</div>
                    </div>
                    <div className="bg-muted p-4 rounded">
                      <div className="text-xs text-muted-foreground">Average Order Value</div>
                      <div className="font-semibold text-lg">${results.averageOrderValue.toFixed(2)}</div>
                    </div>
                  </div>
                  
                  <div className="bg-card border p-4 rounded">
                    <h4 className="font-semibold mb-2">Conversion Benchmarks</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Poor:</span> <span>&lt; 1%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average:</span> <span>1% - 3%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Good:</span> <span>3% - 5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Excellent:</span> <span>&gt; 5%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <Percent className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter website metrics to calculate conversion rate</p>
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

export default ConversionRate;
