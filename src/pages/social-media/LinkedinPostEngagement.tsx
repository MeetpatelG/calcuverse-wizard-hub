
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const LinkedinPostEngagement = () => {
  const [likes, setLikes] = useState("");
  const [comments, setComments] = useState("");
  const [shares, setShares] = useState("");
  const [reach, setReach] = useState("");
  const [result, setResult] = useState<number|null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const l = parseFloat(likes) || 0;
    const c = parseFloat(comments) || 0;
    const s = parseFloat(shares) || 0;
    const r = parseFloat(reach);
    if (r <= 0) return setResult(null);
    setResult(((l + c + s) / r) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>LinkedIn Post Engagement Calculator</CardTitle>
              <CardDescription>
                Calculate engagement rate for LinkedIn posts based on reach.
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
                  <Label htmlFor="comments">Comments</Label>
                  <Input
                    id="comments"
                    type="number"
                    min="0"
                    value={comments}
                    onChange={e => setComments(e.target.value)}
                    placeholder="Number of comments"
                  />
                </div>
                <div>
                  <Label htmlFor="shares">Shares</Label>
                  <Input
                    id="shares"
                    type="number"
                    min="0"
                    value={shares}
                    onChange={e => setShares(e.target.value)}
                    placeholder="Number of shares"
                  />
                </div>
                <div>
                  <Label htmlFor="reach">Reach</Label>
                  <Input
                    id="reach"
                    type="number"
                    min="1"
                    value={reach}
                    onChange={e => setReach(e.target.value)}
                    placeholder="Post reach"
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

export default LinkedinPostEngagement;
