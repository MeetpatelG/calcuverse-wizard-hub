
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";

const ShareRate = () => {
  const [shares, setShares] = useState("");
  const [views, setViews] = useState("");
  const [result, setResult] = useState<number|null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showFormula, setShowFormula] = useState(false);

  const validate = () => {
    if (!shares || !views) {
      setError("Both fields are required.");
      return false;
    }
    if (isNaN(Number(shares)) || isNaN(Number(views))) {
      setError("Enter valid numbers for both fields.");
      return false;
    }
    if (Number(views) <= 0) {
      setError("Views must be greater than 0.");
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
    const shareCount = parseFloat(shares);
    const viewsCount = parseFloat(views);
    setResult((shareCount / viewsCount) * 100);
    setShowFormula(true);
  };

  const handleReset = () => {
    setShares("");
    setViews("");
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
              <CardTitle>Share Rate Calculator</CardTitle>
              <CardDescription>
                Calculate how often your content is shared relative to its views.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
                <div className="relative group">
                  <Label htmlFor="shares" className="flex items-center gap-1">Number of Shares
                    <span className="relative">
                      <HelpCircle size={16} className="text-muted-foreground ml-1"/>
                      <span className="hidden group-hover:block absolute left-5 top-0 whitespace-nowrap bg-muted text-xs rounded px-2 py-1 shadow z-10">
                        Amount of times your post was shared.
                      </span>
                    </span>
                  </Label>
                  <Input
                    id="shares"
                    type="number"
                    min="0"
                    value={shares}
                    onChange={e => setShares(e.target.value)}
                    placeholder="Enter number of shares"
                  />
                </div>
                <div className="relative group">
                  <Label htmlFor="views" className="flex items-center gap-1">Number of Views
                    <span className="relative">
                      <HelpCircle size={16} className="text-muted-foreground ml-1"/>
                      <span className="hidden group-hover:block absolute left-5 top-0 whitespace-nowrap bg-muted text-xs rounded px-2 py-1 shadow z-10">
                        Number of views on your post or video.
                      </span>
                    </span>
                  </Label>
                  <Input
                    id="views"
                    type="number"
                    min="1"
                    value={views}
                    onChange={e => setViews(e.target.value)}
                    placeholder="Enter number of views"
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
                  Share Rate: <span className="text-primary">{result.toFixed(2)}%</span>
                  {showFormula && (
                    <div className="text-sm mt-2 font-normal text-muted-foreground">
                      Formula: (Shares ÷ Views) × 100<br/>
                      Calculation: ({shares} ÷ {views}) × 100 = {result.toFixed(2)}%
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

export default ShareRate;
