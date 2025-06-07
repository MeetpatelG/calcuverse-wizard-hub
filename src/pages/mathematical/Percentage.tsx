
import { useState } from "react";
import { Calculator, Percent, TrendingUp, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Percentage = () => {
  // Basic percentage calculation
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [basicResult, setBasicResult] = useState<number | null>(null);

  // Percentage change calculation
  const [oldValue, setOldValue] = useState("");
  const [newValue, setNewValue] = useState("");
  const [changeResult, setChangeResult] = useState<number | null>(null);

  // Percentage of value calculation
  const [percentage, setPercentage] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [ofResult, setOfResult] = useState<number | null>(null);

  const calculateBasic = () => {
    const val1 = parseFloat(value1) || 0;
    const val2 = parseFloat(value2) || 0;
    if (val2 !== 0) {
      setBasicResult((val1 / val2) * 100);
    }
  };

  const calculateChange = () => {
    const old = parseFloat(oldValue) || 0;
    const newVal = parseFloat(newValue) || 0;
    if (old !== 0) {
      setChangeResult(((newVal - old) / old) * 100);
    }
  };

  const calculateOf = () => {
    const percent = parseFloat(percentage) || 0;
    const total = parseFloat(totalValue) || 0;
    setOfResult((percent / 100) * total);
  };

  const resetAll = () => {
    setValue1("");
    setValue2("");
    setOldValue("");
    setNewValue("");
    setPercentage("");
    setTotalValue("");
    setBasicResult(null);
    setChangeResult(null);
    setOfResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Percent className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Percentage Calculator</h1>
            <p className="text-xl text-muted-foreground">
              Calculate percentages, percentage changes, and percentage of values
            </p>
          </div>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Percentage</TabsTrigger>
              <TabsTrigger value="change">Percentage Change</TabsTrigger>
              <TabsTrigger value="of">Percentage Of</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      What percentage is X of Y?
                    </CardTitle>
                    <CardDescription>
                      Calculate what percentage one number is of another
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="value1">Value (X)</Label>
                      <Input
                        id="value1"
                        type="number"
                        placeholder="25"
                        value={value1}
                        onChange={(e) => setValue1(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="value2">Total (Y)</Label>
                      <Input
                        id="value2"
                        type="number"
                        placeholder="100"
                        value={value2}
                        onChange={(e) => setValue2(e.target.value)}
                      />
                    </div>

                    <Button onClick={calculateBasic} className="w-full">
                      Calculate Percentage
                    </Button>

                    {basicResult !== null && (
                      <div className="text-center p-6 bg-primary/10 rounded-lg border-2 border-primary/20">
                        <p className="text-sm text-muted-foreground mb-2">Result</p>
                        <p className="text-4xl font-bold text-primary">{basicResult.toFixed(2)}%</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          {value1} is {basicResult.toFixed(2)}% of {value2}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Example Calculations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="font-medium">What percentage is 25 of 100?</p>
                        <p className="text-sm text-muted-foreground">25 ÷ 100 × 100 = 25%</p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="font-medium">What percentage is 15 of 60?</p>
                        <p className="text-sm text-muted-foreground">15 ÷ 60 × 100 = 25%</p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="font-medium">What percentage is 3 of 12?</p>
                        <p className="text-sm text-muted-foreground">3 ÷ 12 × 100 = 25%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="change" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Percentage Change Calculator
                    </CardTitle>
                    <CardDescription>
                      Calculate the percentage increase or decrease between two values
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="old-value">Old Value</Label>
                      <Input
                        id="old-value"
                        type="number"
                        placeholder="100"
                        value={oldValue}
                        onChange={(e) => setOldValue(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-value">New Value</Label>
                      <Input
                        id="new-value"
                        type="number"
                        placeholder="120"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                      />
                    </div>

                    <Button onClick={calculateChange} className="w-full">
                      Calculate Change
                    </Button>

                    {changeResult !== null && (
                      <div className="text-center p-6 bg-primary/10 rounded-lg border-2 border-primary/20">
                        <p className="text-sm text-muted-foreground mb-2">Percentage Change</p>
                        <p className={`text-4xl font-bold ${changeResult >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {changeResult >= 0 ? '+' : ''}{changeResult.toFixed(2)}%
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          {changeResult >= 0 ? 'Increase' : 'Decrease'} from {oldValue} to {newValue}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Formula & Examples</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-semibold mb-2">Formula:</h4>
                      <p className="text-sm">Percentage Change = ((New Value - Old Value) / Old Value) × 100</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="font-medium">From 100 to 120</p>
                        <p className="text-sm text-green-600">+20% increase</p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="font-medium">From 200 to 150</p>
                        <p className="text-sm text-red-600">-25% decrease</p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="font-medium">From 50 to 75</p>
                        <p className="text-sm text-green-600">+50% increase</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="of" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      X% of Y Calculator
                    </CardTitle>
                    <CardDescription>
                      Calculate what is X percent of Y
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="percentage">Percentage (%)</Label>
                      <Input
                        id="percentage"
                        type="number"
                        placeholder="25"
                        value={percentage}
                        onChange={(e) => setPercentage(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="total-value">Of Value</Label>
                      <Input
                        id="total-value"
                        type="number"
                        placeholder="200"
                        value={totalValue}
                        onChange={(e) => setTotalValue(e.target.value)}
                      />
                    </div>

                    <Button onClick={calculateOf} className="w-full">
                      Calculate Result
                    </Button>

                    {ofResult !== null && (
                      <div className="text-center p-6 bg-primary/10 rounded-lg border-2 border-primary/20">
                        <p className="text-sm text-muted-foreground mb-2">Result</p>
                        <p className="text-4xl font-bold text-primary">{ofResult.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          {percentage}% of {totalValue} is {ofResult.toFixed(2)}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Common Percentage Calculations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="font-medium">25% of 100</p>
                        <p className="text-sm text-muted-foreground">25</p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="font-medium">15% tip on $80</p>
                        <p className="text-sm text-muted-foreground">$12</p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="font-medium">20% discount on $50</p>
                        <p className="text-sm text-muted-foreground">$10 off</p>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="font-medium">8% tax on $1,000</p>
                        <p className="text-sm text-muted-foreground">$80</p>
                      </div>
                    </div>
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
                  <Percent className="h-5 w-5" />
                  Percentage Calculator Help
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is a percentage?</AccordionTrigger>
                    <AccordionContent>
                      A percentage is a way of expressing a number as a fraction of 100. The word "percent" means "per hundred." 
                      For example, 25% means 25 out of 100, or 25/100, or 0.25.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do you convert between percentages and decimals?</AccordionTrigger>
                    <AccordionContent>
                      To convert a percentage to a decimal, divide by 100 (or move the decimal point two places left). 
                      For example: 25% = 25 ÷ 100 = 0.25. To convert a decimal to a percentage, multiply by 100. 
                      For example: 0.25 × 100 = 25%.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>What's the difference between percentage and percentage points?</AccordionTrigger>
                    <AccordionContent>
                      Percentage points refer to the arithmetic difference between two percentages. For example, 
                      if something increases from 20% to 25%, that's a 5 percentage point increase, but a 25% relative increase 
                      (since 5 is 25% of 20).
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>When would I use percentage calculations?</AccordionTrigger>
                    <AccordionContent>
                      Percentage calculations are useful for: calculating tips and taxes, determining discounts and markups, 
                      analyzing financial returns, comparing data and statistics, calculating grades and scores, 
                      measuring growth rates, and many business and academic applications.
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

export default Percentage;
