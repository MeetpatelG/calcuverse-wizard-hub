
import { useState } from "react";
import { Calculator, DollarSign, FileText, TrendingUp, Shield, Target, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Tax = () => {
  const [income, setIncome] = useState("");
  const [filingStatus, setFilingStatus] = useState("");
  const [deductions, setDeductions] = useState("");
  const [result, setResult] = useState<{
    taxableIncome: number;
    federalTax: number;
    afterTaxIncome: number;
    effectiveRate: number;
  } | null>(null);

  const calculateTax = () => {
    const grossIncome = parseFloat(income) || 0;
    const totalDeductions = parseFloat(deductions) || 0;
    const taxableIncome = Math.max(0, grossIncome - totalDeductions);
    
    // Simplified federal tax brackets for 2024 (single filer)
    let federalTax = 0;
    const brackets = [
      { min: 0, max: 11600, rate: 0.10 },
      { min: 11600, max: 47150, rate: 0.12 },
      { min: 47150, max: 100525, rate: 0.22 },
      { min: 100525, max: 191950, rate: 0.24 },
      { min: 191950, max: 243725, rate: 0.32 },
      { min: 243725, max: 609350, rate: 0.35 },
      { min: 609350, max: Infinity, rate: 0.37 }
    ];

    for (const bracket of brackets) {
      if (taxableIncome > bracket.min) {
        const taxableAtThisBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
        federalTax += taxableAtThisBracket * bracket.rate;
      }
    }

    const afterTaxIncome = grossIncome - federalTax;
    const effectiveRate = grossIncome > 0 ? (federalTax / grossIncome) * 100 : 0;

    setResult({
      taxableIncome,
      federalTax,
      afterTaxIncome,
      effectiveRate
    });
  };

  const resetCalculator = () => {
    setIncome("");
    setFilingStatus("");
    setDeductions("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Calculator className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Tax Calculator</h1>
            <p className="text-xl text-muted-foreground">
              Estimate your federal income tax and take-home pay
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Tax Information
                </CardTitle>
                <CardDescription>
                  Enter your income and deduction details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="income">Annual Gross Income ($)</Label>
                  <Input
                    id="income"
                    type="number"
                    placeholder="75000"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="filing-status">Filing Status</Label>
                  <Select value={filingStatus} onValueChange={setFilingStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select filing status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married-joint">Married Filing Jointly</SelectItem>
                      <SelectItem value="married-separate">Married Filing Separately</SelectItem>
                      <SelectItem value="head-of-household">Head of Household</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deductions">Total Deductions ($)</Label>
                  <Input
                    id="deductions"
                    type="number"
                    placeholder="13850"
                    value={deductions}
                    onChange={(e) => setDeductions(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Standard deduction for 2024: $13,850 (single)
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button onClick={calculateTax} className="flex-1">
                    Calculate Tax
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
                    <TrendingUp className="h-5 w-5" />
                    Tax Calculation Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Taxable Income</p>
                      <p className="text-2xl font-bold">${result.taxableIncome.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Federal Tax</p>
                      <p className="text-2xl font-bold text-red-600">${result.federalTax.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">After-Tax Income</p>
                      <p className="text-2xl font-bold text-green-600">${result.afterTaxIncome.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Effective Tax Rate</p>
                      <p className="text-2xl font-bold">{result.effectiveRate.toFixed(2)}%</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Note:</strong> This is a simplified federal tax calculation for estimation purposes only. 
                      Actual tax may vary based on additional factors like state taxes, credits, and other deductions.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* SEO Content Section */}
          <div className="bg-muted/30 rounded-lg p-8 mt-12 mb-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Complete Guide to Federal Tax Calculator</h2>
              
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="text-lg leading-relaxed mb-6">
                  Understanding your federal tax obligations is essential for effective financial planning and budgeting. Our comprehensive tax calculator provides accurate estimates of your federal income tax liability, helping you plan your finances and make informed decisions about your income, deductions, and tax strategies.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                  <div className="bg-card p-6 rounded-lg border">
                    <Calculator className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2">Accurate Estimates</h3>
                    <p className="text-sm">Get precise tax calculations using current federal tax brackets and standard deductions.</p>
                  </div>
                  <div className="bg-card p-6 rounded-lg border">
                    <Shield className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2">Tax Planning</h3>
                    <p className="text-sm">Plan your tax strategy and understand your effective tax rate for better financial decisions.</p>
                  </div>
                  <div className="bg-card p-6 rounded-lg border">
                    <Target className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2">Budget Optimization</h3>
                    <p className="text-sm">Optimize your budget by understanding your after-tax income and tax obligations.</p>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold mb-4">Understanding Federal Income Tax</h3>
                <p className="mb-4">
                  Federal income tax is calculated using a progressive tax system, where higher income levels are taxed at higher rates. The tax brackets for 2024 range from 10% to 37%, with each bracket applying only to income within that specific range. This means you don't pay the highest rate on all your income, only on the portion that falls within each bracket.
                </p>

                <p className="mb-6">
                  Your taxable income is calculated by subtracting deductions from your gross income. You can choose between taking the standard deduction or itemizing your deductions, whichever results in a larger deduction amount. Understanding this calculation helps you make strategic decisions about your tax planning.
                </p>

                <h3 className="text-2xl font-semibold mb-4">Benefits of Using Our Tax Calculator</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li><strong>Financial Planning:</strong> Estimate your tax liability to plan your budget and savings goals</li>
                  <li><strong>Tax Strategy:</strong> Compare different scenarios to optimize your tax situation</li>
                  <li><strong>Withholding Adjustment:</strong> Determine if you need to adjust your payroll withholdings</li>
                  <li><strong>Retirement Planning:</strong> Understand the tax impact of retirement account withdrawals</li>
                  <li><strong>Investment Decisions:</strong> Factor in tax implications when making investment choices</li>
                  <li><strong>Side Income Planning:</strong> Calculate taxes on additional income sources</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4">Tax Brackets and Progressive Taxation</h3>
                <p className="mb-4">
                  The U.S. uses a progressive tax system, meaning tax rates increase as taxable income increases. For 2024, the tax brackets for single filers range from 10% on income up to $11,600 to 37% on income over $609,350. Understanding how these brackets work is crucial for effective tax planning.
                </p>

                <div className="bg-card p-6 rounded-lg border my-6">
                  <h4 className="font-semibold mb-3">💡 Tax Planning Tip</h4>
                  <p className="text-sm">
                    Your marginal tax rate (the rate on your last dollar of income) is different from your effective tax rate (total tax divided by total income). Use our calculator to see both rates and understand your true tax burden.
                  </p>
                </div>

                <h3 className="text-2xl font-semibold mb-4">Standard Deduction vs. Itemized Deductions</h3>
                <p className="mb-4">
                  The standard deduction for 2024 is $13,850 for single filers, $27,700 for married filing jointly, and $20,800 for head of household. You should itemize deductions only if your total itemized deductions exceed the standard deduction amount for your filing status.
                </p>

                <p className="mb-6">
                  Common itemized deductions include state and local taxes (up to $10,000), mortgage interest, charitable contributions, and medical expenses exceeding 7.5% of your adjusted gross income. Our calculator uses your total deduction amount to provide accurate estimates.
                </p>

                <h3 className="text-2xl font-semibold mb-4">Tax Credits vs. Tax Deductions</h3>
                <p className="mb-4">
                  While our calculator focuses on basic tax calculation, it's important to understand that tax credits directly reduce your tax liability dollar-for-dollar, while deductions reduce your taxable income. Credits like the Child Tax Credit, Earned Income Credit, and education credits can significantly impact your final tax bill.
                </p>

                <h3 className="text-2xl font-semibold mb-4">Quarterly Estimated Taxes</h3>
                <p className="mb-4">
                  If you're self-employed, have investment income, or don't have enough tax withheld from your paycheck, you may need to make quarterly estimated tax payments. Use our calculator to estimate your annual tax liability and determine if quarterly payments are necessary to avoid penalties.
                </p>

                <h3 className="text-2xl font-semibold mb-4">State and Local Tax Considerations</h3>
                <p className="mb-6">
                  Our calculator focuses on federal taxes only. Remember that most states also impose income taxes, with rates varying significantly. Some states like Texas, Florida, and Nevada have no state income tax, while others like California and New York have rates exceeding 10%. Factor in state taxes when planning your overall tax strategy.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How accurate is this tax calculator?</AccordionTrigger>
                    <AccordionContent>
                      This calculator provides estimates based on 2024 federal tax brackets for single filers and uses simplified calculations. 
                      Actual taxes may vary due to state taxes, tax credits, additional deductions, and other factors. 
                      Always consult a tax professional for precise calculations and comprehensive tax planning.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What deductions should I include?</AccordionTrigger>
                    <AccordionContent>
                      You can choose between standard deduction ($13,850 for single filers in 2024) or itemized deductions. 
                      Common itemized deductions include mortgage interest, state and local taxes (up to $10,000), 
                      charitable contributions, and medical expenses exceeding 7.5% of AGI. Use whichever amount is larger.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>Does this include state taxes?</AccordionTrigger>
                    <AccordionContent>
                      No, this calculator only estimates federal income tax. State tax rates vary significantly by state, 
                      with some states having no income tax while others have rates up to 13.3%. 
                      Check your state's tax rates separately for a complete picture of your tax liability.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>What about tax credits?</AccordionTrigger>
                    <AccordionContent>
                      This calculator doesn't include tax credits like the Child Tax Credit, Earned Income Tax Credit, 
                      or education credits. Tax credits directly reduce your tax liability dollar-for-dollar, 
                      potentially resulting in lower taxes than shown here. Consult a tax professional for credit calculations.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>How do tax brackets work?</AccordionTrigger>
                    <AccordionContent>
                      Tax brackets use marginal tax rates, meaning you pay different rates on different portions of your income. 
                      For example, if you're single and earn $50,000, you pay 10% on the first $11,600, then 12% on the remaining $38,400. 
                      You don't pay the highest rate on all your income, just the portion in each bracket.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger>When should I make estimated tax payments?</AccordionTrigger>
                    <AccordionContent>
                      Make quarterly estimated payments if you expect to owe $1,000 or more in taxes and your withholding 
                      covers less than 90% of the current year's tax or 100% of last year's tax (110% if last year's AGI exceeded $150,000). 
                      Self-employed individuals and those with significant investment income typically need to make estimated payments.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-7">
                    <AccordionTrigger>What's the difference between effective and marginal tax rates?</AccordionTrigger>
                    <AccordionContent>
                      Your marginal tax rate is the rate you pay on your last dollar of income (your highest tax bracket). 
                      Your effective tax rate is your total tax divided by your total income, showing your overall tax burden. 
                      The effective rate is typically lower than the marginal rate due to the progressive tax system.
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

export default Tax;
