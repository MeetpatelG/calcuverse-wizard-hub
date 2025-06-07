
import { useState } from "react";
import { Building, Calculator } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const RentalYield = () => {
  const [propertyValue, setPropertyValue] = useState("");
  const [weeklyRent, setWeeklyRent] = useState("");
  const [annualExpenses, setAnnualExpenses] = useState("");
  const [results, setResults] = useState<{
    grossYield: number;
    netYield: number;
    annualRentIncome: number;
    netAnnualIncome: number;
  } | null>(null);
  const [calculated, setCalculated] = useState(false);

  const calculateYield = () => {
    if (!propertyValue || !weeklyRent) return;

    const value = parseFloat(propertyValue);
    const weekly = parseFloat(weeklyRent);
    const expenses = parseFloat(annualExpenses) || 0;
    
    const annualRentIncome = weekly * 52;
    const grossYield = (annualRentIncome / value) * 100;
    const netAnnualIncome = annualRentIncome - expenses;
    const netYield = (netAnnualIncome / value) * 100;

    setResults({
      grossYield,
      netYield,
      annualRentIncome,
      netAnnualIncome
    });
    setCalculated(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <span>Home</span> / <span>Real Estate Calculators</span> / <span className="text-foreground">Rental Yield Calculator</span>
        </div>

        <div className="text-center mb-8">
          <Building className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Rental Yield Calculator</h1>
          <p className="text-xl text-muted-foreground">
            Calculate gross and net rental yield for investment properties
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Calculator className="h-6 w-6 text-primary" />
                <CardTitle>Property Information</CardTitle>
              </div>
              <CardDescription>
                Enter property value, rental income, and expenses.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="propertyValue">Property Value ($)</Label>
                <Input
                  id="propertyValue"
                  type="number"
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(e.target.value)}
                  placeholder="400000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weeklyRent">Weekly Rent ($)</Label>
                <Input
                  id="weeklyRent"
                  type="number"
                  value={weeklyRent}
                  onChange={(e) => setWeeklyRent(e.target.value)}
                  placeholder="500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="annualExpenses">Annual Expenses ($)</Label>
                <Input
                  id="annualExpenses"
                  type="number"
                  value={annualExpenses}
                  onChange={(e) => setAnnualExpenses(e.target.value)}
                  placeholder="8000"
                />
                <div className="text-xs text-muted-foreground">
                  Include rates, insurance, maintenance, management fees, etc.
                </div>
              </div>

              <Button onClick={calculateYield} className="w-full" disabled={!propertyValue || !weeklyRent}>
                Calculate Rental Yield
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rental Yield Results</CardTitle>
              <CardDescription>Investment return analysis</CardDescription>
            </CardHeader>
            <CardContent>
              {calculated && results ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-primary/10 p-4 rounded-lg text-center">
                      <div className="text-sm text-muted-foreground mb-2">Gross Yield</div>
                      <div className="text-2xl font-bold text-primary">
                        {results.grossYield.toFixed(2)}%
                      </div>
                    </div>
                    <div className="bg-secondary/10 p-4 rounded-lg text-center">
                      <div className="text-sm text-muted-foreground mb-2">Net Yield</div>
                      <div className="text-2xl font-bold text-secondary-foreground">
                        {results.netYield.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-muted p-4 rounded">
                      <div className="text-xs text-muted-foreground">Annual Rental Income</div>
                      <div className="font-semibold text-lg">${results.annualRentIncome.toLocaleString()}</div>
                    </div>
                    <div className="bg-muted p-4 rounded">
                      <div className="text-xs text-muted-foreground">Net Annual Income</div>
                      <div className="font-semibold text-lg">${results.netAnnualIncome.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <div className="bg-card border p-4 rounded">
                    <h4 className="font-semibold mb-2">Yield Benchmarks</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Excellent Gross Yield:</span> <span>8%+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Good Gross Yield:</span> <span>6-8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Gross Yield:</span> <span>4-6%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Your Gross Yield:</span> 
                        <span className={results.grossYield >= 8 ? "text-green-600" : results.grossYield >= 6 ? "text-yellow-600" : "text-red-600"}>
                          {results.grossYield.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter property details to calculate rental yield</p>
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

export default RentalYield;
