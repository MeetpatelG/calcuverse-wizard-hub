
import { Youtube } from "lucide-react";
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function YouTubeVideoPerformance() {
  const [views, setViews] = useState<number>(10000);
  const [likes, setLikes] = useState<number>(500);
  const [comments, setComments] = useState<number>(130);
  const [shares, setShares] = useState<number>(40);
  const [score, setScore] = useState<number | null>(6.7);

  function calculate() {
    if (views > 0) {
      setScore(Number((((likes + comments + shares) / views) * 100).toFixed(2)));
    }
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Youtube className="h-8 w-8 text-red-600" />
              <CardTitle>YouTube Video Performance Calculator</CardTitle>
            </div>
            <CardDescription>
              Track YouTube video engagement by analyzing likes, comments, shares, and views.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 mb-4">
              <div><label className="text-sm">Views</label>
                <Input type="number" value={views} min={1} onChange={e => setViews(Number(e.target.value))} /></div>
              <div><label className="text-sm">Likes</label>
                <Input type="number" value={likes} min={0} onChange={e => setLikes(Number(e.target.value))} /></div>
              <div><label className="text-sm">Comments</label>
                <Input type="number" value={comments} min={0} onChange={e => setComments(Number(e.target.value))} /></div>
              <div><label className="text-sm">Shares</label>
                <Input type="number" value={shares} min={0} onChange={e => setShares(Number(e.target.value))} /></div>
              <Button className="w-full" onClick={calculate}>Calculate Performance</Button>
            </div>
            {score !== null && (
              <div>
                <div className="font-medium">Result:</div>
                <div className="mb-2">Performance: <span className="font-bold text-red-700">{score}%</span></div>
                <span className="font-medium">LaTeX Output:</span>
                <div className="bg-gray-50 rounded px-2 py-1 mt-1 text-xs text-gray-700">
                  {"$ S = \\frac{L + C + SH}{V} \\times 100 $"}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
