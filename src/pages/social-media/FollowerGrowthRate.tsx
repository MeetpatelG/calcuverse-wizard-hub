
import { Instagram } from "lucide-react";
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FollowerGrowthRate() {
  const [startFollowers, setStartFollowers] = useState<number>(1000);
  const [endFollowers, setEndFollowers] = useState<number>(1200);
  const [period, setPeriod] = useState<number>(30);
  const [growthRate, setGrowthRate] = useState<number | null>(20);

  function calculate() {
    if (startFollowers > 0 && period > 0) {
      const rate = ((endFollowers - startFollowers) / startFollowers) * (100 / period);
      setGrowthRate(Number(rate.toFixed(2)));
    }
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Instagram className="h-8 w-8 text-green-600" />
              <CardTitle>Follower Growth Rate Calculator</CardTitle>
            </div>
            <CardDescription>
              Calculate your follower growth rate over a selected period. 
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 mb-4">
              <div>
                <label className="text-sm">Starting Followers</label>
                <Input type="number" value={startFollowers} min={0} onChange={e => setStartFollowers(Number(e.target.value))} />
              </div>
              <div>
                <label className="text-sm">Ending Followers</label>
                <Input type="number" value={endFollowers} min={0} onChange={e => setEndFollowers(Number(e.target.value))} />
              </div>
              <div>
                <label className="text-sm">Period (days)</label>
                <Input type="number" value={period} min={1} onChange={e => setPeriod(Number(e.target.value))} />
              </div>
              <Button className="w-full" onClick={calculate}>Calculate Growth Rate</Button>
            </div>
            {growthRate !== null && (
              <div>
                <div className="font-medium">Result:</div>
                <div className="mb-2">Growth Rate: <span className="text-green-700 font-bold">{growthRate}% per day</span></div>
                <div>
                  <span className="font-medium">LaTeX Output:</span>
                  <div className="bg-gray-50 rounded px-2 py-1 mt-1 text-xs text-gray-700">
                    {"$ G = \\frac{F_{end} - F_{start}}{F_{start}} \\div N \\times 100 $"}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
