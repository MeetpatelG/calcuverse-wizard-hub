import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import FollowerGrowthRateSEOSection from "./components/FollowerGrowthRateSEOSection";

const FollowerGrowthRate = () => {
  const [startFollowers, setStartFollowers] = useState("");
  const [endFollowers, setEndFollowers] = useState("");
  const [result, setResult] = useState<number|null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showFormula, setShowFormula] = useState(false);

  const validate = () => {
    if (!startFollowers || !endFollowers) {
      setError("Both fields are required.");
      return false;
    }
    if (isNaN(Number(startFollowers)) || isNaN(Number(endFollowers))) {
      setError("Enter valid numbers for both fields.");
      return false;
    }
    if (Number(startFollowers) <= 0) {
      setError("Starting followers must be greater than 0.");
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
    const start = parseFloat(startFollowers);
    const end = parseFloat(endFollowers);
    setResult(((end - start) / start) * 100);
    setShowFormula(true);
  };

  const handleReset = () => {
    setStartFollowers("");
    setEndFollowers("");
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
              <CardTitle>Follower Growth Rate Calculator</CardTitle>
              <CardDescription>
                Calculate your follower growth rate by entering starting and ending followers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
                <div className="relative group">
                  <Label htmlFor="startFollowers" className="flex items-center gap-1">Starting Followers
                    <span className="relative">
                      <HelpCircle size={16} className="text-muted-foreground ml-1"/>
                      <span className="hidden group-hover:block absolute left-5 top-0 whitespace-nowrap bg-muted text-xs rounded px-2 py-1 shadow z-10">
                        Your follower count at the beginning of the period.
                      </span>
                    </span>
                  </Label>
                  <Input
                    id="startFollowers"
                    type="number"
                    min="1"
                    value={startFollowers}
                    onChange={e => setStartFollowers(e.target.value)}
                    placeholder="Enter initial followers"
                  />
                </div>
                <div className="relative group">
                  <Label htmlFor="endFollowers" className="flex items-center gap-1">Ending Followers
                    <span className="relative">
                      <HelpCircle size={16} className="text-muted-foreground ml-1"/>
                      <span className="hidden group-hover:block absolute left-5 top-0 whitespace-nowrap bg-muted text-xs rounded px-2 py-1 shadow z-10">
                        Follower count at end of the period.
                      </span>
                    </span>
                  </Label>
                  <Input
                    id="endFollowers"
                    type="number"
                    min="0"
                    value={endFollowers}
                    onChange={e => setEndFollowers(e.target.value)}
                    placeholder="Enter followers after period"
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
                  Growth Rate: <span className="text-primary">{result.toFixed(2)}%</span>
                  {showFormula && (
                    <div className="text-sm mt-2 font-normal text-muted-foreground">
                      Formula: ((Ending Followers - Starting Followers) ÷ Starting Followers) × 100<br />
                      Calculation: ({endFollowers} - {startFollowers}) ÷ {startFollowers} × 100 = {result.toFixed(2)}%
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
      <FollowerGrowthRateSEOSection />
    </div>
  );
};

export default FollowerGrowthRate;
