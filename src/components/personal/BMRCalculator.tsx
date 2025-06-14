
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BMRCalculator = () => {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("1.2");
  const [result, setResult] = useState<null | { bmr: number, tdee: number }>(null);

  function calculate() {
    const a = parseFloat(age);
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const act = parseFloat(activity);

    if (!a || !h || !w) return setResult(null);

    let bmr = 0;
    // Mifflin-St Jeor Equation
    if (gender === "male") {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }
    const tdee = bmr * act;
    setResult({ bmr: Math.round(bmr), tdee: Math.round(tdee) });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>BMR Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); calculate(); }}>
          <div className="flex gap-4">
            <label className="font-medium flex items-center gap-1">
              <input type="radio" name="gender" value="male" checked={gender === "male"} onChange={() => setGender("male")} />
              Male
            </label>
            <label className="font-medium flex items-center gap-1">
              <input type="radio" name="gender" value="female" checked={gender === "female"} onChange={() => setGender("female")} />
              Female
            </label>
          </div>
          <div>
            <label className="block mb-1 font-medium">Age (years)</label>
            <Input type="number" min={1} value={age} onChange={e => setAge(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Height (cm)</label>
            <Input type="number" min={1} value={height} onChange={e => setHeight(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Weight (kg)</label>
            <Input type="number" min={1} value={weight} onChange={e => setWeight(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Activity Level</label>
            <select className="w-full border rounded-md px-3 py-2 mt-1 bg-background" value={activity} onChange={e => setActivity(e.target.value)}>
              <option value="1.2">Sedentary (little exercise)</option>
              <option value="1.375">Lightly Active (1-3 days/week)</option>
              <option value="1.55">Moderately Active (3-5 days/week)</option>
              <option value="1.725">Very Active (6-7 days/week)</option>
              <option value="1.9">Super Active (hard exercise/sports)</option>
            </select>
          </div>
          <Button className="w-full mt-2" type="submit">Calculate</Button>
        </form>
        {result && (
          <div className="mt-6 text-center">
            <div className="text-lg font-semibold">BMR: <span className="text-2xl text-blue-700 font-bold">{result.bmr}</span> kcal/day</div>
            <div className="mt-2 text-lg">Daily Maintenance Calories: <span className="text-2xl text-green-700 font-bold">{result.tdee}</span> kcal/day</div>
            <div className="text-muted-foreground mt-2 text-xs">
              These values are estimates. For individual guidance, consult a dietitian or medical professional.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default BMRCalculator;
