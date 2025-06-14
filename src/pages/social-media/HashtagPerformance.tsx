
import { Instagram } from "lucide-react";
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HashtagPerformance() {
  const [totalHashtagImpressions, setTotalHashtagImpressions] = useState<number>(2000);
  const [totalImpressions, setTotalImpressions] = useState<number>(10000);
  const [performance, setPerformance] = useState<number | null>(20);

  function calculate() {
    if (totalImpressions > 0) {
      setPerformance(Number(((totalHashtagImpressions / totalImpressions) * 100).toFixed(2)));
    }
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Instagram className="h-8 w-8 text-gray-700" />
              <CardTitle>Hashtag Performance Calculator</CardTitle>
            </div>
            <CardDescription>
              See how much hashtags contribute to your overall impressions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 mb-4">
              <div>
                <label className="text-sm">Hashtag Impressions</label>
                <Input type="number" value={totalHashtagImpressions} min={0} onChange={e => setTotalHashtagImpressions(Number(e.target.value))} />
              </div>
              <div>
                <label className="text-sm">Total Impressions</label>
                <Input type="number" value={totalImpressions} min={1} onChange={e => setTotalImpressions(Number(e.target.value))} />
              </div>
              <Button className="w-full" onClick={calculate}>Calculate Performance</Button>
            </div>
            {performance !== null && (
              <div>
                <div className="font-medium">Result:</div>
                <div className="mb-2">Hashtag Performance: <span className="text-gray-800 font-bold">{performance}%</span> of total impressions</div>
                <span className="font-medium">LaTeX Output:</span>
                <div className="bg-gray-50 rounded px-2 py-1 mt-1 text-xs text-gray-700">
                  {"$ P = \\frac{I_{hash}}{I_{total}} \\times 100 $"}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
