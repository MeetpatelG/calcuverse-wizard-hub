
import { Linkedin } from "lucide-react";
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LinkedinPostEngagement() {
  const [likes, setLikes] = useState<number>(67);
  const [comments, setComments] = useState<number>(15);
  const [shares, setShares] = useState<number>(6);
  const [reach, setReach] = useState<number>(3000);
  const [engagement, setEngagement] = useState<number | null>(2.93);

  function calculate() {
    if (reach > 0) {
      setEngagement(Number((((likes + comments + shares) / reach) * 100).toFixed(2)));
    }
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Linkedin className="h-8 w-8 text-blue-800" />
              <CardTitle>LinkedIn Post Engagement Calculator</CardTitle>
            </div>
            <CardDescription>
              Evaluate the engagement level of your LinkedIn posts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 mb-4">
              <div><label className="text-sm">Likes</label>
                <Input type="number" value={likes} min={0} onChange={e => setLikes(Number(e.target.value))} /></div>
              <div><label className="text-sm">Comments</label>
                <Input type="number" value={comments} min={0} onChange={e => setComments(Number(e.target.value))} /></div>
              <div><label className="text-sm">Shares</label>
                <Input type="number" value={shares} min={0} onChange={e => setShares(Number(e.target.value))} /></div>
              <div><label className="text-sm">Reach</label>
                <Input type="number" value={reach} min={1} onChange={e => setReach(Number(e.target.value))} /></div>
              <Button className="w-full" onClick={calculate}>Calculate Engagement</Button>
            </div>
            {engagement !== null && (
              <div>
                <div className="font-medium">Result:</div>
                <div className="mb-2">Engagement Rate: <span className="font-bold text-blue-900">{engagement}%</span></div>
                <span className="font-medium">LaTeX Output:</span>
                <div className="bg-gray-50 rounded px-2 py-1 mt-1 text-xs text-gray-700">
                  {"$ E = \\frac{L + C + S}{R} \\times 100 $"}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
