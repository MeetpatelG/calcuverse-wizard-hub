
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DebtPayoffCalculator = () => {
  const [balance, setBalance] = useState("");
  const [rate, setRate] = useState("");
  const [payment, setPayment] = useState("");
  const [result, setResult] = useState<{months: number, interest: number} | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    let P = parseFloat(balance);
    const r = parseFloat(rate) / 100 / 12;
    const pay = parseFloat(payment);

    if (P > 0 && r >= 0 && pay > 0) {
      let month = 0, totalInterest = 0, current = P;
      while (current > 0 && month < 1000) {
        const interest = current * r;
        current = current + interest - pay;
        totalInterest += interest;
        month++;
        if (current < 0) current = 0;
      }
      if (month === 1000) {
        setResult(null);
        return;
      }
      setResult({months: month, interest: totalInterest});
    } else {
      setResult(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Debt Payoff Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleCalculate}>
          <div>
            <label className="block mb-1 font-medium">Loan Balance ($)</label>
            <Input
              type="number"
              value={balance}
              onChange={e => setBalance(e.target.value)}
              placeholder="15000"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Interest Rate (APR %) </label>
            <Input
              type="number"
              value={rate}
              onChange={e => setRate(e.target.value)}
              placeholder="13"
              min="0"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Monthly Payment ($)</label>
            <Input
              type="number"
              value={payment}
              onChange={e => setPayment(e.target.value)}
              placeholder="350"
              min="1"
              required
            />
          </div>
          <Button className="w-full mt-2" type="submit">
            Calculate
          </Button>
        </form>
        {result !== null && (
          <div className="mt-6 text-center">
            <div className="text-lg font-semibold">You'll be debt-free in:</div>
            <div className="text-2xl font-bold text-blue-700">{result.months} months</div>
            <div className="mt-2">
              <span className="text-sm">Total interest paid:</span>
              <div className="font-semibold text-red-600">
                {result.interest.toLocaleString("en-US", {style:"currency", currency:"USD"})}
              </div>
            </div>
            <div className="text-muted-foreground mt-2 text-xs">
              Accelerate payoff by increasing monthly payment or lowering interest rate.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default DebtPayoffCalculator;
