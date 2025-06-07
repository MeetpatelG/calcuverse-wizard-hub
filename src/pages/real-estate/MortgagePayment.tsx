
import { useState } from "react";
import { DollarSign, Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const MortgagePayment = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [propertyTax, setPropertyTax] = useState("");
  const [insurance, setInsurance] = useState("");
  const [pmi, setPmi] = useState("");
  const [results, setResults] = useState<{
    monthlyPrincipalInterest: number;
    monthlyTax: number;
    monthlyInsurance: number;
    monthlyPMI: number;
    totalMonthlyPayment: number;
    totalInterest: number;
  } | null>(null);
  const [calculated, setCalculated] = useState(false);

  const calculatePayment = () => {
    if (!loanAmount || !interestRate || !loanTerm) return;

    const principal = parseFloat(loanAmount);
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const numPayments = parseFloat(loanTerm) * 12;
    const annualPropertyTax = parseFloat(propertyTax) || 0;
    const annualInsurance = parseFloat(insurance) || 0;
    const monthlyPMI = parseFloat(pmi) || 0;
    
    // Calculate monthly principal and interest
    const monthlyPrincipalInterest = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const monthlyTax = annualPropertyTax / 12;
    const monthlyInsurance = annualInsurance / 12;
    
    const totalMonthlyPayment = monthlyPrincipalInterest + monthlyTax + monthlyInsurance + monthlyPMI;
    const totalInterest = (monthlyPrincipalInterest * numPayments) - principal;

    setResults({
      monthlyPrincipalInterest,
      monthlyTax,
      monthlyInsurance,
      monthlyPMI,
      totalMonthlyPayment,
      totalInterest
    });
    setCalculated(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <span>Home</span> / <span>Real Estate Calculators</span> / <span className="text-foreground">Mortgage Payment Calculator</span>
        </div>

        <div className="text-center mb-8">
          <DollarSign className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Mortgage Payment Calculator</h1>
          <p className="text-xl text-muted-foreground">
            Calculate your total monthly mortgage payment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Home className="h-6 w-6 text-primary" />
                <CardTitle>Loan Details</CardTitle>
              </div>
              <CardDescription>
                Enter your mortgage and property information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="loanAmount">Loan Amount ($)</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="300000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate">Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="6.5"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="loanTerm">Loan Term (years)</Label>
                <Input
                  id="loanTerm"
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  placeholder="30"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyTax">Annual Property Tax ($)</Label>
                <Input
                  id="propertyTax"
                  type="number"
                  value={propertyTax}
                  onChange={(e) => setPropertyTax(e.target.value)}
                  placeholder="3600"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="insurance">Annual Home Insurance ($)</Label>
                <Input
                  id="insurance"
                  type="number"
                  value={insurance}
                  onChange={(e) => setInsurance(e.target.value)}
                  placeholder="1200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pmi">Monthly PMI ($)</Label>
                <Input
                  id="pmi"
                  type="number"
                  value={pmi}
                  onChange={(e) => setPmi(e.target.value)}
                  placeholder="150"
                />
              </div>

              <Button onClick={calculatePayment} className="w-full" disabled={!loanAmount || !interestRate || !loanTerm}>
                Calculate Payment
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Breakdown</CardTitle>
              <CardDescription>Your monthly mortgage payment details</CardDescription>
            </CardHeader>
            <CardContent>
              {calculated && results ? (
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground mb-2">Total Monthly Payment</div>
                    <div className="text-3xl font-bold text-primary">
                      ${results.totalMonthlyPayment.toFixed(0)}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted rounded">
                      <span className="text-sm">Principal & Interest</span>
                      <span className="font-semibold">${results.monthlyPrincipalInterest.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded">
                      <span className="text-sm">Property Tax</span>
                      <span className="font-semibold">${results.monthlyTax.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded">
                      <span className="text-sm">Home Insurance</span>
                      <span className="font-semibold">${results.monthlyInsurance.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded">
                      <span className="text-sm">PMI</span>
                      <span className="font-semibold">${results.monthlyPMI.toFixed(0)}</span>
                    </div>
                  </div>
                  
                  <div className="bg-card border p-4 rounded">
                    <h4 className="font-semibold mb-2">Loan Summary</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Loan Amount:</span> <span>${parseFloat(loanAmount).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Interest:</span> <span>${results.totalInterest.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Cost:</span> <span>${(parseFloat(loanAmount) + results.totalInterest).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter loan details to calculate payment</p>
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

export default MortgagePayment;
