import { useState } from "react";
import { Calculator, TrendingUp, DollarSign, Clock, Target, HelpCircle, BarChart3, Image as ImageIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const CompoundInterest = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [compoundFrequency, setCompoundFrequency] = useState("12");
  const [result, setResult] = useState<{
    finalAmount: number;
    totalInterest: number;
    yearlyBreakdown: Array<{year: number; amount: number; interest: number}>;
  } | null>(null);

  const calculateCompoundInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(compoundFrequency);

    if (isNaN(p) || isNaN(r) || isNaN(t) || isNaN(n) || p <= 0 || r < 0 || t <= 0 || n <= 0) {
      return;
    }

    // A = P(1 + r/n)^(nt)
    const finalAmount = p * Math.pow(1 + r / n, n * t);
    const totalInterest = finalAmount - p;

    // Calculate yearly breakdown
    const yearlyBreakdown = [];
    for (let year = 1; year <= t; year++) {
      const amount = p * Math.pow(1 + r / n, n * year);
      const interest = amount - p;
      yearlyBreakdown.push({
        year,
        amount: Math.round(amount * 100) / 100,
        interest: Math.round(interest * 100) / 100
      });
    }

    setResult({
      finalAmount: Math.round(finalAmount * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      yearlyBreakdown
    });
  };

  const clearForm = () => {
    setPrincipal("");
    setRate("");
    setTime("");
    setCompoundFrequency("12");
    setResult(null);
  };

  const faqs = [
    {
      question: "What is compound interest and how does it work?",
      answer: "Compound interest is the interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest, which only calculates interest on the principal amount, compound interest allows your money to grow exponentially over time. The key is that each period's interest becomes part of the principal for the next period's calculation."
    },
    {
      question: "How often should I compound my investments for maximum returns?",
      answer: "Generally, the more frequently interest compounds, the better your returns. Daily compounding typically provides the best results, followed by monthly, quarterly, semi-annually, and annually. However, the difference between daily and monthly compounding is often minimal, while the difference between annual and monthly compounding can be significant over long periods."
    },
    {
      question: "What's the difference between compound interest and simple interest?",
      answer: "Simple interest is calculated only on the principal amount, while compound interest is calculated on both the principal and accumulated interest. For example, with $1,000 at 5% simple interest for 10 years, you'd earn $500 in interest. With compound interest (annually), you'd earn approximately $629, demonstrating the power of compounding."
    },
    {
      question: "How long should I invest to see significant compound interest benefits?",
      answer: "The benefits of compound interest become more pronounced over longer time periods. While you'll see some benefits immediately, the real power emerges after 10+ years. The 'Rule of 72' suggests that your money doubles approximately every 72÷interest_rate years. For example, at 8% annual return, your investment would double roughly every 9 years."
    },
    {
      question: "What factors affect compound interest calculations?",
      answer: "Four main factors affect compound interest: 1) Principal amount (initial investment), 2) Interest rate (annual percentage return), 3) Time period (how long you invest), and 4) Compounding frequency (how often interest is calculated and added). Even small changes in these variables can significantly impact your final returns over time."
    },
    {
      question: "Can compound interest work against me with debts?",
      answer: "Yes, compound interest applies to debts too, particularly credit card debt. When you carry a balance, interest compounds on both the original debt and accumulated interest, making debt grow exponentially. This is why it's crucial to pay off high-interest debt quickly and understand the true cost of borrowing."
    },
    {
      question: "What are some real-world applications of compound interest?",
      answer: "Compound interest applies to savings accounts, certificates of deposit (CDs), bonds, retirement accounts (401k, IRA), investment portfolios, mortgage payments, student loans, and credit card debt. Understanding compound interest helps you make better financial decisions across all these areas, from choosing investment vehicles to debt management strategies."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link> / 
          <Link to="/financial" className="hover:text-foreground"> Financial</Link> / 
          <span className="text-foreground"> Compound Interest Calculator</span>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            {/* Infographic image (hero) */}
            <div className="flex flex-col items-center mb-6">
              <img 
                src="/placeholder.svg"
                alt="Compound Interest Infographic"
                className="mx-auto w-full max-w-[340px] rounded-lg border shadow-lg mb-4 animate-fade-in bg-gray-100"
                loading="lazy"
              />
              <div className="bg-gradient-to-r from-green-500 to-blue-600 p-4 rounded-full">
                <TrendingUp className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Compound Interest Calculator
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Harness the power of compound interest to grow your wealth exponentially. Calculate how your investments 
              can multiply over time with our comprehensive compound interest calculator.
            </p>
          </div>

          {/* Calculator Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card className="bg-white/70 backdrop-blur-sm shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center">
                  <Calculator className="mr-3 h-6 w-6" />
                  Investment Calculator
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Enter your investment parameters to see the magic of compounding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="space-y-2">
                  <Label htmlFor="principal" className="text-sm font-semibold flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                    Principal Amount ($)
                  </Label>
                  <Input
                    id="principal"
                    type="number"
                    placeholder="10,000"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rate" className="text-sm font-semibold flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2 text-blue-600" />
                    Annual Interest Rate (%)
                  </Label>
                  <Input
                    id="rate"
                    type="number"
                    step="0.01"
                    placeholder="7.5"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="text-sm font-semibold flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-purple-600" />
                    Investment Period (Years)
                  </Label>
                  <Input
                    id="time"
                    type="number"
                    placeholder="20"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frequency" className="text-sm font-semibold">
                    Compounding Frequency
                  </Label>
                  <select
                    id="frequency"
                    value={compoundFrequency}
                    onChange={(e) => setCompoundFrequency(e.target.value)}
                    className="w-full p-3 border border-input bg-background rounded-md text-lg"
                  >
                    <option value="1">Annually (1x per year)</option>
                    <option value="2">Semi-annually (2x per year)</option>
                    <option value="4">Quarterly (4x per year)</option>
                    <option value="12">Monthly (12x per year)</option>
                    <option value="365">Daily (365x per year)</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={calculateCompoundInterest} className="flex-1 text-lg py-3">
                    Calculate Growth
                  </Button>
                  <Button variant="outline" onClick={clearForm} className="text-lg py-3">
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {result && (
              <Card className="bg-white/70 backdrop-blur-sm shadow-xl">
                <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <Target className="mr-3 h-6 w-6" />
                    Your Investment Results
                  </CardTitle>
                  <CardDescription className="text-green-100">
                    See how your money grows with compound interest
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
                      <p className="text-sm text-muted-foreground mb-2">Final Amount</p>
                      <p className="text-3xl font-bold text-green-600">
                        ${result.finalAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
                      <p className="text-sm text-muted-foreground mb-2">Total Interest Earned</p>
                      <p className="text-3xl font-bold text-blue-600">
                        ${result.totalInterest.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Compound growth chart */}
                  <div>
                    <h4 className="font-semibold text-lg flex items-center mb-2">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Compound Growth Over Time
                    </h4>
                    <ResponsiveContainer width="100%" height={220}>
                      <LineChart
                        data={result.yearlyBreakdown}
                        margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" tickFormatter={(y) => `Y${y}`} />
                        <YAxis tickFormatter={(v) => `$${v.toLocaleString()}`} />
                        <Tooltip 
                          formatter={(value, name) => [`$${value.toLocaleString()}`, name === "amount" ? "Amount" : "Interest"]}
                          labelFormatter={label => `Year ${label}`}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="amount"
                          stroke="#10b981"
                          strokeWidth={3}
                          name="Total Amount"
                          dot={{ r: 3 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="interest"
                          stroke="#6366f1"
                          strokeDasharray="5 5"
                          name="Cumulative Interest"
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Year-by-Year Growth
                    </h4>
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {result.yearlyBreakdown.map((year) => (
                        <div key={year.year} className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border">
                          <span className="font-medium">Year {year.year}</span>
                          <div className="text-right">
                            <div className="text-sm font-semibold">${year.amount.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">
                              +${year.interest.toLocaleString()} interest
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Educational Content */}
          <Card className="mb-12 bg-white/70 backdrop-blur-sm shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl">Understanding Compound Interest: The Eighth Wonder of the World</CardTitle>
              <CardDescription className="text-purple-100 text-lg">
                Master the concept that Einstein allegedly called "the most powerful force in the universe"
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 prose max-w-none">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-blue-600">What Makes Compound Interest So Powerful?</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Compound interest is fundamentally different from simple interest because it calculates interest not just on your original 
                    investment (principal), but also on all the interest you've earned previously. This creates a snowball effect where 
                    your money grows at an accelerating rate over time.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    The magic happens when your earnings start earning their own earnings. For example, if you invest $1,000 at 8% annual 
                    compound interest, after one year you have $1,080. In year two, you earn 8% on $1,080 (not just the original $1,000), 
                    giving you $1,166.40. This exponential growth continues indefinitely.
                  </p>
                </div>
                {/* Infographic for educational section */}
                <div className="flex justify-center items-center">
                  <div className="relative w-full flex flex-col items-center">
                    <img
                      src="/placeholder.svg"
                      alt="Growth Infographic"
                      className="w-full max-w-[280px] rounded-lg border shadow-lg mb-2 animate-scale-in bg-gray-100"
                      loading="lazy"
                    />
                    <span className="inline-block bg-emerald-200 text-emerald-900 px-3 py-1 rounded-full text-xs font-semibold absolute top-3 left-3 shadow">Compound Growth</span>
                    <span className="inline-flex items-center bg-purple-700 text-white px-2 py-1 rounded-xl text-xs font-semibold absolute bottom-2 right-2 shadow">Infographic</span>
                  </div>
                </div>
              </div>

              {/* Insert a simple infographic comparing simple vs compound */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-6">
                <div className="flex items-center gap-2 w-full md:w-1/2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 shadow">
                  <ImageIcon className="text-blue-400 w-7 h-7" />
                  <div>
                    <div className="font-semibold text-blue-700">Simple Interest:</div>
                    <div className="text-sm text-gray-700">Grows in a straight line.<br />
                      <span className="font-mono font-semibold text-blue-500">A = P(1 + rt)</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full md:w-1/2 bg-green-50 border border-green-200 rounded-lg px-4 py-3 shadow">
                  <ImageIcon className="text-green-400 w-7 h-7" />
                  <div>
                    <div className="font-semibold text-green-700">Compound Interest:</div>
                    <div className="text-sm text-gray-700">Grows exponentially over time.<br />
                      <span className="font-mono font-semibold text-green-600">A = P(1 + r/n)<sup>nt</sup></span>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-green-600">How to Use This Compound Interest Calculator</h3>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg mb-6 border-l-4 border-green-500">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our compound interest calculator is designed to be intuitive and comprehensive. Here's a step-by-step guide to maximize 
                  its effectiveness:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li><strong>Enter Principal Amount:</strong> Input your initial investment or the amount you plan to invest</li>
                  <li><strong>Set Interest Rate:</strong> Enter the expected annual return percentage (be realistic with market averages)</li>
                  <li><strong>Choose Time Period:</strong> Specify how long you plan to keep the investment (longer periods show more dramatic results)</li>
                  <li><strong>Select Compounding Frequency:</strong> Choose how often interest is calculated and added to your principal</li>
                  <li><strong>Analyze Results:</strong> Review both the final amount and year-by-year breakdown to understand growth patterns</li>
                </ol>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-purple-600">The Mathematics Behind Compound Interest</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The compound interest formula is: <strong>A = P(1 + r/n)^(nt)</strong>, where A is the final amount, P is the principal, 
                r is the annual interest rate, n is the compounding frequency, and t is the time in years. This formula demonstrates how 
                small changes in any variable can lead to significant differences in outcomes.
              </p>
              
              <div className="bg-yellow-50 p-6 rounded-lg mb-6 border-l-4 border-yellow-500">
                <h4 className="font-semibold mb-3 text-yellow-800">Real-World Example: The Power of Early Investing</h4>
                <p className="text-gray-700 leading-relaxed">
                  Consider two investors: Sarah starts investing $200 monthly at age 25, while John starts investing $400 monthly at age 35. 
                  Both earn 7% annual returns and retire at 65. Despite John investing twice as much monthly, Sarah's 10-year head start 
                  results in approximately $200,000 more at retirement, demonstrating that time is often more valuable than the amount invested.
                </p>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-red-600">Common Mistakes to Avoid</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2">Unrealistic Expectations</h4>
                  <p className="text-gray-700 text-sm">
                    Don't assume extremely high returns. Historical stock market averages suggest 7-10% annual returns over long periods.
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2">Ignoring Inflation</h4>
                  <p className="text-gray-700 text-sm">
                    Remember that inflation erodes purchasing power. Your real returns are nominal returns minus inflation rate.
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2">Not Considering Taxes</h4>
                  <p className="text-gray-700 text-sm">
                    Investment gains may be subject to taxes, which can significantly impact your actual returns over time.
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2">Withdrawing Early</h4>
                  <p className="text-gray-700 text-sm">
                    Early withdrawals not only reduce your principal but also eliminate future compound growth on that amount.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-blue-600">Strategies to Maximize Compound Interest</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                To harness the full power of compound interest, consider these proven strategies that successful investors use to build wealth over time:
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-800 mb-2">Start Early, Even with Small Amounts</h4>
                  <p className="text-gray-700">
                    Time is your greatest asset when it comes to compound interest. Starting with $50 monthly at age 20 can result in 
                    more wealth than starting with $500 monthly at age 40, assuming the same return rate.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-800 mb-2">Reinvest All Earnings</h4>
                  <p className="text-gray-700">
                    Never withdraw your interest or dividends. Instead, reinvest them to purchase more shares or increase your principal, 
                    allowing compound interest to work on increasingly larger amounts.
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-800 mb-2">Choose Higher Frequency Compounding</h4>
                  <p className="text-gray-700">
                    When possible, choose investments that compound more frequently. Daily compounding typically outperforms annual 
                    compounding, though the difference diminishes with higher compounding frequencies.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="bg-white/70 backdrop-blur-sm shadow-xl">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl flex items-center">
                <HelpCircle className="mr-3 h-7 w-7" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription className="text-orange-100 text-lg">
                Get answers to the most common questions about compound interest
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-start">
                      <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      {faq.question}
                    </h3>
                    <p className="text-gray-700 leading-relaxed ml-9">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CompoundInterest;
