import { Calculator, CreditCard, Home, TrendingUp, Percent, PiggyBank, Receipt, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Financial = () => {
  const calculators = [
    {
      title: "Budget Calculator",
      description: "Plan and track your monthly budget to achieve financial goals",
      icon: PiggyBank,
      path: "/financial/budget",
      color: "text-green-600"
    },
    {
      title: "Loan EMI Calculator",
      description: "Calculate your Equated Monthly Installment for loans",
      icon: CreditCard,
      path: "/financial/loan-emi",
      color: "text-blue-600"
    },
    {
      title: "Mortgage Calculator",
      description: "Calculate your monthly mortgage payments and total interest",
      icon: Home,
      path: "/financial/mortgage",
      color: "text-purple-600"
    },
    {
      title: "Investment Calculator",
      description: "Calculate the future value of your investments with compound returns",
      icon: TrendingUp,
      path: "/financial/investment",
      color: "text-orange-600"
    },
    {
      title: "Tax Calculator",
      description: "Calculate your income tax and take-home pay accurately",
      icon: Receipt,
      path: "/financial/tax",
      color: "text-red-600"
    },
    {
      title: "Compound Interest Calculator",
      description: "Calculate the power of compound interest on your investments",
      icon: Percent,
      path: "/financial/compound-interest",
      color: "text-teal-600"
    },
    // -------------- NEW TOOLS ---------------
    {
      title: "Savings Goal Calculator",
      description: "Calculate required monthly savings to achieve a financial goal",
      icon: PiggyBank,
      path: "/financial/savings-goal",
      color: "text-lime-600"
    },
    {
      title: "Debt Payoff Calculator",
      description: "Plan your debt repayment timeline and total interest paid",
      icon: CreditCard,
      path: "/financial/debt-payoff",
      color: "text-pink-700"
    },
    {
      title: "Retirement Calculator",
      description: "Estimate your future retirement savings and plan accordingly",
      icon: TrendingUp,
      path: "/financial/retirement",
      color: "text-amber-900"
    },
    {
      title: "Net Worth Calculator",
      description: "Compute your total assets minus liabilities (net worth)",
      icon: DollarSign,
      path: "/financial/net-worth",
      color: "text-gray-900"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link> / <span className="text-foreground">Financial Calculators</span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Financial Calculators</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Make informed financial decisions with our comprehensive collection of financial calculators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc) => (
            <Link key={calc.path} to={calc.path}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <calc.icon className={`h-8 w-8 ${calc.color}`} />
                    <CardTitle className="text-lg">{calc.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {calc.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Financial;
