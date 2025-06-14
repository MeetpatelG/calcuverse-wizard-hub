
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

const TwitterEngagement = () => {
  const [likes, setLikes] = useState("");
  const [replies, setReplies] = useState("");
  const [retweets, setRetweets] = useState("");
  const [followers, setFollowers] = useState("");
  const [result, setResult] = useState<number|null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showFormula, setShowFormula] = useState(false);

  const validate = () => {
    if (!likes || !replies || !retweets || !followers) {
      setError("All fields are required.");
      return false;
    }
    if (
      isNaN(Number(likes)) ||
      isNaN(Number(replies)) ||
      isNaN(Number(retweets)) ||
      isNaN(Number(followers))
    ) {
      setError("Enter valid numbers for all fields.");
      return false;
    }
    if (Number(followers) <= 0) {
      setError("Followers must be greater than 0.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setResult(null);
      setShowFormula(false);
      return;
    }
    const l = parseFloat(likes) || 0;
    const r = parseFloat(replies) || 0;
    const rt = parseFloat(retweets) || 0;
    const f = parseFloat(followers);
    setResult(((l + r + rt) / f) * 100);
    setShowFormula(true);
  };

  const handleReset = () => {
    setLikes("");
    setReplies("");
    setRetweets("");
    setFollowers("");
    setResult(null);
    setError(null);
    setShowFormula(false);
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
              <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
                <div className="relative group">
                  <Label htmlFor="likes" className="flex items-center gap-1">Likes
                    <span className="relative">
                      <HelpCircle size={16} className="text-muted-foreground ml-1"/>
                      <span className="hidden group-hover:block absolute left-5 top-0 whitespace-nowrap bg-muted text-xs rounded px-2 py-1 shadow z-10">
                        Number of likes on your tweet.
                      </span>
                    </span>
                  </Label>
                  <Input
                    id="likes"
                    type="number"
                    min="0"
                    value={likes}
                    onChange={e => setLikes(e.target.value)}
                    placeholder="Number of likes"
                  />
                </div>
                <div className="relative group">
                  <Label htmlFor="replies" className="flex items-center gap-1">Replies
                    <span className="relative">
                      <HelpCircle size={16} className="text-muted-foreground ml-1"/>
                      <span className="hidden group-hover:block absolute left-5 top-0 whitespace-nowrap bg-muted text-xs rounded px-2 py-1 shadow z-10">
                        Number of replies to your tweet.
                      </span>
                    </span>
                  </Label>
                  <Input
                    id="replies"
                    type="number"
                    min="0"
                    value={replies}
                    onChange={e => setReplies(e.target.value)}
                    placeholder="Number of replies"
                  />
                </div>
                <div className="relative group">
                  <Label htmlFor="retweets" className="flex items-center gap-1">Retweets
                    <span className="relative">
                      <HelpCircle size={16} className="text-muted-foreground ml-1"/>
                      <span className="hidden group-hover:block absolute left-5 top-0 whitespace-nowrap bg-muted text-xs rounded px-2 py-1 shadow z-10">
                        Number of retweets/shares for your tweet.
                      </span>
                    </span>
                  </Label>
                  <Input
                    id="retweets"
                    type="number"
                    min="0"
                    value={retweets}
                    onChange={e => setRetweets(e.target.value)}
                    placeholder="Number of retweets"
                  />
                </div>
                <div className="relative group">
                  <Label htmlFor="followers" className="flex items-center gap-1">Followers
                    <span className="relative">
                      <HelpCircle size={16} className="text-muted-foreground ml-1"/>
                      <span className="hidden group-hover:block absolute left-5 top-0 whitespace-nowrap bg-muted text-xs rounded px-2 py-1 shadow z-10">
                        Number of followers you have on Twitter/X.
                      </span>
                    </span>
                  </Label>
                  <Input
                    id="followers"
                    type="number"
                    min="1"
                    value={followers}
                    onChange={e => setFollowers(e.target.value)}
                    placeholder="Number of followers"
                  />
                </div>
                {error && (
                  <div className="text-destructive text-sm -mt-2">{error}</div>
                )}
                <div className="flex gap-2">
                  <Button type="submit" className="w-full mt-2">Calculate</Button>
                  <Button type="button" variant="outline" onClick={handleReset} className="w-full mt-2">Reset</Button>
                </div>
              </form>
              {result !== null && (
                <div className="mt-6 p-4 rounded bg-muted text-center font-semibold text-lg">
                  Engagement Rate: <span className="text-primary">{result.toFixed(2)}%</span>
                  {showFormula && (
                    <div className="text-sm mt-2 font-normal text-muted-foreground">
                      Formula: ((Likes + Replies + Retweets) ÷ Followers) × 100<br />
                      Calculation: ({likes || 0} + {replies || 0} + {retweets || 0}) ÷ {followers || 0} × 100 = {result.toFixed(2)}%
                    </div>
                  )}
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
