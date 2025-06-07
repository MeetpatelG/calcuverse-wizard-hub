
import { useState } from "react";
import { Calculator, Baby, Calendar, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Baby className="h-16 w-16 text-primary mx-auto mb-4" />
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

          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Baby className="h-5 w-5" />
                  Pregnancy Information & FAQs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How accurate is the due date calculation?</AccordionTrigger>
                    <AccordionContent>
                      Due date calculations based on LMP are estimates. Only about 5% of babies are born on their exact due date. 
                      Most babies are born within 2 weeks before or after the estimated due date. An early ultrasound 
                      (before 20 weeks) can provide a more accurate due date.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What are the three trimesters?</AccordionTrigger>
                    <AccordionContent>
                      <strong>First Trimester (1-12 weeks):</strong> Major organ development, morning sickness common.<br/>
                      <strong>Second Trimester (13-26 weeks):</strong> Often called the "golden period," energy returns, baby's movement felt.<br/>
                      <strong>Third Trimester (27-40 weeks):</strong> Rapid growth, preparation for birth, increased discomfort.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>When should I see a doctor?</AccordionTrigger>
                    <AccordionContent>
                      Schedule your first prenatal appointment as soon as you know you're pregnant, ideally by 8-10 weeks. 
                      If you have irregular periods, chronic conditions, or are over 35, consider seeing a doctor earlier. 
                      Regular prenatal care is essential for a healthy pregnancy.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>What if I don't remember my last period?</AccordionTrigger>
                    <AccordionContent>
                      If you can't remember your last menstrual period, your doctor can estimate your due date using 
                      an early ultrasound (most accurate between 8-13 weeks). Other methods include physical examination 
                      and asking about when you first felt the baby move (quickening).
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pregnancy;
