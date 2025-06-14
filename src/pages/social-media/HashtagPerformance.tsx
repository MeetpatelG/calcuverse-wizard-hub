
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const HashtagPerformance = () => {
  const [postsWithHashtag, setPostsWithHashtag] = useState("");
  const [engagementWith, setEngagementWith] = useState("");
  const [postsWithoutHashtag, setPostsWithoutHashtag] = useState("");
  const [engagementWithout, setEngagementWithout] = useState("");
  const [result, setResult] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numWith = parseFloat(postsWithHashtag);
    const engWith = parseFloat(engagementWith);
    const numWithout = parseFloat(postsWithoutHashtag);
    const engWithout = parseFloat(engagementWithout);
    if (numWith <= 0 || numWithout <= 0) {
      setResult("");
      return;
    }
    const avgWith = engWith / numWith;
    const avgWithout = engWithout / numWithout;
    if (avgWithout === 0) {
      setResult("");
      return;
    }
    const improvement = ((avgWith - avgWithout) / avgWithout) * 100;
    setResult(`Performance improvement with hashtag: ${improvement.toFixed(2)}%`);
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
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="postsWithHashtag">Posts With Hashtag</Label>
                  <Input
                    id="postsWithHashtag"
                    type="number"
                    min="0"
                    value={postsWithHashtag}
                    onChange={e => setPostsWithHashtag(e.target.value)}
                    placeholder="Number of posts with hashtag"
                  />
                </div>
                <div>
                  <Label htmlFor="engagementWith">Total Engagement (w/ hashtag)</Label>
                  <Input
                    id="engagementWith"
                    type="number"
                    min="0"
                    value={engagementWith}
                    onChange={e => setEngagementWith(e.target.value)}
                    placeholder="Engagement with hashtag"
                  />
                </div>
                <div>
                  <Label htmlFor="postsWithoutHashtag">Posts Without Hashtag</Label>
                  <Input
                    id="postsWithoutHashtag"
                    type="number"
                    min="0"
                    value={postsWithoutHashtag}
                    onChange={e => setPostsWithoutHashtag(e.target.value)}
                    placeholder="Number of posts without hashtag"
                  />
                </div>
                <div>
                  <Label htmlFor="engagementWithout">Total Engagement (no hashtag)</Label>
                  <Input
                    id="engagementWithout"
                    type="number"
                    min="0"
                    value={engagementWithout}
                    onChange={e => setEngagementWithout(e.target.value)}
                    placeholder="Engagement without hashtag"
                  />
                </div>
                <Button type="submit" className="w-full mt-2">Calculate</Button>
              </form>
              {result && (
                <div className="mt-6 p-4 rounded bg-muted text-center font-semibold text-lg">
                  {result}
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

export default HashtagPerformance;
