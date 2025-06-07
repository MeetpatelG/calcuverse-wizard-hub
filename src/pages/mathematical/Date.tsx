
import { useState } from "react";
import { Calculator, Calendar, Clock, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const DateCalculator = () => {
  // Date difference calculation
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [diffResult, setDiffResult] = useState<{
    days: number;
    weeks: number;
    months: number;
    years: number;
    totalDays: number;
  } | null>(null);

  // Add/subtract days calculation
  const [baseDate, setBaseDate] = useState("");
  const [operation, setOperation] = useState("add");
  const [daysToAddSub, setDaysToAddSub] = useState("");
  const [addSubResult, setAddSubResult] = useState<Date | null>(null);

  // Age calculation
  const [birthDate, setBirthDate] = useState("");
  const [ageResult, setAgeResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
  } | null>(null);

  const calculateDifference = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const years = Math.floor(totalDays / 365.25);
    const months = Math.floor(totalDays / 30.44);
    const weeks = Math.floor(totalDays / 7);
    const days = totalDays;

    setDiffResult({
      days: totalDays % 7,
      weeks,
      months,
      years,
      totalDays
    });
  };

  const calculateAddSubtract = () => {
    if (!baseDate || !daysToAddSub) return;

    const base = new Date(baseDate);
    const daysNum = parseInt(daysToAddSub);
    
    const result = new Date(base);
    if (operation === "add") {
      result.setDate(result.getDate() + daysNum);
    } else {
      result.setDate(result.getDate() - daysNum);
    }
    
    setAddSubResult(result);
  };

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();
    
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));

    setAgeResult({
      years,
      months,
      days,
      totalDays
    });
  };

  const resetAll = () => {
    setStartDate("");
    setEndDate("");
    setBaseDate("");
    setBirthDate("");
    setDaysToAddSub("");
    setDiffResult(null);
    setAddSubResult(null);
    setAgeResult(null);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Calendar className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Date Calculator</h1>
            <p className="text-xl text-muted-foreground">
              Calculate date differences, add/subtract days, and determine ages
            </p>
          </div>

          <Tabs defaultValue="difference" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="difference">Date Difference</TabsTrigger>
              <TabsTrigger value="addsub">Add/Subtract Days</TabsTrigger>
              <TabsTrigger value="age">Age Calculator</TabsTrigger>
            </TabsList>

            <TabsContent value="difference" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      Calculate Date Difference
                    </CardTitle>
                    <CardDescription>
                      Find the difference between two dates
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="end-date">End Date</Label>
                      <Input
                        id="end-date"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>

                    <Button onClick={calculateDifference} className="w-full">
                      Calculate Difference
                    </Button>

                    {diffResult && (
                      <div className="space-y-4">
                        <div className="text-center p-6 bg-primary/10 rounded-lg border-2 border-primary/20">
                          <p className="text-sm text-muted-foreground mb-2">Total Days</p>
                          <p className="text-4xl font-bold text-primary">{diffResult.totalDays}</p>
                          <p className="text-sm text-muted-foreground mt-2">days between dates</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">Years</p>
                            <p className="text-xl font-bold">{diffResult.years}</p>
                          </div>
                          <div className="text-center p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">Months</p>
                            <p className="text-xl font-bold">{diffResult.months}</p>
                          </div>
                          <div className="text-center p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">Weeks</p>
                            <p className="text-xl font-bold">{diffResult.weeks}</p>
                          </div>
                          <div className="text-center p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">Days</p>
                            <p className="text-xl font-bold">{diffResult.totalDays}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Examples</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="font-medium">Project Duration</p>
                        <p className="text-sm text-muted-foreground">Calculate how long a project lasted</p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="font-medium">Vacation Planning</p>
                        <p className="text-sm text-muted-foreground">Find days until your vacation</p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="font-medium">Anniversary</p>
                        <p className="text-sm text-muted-foreground">Calculate years since an important date</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="addsub" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Add or Subtract Days
                    </CardTitle>
                    <CardDescription>
                      Calculate a future or past date by adding or subtracting days
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="base-date">Base Date</Label>
                      <Input
                        id="base-date"
                        type="date"
                        value={baseDate}
                        onChange={(e) => setBaseDate(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="operation">Operation</Label>
                      <Select value={operation} onValueChange={setOperation}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="add">Add Days</SelectItem>
                          <SelectItem value="subtract">Subtract Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="days-count">Number of Days</Label>
                      <Input
                        id="days-count"
                        type="number"
                        placeholder="30"
                        value={daysToAddSub}
                        onChange={(e) => setDaysToAddSub(e.target.value)}
                      />
                    </div>

                    <Button onClick={calculateAddSubtract} className="w-full">
                      Calculate Date
                    </Button>

                    {addSubResult && (
                      <div className="text-center p-6 bg-primary/10 rounded-lg border-2 border-primary/20">
                        <p className="text-sm text-muted-foreground mb-2">Result Date</p>
                        <p className="text-lg font-bold text-primary">{formatDate(addSubResult)}</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          {operation === 'add' ? 'Adding' : 'Subtracting'} {daysToAddSub} days
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Common Use Cases</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="font-medium">Due Dates</p>
                        <p className="text-sm text-muted-foreground">Calculate when something is due</p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="font-medium">Business Days</p>
                        <p className="text-sm text-muted-foreground">Find delivery or completion dates</p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="font-medium">Event Planning</p>
                        <p className="text-sm text-muted-foreground">Plan events X days from now</p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="font-medium">Deadlines</p>
                        <p className="text-sm text-muted-foreground">Calculate project milestones</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="age" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Age Calculator
                    </CardTitle>
                    <CardDescription>
                      Calculate exact age in years, months, and days
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="birth-date">Birth Date</Label>
                      <Input
                        id="birth-date"
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <Button onClick={calculateAge} className="w-full">
                      Calculate Age
                    </Button>

                    {ageResult && (
                      <div className="space-y-4">
                        <div className="text-center p-6 bg-primary/10 rounded-lg border-2 border-primary/20">
                          <p className="text-sm text-muted-foreground mb-2">Your Age</p>
                          <p className="text-2xl font-bold text-primary">
                            {ageResult.years} years, {ageResult.months} months, {ageResult.days} days
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">Total Years</p>
                            <p className="text-xl font-bold">{ageResult.years}</p>
                          </div>
                          <div className="text-center p-4 bg-muted rounded-lg">
                            <p className="text-sm text-muted-foreground">Total Days</p>
                            <p className="text-xl font-bold">{ageResult.totalDays.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Fun Age Facts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {ageResult && (
                      <div className="space-y-3">
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="font-medium">Hours Lived</p>
                          <p className="text-sm text-muted-foreground">
                            {(ageResult.totalDays * 24).toLocaleString()} hours
                          </p>
                        </div>
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="font-medium">Minutes Lived</p>
                          <p className="text-sm text-muted-foreground">
                            {(ageResult.totalDays * 24 * 60).toLocaleString()} minutes
                          </p>
                        </div>
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="font-medium">Weeks Lived</p>
                          <p className="text-sm text-muted-foreground">
                            {Math.floor(ageResult.totalDays / 7).toLocaleString()} weeks
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex justify-center">
            <Button onClick={resetAll} variant="outline" size="lg">
              Reset All Calculations
            </Button>
          </div>

          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Date Calculator Help
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How accurate are these date calculations?</AccordionTrigger>
                    <AccordionContent>
                      Our date calculations are very accurate and account for leap years, different month lengths, 
                      and daylight saving time transitions. The calculations use JavaScript's native Date object 
                      which handles these complexities automatically.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What about business days vs calendar days?</AccordionTrigger>
                    <AccordionContent>
                      This calculator works with calendar days (including weekends and holidays). For business day 
                      calculations, you would need to manually account for weekends and holidays in your specific region. 
                      Business days typically exclude Saturdays, Sundays, and public holidays.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>How do leap years affect calculations?</AccordionTrigger>
                    <AccordionContent>
                      Leap years occur every 4 years (with some exceptions for century years). Our calculator automatically 
                      accounts for leap years when calculating date differences and ages. February 29th only exists in leap years, 
                      which affects age calculations for people born on that date.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>Can I use this for historical dates?</AccordionTrigger>
                    <AccordionContent>
                      Yes, this calculator can handle historical dates, but keep in mind that very old dates (before 1582) 
                      may have calendar system differences (Julian vs Gregorian calendar). For most practical purposes 
                      involving recent centuries, the calculations will be accurate.
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

export default DateCalculator;
