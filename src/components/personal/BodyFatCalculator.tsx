
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BodyFatCalculator = () => {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [result, setResult] = useState<null | number>(null);

  // US Navy Body Fat % formula
  function calculate() {
    const h = parseFloat(height);
    const n = parseFloat(neck);
    const w = parseFloat(waist);
    const hp = parseFloat(hip);
    if (gender === "male") {
      // Only need waist and neck
      if (!h || !n || !w) return setResult(null);
      // US Navy for men
      const fat = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
      setResult(Number(fat.toFixed(2)));
    } else {
      // Need waist, neck, hip for women
      if (!h || !n || !w || !hp) return setResult(null);
      // US Navy for women
      const fat = 495 / (1.29579 - 0.35004 * Math.log10(w + hp - n) + 0.22100 * Math.log10(h)) - 450;
      setResult(Number(fat.toFixed(2)));
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Body Fat Calculator</CardTitle>
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
            <label className="block mb-1 font-medium">Age</label>
            <Input type="number" value={age} onChange={e => setAge(e.target.value)} min={1} required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Height (cm)</label>
            <Input type="number" value={height} onChange={e => setHeight(e.target.value)} min={1} required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Neck Circumference (cm)</label>
            <Input type="number" value={neck} onChange={e => setNeck(e.target.value)} min={1} required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Waist Circumference (cm)</label>
            <Input type="number" value={waist} onChange={e => setWaist(e.target.value)} min={1} required />
          </div>
          {gender === "female" && (
            <div>
              <label className="block mb-1 font-medium">Hip Circumference (cm)</label>
              <Input type="number" value={hip} onChange={e => setHip(e.target.value)} min={1} required />
            </div>
          )}
          <Button className="w-full mt-2" type="submit">Calculate</Button>
        </form>
        {result !== null && !isNaN(result) && (
          <div className="mt-6 text-center">
            <div className="text-lg font-semibold">Body Fat Percentage:</div>
            <div className="text-2xl font-bold text-blue-700">{result}%</div>
            <div className="text-muted-foreground mt-2 text-xs">
              For optimal health, consult with a medical professional.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default BodyFatCalculator;
