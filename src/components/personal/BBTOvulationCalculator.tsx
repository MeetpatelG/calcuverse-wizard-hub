
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Advanced Ovulation Estimator based on BBT pattern and period info.
const BBTOvulationCalculator = () => {
  const [bbtReadings, setBbtReadings] = useState("");
  const [cycleLength, setCycleLength] = useState("");
  const [periodStart, setPeriodStart] = useState("");
  const [result, setResult] = useState<null|{ovulationDay:number, fertileWindow: [string, string] }>(null);

  // Utility to parse dates
  const parseDate = (str:string) => {
    const [yyyy, mm, dd] = str.split("-").map(Number);
    return new Date(yyyy, mm - 1, dd);
  };
  const formatDate = (date: Date) => date.toISOString().slice(0,10);

  function calculate() {
    try {
      // BBT readings are separated by commas or lines
      const readings = bbtReadings
        .split(/[\n,]+/)
        .map(x => parseFloat(x.trim()))
        .filter(x => !isNaN(x) && x > 0)
        .slice(-16);

      if (readings.length < 8 || !cycleLength || !periodStart)
        return setResult(null);

      // Advanced feature: Find thermal shift
      let shiftIndex = -1;
      for (let i = 1; i < readings.length; i++) {
        // Common BBT shift for ovulation is >0.2°C
        if (readings[i] - readings[i-1] > 0.2) {
          shiftIndex = i;
          break;
        }
      }

      // Fallback if not detected: typical ovulation is 14 days before period
      const cycle = parseInt(cycleLength);
      const period = parseDate(periodStart);
      let ovulationDay = shiftIndex !== -1 ? readings.length - (readings.length - shiftIndex) : cycle - 14;

      // Estimate ovulation date
      const ovulationDate = new Date(period);
      ovulationDate.setDate(period.getDate() + ovulationDay);

      // Fertile window: 5 days before ovulation to 1 day after
      const fertileStart = new Date(ovulationDate);
      fertileStart.setDate(ovulationDate.getDate() - 5);
      const fertileEnd = new Date(ovulationDate);
      fertileEnd.setDate(ovulationDate.getDate() + 1);

      setResult({
        ovulationDay,
        fertileWindow: [formatDate(fertileStart), formatDate(fertileEnd)]
      });
    } catch {
      setResult(null);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>BBT Ovulation Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); calculate(); }}>
          <div>
            <label className="block mb-1 font-medium">Basal Body Temperature (°C) readings (8-16 days), comma <span className="text-muted-foreground">or</span> newline separated</label>
            <Input as="textarea" className="min-h-[72px]" value={bbtReadings} onChange={e => setBbtReadings(e.target.value)} placeholder="36.4,36.5,36.6,36.4,36.3,36.5,36.6..." required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Cycle Length (days)</label>
            <Input type="number" min={21} max={40} value={cycleLength} onChange={e => setCycleLength(e.target.value)} placeholder="28" required />
          </div>
          <div>
            <label className="block mb-1 font-medium">First Day of Last Period</label>
            <Input type="date" value={periodStart} onChange={e => setPeriodStart(e.target.value)} required />
          </div>
          <Button className="w-full mt-2" type="submit">Estimate Ovulation</Button>
        </form>
        {result && (
          <div className="mt-6 text-center animate-fade-in">
            <div className="text-lg font-semibold mb-2">Estimated Ovulation Day: <span className="font-bold text-blue-700">Day {result.ovulationDay + 1}</span></div>
            <div className="text-lg mb-2">Fertile Window: <span className="font-semibold text-green-700">{result.fertileWindow[0]} &ndash; {result.fertileWindow[1]}</span></div>
            <div className="text-muted-foreground mt-2 text-xs">
              Note: Estimation based on input temperature trend and typical cycle patterns.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BBTOvulationCalculator;
