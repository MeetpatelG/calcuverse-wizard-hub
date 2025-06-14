
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

const EngagementRate = () => {
  const [likes, setLikes] = useState("");
  const [comments, setComments] = useState("");
  const [followers, setFollowers] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showFormula, setShowFormula] = useState(false);

  const validate = () => {
    if (!likes && !comments && !followers) {
      setError("All fields are required.");
      return false;
    }
    if (!followers) {
      setError("Followers field is required.");
      return false;
    }
    if (isNaN(Number(likes)) || isNaN(Number(comments)) || isNaN(Number(followers))) {
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

  const calculateEngagement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setResult(null);
      setShowFormula(false);
      return;
    }
    const l = parseFloat(likes) || 0;
    const c = parseFloat(comments) || 0;
    const f = parseFloat(followers);
    setResult(((l + c) / f) * 100);
    setShowFormula(true);
  };

  const handleReset = () => {
    setLikes("");
    setComments("");
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
              <CardTitle>Social Media Engagement Rate Calculator</CardTitle>
              <CardDescription>
                Find your engagement rate based on likes, comments, and followers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={calculateEngagement} className="space-y-4" autoComplete="off">
                <div className="relative group">
                  <Label htmlFor="likes" className="flex items-center gap-1">Likes
                    <span className="relative">
                      <HelpCircle size={16} className="text-muted-foreground ml-1"/>
                      <span className="hidden group-hover:block absolute left-5 top-0 whitespace-nowrap bg-muted text-xs rounded px-2 py-1 shadow z-10">
                        Number of likes on your post.
                      </span>
                    </span>
                  </Label>
                  <Input
                    id="likes"
                    type="number"
                    min="0"
                    value={likes}
                    onChange={e => setLikes(e.target.value)}
                    placeholder="Enter number of likes"
                  />
                </div>
                <div className="relative group">
                  <Label htmlFor="comments" className="flex items-center gap-1">Comments
                    <span className="relative">
                      <HelpCircle size={16} className="text-muted-foreground ml-1"/>
                      <span className="hidden group-hover:block absolute left-5 top-0 whitespace-nowrap bg-muted text-xs rounded px-2 py-1 shadow z-10">
                        Number of comments on your post.
                      </span>
                    </span>
                  </Label>
                  <Input
                    id="comments"
                    type="number"
                    min="0"
                    value={comments}
                    onChange={e => setComments(e.target.value)}
                    placeholder="Enter number of comments"
                  />
                </div>
                <div className="relative group">
                  <Label htmlFor="followers" className="flex items-center gap-1">Followers
                    <span className="relative">
                      <HelpCircle size={16} className="text-muted-foreground ml-1"/>
                      <span className="hidden group-hover:block absolute left-5 top-0 whitespace-nowrap bg-muted text-xs rounded px-2 py-1 shadow z-10">
                        Total number of followers you have.
                      </span>
                    </span>
                  </Label>
                  <Input
                    id="followers"
                    type="number"
                    min="1"
                    value={followers}
                    onChange={e => setFollowers(e.target.value)}
                    placeholder="Enter number of followers"
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
                      Formula: {(<> (Likes + Comments) ÷ Followers × 100 </>)}<br/>
                      Calculation: ({likes || 0} + {comments || 0}) ÷ {followers || 0} × 100 = {result.toFixed(2)}%
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

export default EngagementRate;
