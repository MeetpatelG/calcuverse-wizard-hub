
import { Instagram } from "lucide-react";
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Impression() {
  const [reaches, setReaches] = useState<number>(5000);
  const [avgViewsPerUser, setAvgViewsPerUser] = useState<number>(2);
  const [impressions, setImpressions] = useState<number | null>(10000);

  function calculate() {
    setImpressions(Number((reaches * avgViewsPerUser).toFixed(0)));
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Instagram className="h-8 w-8 text-purple-600" />
              <CardTitle>Impression Calculator</CardTitle>
            </div>
            <CardDescription>
              Estimate total impressions based on reach and average views per user.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 mb-4">
              <div>
                <label className="text-sm">Reach (unique users)</label>
                <Input type="number" value={reaches} min={0} onChange={e => setReaches(Number(e.target.value))} />
              </div>
              <div>
                <label className="text-sm">Avg Views per User</label>
                <Input type="number" value={avgViewsPerUser} min={0} step={0.1} onChange={e => setAvgViewsPerUser(Number(e.target.value))} />
              </div>
              <Button className="w-full" onClick={calculate}>Calculate Impressions</Button>
            </div>
            {impressions !== null && (
              <div>
                <div className="font-medium">Result:</div>
                <div className="mb-2">Impressions: <span className="text-purple-600 font-bold">{impressions}</span></div>
                <span className="font-medium">LaTeX Output:</span>
                <div className="bg-gray-50 rounded px-2 py-1 mt-1 text-xs text-gray-700">
                  {"$ I = R \\times V $"}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
