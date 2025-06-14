
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { HelpCircle, Calculator } from "lucide-react";
import EngagementRateSEOSection from "./components/EngagementRateSEOSection";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 transition-colors duration-300">
      <Header />
      <div className="container mx-auto px-2 py-10">
        <div className="max-w-xl mx-auto">
          <div className="rounded-2xl shadow-xl border border-blue-100 bg-white/95 backdrop-blur-md p-0 sm:p-0 transition-all">
            {/* Card Decorative Header */}
            <div className="flex flex-col items-center gap-2 pt-8 pb-2">
              <span className="rounded-full bg-blue-100 p-3 shadow w-16 h-16 flex items-center justify-center animate-fade-in">
                <Calculator size={32} className="text-blue-700" aria-label="Calculator icon" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-800 tracking-tight pt-2 px-3 text-center">Social Media Engagement Rate Calculator</h1>
              <p className="text-base text-muted-foreground text-center max-w-md pb-2 px-3">
                Find your engagement rate based on likes, comments, and followers.
              </p>
            </div>
            <CardContent className="pt-0">
              <form onSubmit={calculateEngagement} className="space-y-4 mt-2" autoComplete="off">
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
                    className="mt-1 bg-blue-50 focus:bg-white transition-colors"
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
                    className="mt-1 bg-blue-50 focus:bg-white transition-colors"
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
                    className="mt-1 bg-blue-50 focus:bg-white transition-colors"
                  />
                </div>
                {error && (
                  <div className="text-destructive text-sm -mt-2">{error}</div>
                )}
                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <Button type="submit" className="w-full rounded-lg shadow hover:scale-105 transition-transform duration-150 mt-2">Calculate</Button>
                  <Button type="button" variant="outline" onClick={handleReset} className="w-full rounded-lg border-blue-200 mt-2">Reset</Button>
                </div>
              </form>
              {result !== null && (
                <div
                  className="mt-6 p-4 rounded-xl bg-gradient-to-tr from-blue-50 to-indigo-100/70 text-center font-semibold text-lg shadow animate-fade-in"
                  style={{ animationDuration: '400ms' }}
                >
                  Engagement Rate: <span className="text-primary">{result.toFixed(2)}%</span>
                  {showFormula && (
                    <div className="text-sm mt-2 font-normal text-muted-foreground">
                      Formula: (Likes + Comments) ÷ Followers × 100 <br/>
                      Calculation: ({likes || 0} + {comments || 0}) ÷ {followers || 0} × 100 = {result.toFixed(2)}%
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </div>
        </div>
        {/* SEO and educational guide content */}
        <div>
          <EngagementRateSEOSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EngagementRate;

