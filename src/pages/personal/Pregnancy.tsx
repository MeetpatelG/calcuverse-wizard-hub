
import { useState } from "react";
import { Calculator, Baby, Calendar, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PregnancyCalculatorArticle from "./PregnancyCalculatorArticle";

const Pregnancy = () => {
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [result, setResult] = useState<{
    dueDate: Date;
    currentWeek: number;
    currentDay: number;
    trimester: number;
    daysLeft: number;
    conceptionDate: Date;
  } | null>(null);

  const calculatePregnancy = () => {
    if (!lastPeriod) return;

    const lmpDate = new Date(lastPeriod);
    const today = new Date();
    
    // Calculate due date (280 days from LMP)
    const dueDate = new Date(lmpDate);
    dueDate.setDate(dueDate.getDate() + 280);
    
    // Calculate conception date (approximately 14 days after LMP)
    const conceptionDate = new Date(lmpDate);
    conceptionDate.setDate(conceptionDate.getDate() + 14);
    
    // Calculate current week and day
    const daysDifference = Math.floor((today.getTime() - lmpDate.getTime()) / (1000 * 60 * 60 * 24));
    const currentWeek = Math.floor(daysDifference / 7);
    const currentDay = daysDifference % 7;
    
    // Calculate trimester
    let trimester = 1;
    if (currentWeek >= 13) trimester = 2;
    if (currentWeek >= 27) trimester = 3;
    
    // Calculate days left
    const daysLeft = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    setResult({
      dueDate,
      currentWeek,
      currentDay,
      trimester,
      daysLeft,
      conceptionDate
    });
  };

  const resetCalculator = () => {
    setLastPeriod("");
    setCycleLength("28");
    setResult(null);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getTrimesterInfo = (trimester: number) => {
    const info = {
      1: { name: "First Trimester", weeks: "1-12", description: "Early development and organ formation" },
      2: { name: "Second Trimester", weeks: "13-26", description: "Growth and development continue" },
      3: { name: "Third Trimester", weeks: "27-40", description: "Final growth and preparation for birth" }
    };
    return info[trimester as keyof typeof info];
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-white via-rose-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Baby className="h-16 w-16 text-primary mx-auto mb-4" />
            {/* Featured image for visual appeal */}
            <div className="flex justify-center mb-5">
              <img
                src="/photo-1649972904349-6e44c42644a7"
                alt="Woman sitting on a bed using a laptop"
                className="rounded-2xl shadow-lg border border-pink-50 max-w-full w-[340px] md:w-[400px] h-auto"
                width="400"
                height="256"
                loading="lazy"
              />
            </div>
            <h1 className="text-4xl font-bold mb-4">Pregnancy Calculator</h1>
            <p className="text-xl text-muted-foreground">
              Calculate your due date and track your pregnancy progress
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Pregnancy Information
                </CardTitle>
                <CardDescription>
                  Enter your last menstrual period date
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="last-period">Last Menstrual Period (LMP)</Label>
                  <Input
                    id="last-period"
                    type="date"
                    value={lastPeriod}
                    onChange={(e) => setLastPeriod(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                  />
                  <p className="text-sm text-muted-foreground">
                    First day of your last menstrual period
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cycle-length">Average Cycle Length (days)</Label>
                  <Input
                    id="cycle-length"
                    type="number"
                    placeholder="28"
                    value={cycleLength}
                    onChange={(e) => setCycleLength(e.target.value)}
                    min="21"
                    max="35"
                  />
                  <p className="text-sm text-muted-foreground">
                    Typical range: 21-35 days (average is 28 days)
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button onClick={calculatePregnancy} className="flex-1" disabled={!lastPeriod}>
                    Calculate Due Date
                  </Button>
                  <Button onClick={resetCalculator} variant="outline">
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {result && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Your Pregnancy Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Soft decorative image above results */}
                  <div className="flex justify-center mb-2">
                    <img
                      src="/photo-1581091226825-a6a2a5aee158"
                      alt="Pregnancy planning visual"
                      className="rounded-xl border border-pink-100 shadow-md w-[220px] h-auto"
                      width="220"
                      height="140"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-center p-6 bg-pink-50 dark:bg-pink-900/20 rounded-lg border-2 border-pink-200 dark:border-pink-700">
                    <p className="text-sm text-muted-foreground mb-2">Estimated Due Date</p>
                    <p className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                      {formatDate(result.dueDate)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Current Week</p>
                      <p className="text-xl font-bold">{result.currentWeek}</p>
                      <p className="text-xs text-muted-foreground">weeks + {result.currentDay} days</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Trimester</p>
                      <p className="text-xl font-bold">{result.trimester}</p>
                      <p className="text-xs text-muted-foreground">{getTrimesterInfo(result.trimester)?.name}</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Days Until Due Date</p>
                      <p className="text-xl font-bold">{result.daysLeft > 0 ? result.daysLeft : 'Past due'}</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Conception Date</p>
                      <p className="text-sm font-medium">{formatDate(result.conceptionDate)}</p>
                      <p className="text-xs text-muted-foreground">Estimated</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                      {getTrimesterInfo(result.trimester)?.name} ({getTrimesterInfo(result.trimester)?.weeks} weeks)
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      {getTrimesterInfo(result.trimester)?.description}
                    </p>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>Important:</strong> This is an estimate based on your last menstrual period. 
                      Only an ultrasound can provide a more accurate due date. Always consult your healthcare provider.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          <div>
            <PregnancyCalculatorArticle />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pregnancy;

