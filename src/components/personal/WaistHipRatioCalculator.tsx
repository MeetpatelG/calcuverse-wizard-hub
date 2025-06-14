
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WHR_THRESHOLDS = {
  male: 0.9,
  female: 0.85
} as const;

const WaistHipRatioCalculator = () => {
  const [gender, setGender] = useState("male");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [result, setResult] = useState<null | { ratio: number, status: string }>(null);

  function calculate() {
    const w = parseFloat(waist);
    const h = parseFloat(hip);

    if (!w || !h || w <= 0 || h <= 0) {
      setResult(null);
      return;
    }
    const ratio = w / h;
    let status = "Low Risk";
    if ((gender === "male" && ratio > WHR_THRESHOLDS.male) ||
        (gender === "female" && ratio > WHR_THRESHOLDS.female)) {
      status = "High Risk";
    } else if (
      (gender === "male" && ratio > 0.95) ||
      (gender === "female" && ratio > 0.9)
    ) {
      status = "Very High Risk";
    }
    setResult({ ratio: Number(ratio.toFixed(2)), status });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Waist-to-Hip Ratio Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); calculate(); }}>
          <div className="flex gap-4">
            <label className="font-medium flex items-center gap-1">
              <input type="radio" name="gender" value="male" checked={gender==="male"} onChange={()=>setGender("male")} className="mr-1"/>
              Male
            </label>
            <label className="font-medium flex items-center gap-1">
              <input type="radio" name="gender" value="female" checked={gender==="female"} onChange={()=>setGender("female")} className="mr-1"/>
              Female
            </label>
          </div>
          <div>
            <label className="block mb-1 font-medium">Waist Circumference (cm)</label>
            <Input type="number" value={waist} onChange={e => setWaist(e.target.value)} min={1} required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Hip Circumference (cm)</label>
            <Input type="number" value={hip} onChange={e => setHip(e.target.value)} min={1} required />
          </div>
          <Button className="w-full mt-2" type="submit">Calculate</Button>
        </form>
        {result && (
          <div className="mt-6 text-center animate-fade-in">
            <div className="text-lg font-semibold">Waist-to-Hip Ratio: <span className="text-blue-700 font-bold">{result.ratio}</span></div>
            <div className="mt-2 text-lg">Health Risk: <span className={`font-bold ${result.status.includes("High") ? "text-red-600" : "text-green-700"}`}>{result.status}</span></div>
            <div className="text-muted-foreground mt-2 text-xs">
              A higher ratio may indicate a greater risk of heart disease and Type 2 diabetes.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default WaistHipRatioCalculator;
