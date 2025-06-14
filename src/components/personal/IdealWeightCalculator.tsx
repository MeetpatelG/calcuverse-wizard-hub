
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const IdealWeightCalculator = () => {
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<null | { devine: number, robinson: number, miller: number, hamwi: number }>(null);

  function calculate() {
    const h = parseFloat(height);
    let inches = h / 2.54;
    if (!h || h < 100) return setResult(null);
    // Height in inches, formulas below, all results in kg
    const over5ft = Math.max(0, inches - 60);
    let devine = gender === "male"
      ? 50 + 2.3 * over5ft
      : 45.5 + 2.3 * over5ft;
    let robinson = gender === "male"
      ? 52 + 1.9 * over5ft
      : 49 + 1.7 * over5ft;
    let miller = gender === "male"
      ? 56.2 + 1.41 * over5ft
      : 53.1 + 1.36 * over5ft;
    let hamwi = gender === "male"
      ? 48 + 2.7 * over5ft
      : 45.5 + 2.2 * over5ft;
    setResult({
      devine: Number(devine.toFixed(2)),
      robinson: Number(robinson.toFixed(2)),
      miller: Number(miller.toFixed(2)),
      hamwi: Number(hamwi.toFixed(2))
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ideal Weight Calculator</CardTitle>
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
            <label className="block mb-1 font-medium">Height (cm)</label>
            <Input type="number" min={100} value={height} onChange={e => setHeight(e.target.value)} required />
          </div>
          <Button className="w-full mt-2" type="submit">Calculate</Button>
        </form>
        {result && (
          <div className="mt-6 text-center">
            <div className="text-lg font-semibold">Ideal Weight (kg):</div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <span className="font-semibold">Devine:</span> {result.devine}
              </div>
              <div>
                <span className="font-semibold">Robinson:</span> {result.robinson}
              </div>
              <div>
                <span className="font-semibold">Miller:</span> {result.miller}
              </div>
              <div>
                <span className="font-semibold">Hamwi:</span> {result.hamwi}
              </div>
            </div>
            <div className="text-muted-foreground mt-2 text-xs">
              These formulas are estimation guides. For personal advice, consult a health professional.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default IdealWeightCalculator;
