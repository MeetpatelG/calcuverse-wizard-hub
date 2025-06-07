
import { useState } from "react";
import { Calculator, CreditCard, HelpCircle, TrendingUp, Shield, Clock, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const LoanEMI = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [emi, setEmi] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const calculateEMI = () => {
    if (!loanAmount || !interestRate || !loanTerm) return;

    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const time = parseFloat(loanTerm) * 12;

    const emiValue = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    const totalPaymentValue = emiValue * time;
    const totalInterestValue = totalPaymentValue - principal;

    setEmi(emiValue);
    setTotalPayment(totalPaymentValue);
    setTotalInterest(totalInterestValue);
    setCalculated(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <span>Home</span> / <span>Financial Calculators</span> / <span className="text-foreground">Loan EMI Calculator</span>
        </div>

        <div className="text-center mb-12">
          <CreditCard className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Loan EMI Calculator</h1>
          <p className="text-xl text-muted-foreground">
            Calculate your Equated Monthly Installment (EMI) for loans
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <CreditCard className="h-6 w-6 text-primary" />
                <CardTitle>Loan EMI Calculator</CardTitle>
              </div>
              <CardDescription>
                Calculate your Equated Monthly Installment (EMI) for loans.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="loanAmount">Loan Amount ($)</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="100000"
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate">Interest Rate (% per annum)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="8.5"
                  step="0.01"
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="loanTerm">Loan Term (years)</Label>
                <Input
                  id="loanTerm"
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  placeholder="15"
                  className="text-lg"
                />
              </div>

              <Button onClick={calculateEMI} className="w-full" disabled={!loanAmount || !interestRate || !loanTerm}>
                Calculate EMI
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>EMI Results</CardTitle>
              <CardDescription>Your loan payment breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              {calculated ? (
                <div className="space-y-4">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground">Monthly EMI</div>
                    <div className="text-2xl font-bold text-primary">
                      ${emi.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted p-3 rounded">
                      <div className="text-xs text-muted-foreground">Total Payment</div>
                      <div className="font-semibold">
                        ${totalPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div className="bg-muted p-3 rounded">
                      <div className="text-xs text-muted-foreground">Total Interest</div>
                      <div className="font-semibold">
                        ${totalInterest.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter loan details to calculate your EMI</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* SEO Content Section */}
        <div className="bg-muted/30 rounded-lg p-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Complete Guide to Loan EMI Calculator</h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6">
                Understanding your loan EMI (Equated Monthly Installment) is crucial for effective financial planning. Our comprehensive EMI calculator helps you determine your monthly payment obligations, total interest costs, and overall loan burden before you commit to any financing arrangement.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <div className="bg-card p-6 rounded-lg border">
                  <TrendingUp className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Accurate Calculations</h3>
                  <p className="text-sm">Get precise EMI amounts using standard banking formulas and current interest rates.</p>
                </div>
                <div className="bg-card p-6 rounded-lg border">
                  <Shield className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Financial Planning</h3>
                  <p className="text-sm">Plan your budget effectively with detailed payment breakdowns and total cost analysis.</p>
                </div>
                <div className="bg-card p-6 rounded-lg border">
                  <Clock className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Time-Saving Tool</h3>
                  <p className="text-sm">Instantly calculate EMIs for different loan scenarios without complex mathematical formulas.</p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-4">What is EMI and How Does It Work?</h3>
              <p className="mb-4">
                EMI stands for Equated Monthly Installment, which is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are used to pay off both interest and principal each month so that over a specified number of years, the loan is paid off in full.
              </p>

              <p className="mb-6">
                The EMI calculation is based on three primary factors: the principal loan amount, the interest rate, and the loan tenure. Our calculator uses the standard EMI formula: EMI = [P x R x (1+R)^N] / [(1+R)^N-1], where P is the principal loan amount, R is the monthly interest rate, and N is the number of monthly installments.
              </p>

              <h3 className="text-2xl font-semibold mb-4">Benefits of Using Our EMI Calculator</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Budget Planning:</strong> Determine if you can afford the monthly payments before applying for a loan</li>
                <li><strong>Loan Comparison:</strong> Compare different loan offers by adjusting interest rates and tenures</li>
                <li><strong>Interest Cost Analysis:</strong> Understand how much you'll pay in total interest over the loan term</li>
                <li><strong>Prepayment Planning:</strong> Evaluate the impact of different loan terms on your finances</li>
                <li><strong>Financial Goal Setting:</strong> Align loan payments with your income and expense structure</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-4">Types of Loans Where EMI Calculator is Useful</h3>
              <p className="mb-4">
                Our EMI calculator is versatile and can be used for various types of loans including personal loans, auto loans, education loans, and business loans. Each loan type may have different interest rate structures and terms, making our calculator an essential tool for financial planning.
              </p>

              <div className="bg-card p-6 rounded-lg border my-6">
                <h4 className="font-semibold mb-3">💡 Pro Tip: Optimizing Your EMI</h4>
                <p className="text-sm">
                  Consider making a larger down payment to reduce your principal amount, which will lower your EMI. Also, compare interest rates from multiple lenders to find the best deal for your financial situation.
                </p>
              </div>

              <h3 className="text-2xl font-semibold mb-4">Understanding EMI Components</h3>
              <p className="mb-4">
                Every EMI payment consists of two components: principal repayment and interest payment. In the early years of the loan, a larger portion of your EMI goes toward interest payments. As the loan progresses, the principal component increases while the interest component decreases.
              </p>

              <h3 className="text-2xl font-semibold mb-4">Factors Affecting Your EMI Amount</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Principal Amount:</strong> Higher loan amounts result in higher EMIs</li>
                <li><strong>Interest Rate:</strong> Lower rates mean lower monthly payments</li>
                <li><strong>Loan Tenure:</strong> Longer terms reduce EMI but increase total interest</li>
                <li><strong>Credit Score:</strong> Better scores often qualify for lower interest rates</li>
                <li><strong>Income Level:</strong> Higher income may qualify you for larger loan amounts</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-4">Smart EMI Management Strategies</h3>
              <p className="mb-4">
                Effective EMI management involves maintaining a debt-to-income ratio below 40%, setting up automatic payments to avoid late fees, and considering prepayment options when you have surplus funds. Our calculator helps you model different scenarios to find the most suitable payment structure.
              </p>

              <p className="mb-6">
                Regular monitoring of your EMI obligations and their impact on your monthly budget is essential for maintaining healthy finances. Use our calculator periodically to reassess your loan strategy and ensure it aligns with your current financial goals and capabilities.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <HelpCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about EMI calculations</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is the difference between EMI and simple interest?</AccordionTrigger>
              <AccordionContent>
                EMI is a structured payment method where you pay a fixed amount monthly that includes both principal and interest. Simple interest is calculated only on the principal amount, while EMI uses compound interest calculations. EMI ensures systematic loan repayment over a fixed period, making it easier to budget and plan finances.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Can I change my EMI amount after the loan is approved?</AccordionTrigger>
              <AccordionContent>
                Generally, EMI amounts are fixed once the loan is approved. However, some options may be available: you can make prepayments to reduce future EMIs, opt for loan restructuring in case of financial hardship, or refinance the loan at a lower interest rate. Always check with your lender about available options and any associated fees.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>How does loan tenure affect my total interest payment?</AccordionTrigger>
              <AccordionContent>
                Longer loan tenures result in lower EMIs but higher total interest payments. For example, a $100,000 loan at 8% interest for 15 years costs less in total interest than the same loan over 30 years. Our calculator helps you compare different tenure options to find the right balance between affordable monthly payments and total loan cost.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>What happens if I miss an EMI payment?</AccordionTrigger>
              <AccordionContent>
                Missing EMI payments can result in late fees, negative impact on your credit score, and potential legal action by the lender. Most lenders offer a grace period of 10-15 days after the due date. If you anticipate difficulty making payments, contact your lender immediately to discuss options like payment restructuring or temporary relief measures.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Is it better to choose a longer or shorter loan tenure?</AccordionTrigger>
              <AccordionContent>
                The choice depends on your financial situation and goals. Shorter tenures mean higher EMIs but lower total interest costs and faster debt freedom. Longer tenures offer lower EMIs but higher total interest payments. Consider your monthly budget, other financial goals, and risk tolerance when deciding. Our calculator helps you model both scenarios.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>How accurate are online EMI calculators?</AccordionTrigger>
              <AccordionContent>
                Online EMI calculators, including ours, provide highly accurate estimates using standard banking formulas. However, actual EMIs may vary slightly due to factors like processing fees, insurance premiums, or specific lender policies. Always verify calculations with your lender and read all loan terms carefully before finalizing any agreement.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>Can I use this calculator for different types of loans?</AccordionTrigger>
              <AccordionContent>
                Yes, our EMI calculator works for most types of loans including personal loans, auto loans, home loans, and business loans. The basic EMI calculation formula remains the same across loan types. However, remember that different loan types may have varying interest rate structures, processing fees, and terms that could affect your final payment amount.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoanEMI;
