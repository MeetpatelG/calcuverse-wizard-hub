
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

const LinkedinPostEngagement = () => {
  const [likes, setLikes] = useState("");
  const [comments, setComments] = useState("");
  const [shares, setShares] = useState("");
  const [reach, setReach] = useState("");
  const [result, setResult] = useState<number|null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showFormula, setShowFormula] = useState(false);

  const validate = () => {
    if (!likes || !comments || !shares || !reach) {
      setError("All fields are required.");
      return false;
    }
    if (
      isNaN(Number(likes)) ||
      isNaN(Number(comments)) ||
      isNaN(Number(shares)) ||
      isNaN(Number(reach))
    ) {
      setError("Enter valid numbers for all fields.");
      return false;
    }
    if (Number(reach) <= 0) {
      setError("Reach must be greater than 0.");
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
    const c = parseFloat(comments) || 0;
    const s = parseFloat(shares) || 0;
    const r = parseFloat(reach);
    setResult(((l + c + s) / r) * 100);
    setShowFormula(true);
  };

  const handleReset = () => {
    setLikes("");
    setComments("");
    setShares("");
    setReach("");
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
              <CardTitle>LinkedIn Post Engagement Calculator</CardTitle>
              <CardDescription>
                Calculate engagement rate for LinkedIn posts based on reach.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
                <div className="relative group">
                  <Label htmlFor="likes" className="flex items-center gap-1">Likes
                    <span className="relative">
                      <HelpCircle size={16} className="text-muted-foreground ml-1"/>
                      <span className="hidden group-hover:block absolute left-5 top-0 whitespace-nowrap bg-muted text-xs rounded px-2 py-1 shadow z-10">
                        Number of likes on your LinkedIn post.
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
                  <Label htmlFor="comments" className="flex items-center gap-1">Comments
                    <span className="relative">
                      <HelpCircle size={16} className="text-muted-foreground ml-1"/>
                      <span className="hidden group-hover:block absolute left-5 top-0 whitespace-nowrap bg-muted text-xs rounded px-2 py-1 shadow z-10">
                        Number of comments on your LinkedIn post.
                      </span>
                    </span>
                  </Label>
                  <Input
                    id="comments"
                    type="number"
                    min="0"
                    value={comments}
                    onChange={e => setComments(e.target.value)}
                    placeholder="Number of comments"
                  />
                </div>
                <div className="relative group">
                  <Label htmlFor="shares" className="flex items-center gap-1">Shares
                    <span className="relative">
                      <HelpCircle size={16} className="text-muted-foreground ml-1"/>
                      <span className="hidden group-hover:block absolute left-5 top-0 whitespace-nowrap bg-muted text-xs rounded px-2 py-1 shadow z-10">
                        Number of times your LinkedIn post was shared.
                      </span>
                    </span>
                  </Label>
                  <Input
                    id="shares"
                    type="number"
                    min="0"
                    value={shares}
                    onChange={e => setShares(e.target.value)}
                    placeholder="Number of shares"
                  />
                </div>
                <div className="relative group">
                  <Label htmlFor="reach" className="flex items-center gap-1">Reach
                    <span className="relative">
                      <HelpCircle size={16} className="text-muted-foreground ml-1"/>
                      <span className="hidden group-hover:block absolute left-5 top-0 whitespace-nowrap bg-muted text-xs rounded px-2 py-1 shadow z-10">
                        Total number of people who saw your post (reach).
                      </span>
                    </span>
                  </Label>
                  <Input
                    id="reach"
                    type="number"
                    min="1"
                    value={reach}
                    onChange={e => setReach(e.target.value)}
                    placeholder="Post reach"
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
                      Formula: ((Likes + Comments + Shares) ÷ Reach) × 100<br />
                      Calculation: ({likes || 0} + {comments || 0} + {shares || 0}) ÷ {reach || 0} × 100 = {result.toFixed(2)}%
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

export default LinkedinPostEngagement;
