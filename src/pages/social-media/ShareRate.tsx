
import { Instagram } from "lucide-react";
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ShareRate() {
  const [shares, setShares] = useState<number>(100);
  const [totalViews, setTotalViews] = useState<number>(5000);
  const [shareRate, setShareRate] = useState<number | null>(2);

  function calculate() {
    if (totalViews > 0) {
      setShareRate(Number(((shares / totalViews) * 100).toFixed(2)));
    }
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Instagram className="h-8 w-8 text-orange-500" />
              <CardTitle>Share Rate Calculator</CardTitle>
            </div>
            <CardDescription>
              Find the percentage of users who shared your post.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 mb-4">
              <div>
                <label className="text-sm">Number of Shares</label>
                <Input type="number" value={shares} min={0} onChange={e => setShares(Number(e.target.value))} />
              </div>
              <div>
                <label className="text-sm">Total Views</label>
                <Input type="number" value={totalViews} min={1} onChange={e => setTotalViews(Number(e.target.value))} />
              </div>
              <Button className="w-full" onClick={calculate}>Calculate Share Rate</Button>
            </div>
            {shareRate !== null && (
              <div>
                <div className="font-medium">Result:</div>
                <div className="mb-2">Share Rate: <span className="text-orange-700 font-bold">{shareRate}%</span></div>
                <span className="font-medium">LaTeX Output:</span>
                <div className="bg-gray-50 rounded px-2 py-1 mt-1 text-xs text-gray-700">
                  {"$ SR = \\frac{S}{V} \\times 100 $"}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
