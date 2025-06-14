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
      
      <div className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link> / 
          <Link to="/financial" className="hover:text-foreground"> Financial</Link> / 
          <span className="text-foreground"> Compound Interest Calculator</span>
        </div>

        <div className="max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            {/* Removed the infographic image (hero) */}
            <div className="flex flex-col items-center mb-6">
              <div className="bg-gradient-to-r from-green-500 to-blue-600 p-4 rounded-full">
                <TrendingUp className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Compound Interest Calculator
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl sm:max-w-3xl mx-auto mb-6 md:mb-8">
              Harness the power of compound interest to grow your wealth exponentially. Calculate how your investments 
              can multiply over time with our comprehensive compound interest calculator.
            </p>
          </div>

          {/* Calculator Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-12">
            <Card className="bg-white/70 backdrop-blur-sm shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg p-4 sm:p-6">
                <CardTitle className="flex items-center">
                  <Calculator className="mr-3 h-6 w-6" />
                  Investment Calculator
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Enter your investment parameters to see the magic of compounding
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-5 md:space-y-6 p-4 sm:p-6">
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
                    className="text-base sm:text-lg"
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
                    className="text-base sm:text-lg"
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
                    className="text-base sm:text-lg"
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
                    className="w-full p-2 sm:p-3 border border-input bg-background rounded-md text-base sm:text-lg"
                  >
                    <option value="1">Annually (1x per year)</option>
                    <option value="2">Semi-annually (2x per year)</option>
                    <option value="4">Quarterly (4x per year)</option>
                    <option value="12">Monthly (12x per year)</option>
                    <option value="365">Daily (365x per year)</option>
                  </select>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
                  <Button onClick={calculateCompoundInterest} className="flex-1 text-base sm:text-lg py-3">
                    Calculate Growth
                  </Button>
                  <Button variant="outline" onClick={clearForm} className="text-base sm:text-lg py-3 mt-2 sm:mt-0">
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {result && (
              <Card className="bg-white/70 backdrop-blur-sm shadow-xl mt-4 lg:mt-0">
                <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg p-4 sm:p-6">
                  <CardTitle className="flex items-center">
                    <Target className="mr-3 h-6 w-6" />
                    Your Investment Results
                  </CardTitle>
                  <CardDescription className="text-green-100">
                    See how your money grows with compound interest
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 md:space-y-6 p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                    <div className="text-center p-4 sm:p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
                      <p className="text-sm text-muted-foreground mb-2">Final Amount</p>
                      <p className="text-2xl sm:text-3xl font-bold text-green-600">
                        ${result.finalAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
                      <p className="text-sm text-muted-foreground mb-2">Total Interest Earned</p>
                      <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                        ${result.totalInterest.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Compound growth chart */}
                  <div>
                    <h4 className="font-semibold text-base sm:text-lg flex items-center mb-2">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Compound Growth Over Time
                    </h4>
                    <ResponsiveContainer width="100%" height={160} minHeight={120} className="sm:!h-[220px]">
                      <LineChart
                        data={result.yearlyBreakdown}
                        margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" tickFormatter={(y) => `Y${y}`} style={{ fontSize: "12px" }} />
                        <YAxis tickFormatter={(v) => `$${v.toLocaleString()}`} style={{ fontSize: "12px" }} />
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
                    <h4 className="font-semibold text-base sm:text-lg flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Year-by-Year Growth
                    </h4>
                    <div className="max-h-44 sm:max-h-60 overflow-y-auto space-y-2">
                      {result.yearlyBreakdown.map((year) => (
                        <div
                          key={year.year}
                          className="flex justify-between items-center p-2 sm:p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border"
                        >
                          <span className="font-medium">Year {year.year}</span>
                          <div className="text-right">
                            <div className="text-xs sm:text-sm font-semibold">${year.amount.toLocaleString()}</div>
                            <div className="text-[10px] sm:text-xs text-muted-foreground">
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
          <Card className="mb-10 md:mb-12 bg-white/70 backdrop-blur-sm shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
              <CardTitle className="text-lg sm:text-xl md:text-2xl">Understanding Compound Interest: The Eighth Wonder of the World</CardTitle>
              <CardDescription className="text-purple-100 text-base sm:text-lg">
                Master the concept that Einstein allegedly called "the most powerful force in the universe"
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 md:p-8 prose prose-sm sm:prose-base max-w-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-6 md:mb-8">
                <div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4 text-blue-600">What Makes Compound Interest So Powerful?</h3>
                  <p className="text-gray-700 leading-relaxed mb-2 sm:mb-4">
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
                {/* Removed the infographic for educational section */}
              </div>
              {/* ... keep existing code (rest of CardContent - headings, tips, and strategies) the same ... */}
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="bg-white/70 backdrop-blur-sm shadow-xl">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-lg">
              <CardTitle className="text-lg sm:text-xl md:text-2xl flex items-center">
                <HelpCircle className="mr-3 h-7 w-7" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription className="text-orange-100 text-base sm:text-lg">
                Get answers to the most common questions about compound interest
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-8">
              <div className="space-y-4 sm:space-y-6">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 sm:p-6 rounded-lg border border-gray-200"
                  >
                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-800 flex items-start">
                      <span className="bg-blue-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm mr-2 sm:mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      {faq.question}
                    </h3>
                    <p className="text-gray-700 leading-relaxed ml-7 sm:ml-9">{faq.answer}</p>
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
