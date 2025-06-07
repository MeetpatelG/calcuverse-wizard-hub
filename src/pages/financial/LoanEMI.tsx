
import { useState, useEffect } from "react";
import { Calculator } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

const LoanEMI = () => {
  const [principal, setPrincipal] = useState(1000000);
  const [rate, setRate] = useState(10);
  const [tenure, setTenure] = useState(20);
  const [emi, setEmi] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  const calculateEMI = () => {
    const monthlyRate = rate / (12 * 100);
    const months = tenure * 12;
    
    if (monthlyRate === 0) {
      const calculatedEmi = principal / months;
      setEmi(calculatedEmi);
      setTotalAmount(principal);
      setTotalInterest(0);
    } else {
      const emiNumerator = principal * monthlyRate * Math.pow(1 + monthlyRate, months);
      const emiDenominator = Math.pow(1 + monthlyRate, months) - 1;
      const calculatedEmi = emiNumerator / emiDenominator;
      
      setEmi(calculatedEmi);
      setTotalAmount(calculatedEmi * months);
      setTotalInterest(calculatedEmi * months - principal);
    }
  };

  useEffect(() => {
    calculateEMI();
  }, [principal, rate, tenure]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-6">
          <span>Home</span> / <span>Financial Calculators</span> / <span className="text-foreground">Loan EMI Calculator</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Calculator className="h-6 w-6 text-primary" />
                <CardTitle>Loan EMI Calculator</CardTitle>
              </div>
              <CardDescription>
                Calculate your Equated Monthly Installment (EMI) for home loans, personal loans, and more.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Principal Amount */}
              <div className="space-y-2">
                <Label htmlFor="principal">Loan Amount (₹)</Label>
                <Input
                  id="principal"
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="text-lg"
                />
                <Slider
                  value={[principal]}
                  onValueChange={(value) => setPrincipal(value[0])}
                  max={10000000}
                  min={100000}
                  step={100000}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹1L</span>
                  <span>₹1Cr</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="space-y-2">
                <Label htmlFor="rate">Interest Rate (% per annum)</Label>
                <Input
                  id="rate"
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="text-lg"
                  step="0.1"
                />
                <Slider
                  value={[rate]}
                  onValueChange={(value) => setRate(value[0])}
                  max={20}
                  min={5}
                  step={0.1}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5%</span>
                  <span>20%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div className="space-y-2">
                <Label htmlFor="tenure">Loan Tenure (Years)</Label>
                <Input
                  id="tenure"
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="text-lg"
                />
                <Slider
                  value={[tenure]}
                  onValueChange={(value) => setTenure(value[0])}
                  max={30}
                  min={1}
                  step={1}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 Year</span>
                  <span>30 Years</span>
                </div>
              </div>

              <Button onClick={calculateEMI} className="w-full">
                Calculate EMI
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle>EMI Calculation Results</CardTitle>
              <CardDescription>
                Your monthly payment breakdown and total cost analysis.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Monthly EMI</div>
                  <div className="text-2xl font-bold text-primary">
                    ₹{emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Principal Amount</div>
                  <div className="text-xl font-semibold">
                    ₹{principal.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Total Interest</div>
                  <div className="text-xl font-semibold text-orange-600">
                    ₹{totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Total Amount</div>
                  <div className="text-xl font-semibold">
                    ₹{totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </div>
                </div>
              </div>

              {/* Payment Breakdown */}
              <div className="space-y-2">
                <h3 className="font-semibold">Payment Breakdown</h3>
                <div className="flex items-center justify-between text-sm">
                  <span>Principal</span>
                  <span>{((principal / totalAmount) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${(principal / totalAmount) * 100}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Interest</span>
                  <span>{((totalInterest / totalAmount) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full" 
                    style={{ width: `${(totalInterest / totalAmount) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SEO Content */}
        <div className="mt-12 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>About Loan EMI Calculator</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                An EMI (Equated Monthly Installment) calculator is a financial tool that helps you determine 
                the monthly payment amount for any loan. Whether you're planning to take a home loan, 
                personal loan, or car loan, our EMI calculator provides accurate calculations instantly.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">How EMI is Calculated</h3>
              <p>
                The EMI calculation uses the formula: EMI = [P x R x (1+R)^N] / [(1+R)^N-1], where:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>P = Principal loan amount</li>
                <li>R = Monthly interest rate (Annual rate / 12)</li>
                <li>N = Number of monthly installments</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-3">Benefits of Using EMI Calculator</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Plan your monthly budget effectively</li>
                <li>Compare different loan options</li>
                <li>Understand the impact of interest rates and tenure</li>
                <li>Make informed borrowing decisions</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoanEMI;
