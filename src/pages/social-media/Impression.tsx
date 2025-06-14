
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Impression = () => {
  const [totalImpressions, setTotalImpressions] = useState("");
  const [followers, setFollowers] = useState("");
  const [result, setResult] = useState<number|null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const imp = parseFloat(totalImpressions);
    const fols = parseFloat(followers);
    if (fols <= 0) return setResult(null);
    setResult((imp / fols) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Impression Calculator</CardTitle>
              <CardDescription>
                Calculate the impressions your content received as % of followers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="totalImpressions">Total Impressions</Label>
                  <Input
                    id="totalImpressions"
                    type="number"
                    min="0"
                    value={totalImpressions}
                    onChange={e => setTotalImpressions(e.target.value)}
                    placeholder="Total impressions"
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
                  Impression Rate: <span className="text-primary">{result.toFixed(2)}%</span>
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

export default Impression;
