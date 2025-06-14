
import { Instagram } from "lucide-react";
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Reach() {
  const [impressions, setImpressions] = useState<number>(10000);
  const [uniqueUsers, setUniqueUsers] = useState<number>(8000);

  const [reach, setReach] = useState<number | null>(80);

  function calculate() {
    if (impressions && uniqueUsers > 0) {
      setReach(Number(((uniqueUsers / impressions) * 100).toFixed(2)));
    }
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Instagram className="h-8 w-8 text-blue-500" />
              <CardTitle>Reach Calculator</CardTitle>
            </div>
            <CardDescription>
              Estimate your effective reach using impressions and unique users.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 mb-4">
              <div>
                <label className="text-sm">Total Impressions</label>
                <Input type="number" value={impressions} min={0} onChange={e => setImpressions(Number(e.target.value))} />
              </div>
              <div>
                <label className="text-sm">Unique Users</label>
                <Input type="number" value={uniqueUsers} min={0} onChange={e => setUniqueUsers(Number(e.target.value))} />
              </div>
              <Button className="w-full" onClick={calculate}>Calculate Reach</Button>
            </div>
            {reach !== null && (
              <div>
                <div className="font-medium">Result:</div>
                <div className="mb-2">Reach: <span className="text-blue-700 font-bold">{reach}%</span></div>
                <span className="font-medium">LaTeX Output:</span>
                <div className="bg-gray-50 rounded px-2 py-1 mt-1 text-xs text-gray-700">
                  {"$ \\text{Reach} = \\frac{\\text{Unique Users}}{\\text{Impressions}} \\times 100 $"}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
