import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import ImpressionSEOSection from "./components/ImpressionSEOSection";

const Impression = () => {
  const [totalImpressions, setTotalImpressions] = useState("");
  const [followers, setFollowers] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showFormula, setShowFormula] = useState(false);

  const validate = () => {
    if (!totalImpressions || !followers) {
      setError("Both fields are required.");
      return false;
    }
    if (isNaN(Number(totalImpressions)) || isNaN(Number(followers))) {
      setError("Enter valid numbers for both fields.");
      return false;
    }
    if (Number(followers) <= 0) {
      setError("Followers must be greater than 0.");
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
    const imp = parseFloat(totalImpressions);
    const fols = parseFloat(followers);
    setResult((imp / fols) * 100);
    setShowFormula(true);
  };

  const handleReset = () => {
    setTotalImpressions("");
    setFollowers("");
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
              <CardTitle>Impression Calculator</CardTitle>
              <CardDescription>
                Calculate the impressions your content received as % of followers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
                <div className="relative group">
                  <Label htmlFor="totalImpressions" className="flex items-center gap-1">Total Impressions
                    <span className="relative">
                      <HelpCircle size={16} className="text-muted-foreground ml-1" />
                      <span className="hidden group-hover:block absolute left-5 top-0 whitespace-nowrap bg-muted text-xs rounded px-2 py-1 shadow z-10">
                        The total number of times your content was displayed.
                      </span>
                    </span>
                  </Label>
                  <Input
                    id="totalImpressions"
                    type="number"
                    min="0"
                    value={totalImpressions}
                    onChange={e => setTotalImpressions(e.target.value)}
                    placeholder="Total impressions"
                    aria-describedby="impressions-help"
                  />
                </div>
                <div className="relative group">
                  <Label htmlFor="followers" className="flex items-center gap-1">Followers
                    <span className="relative">
                      <HelpCircle size={16} className="text-muted-foreground ml-1" />
                      <span className="hidden group-hover:block absolute left-5 top-0 whitespace-nowrap bg-muted text-xs rounded px-2 py-1 shadow z-10">
                        The total number of followers you currently have.
                      </span>
                    </span>
                  </Label>
                  <Input
                    id="followers"
                    type="number"
                    min="1"
                    value={followers}
                    onChange={e => setFollowers(e.target.value)}
                    placeholder="Number of followers"
                    aria-describedby="followers-help"
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
                  Impression Rate: <span className="text-primary">{result.toFixed(2)}%</span>
                  {showFormula && (
                    <div className="text-sm mt-2 font-normal text-muted-foreground">
                      Formula: (Total Impressions ÷ Followers) × 100<br />
                      Calculation: ({totalImpressions} ÷ {followers}) × 100 = {result.toFixed(2)}%
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <ImpressionSEOSection />
      <Footer />
    </div>
  );
};

export default Impression;
