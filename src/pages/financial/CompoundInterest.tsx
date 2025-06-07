
import { useState } from "react";
import { Calculator } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const CompoundInterest = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [compoundFrequency, setCompoundFrequency] = useState("12");
  const [result, setResult] = useState<{
    finalAmount: number;
    totalInterest: number;
    yearlyBreakdown: Array<{year: number; amount: number; interest: number}>;
  } | null>(null);

  const calculateCompoundInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(compoundFrequency);

    if (isNaN(p) || isNaN(r) || isNaN(t) || isNaN(n) || p <= 0 || r < 0 || t <= 0 || n <= 0) {
      return;
    }

    // A = P(1 + r/n)^(nt)
    const finalAmount = p * Math.pow(1 + r / n, n * t);
    const totalInterest = finalAmount - p;

    // Calculate yearly breakdown
    const yearlyBreakdown = [];
    for (let year = 1; year <= t; year++) {
      const amount = p * Math.pow(1 + r / n, n * year);
      const interest = amount - p;
      yearlyBreakdown.push({
        year,
        amount: Math.round(amount * 100) / 100,
        interest: Math.round(interest * 100) / 100
      });
    }

    setResult({
      finalAmount: Math.round(finalAmount * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      yearlyBreakdown
    });
  };

  const clearForm = () => {
    setPrincipal("");
    setRate("");
    setTime("");
    setCompoundFrequency("12");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link> / 
          <Link to="/financial" className="hover:text-foreground"> Financial</Link> / 
          <span className="text-foreground"> Compound Interest Calculator</span>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-4xl font-bold">Compound Interest Calculator</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Calculate the power of compound interest on your investments
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Investment Details</CardTitle>
                <CardDescription>
                  Enter your investment parameters to calculate compound interest
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="principal">Principal Amount ($)</Label>
                  <Input
                    id="principal"
                    type="number"
                    placeholder="10000"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rate">Annual Interest Rate (%)</Label>
                  <Input
                    id="rate"
                    type="number"
                    step="0.01"
                    placeholder="7.5"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Investment Period (Years)</Label>
                  <Input
                    id="time"
                    type="number"
                    placeholder="10"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frequency">Compounding Frequency</Label>
                  <select
                    id="frequency"
                    value={compoundFrequency}
                    onChange={(e) => setCompoundFrequency(e.target.value)}
                    className="w-full p-2 border border-input bg-background rounded-md"
                  >
                    <option value="1">Annually</option>
                    <option value="2">Semi-annually</option>
                    <option value="4">Quarterly</option>
                    <option value="12">Monthly</option>
                    <option value="365">Daily</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={calculateCompoundInterest} className="flex-1">
                    Calculate
                  </Button>
                  <Button variant="outline" onClick={clearForm}>
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>

            {result && (
              <Card>
                <CardHeader>
                  <CardTitle>Calculation Results</CardTitle>
                  <CardDescription>Your compound interest calculation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Final Amount</p>
                      <p className="text-2xl font-bold text-green-600">
                        ${result.finalAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Interest</p>
                      <p className="text-2xl font-bold text-blue-600">
                        ${result.totalInterest.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Year-by-Year Breakdown</h4>
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {result.yearlyBreakdown.map((year) => (
                        <div key={year.year} className="flex justify-between items-center p-2 bg-muted rounded">
                          <span className="font-medium">Year {year.year}</span>
                          <div className="text-right">
                            <div className="text-sm">${year.amount.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">
                              Interest: ${year.interest.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>About Compound Interest</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Compound interest is the interest calculated on the initial principal and the accumulated 
                interest from previous periods. It's often called "interest on interest" and can 
                significantly boost your investment returns over time.
              </p>
              <p>
                The formula used is: A = P(1 + r/n)^(nt), where:
              </p>
              <ul>
                <li>A = Final amount</li>
                <li>P = Principal (initial investment)</li>
                <li>r = Annual interest rate (decimal)</li>
                <li>n = Number of times interest is compounded per year</li>
                <li>t = Time in years</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CompoundInterest;
