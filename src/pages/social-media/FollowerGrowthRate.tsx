
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const FollowerGrowthRate = () => {
  const [startFollowers, setStartFollowers] = useState("");
  const [endFollowers, setEndFollowers] = useState("");
  const [result, setResult] = useState<number|null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const start = parseFloat(startFollowers);
    const end = parseFloat(endFollowers);
    if (start <= 0) return setResult(null);
    setResult(((end - start) / start) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Follower Growth Rate Calculator</CardTitle>
              <CardDescription>
                Calculate your follower growth rate by entering starting and ending followers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="startFollowers">Starting Followers</Label>
                  <Input
                    id="startFollowers"
                    type="number"
                    min="0"
                    value={startFollowers}
                    onChange={e => setStartFollowers(e.target.value)}
                    placeholder="Enter initial followers"
                  />
                </div>
                <div>
                  <Label htmlFor="endFollowers">Ending Followers</Label>
                  <Input
                    id="endFollowers"
                    type="number"
                    min="0"
                    value={endFollowers}
                    onChange={e => setEndFollowers(e.target.value)}
                    placeholder="Enter followers after period"
                  />
                </div>
                <Button type="submit" className="w-full mt-2">Calculate</Button>
              </form>
              {result !== null && (
                <div className="mt-6 p-4 rounded bg-muted text-center font-semibold text-lg">
                  Growth Rate: <span className="text-primary">{result.toFixed(2)}%</span>
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

export default FollowerGrowthRate;
