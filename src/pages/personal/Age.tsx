
import { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Age = () => {
  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [ageResult, setAgeResult] = useState({
    years: 0,
    months: 0,
    days: 0,
    totalDays: 0,
    totalWeeks: 0,
    totalMonths: 0
  });
  const [calculated, setCalculated] = useState(false);

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const target = targetDate ? new Date(targetDate) : new Date();

    if (birth > target) return;

    const years = target.getFullYear() - birth.getFullYear();
    const months = target.getMonth() - birth.getMonth();
    const days = target.getDate() - birth.getDate();

    let adjustedYears = years;
    let adjustedMonths = months;
    let adjustedDays = days;

    if (adjustedDays < 0) {
      adjustedMonths--;
      const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      adjustedDays += lastMonth.getDate();
    }

    if (adjustedMonths < 0) {
      adjustedYears--;
      adjustedMonths += 12;
    }

    const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = adjustedYears * 12 + adjustedMonths;

    setAgeResult({
      years: adjustedYears,
      months: adjustedMonths,
      days: adjustedDays,
      totalDays,
      totalWeeks,
      totalMonths
    });
    setCalculated(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <span>Home</span> / <span>Personal Calculators</span> / <span className="text-foreground">Age Calculator</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Calendar className="h-6 w-6 text-primary" />
                <CardTitle>Age Calculator</CardTitle>
              </div>
              <CardDescription>
                Calculate your exact age in years, months, days, and more.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="birthDate">Birth Date</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetDate">Calculate Age On (Optional)</Label>
                <Input
                  id="targetDate"
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="text-lg"
                />
                <p className="text-sm text-muted-foreground">Leave empty to calculate current age</p>
              </div>

              <Button onClick={calculateAge} className="w-full" disabled={!birthDate}>
                Calculate Age
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Age Results</CardTitle>
              <CardDescription>Your age in different units</CardDescription>
            </CardHeader>
            <CardContent>
              {calculated ? (
                <div className="space-y-4">
                  <div className="bg-primary/10 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary">
                      {ageResult.years} years, {ageResult.months} months, {ageResult.days} days
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted p-3 rounded">
                      <div className="text-xs text-muted-foreground">Total Days</div>
                      <div className="font-semibold">{ageResult.totalDays.toLocaleString()}</div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <div className="text-xs text-muted-foreground">Total Weeks</div>
                      <div className="font-semibold">{ageResult.totalWeeks.toLocaleString()}</div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <div className="text-xs text-muted-foreground">Total Months</div>
                      <div className="font-semibold">{ageResult.totalMonths}</div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <div className="text-xs text-muted-foreground">Total Hours</div>
                      <div className="font-semibold">{(ageResult.totalDays * 24).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter your birth date to calculate your age</p>
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

export default Age;
