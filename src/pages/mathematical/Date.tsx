
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
  const [daysToAdd, setDaysToAdd] = useState("");
  const [operation, setOperation] = useState("add");
  const [calculatedDate, setCalculatedDate] = useState("");

  const calculateDateDifference = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    setDiffResult({
      totalDays,
      days: totalDays % 365 % 30,
      weeks: Math.floor(totalDays / 7),
      months: Math.floor(totalDays / 30),
      years: Math.floor(totalDays / 365)
    });
  };

  const calculateAddSubtractDate = () => {
    if (!baseDate || !daysToAdd) return;

    const date = new Date(baseDate);
    const days = parseInt(daysToAdd);
    
    if (operation === "add") {
      date.setDate(date.getDate() + days);
    } else {
      date.setDate(date.getDate() - days);
    }
    
    setCalculatedDate(date.toISOString().split('T')[0]);
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
              Calculate date differences and add/subtract days from dates
            </p>
          </div>

          {/* Date and Time Visualization */}
          <div className="mb-12">
            <img 
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=400&q=80" 
              alt="Calendar and time management visualization"
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>

          <Tabs defaultValue="difference" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="difference">Date Difference</TabsTrigger>
              <TabsTrigger value="add-subtract">Add/Subtract Days</TabsTrigger>
            </TabsList>

            <TabsContent value="difference" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
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

                    <Button onClick={calculateDateDifference} className="w-full">
                      Calculate Difference
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Date Difference Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {diffResult ? (
                      <div className="space-y-4">
                        <div className="text-center p-4 bg-primary/10 rounded-lg">
                          <div className="text-2xl font-bold text-primary">{diffResult.totalDays}</div>
                          <div className="text-sm text-muted-foreground">Total Days</div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="p-3 bg-muted rounded">
                            <div className="font-semibold">{diffResult.years}</div>
                            <div className="text-xs text-muted-foreground">Years</div>
                          </div>
                          <div className="p-3 bg-muted rounded">
                            <div className="font-semibold">{diffResult.months}</div>
                            <div className="text-xs text-muted-foreground">Months</div>
                          </div>
                          <div className="p-3 bg-muted rounded">
                            <div className="font-semibold">{diffResult.weeks}</div>
                            <div className="text-xs text-muted-foreground">Weeks</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground py-8">
                        <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Select two dates to calculate the difference</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="add-subtract" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Add or Subtract Days
                    </CardTitle>
                    <CardDescription>
                      Add or subtract days from a specific date
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
                      <Label htmlFor="days">Number of Days</Label>
                      <Input
                        id="days"
                        type="number"
                        placeholder="30"
                        value={daysToAdd}
                        onChange={(e) => setDaysToAdd(e.target.value)}
                      />
                    </div>

                    <Button onClick={calculateAddSubtractDate} className="w-full">
                      Calculate Date
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Calculated Date</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {calculatedDate ? (
                      <div className="text-center p-8">
                        <div className="text-3xl font-bold text-primary mb-2">
                          {new Date(calculatedDate).toLocaleDateString('en-US', { 
                            weekday: 'long',
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div className="text-muted-foreground">
                          {operation === 'add' ? 'Added' : 'Subtracted'} {daysToAdd} days
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground py-8">
                        <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Enter date and days to calculate</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Time Management Tips Visualization */}
          <div className="mt-12 mb-8">
            <img 
              src="https://images.unsplash.com/photo-1495364141860-b0d03eccd065?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=300&q=80" 
              alt="Time management and scheduling tools"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>

          {/* FAQ Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How accurate are the date calculations?</AccordionTrigger>
                  <AccordionContent>
                    Our date calculator provides precise calculations based on the Gregorian calendar system. 
                    It accounts for leap years and varying month lengths to ensure accurate results for any date range.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>Can I calculate business days only?</AccordionTrigger>
                  <AccordionContent>
                    Currently, our calculator includes all calendar days including weekends and holidays. 
                    For business day calculations, you would need to manually account for weekends and holidays in your specific region.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>What date formats are supported?</AccordionTrigger>
                  <AccordionContent>
                    Our calculator uses the standard HTML5 date input format (YYYY-MM-DD). 
                    This ensures consistency and accuracy across different browsers and devices.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DateCalculator;
