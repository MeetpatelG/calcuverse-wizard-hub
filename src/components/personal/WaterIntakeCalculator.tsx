
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WaterIntakeCalculator = () => {
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("");
  const [result, setResult] = useState<null | number>(null);

  function calculate() {
    const w = parseFloat(weight);
    const act = parseFloat(activity);
    if (!w) return setResult(null);
    // Baseline: 35ml/kg/day + 350ml per 30min of exercise
    let water = w * 0.035; // in liters
    if (act && act > 0) {
      water += (act / 30) * 0.35;
    }
    setResult(Number(water.toFixed(2)));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Water Intake Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); calculate(); }}>
          <div>
            <label className="block mb-1 font-medium">Weight (kg)</label>
            <Input type="number" min={1} value={weight} onChange={e => setWeight(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Daily Exercise (minutes)</label>
            <Input type="number" min={0} value={activity} onChange={e => setActivity(e.target.value)} placeholder="0" />
          </div>
          <Button className="w-full mt-2" type="submit">Calculate</Button>
        </form>
        {result !== null && (
          <div className="mt-6 text-center">
            <div className="text-lg font-semibold">Recommended Daily Water Intake:</div>
            <div className="text-2xl font-bold text-blue-700">{result} Liters</div>
            <div className="text-muted-foreground mt-2 text-xs">
              Adjust intake for climate and individual needs.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default WaterIntakeCalculator;
