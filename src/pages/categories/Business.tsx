
import { BarChart3, LineChart, DollarSign, Briefcase, TrendingUp, Activity, Calculator, Users2, Repeat2, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const calculators = [
  {
    title: "Profit Margin Calculator",
    description: "Calculate profit, profit margin, and markup percentage for your business",
    icon: BarChart3,
    path: "/business/profit-margin",
    color: "text-blue-600"
  },
  {
    title: "Break-even Point Calculator",
    description: "Find the number of units or sales needed to break even.",
    icon: LineChart,
    path: "/business/break-even",
    color: "text-green-600"
  },
  {
    title: "ROI Calculator",
    description: "Calculate the Return on Investment for your business initiatives.",
    icon: DollarSign,
    path: "/business/roi",
    color: "text-yellow-600"
  },
  {
    title: "Business Valuation Calculator",
    description: "Estimate your business's value using earnings and multiples.",
    icon: Briefcase,
    path: "/business/business-valuation",
    color: "text-violet-600"
  },
  {
    title: "Cash Flow Calculator",
    description: "Assess your business cash inflows and outflows.",
    icon: Activity,
    path: "/business/cash-flow",
    color: "text-cyan-600"
  },
  {
    title: "Startup Burn Rate Calculator",
    description: "Understand your startup's burn rate and runway.",
    icon: TrendingUp,
    path: "/business/burn-rate",
    color: "text-rose-600"
  },
  {
    title: "Inventory Turnover Calculator",
    description: "Calculate your inventory turnover ratio and efficiency.",
    icon: Repeat2,
    path: "/business/inventory-turnover",
    color: "text-orange-500"
  },
  {
    title: "Employee Cost Calculator",
    description: "Compute your total employee costs (salary, taxes, and benefits).",
    icon: Users2,
    path: "/business/employee-cost",
    color: "text-emerald-600"
  },
  {
    title: "Customer Lifetime Value Calculator",
    description: "Estimate how much revenue a business can expect from a customer over their lifecycle.",
    icon: UserCheck,
    path: "/business/customer-lifetime-value",
    color: "text-indigo-600"
  },
  {
    title: "Gross Profit Calculator",
    description: "Calculate your gross profit based on revenue and cost of goods sold.",
    icon: DollarSign, // Changed from DollarCircle to DollarSign (supported icon)
    path: "/business/gross-profit",
    color: "text-fuchsia-600"
  }
];

const Business = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link> / <span className="text-foreground">Business Calculators</span>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Business Calculators</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Optimize your business decisions with professional calculation tools.
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
                  <CardDescription className="text-base">{calc.description}</CardDescription>
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

export default Business;

