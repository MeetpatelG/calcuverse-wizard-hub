
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ShareRate = () => {
  const [shares, setShares] = useState("");
  const [views, setViews] = useState("");
  const [result, setResult] = useState<number|null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const shareCount = parseFloat(shares);
    const viewsCount = parseFloat(views);
    if (viewsCount <= 0) return setResult(null);
    setResult((shareCount / viewsCount) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Share Rate Calculator</CardTitle>
              <CardDescription>
                Calculate how often your content is shared relative to its views.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <Label htmlFor="shares">Number of Shares</Label>
                  <Input
                    id="shares"
                    type="number"
                    min="0"
                    value={shares}
                    onChange={e => setShares(e.target.value)}
                    placeholder="Enter number of shares"
                  />
                </div>
                <div>
                  <Label htmlFor="views">Number of Views</Label>
                  <Input
                    id="views"
                    type="number"
                    min="1"
                    value={views}
                    onChange={e => setViews(e.target.value)}
                    placeholder="Enter number of views"
                  />
                </div>
                <Button type="submit" className="w-full mt-2">Calculate</Button>
              </form>
              {result !== null && (
                <div className="mt-6 p-4 rounded bg-muted text-center font-semibold text-lg">
                  Share Rate: <span className="text-primary">{result.toFixed(2)}%</span>
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

export default ShareRate;
