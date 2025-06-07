
import { useState } from "react";
import { Home, DollarSign, HelpCircle, Calculator, Shield, TrendingUp, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Mortgage = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const calculateMortgage = () => {
    if (!loanAmount || !interestRate || !loanTerm) return;

    const principal = parseFloat(loanAmount) - (parseFloat(downPayment) || 0);
    const monthlyRate = parseFloat(interestRate) / 100 / 12;
    const numPayments = parseFloat(loanTerm) * 12;

    const monthlyPaymentCalc = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                              (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const totalPaymentCalc = monthlyPaymentCalc * numPayments;
    const totalInterestCalc = totalPaymentCalc - principal;

    setMonthlyPayment(monthlyPaymentCalc);
    setTotalPayment(totalPaymentCalc);
    setTotalInterest(totalInterestCalc);
    setCalculated(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <span>Home</span> / <span>Financial Calculators</span> / <span className="text-foreground">Mortgage Calculator</span>
        </div>

        <div className="text-center mb-12">
          <Home className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Mortgage Calculator</h1>
          <p className="text-xl text-muted-foreground">
            Calculate your monthly mortgage payments and total interest
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Home className="h-6 w-6 text-primary" />
                <CardTitle>Mortgage Calculator</CardTitle>
              </div>
              <CardDescription>
                Calculate your monthly mortgage payments and total interest.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="loanAmount">Home Price ($)</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  placeholder="400000"
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="downPayment">Down Payment ($)</Label>
                <Input
                  id="downPayment"
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  placeholder="80000"
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interestRate">Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  placeholder="6.5"
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
                  placeholder="30"
                  className="text-lg"
                />
              </div>

              <Button onClick={calculateMortgage} className="w-full" disabled={!loanAmount || !interestRate || !loanTerm}>
                Calculate Mortgage
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Calculation Results</CardTitle>
              <CardDescription>Your mortgage payment breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              {calculated ? (
                <div className="space-y-4">
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground">Monthly Payment</div>
                    <div className="text-2xl font-bold text-primary">
                      ${monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
                  <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter loan details to calculate your mortgage payment</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* SEO Content Section */}
        <div className="bg-muted/30 rounded-lg p-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Your Complete Mortgage Calculator Guide</h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6">
                Buying a home is one of the most significant financial decisions you'll make in your lifetime. Our comprehensive mortgage calculator empowers you to make informed decisions by providing accurate monthly payment estimates, total interest costs, and detailed amortization insights for your home purchase.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <div className="bg-card p-6 rounded-lg border">
                  <Calculator className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Precise Calculations</h3>
                  <p className="text-sm">Get accurate mortgage estimates using industry-standard formulas and current market rates.</p>
                </div>
                <div className="bg-card p-6 rounded-lg border">
                  <Shield className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Financial Security</h3>
                  <p className="text-sm">Plan your home purchase with confidence using detailed payment breakdowns and cost analysis.</p>
                </div>
                <div className="bg-card p-6 rounded-lg border">
                  <TrendingUp className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Smart Budgeting</h3>
                  <p className="text-sm">Compare different loan scenarios to find the perfect balance for your financial goals.</p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-4">Understanding Mortgage Payments</h3>
              <p className="mb-4">
                A mortgage payment typically consists of four main components, often referred to as PITI: Principal, Interest, Taxes, and Insurance. Our calculator focuses on the principal and interest portions, which form the core of your monthly mortgage obligation. The principal is the amount you borrowed, while interest is the cost of borrowing that money over time.
              </p>

              <p className="mb-6">
                Understanding how these components work together is crucial for effective home buying. The principal portion of your payment reduces your loan balance, while the interest portion compensates the lender for the risk and opportunity cost of lending you money. Early in your loan term, most of your payment goes toward interest, but this ratio gradually shifts toward principal over time.
              </p>

              <h3 className="text-2xl font-semibold mb-4">Benefits of Using Our Mortgage Calculator</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Affordability Assessment:</strong> Determine what home price fits your budget before house hunting</li>
                <li><strong>Down Payment Planning:</strong> See how different down payment amounts affect your monthly payments</li>
                <li><strong>Rate Comparison:</strong> Compare offers from different lenders to find the best deal</li>
                <li><strong>Budget Planning:</strong> Understand your long-term financial commitment</li>
                <li><strong>Refinancing Analysis:</strong> Evaluate if refinancing your current mortgage makes sense</li>
                <li><strong>Prepayment Benefits:</strong> Calculate savings from making extra principal payments</li>
              </ul>

              <h3 className="text-2xl font-semibold mb-4">Key Factors That Affect Your Mortgage Payment</h3>
              <p className="mb-4">
                Several factors influence your monthly mortgage payment amount. The home price and down payment determine your loan amount, while the interest rate significantly impacts your monthly cost. Longer loan terms result in lower monthly payments but higher total interest costs, while shorter terms have higher payments but less total interest.
              </p>

              <div className="bg-card p-6 rounded-lg border my-6">
                <h4 className="font-semibold mb-3">🏠 Home Buying Tip</h4>
                <p className="text-sm">
                  A common rule of thumb is that your monthly housing payment should not exceed 28% of your gross monthly income. Use our calculator to ensure your potential mortgage payment aligns with this guideline for sustainable homeownership.
                </p>
              </div>

              <h3 className="text-2xl font-semibold mb-4">Types of Mortgage Loans</h3>
              <p className="mb-4">
                Our calculator works for various mortgage types, including conventional loans, FHA loans, VA loans, and USDA loans. Each loan type has different requirements for down payments, interest rates, and mortgage insurance. Conventional loans typically require higher credit scores and down payments but may offer better rates for qualified borrowers.
              </p>

              <p className="mb-6">
                Government-backed loans like FHA, VA, and USDA loans often have more flexible requirements and lower down payment options, making homeownership accessible to more people. Understanding these options helps you choose the right mortgage product for your situation.
              </p>

              <h3 className="text-2xl font-semibold mb-4">Fixed-Rate vs. Adjustable-Rate Mortgages</h3>
              <p className="mb-4">
                Fixed-rate mortgages maintain the same interest rate throughout the loan term, providing payment stability and predictability. This makes budgeting easier and protects you from rising interest rates. Most homeowners prefer fixed-rate mortgages for their primary residence due to this stability.
              </p>

              <p className="mb-6">
                Adjustable-rate mortgages (ARMs) start with lower initial rates that adjust periodically based on market conditions. While ARMs can offer savings initially, they carry the risk of payment increases if rates rise. Our calculator can help you evaluate both options based on current market rates.
              </p>

              <h3 className="text-2xl font-semibold mb-4">The Importance of Down Payments</h3>
              <p className="mb-4">
                Your down payment significantly impacts your mortgage terms and monthly payments. Larger down payments reduce your loan amount, potentially eliminate private mortgage insurance (PMI), and may qualify you for better interest rates. Even small increases in down payment can result in substantial long-term savings.
              </p>

              <p className="mb-6">
                While 20% down payments are traditional, many loan programs allow much lower down payments. However, lower down payments often require mortgage insurance, which increases your monthly cost. Our calculator helps you weigh these trade-offs to find the optimal down payment for your situation.
              </p>

              <h3 className="text-2xl font-semibold mb-4">Mortgage Payment Strategies</h3>
              <p className="mb-6">
                Smart mortgage management can save you thousands over your loan term. Consider making bi-weekly payments instead of monthly payments to reduce interest and pay off your loan faster. Even small additional principal payments can significantly reduce your total interest cost and loan term.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <HelpCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Expert answers to common mortgage questions</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What's the difference between pre-qualification and pre-approval?</AccordionTrigger>
              <AccordionContent>
                Pre-qualification is an informal estimate based on self-reported financial information, while pre-approval involves a thorough review of your credit, income, and assets by a lender. Pre-approval carries more weight with sellers and gives you a realistic budget for home shopping. Our calculator helps you understand potential payments, but getting pre-approved provides the actual terms you'll qualify for.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Should I choose a 15-year or 30-year mortgage?</AccordionTrigger>
              <AccordionContent>
                This depends on your financial goals and monthly budget. A 15-year mortgage has higher monthly payments but significantly lower total interest costs and faster equity building. A 30-year mortgage offers lower monthly payments, providing more budget flexibility for other goals. Use our calculator to compare both options and see which aligns better with your financial situation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>How much should I put down on a house?</AccordionTrigger>
              <AccordionContent>
                While 20% down eliminates private mortgage insurance and may get better rates, it's not always necessary or optimal. Consider your total financial picture: emergency savings, other debts, and investment opportunities. Many successful homeowners put down less than 20% to preserve cash for other needs. Our calculator shows how different down payment amounts affect your monthly payment and total costs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>What additional costs should I budget for beyond the mortgage payment?</AccordionTrigger>
              <AccordionContent>
                Beyond principal and interest, budget for property taxes, homeowners insurance, private mortgage insurance (if applicable), HOA fees, utilities, maintenance, and repairs. A general rule is to budget 1-2% of your home's value annually for maintenance and repairs. Don't forget closing costs, which typically range from 2-5% of the home price.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>When should I consider refinancing my mortgage?</AccordionTrigger>
              <AccordionContent>
                Consider refinancing when interest rates drop significantly below your current rate, your credit score has improved substantially, you want to change loan terms, or you need to access home equity. Generally, refinancing makes sense if you can reduce your rate by at least 0.5-1% and plan to stay in the home long enough to recoup closing costs. Our calculator can help you evaluate potential savings.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>How does my credit score affect my mortgage rate?</AccordionTrigger>
              <AccordionContent>
                Your credit score significantly impacts your mortgage interest rate and terms. Higher scores typically qualify for lower rates, potentially saving thousands over the loan term. Even a small rate difference can mean substantial savings. Work on improving your credit score before applying for a mortgage, and shop around with multiple lenders to find the best rate for your score.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>Can I pay off my mortgage early without penalties?</AccordionTrigger>
              <AccordionContent>
                Most mortgages today don't have prepayment penalties, allowing you to pay extra toward principal or pay off the loan early without fees. However, always verify this with your lender. Paying extra principal can significantly reduce total interest and loan term. Consider your other financial goals and whether the guaranteed mortgage interest savings outweigh potential investment returns elsewhere.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Mortgage;
