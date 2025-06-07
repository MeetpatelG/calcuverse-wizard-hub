
import { useState } from "react";
import { Calculator, Percent, TrendingUp, Target, Shield, Clock } from "lucide-react";
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

          {/* SEO Content Section */}
          <div className="bg-muted/30 rounded-lg p-8 mt-12 mb-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Master Percentage Calculations with Our Complete Guide</h2>
              
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="text-lg leading-relaxed mb-6">
                  Percentage calculations are fundamental mathematical operations used in countless real-world scenarios, from calculating tips and discounts to analyzing business growth and academic performance. Our comprehensive percentage calculator simplifies these calculations while helping you understand the underlying concepts and applications.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                  <div className="bg-card p-6 rounded-lg border">
                    <Calculator className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2">Multi-Purpose Tool</h3>
                    <p className="text-sm">Handle all types of percentage calculations in one comprehensive calculator.</p>
                  </div>
                  <div className="bg-card p-6 rounded-lg border">
                    <Shield className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2">Accurate Results</h3>
                    <p className="text-sm">Get precise calculations for academic, business, and personal use with detailed explanations.</p>
                  </div>
                  <div className="bg-card p-6 rounded-lg border">
                    <Clock className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2">Time-Saving</h3>
                    <p className="text-sm">Instantly solve complex percentage problems without manual calculations or formulas.</p>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold mb-4">Understanding Percentages: The Foundation</h3>
                <p className="mb-4">
                  A percentage represents a fraction of 100, making it easier to compare and understand proportional relationships. The word "percent" literally means "per hundred," so 25% means 25 out of every 100 units. This concept is essential for interpreting data, making comparisons, and understanding relative changes in various contexts.
                </p>

                <p className="mb-6">
                  Percentages are used extensively in finance (interest rates, returns), retail (discounts, sales tax), academics (grades, scores), and statistics (growth rates, demographics). Mastering percentage calculations enhances your numerical literacy and decision-making abilities across personal and professional scenarios.
                </p>

                <h3 className="text-2xl font-semibold mb-4">Types of Percentage Calculations</h3>
                <p className="mb-4">
                  Our calculator handles three primary types of percentage calculations: basic percentage (what percent is X of Y), percentage change (increase or decrease between two values), and percentage of a value (X% of Y equals what). Each type serves different purposes and applications in real-world situations.
                </p>

                <div className="bg-card p-6 rounded-lg border my-6">
                  <h4 className="font-semibold mb-3">🧮 Quick Calculation Tip</h4>
                  <p className="text-sm">
                    To quickly calculate 10% of any number, simply move the decimal point one place to the left. For example, 10% of 250 is 25. You can use this as a base for other calculations like 20% (2×10%) or 5% (10%÷2).
                  </p>
                </div>

                <h3 className="text-2xl font-semibold mb-4">Business Applications of Percentage Calculations</h3>
                <p className="mb-4">
                  In business contexts, percentage calculations are crucial for analyzing performance metrics, calculating profit margins, determining growth rates, and setting pricing strategies. Sales teams use percentages to track targets and commissions, while managers analyze percentage changes in revenue, costs, and market share.
                </p>

                <p className="mb-6">
                  Financial analysts rely heavily on percentage calculations for evaluating investment returns, comparing performance across different periods, and assessing risk-adjusted returns. Understanding these calculations enables better business decision-making and financial planning.
                </p>

                <h3 className="text-2xl font-semibold mb-4">Educational and Academic Uses</h3>
                <p className="mb-4">
                  In academic settings, percentages are used for grading systems, test scores, and statistical analysis. Students encounter percentages in mathematics, science, social studies, and even literature when analyzing data and trends. Our calculator helps students verify their work and understand the relationships between different percentage calculations.
                </p>

                <h3 className="text-2xl font-semibold mb-4">Personal Finance Applications</h3>
                <p className="mb-4">
                  Personal finance heavily relies on percentage calculations for understanding interest rates, loan terms, investment returns, and budget allocations. Whether calculating mortgage payments, credit card interest, or retirement savings growth, percentages help you make informed financial decisions.
                </p>

                <p className="mb-6">
                  Shopping and consumer decisions also involve percentages through discounts, sales tax, tips, and comparison shopping. Our calculator helps you quickly determine the best deals and understand the true cost of purchases.
                </p>

                <h3 className="text-2xl font-semibold mb-4">Statistical Analysis and Data Interpretation</h3>
                <p className="mb-4">
                  Percentages are fundamental in statistics for expressing probabilities, survey results, demographic data, and research findings. They make complex data more accessible and comparable across different sample sizes and populations.
                </p>

                <h3 className="text-2xl font-semibold mb-4">Common Percentage Mistakes to Avoid</h3>
                <p className="mb-6">
                  Common errors include confusing percentage points with percentages, incorrectly calculating percentage changes with negative numbers, and misunderstanding the difference between relative and absolute changes. Our calculator with clear explanations helps you avoid these pitfalls and develop accurate percentage calculation skills.
                </p>
              </div>
            </div>
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
                      For example, 25% means 25 out of 100, or 25/100, or 0.25. Percentages make it easy to compare proportions 
                      and understand relative relationships between numbers.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do you convert between percentages and decimals?</AccordionTrigger>
                    <AccordionContent>
                      To convert a percentage to a decimal, divide by 100 (or move the decimal point two places left). 
                      For example: 25% = 25 ÷ 100 = 0.25. To convert a decimal to a percentage, multiply by 100. 
                      For example: 0.25 × 100 = 25%. This conversion is essential for percentage calculations.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>What's the difference between percentage and percentage points?</AccordionTrigger>
                    <AccordionContent>
                      Percentage points refer to the arithmetic difference between two percentages. For example, 
                      if something increases from 20% to 25%, that's a 5 percentage point increase, but a 25% relative increase 
                      (since 5 is 25% of 20). Understanding this distinction is crucial for interpreting statistical data and financial reports.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>When would I use percentage calculations?</AccordionTrigger>
                    <AccordionContent>
                      Percentage calculations are useful for: calculating tips and taxes, determining discounts and markups, 
                      analyzing financial returns, comparing data and statistics, calculating grades and scores, 
                      measuring growth rates, understanding survey results, and many business and academic applications.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>How do I calculate percentage change correctly?</AccordionTrigger>
                    <AccordionContent>
                      Percentage change formula: ((New Value - Old Value) / Old Value) × 100. Always use the original (old) value 
                      as the denominator. A positive result indicates an increase, while negative indicates a decrease. 
                      Be careful with negative numbers and ensure you're using the correct base value for meaningful comparisons.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger>Can percentages exceed 100%?</AccordionTrigger>
                    <AccordionContent>
                      Yes, percentages can exceed 100%. For example, if a value doubles, that's a 100% increase. 
                      If it triples, that's a 200% increase. In percentage change calculations, values over 100% indicate 
                      that the new value is more than double the original value. This is common in growth analysis and financial returns.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-7">
                    <AccordionTrigger>How accurate are the calculations in this tool?</AccordionTrigger>
                    <AccordionContent>
                      Our percentage calculator uses precise mathematical formulas and provides results rounded to two decimal places 
                      for practical use. The calculations are accurate for all standard percentage operations. For financial or scientific 
                      applications requiring extreme precision, consider the context and rounding implications of your specific use case.
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
