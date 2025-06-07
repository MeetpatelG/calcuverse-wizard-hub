
import { useState } from "react";
import { Clock, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PaymentDetail {
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  date: string;
}

const Amortization = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [schedule, setSchedule] = useState<PaymentDetail[]>([]);
  const [summary, setSummary] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalPayments: number;
  } | null>(null);
  const [calculated, setCalculated] = useState(false);

  const calculateAmortization = () => {
    if (!loanAmount || !interestRate || !loanTerm) return;

    const principal = parseFloat(loanAmount);
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const numPayments = parseFloat(loanTerm) * 12;
    const start = new Date(startDate || Date.now());
    
    // Calculate monthly payment
    const monthlyPayment = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    let remainingBalance = principal;
    const newSchedule: PaymentDetail[] = [];
    
    for (let i = 1; i <= numPayments; i++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
      
      const paymentDate = new Date(start);
      paymentDate.setMonth(paymentDate.getMonth() + i - 1);
      
      newSchedule.push({
        payment: i,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(remainingBalance, 0),
        date: paymentDate.toLocaleDateString()
      });
    }
    
    const totalInterest = newSchedule.reduce((sum, payment) => sum + payment.interest, 0);
    
    setSchedule(newSchedule);
    setSummary({
      monthlyPayment,
      totalInterest,
      totalPayments: monthlyPayment * numPayments
    });
    setCalculated(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <span>Home</span> / <span>Real Estate Calculators</span> / <span className="text-foreground">Amortization Schedule</span>
        </div>

        <div className="text-center mb-8">
          <Clock className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Amortization Schedule</h1>
          <p className="text-xl text-muted-foreground">
            View detailed payment schedule showing principal and interest breakdown
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Calendar className="h-6 w-6 text-primary" />
                <CardTitle>Loan Details</CardTitle>
              </div>
              <CardDescription>
                Enter your loan information to generate the amortization schedule.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="month"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>

              <Button onClick={calculateAmortization} className="w-full mt-6" disabled={!loanAmount || !interestRate || !loanTerm}>
                Generate Amortization Schedule
              </Button>
            </CardContent>
          </Card>

          {calculated && summary && (
            <>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Payment Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-primary/10 p-4 rounded-lg text-center">
                      <div className="text-sm text-muted-foreground mb-2">Monthly Payment</div>
                      <div className="text-2xl font-bold text-primary">
                        ${summary.monthlyPayment.toFixed(0)}
                      </div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg text-center">
                      <div className="text-sm text-muted-foreground mb-2">Total Interest</div>
                      <div className="text-2xl font-bold">
                        ${summary.totalInterest.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg text-center">
                      <div className="text-sm text-muted-foreground mb-2">Total of Payments</div>
                      <div className="text-2xl font-bold">
                        ${summary.totalPayments.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Schedule</CardTitle>
                  <CardDescription>First 12 payments shown. Full schedule available for download.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Payment #</th>
                          <th className="text-left p-2">Date</th>
                          <th className="text-right p-2">Principal</th>
                          <th className="text-right p-2">Interest</th>
                          <th className="text-right p-2">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {schedule.slice(0, 12).map((payment) => (
                          <tr key={payment.payment} className="border-b">
                            <td className="p-2">{payment.payment}</td>
                            <td className="p-2">{payment.date}</td>
                            <td className="p-2 text-right">${payment.principal.toFixed(0)}</td>
                            <td className="p-2 text-right">${payment.interest.toFixed(0)}</td>
                            <td className="p-2 text-right">${payment.balance.toFixed(0)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {schedule.length > 12 && (
                    <div className="text-center mt-4 text-muted-foreground">
                      Showing first 12 of {schedule.length} payments
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Amortization;
