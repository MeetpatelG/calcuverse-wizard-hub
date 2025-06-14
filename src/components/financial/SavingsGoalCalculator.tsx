
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SavingsGoalCalculator = () => {
  const [goal, setGoal] = useState("");
  const [current, setCurrent] = useState("");
  const [years, setYears] = useState("");
  const [rate, setRate] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const goalValue = parseFloat(goal);
    const currentValue = parseFloat(current);
    const yearsValue = parseFloat(years);
    const rateValue = parseFloat(rate) / 100;

    // PMT formula for Future Value
    // PMT = [FV - PV*(1+r)^n] / [((1+r)^n - 1)/r]
    const n = yearsValue * 12;
    const r = rateValue / 12;
    const FV = goalValue;
    const PV = currentValue;

    if (n > 0 && r >= 0 && PV <= FV) {
      const numerator = FV - PV * Math.pow(1 + r, n);
      const denominator = (Math.pow(1 + r, n) - 1) / r;
      let monthly = numerator / denominator;
      if (!isFinite(monthly) || monthly < 0) monthly = 0;
      setResult(monthly);
    } else {
      setResult(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings Goal Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleCalculate}>
          <div>
            <label className="block mb-1 font-medium">Goal Amount ($)</label>
            <Input
              type="number"
              value={goal}
              onChange={e => setGoal(e.target.value)}
              placeholder="50000"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Current Savings ($)</label>
            <Input
              type="number"
              value={current}
              onChange={e => setCurrent(e.target.value)}
              placeholder="5000"
              min="0"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Years to Save</label>
            <Input
              type="number"
              value={years}
              onChange={e => setYears(e.target.value)}
              placeholder="10"
              min="1"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Annual Interest Rate (%)</label>
            <Input
              type="number"
              value={rate}
              onChange={e => setRate(e.target.value)}
              placeholder="6"
              min="0"
              required
            />
          </div>
          <Button className="w-full mt-2" type="submit">
            Calculate
          </Button>
        </form>
        {result !== null && (
          <div className="mt-6 text-center">
            <div className="text-lg font-semibold">Monthly Amount Needed:</div>
            <div className="text-2xl font-bold text-green-600">
              {result.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </div>
            <div className="text-muted-foreground mt-2 text-sm">
              This is the monthly contribution required to reach your goal assuming compounded returns.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SavingsGoalCalculator;
