
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const TwitterEngagement = () => {
  const [likes, setLikes] = useState("");
  const [replies, setReplies] = useState("");
  const [retweets, setRetweets] = useState("");
  const [followers, setFollowers] = useState("");
  const [result, setResult] = useState<number|null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const l = parseFloat(likes) || 0;
    const r = parseFloat(replies) || 0;
    const rt = parseFloat(retweets) || 0;
    const f = parseFloat(followers);
    if (f <= 0) return setResult(null);
    setResult(((l + r + rt) / f) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Twitter Engagement Calculator</CardTitle>
              <CardDescription>
                Calculate engagement rate on Twitter (likes, replies, retweets vs followers).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="likes">Likes</Label>
                  <Input
                    id="likes"
                    type="number"
                    min="0"
                    value={likes}
                    onChange={e => setLikes(e.target.value)}
                    placeholder="Number of likes"
                  />
                </div>
                <div>
                  <Label htmlFor="replies">Replies</Label>
                  <Input
                    id="replies"
                    type="number"
                    min="0"
                    value={replies}
                    onChange={e => setReplies(e.target.value)}
                    placeholder="Number of replies"
                  />
                </div>
                <div>
                  <Label htmlFor="retweets">Retweets</Label>
                  <Input
                    id="retweets"
                    type="number"
                    min="0"
                    value={retweets}
                    onChange={e => setRetweets(e.target.value)}
                    placeholder="Number of retweets"
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
                    placeholder="Number of followers"
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

export default TwitterEngagement;
