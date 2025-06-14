import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import HashtagPerformanceSEOSection from "./components/HashtagPerformanceSEOSection";

const HashtagPerformance = () => {
  const [postsWithHashtag, setPostsWithHashtag] = useState("");
  const [engagementWith, setEngagementWith] = useState("");
  const [postsWithoutHashtag, setPostsWithoutHashtag] = useState("");
  const [engagementWithout, setEngagementWithout] = useState("");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showFormula, setShowFormula] = useState(false);

  const validate = () => {
    if (!postsWithHashtag || !engagementWith || !postsWithoutHashtag || !engagementWithout) {
      setError("All fields are required.");
      return false;
    }
    if (
      isNaN(Number(postsWithHashtag)) ||
      isNaN(Number(engagementWith)) ||
      isNaN(Number(postsWithoutHashtag)) ||
      isNaN(Number(engagementWithout))
    ) {
      setError("Enter valid numbers for all fields.");
      return false;
    }
    if (Number(postsWithHashtag) <= 0 || Number(postsWithoutHashtag) <= 0) {
      setError("Post counts must be greater than 0.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setResult("");
      setShowFormula(false);
      return;
    }
    const numWith = parseFloat(postsWithHashtag);
    const engWith = parseFloat(engagementWith);
    const numWithout = parseFloat(postsWithoutHashtag);
    const engWithout = parseFloat(engagementWithout);
    const avgWith = engWith / numWith;
    const avgWithout = engWithout / numWithout;
    if (avgWithout === 0) {
      setResult("");
      setError("Engagement without hashtag cannot be zero.");
      setShowFormula(false);
      return;
    }
    const improvement = ((avgWith - avgWithout) / avgWithout) * 100;
    setResult(`Performance improvement with hashtag: ${improvement.toFixed(2)}%`);
    setShowFormula(true);
  };

  const handleReset = () => {
    setPostsWithHashtag("");
    setEngagementWith("");
    setPostsWithoutHashtag("");
    setEngagementWithout("");
    setResult("");
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
              <CardTitle>Hashtag Performance Calculator</CardTitle>
              <CardDescription>
                Calculate the improvement in engagement when using a hashtag.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
                <div className="relative group">
                  <Label htmlFor="postsWithHashtag" className="flex items-center gap-1">Posts With Hashtag
                    <span className="relative">
                      <HelpCircle size={16} className="text-muted-foreground ml-1"/>
                      <span className="hidden group-hover:block absolute left-5 top-0 whitespace-nowrap bg-muted text-xs rounded px-2 py-1 shadow z-10">
                        Number of posts that included the hashtag.
                      </span>
                    </span>
                  </Label>
                  <Input
                    id="postsWithHashtag"
                    type="number"
                    min="1"
                    value={postsWithHashtag}
                    onChange={e => setPostsWithHashtag(e.target.value)}
                    placeholder="Number of posts with hashtag"
                  />
                </div>
                <div className="relative group">
                  <Label htmlFor="engagementWith" className="flex items-center gap-1">Total Engagement (w/ hashtag)
                    <span className="relative">
                      <HelpCircle size={16} className="text-muted-foreground ml-1"/>
                      <span className="hidden group-hover:block absolute left-5 top-0 whitespace-nowrap bg-muted text-xs rounded px-2 py-1 shadow z-10">
                        Total sum of likes, comments, etc. for posts with hashtag.
                      </span>
                    </span>
                  </Label>
                  <Input
                    id="engagementWith"
                    type="number"
                    min="0"
                    value={engagementWith}
                    onChange={e => setEngagementWith(e.target.value)}
                    placeholder="Engagement with hashtag"
                  />
                </div>
                <div className="relative group">
                  <Label htmlFor="postsWithoutHashtag" className="flex items-center gap-1">Posts Without Hashtag
                    <span className="relative">
                      <HelpCircle size={16} className="text-muted-foreground ml-1"/>
                      <span className="hidden group-hover:block absolute left-5 top-0 whitespace-nowrap bg-muted text-xs rounded px-2 py-1 shadow z-10">
                        Number of posts that did not include the hashtag.
                      </span>
                    </span>
                  </Label>
                  <Input
                    id="postsWithoutHashtag"
                    type="number"
                    min="1"
                    value={postsWithoutHashtag}
                    onChange={e => setPostsWithoutHashtag(e.target.value)}
                    placeholder="Number of posts without hashtag"
                  />
                </div>
                <div className="relative group">
                  <Label htmlFor="engagementWithout" className="flex items-center gap-1">Total Engagement (no hashtag)
                    <span className="relative">
                      <HelpCircle size={16} className="text-muted-foreground ml-1"/>
                      <span className="hidden group-hover:block absolute left-5 top-0 whitespace-nowrap bg-muted text-xs rounded px-2 py-1 shadow z-10">
                        Total sum of likes, comments, etc. for posts without hashtag.
                      </span>
                    </span>
                  </Label>
                  <Input
                    id="engagementWithout"
                    type="number"
                    min="0"
                    value={engagementWithout}
                    onChange={e => setEngagementWithout(e.target.value)}
                    placeholder="Engagement without hashtag"
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
              {result && (
                <div className="mt-6 p-4 rounded bg-muted text-center font-semibold text-lg">
                  {result}
                  {showFormula && (
                    <div className="text-sm mt-2 font-normal text-muted-foreground">
                      Formula: ((Avg. Engagement With Hashtag − Avg. Engagement Without Hashtag) ÷ Avg. Engagement Without Hashtag) × 100<br />
                      Calculation: (({engagementWith}/{postsWithHashtag}) − ({engagementWithout}/{postsWithoutHashtag})) ÷ ({engagementWithout}/{postsWithoutHashtag}) × 100
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
      <HashtagPerformanceSEOSection />
    </div>
  );
};

export default HashtagPerformance;
