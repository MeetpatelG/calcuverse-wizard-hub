
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Reach = () => {
  const [uniqueViewers, setUniqueViewers] = useState("");
  const [followers, setFollowers] = useState("");
  const [result, setResult] = useState<number|null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const viewers = parseFloat(uniqueViewers);
    const fols = parseFloat(followers);
    if (fols <= 0) return setResult(null);
    setResult((viewers / fols) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Reach Calculator</CardTitle>
              <CardDescription>
                Calculate the reach of your content: unique viewers as % of followers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="uniqueViewers">Unique Viewers</Label>
                  <Input
                    id="uniqueViewers"
                    type="number"
                    min="0"
                    value={uniqueViewers}
                    onChange={e => setUniqueViewers(e.target.value)}
                    placeholder="Enter unique viewers"
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
                  Reach: <span className="text-primary">{result.toFixed(2)}%</span>
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

export default Reach;
