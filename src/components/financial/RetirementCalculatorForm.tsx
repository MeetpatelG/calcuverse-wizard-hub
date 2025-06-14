
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RetirementCalculatorForm = () => {
  const [currentAge, setCurrentAge] = useState("");
  const [retireAge, setRetireAge] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");
  const [monthlySave, setMonthlySave] = useState("");
  const [annualReturn, setAnnualReturn] = useState("");
  const [result, setResult] = useState<{future: number, needed: number, difference: number} | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const age = parseFloat(currentAge);
    const endAge = parseFloat(retireAge);
    const currSav = parseFloat(currentSavings);
    const mSave = parseFloat(monthlySave);
    const aReturn = parseFloat(annualReturn) / 100;

    const n = (endAge - age) * 12;
    const r = aReturn / 12;
    if (n > 0 && r >= 0 && currSav >= 0 && mSave >= 0 && age < endAge) {
      let futureValue = currSav * Math.pow(1 + r, n);
      if (mSave > 0 && r > 0) {
        futureValue += mSave * (Math.pow(1 + r, n) - 1) / r;
      } else if (mSave > 0) {
        futureValue += mSave * n;
      }
      // Assumption: "needed" is 25x current annual savings for simple guidance
      const needed = mSave > 0 ? mSave * 12 * 25 : 0;
      setResult({
        future: futureValue,
        needed,
        difference: futureValue - needed,
      });
    } else {
      setResult(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Retirement Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleCalculate}>
          <div>
            <label className="block mb-1 font-medium">Current Age</label>
            <Input
              type="number"
              value={currentAge}
              onChange={e => setCurrentAge(e.target.value)}
              min="18"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Retirement Age</label>
            <Input
              type="number"
              value={retireAge}
              onChange={e => setRetireAge(e.target.value)}
              min="30"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Current Savings ($)</label>
            <Input
              type="number"
              value={currentSavings}
              onChange={e => setCurrentSavings(e.target.value)}
              min="0"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Monthly Contribution ($)</label>
            <Input
              type="number"
              value={monthlySave}
              onChange={e => setMonthlySave(e.target.value)}
              min="0"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Expected Annual Return (%)</label>
            <Input
              type="number"
              value={annualReturn}
              onChange={e => setAnnualReturn(e.target.value)}
              min="0"
              required
            />
          </div>
          <Button className="w-full mt-2" type="submit">
            Calculate Retirement Savings
          </Button>
        </form>
        {result && (
          <div className="mt-6 text-center">
            <div className="flex flex-col gap-2">
              <span className="text-lg font-medium">Your estimated retirement savings:</span>
              <span className="text-2xl font-bold text-green-600">
                {result.future.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </span>
              <span className="mt-2 text-base">
                Benchmark goal (25x annual expenses):&nbsp;
                <span className="font-bold text-blue-700">{result.needed.toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
              </span>
              <span className={"text-base " + (result.difference >= 0 ? "text-green-700" : "text-red-700")}>
                {result.difference >= 0
                  ? "You're on track for your retirement target!"
                  : "There's a shortfall for your goal. Consider saving more or adjusting your plan."}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RetirementCalculatorForm;
