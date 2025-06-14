
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const EngagementRate = () => {
  const [likes, setLikes] = useState("");
  const [comments, setComments] = useState("");
  const [followers, setFollowers] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculateEngagement = (e: React.FormEvent) => {
    e.preventDefault();
    const l = parseFloat(likes) || 0;
    const c = parseFloat(comments) || 0;
    const f = parseFloat(followers) || 0;
    if (f === 0) {
      setResult(null);
      return;
    }
    setResult(((l + c) / f) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-10">
        <div className="max-w-xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Engagement Rate Calculator</CardTitle>
              <CardDescription>
                Find your engagement rate based on likes, comments, and followers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={calculateEngagement} className="space-y-4">
                <div>
                  <Label htmlFor="likes">Likes</Label>
                  <Input
                    id="likes"
                    type="number"
                    min="0"
                    value={likes}
                    onChange={e => setLikes(e.target.value)}
                    placeholder="Enter number of likes"
                  />
                </div>
                <div>
                  <Label htmlFor="comments">Comments</Label>
                  <Input
                    id="comments"
                    type="number"
                    min="0"
                    value={comments}
                    onChange={e => setComments(e.target.value)}
                    placeholder="Enter number of comments"
                  />
                </div>
                <div>
                  <Label htmlFor="followers">Followers</Label>
                  <Input
                    id="followers"
                    type="number"
                    min="1"
                    value={followers}
                    onChange={e => setFollowers(e.target.value)}
                    placeholder="Enter number of followers"
                  />
                </div>
                <Button type="submit" className="w-full mt-2">Calculate</Button>
              </form>
              {result !== null && (
                <div className="mt-6 p-4 rounded bg-muted text-center font-semibold text-lg">
                  Engagement Rate: <span className="text-primary">{result.toFixed(2)}%</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EngagementRate;
