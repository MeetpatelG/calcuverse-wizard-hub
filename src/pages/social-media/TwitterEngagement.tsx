
import { Twitter } from "lucide-react";
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TwitterEngagement() {
  const [likes, setLikes] = useState<number>(45);
  const [retweets, setRetweets] = useState<number>(16);
  const [replies, setReplies] = useState<number>(7);
  const [followers, setFollowers] = useState<number>(500);
  const [engagement, setEngagement] = useState<number | null>(13.6);

  function calculate() {
    if (followers > 0) {
      setEngagement(Number((((likes + retweets + replies) / followers) * 100).toFixed(2)));
    }
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Twitter className="h-8 w-8 text-sky-400" />
              <CardTitle>Twitter Engagement Calculator</CardTitle>
            </div>
            <CardDescription>
              Assess tweet engagement from likes, retweets, and replies versus followers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 mb-4">
              <div><label className="text-sm">Likes</label>
                <Input type="number" value={likes} min={0} onChange={e => setLikes(Number(e.target.value))} /></div>
              <div><label className="text-sm">Retweets</label>
                <Input type="number" value={retweets} min={0} onChange={e => setRetweets(Number(e.target.value))} /></div>
              <div><label className="text-sm">Replies</label>
                <Input type="number" value={replies} min={0} onChange={e => setReplies(Number(e.target.value))} /></div>
              <div><label className="text-sm">Followers</label>
                <Input type="number" value={followers} min={1} onChange={e => setFollowers(Number(e.target.value))} /></div>
              <Button className="w-full" onClick={calculate}>Calculate Engagement</Button>
            </div>
            {engagement !== null && (
              <div>
                <div className="font-medium">Result:</div>
                <div className="mb-2">Engagement Rate: <span className="font-bold text-sky-700">{engagement}%</span></div>
                <span className="font-medium">LaTeX Output:</span>
                <div className="bg-gray-50 rounded px-2 py-1 mt-1 text-xs text-gray-700">
                  {"$ E = \\frac{L + RT + RP}{F} \\times 100 $"}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
