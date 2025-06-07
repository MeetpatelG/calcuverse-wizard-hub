
import { useState } from "react";
import { Calculator, DollarSign, FileText, TrendingUp } from "lucide-react";
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
                      This calculator provides estimates based on 2024 federal tax brackets for single filers. 
                      Actual taxes may vary due to state taxes, tax credits, additional deductions, and other factors. 
                      Always consult a tax professional for precise calculations.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What deductions should I include?</AccordionTrigger>
                    <AccordionContent>
                      You can choose between standard deduction ($13,850 for single filers in 2024) or itemized deductions. 
                      Common itemized deductions include mortgage interest, state and local taxes (up to $10,000), 
                      charitable contributions, and medical expenses exceeding 7.5% of AGI.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>Does this include state taxes?</AccordionTrigger>
                    <AccordionContent>
                      No, this calculator only estimates federal income tax. State tax rates vary significantly by state, 
                      with some states having no income tax while others have rates up to 13.3%. 
                      Check your state's tax rates separately.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>What about tax credits?</AccordionTrigger>
                    <AccordionContent>
                      This calculator doesn't include tax credits like the Child Tax Credit, Earned Income Tax Credit, 
                      or education credits. Tax credits directly reduce your tax liability dollar-for-dollar, 
                      potentially resulting in lower taxes than shown here.
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
