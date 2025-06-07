
import { useState } from "react";
import { FileText, Receipt } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ClosingCosts = () => {
  const [homePrice, setHomePrice] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [state, setState] = useState("");
  const [results, setResults] = useState<{
    totalClosingCosts: number;
    lenderFees: number;
    titleInsurance: number;
    appraisal: number;
    inspection: number;
    taxes: number;
    other: number;
    percentageOfPrice: number;
  } | null>(null);
  const [calculated, setCalculated] = useState(false);

  const calculateClosingCosts = () => {
    if (!homePrice || !loanAmount) return;

    const price = parseFloat(homePrice);
    const loan = parseFloat(loanAmount);
    
    // Typical closing cost estimates
    const lenderFees = loan * 0.015; // 1.5% of loan amount
    const titleInsurance = price * 0.005; // 0.5% of home price
    const appraisal = 500;
    const inspection = 400;
    const taxes = price * 0.002; // 0.2% for transfer taxes
    const other = 1000; // Attorney fees, recording fees, etc.
    
    const totalClosingCosts = lenderFees + titleInsurance + appraisal + inspection + taxes + other;
    const percentageOfPrice = (totalClosingCosts / price) * 100;

    setResults({
      totalClosingCosts,
      lenderFees,
      titleInsurance,
      appraisal,
      inspection,
      taxes,
      other,
      percentageOfPrice
    });
    setCalculated(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <span>Home</span> / <span>Real Estate Calculators</span> / <span className="text-foreground">Closing Costs Calculator</span>
        </div>

        <div className="text-center mb-8">
          <FileText className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Closing Costs Calculator</h1>
          <p className="text-xl text-muted-foreground">
            Estimate your total closing costs for buying a home
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Receipt className="h-6 w-6 text-primary" />
                <CardTitle>Purchase Information</CardTitle>
              </div>
              <CardDescription>
                Enter your home purchase details.
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
                <Label htmlFor="loanAmount">Loan Amount ($)</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="280000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="California"
                />
              </div>

              <Button onClick={calculateClosingCosts} className="w-full" disabled={!homePrice || !loanAmount}>
                Calculate Closing Costs
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Closing Costs Breakdown</CardTitle>
              <CardDescription>Estimated costs for your home purchase</CardDescription>
            </CardHeader>
            <CardContent>
              {calculated && results ? (
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground mb-2">Total Closing Costs</div>
                    <div className="text-3xl font-bold text-primary">
                      ${results.totalClosingCosts.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      {results.percentageOfPrice.toFixed(1)}% of home price
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted rounded">
                      <span className="text-sm">Lender Fees</span>
                      <span className="font-semibold">${results.lenderFees.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded">
                      <span className="text-sm">Title Insurance</span>
                      <span className="font-semibold">${results.titleInsurance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded">
                      <span className="text-sm">Appraisal Fee</span>
                      <span className="font-semibold">${results.appraisal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded">
                      <span className="text-sm">Home Inspection</span>
                      <span className="font-semibold">${results.inspection.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded">
                      <span className="text-sm">Transfer Taxes</span>
                      <span className="font-semibold">${results.taxes.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded">
                      <span className="text-sm">Other Fees</span>
                      <span className="font-semibold">${results.other.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="bg-card border p-4 rounded">
                    <h4 className="font-semibold mb-2">Important Notes</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>• Closing costs typically range from 2-5% of home price</p>
                      <p>• Some fees may be negotiable with the seller</p>
                      <p>• Costs vary by location and lender</p>
                      <p>• Get a Loan Estimate from your lender for accurate costs</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter purchase details to estimate closing costs</p>
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

export default ClosingCosts;
