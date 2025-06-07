
import { Home, Calculator, TrendingUp, DollarSign, PiggyBank, FileText, BarChart3, Building, Percent, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const RealEstate = () => {
  const calculators = [
    {
      title: "Property Value Calculator",
      description: "Estimate property value based on location, size, and market conditions",
      icon: Home,
      path: "/real-estate/property-value",
      color: "text-blue-600"
    },
    {
      title: "Rent Affordability Calculator",
      description: "Determine how much rent you can afford based on your income and expenses",
      icon: Calculator,
      path: "/real-estate/rent-affordability",
      color: "text-green-600"
    },
    {
      title: "Mortgage Payment Calculator",
      description: "Calculate monthly mortgage payments including principal, interest, taxes, and insurance",
      icon: DollarSign,
      path: "/real-estate/mortgage-payment",
      color: "text-purple-600"
    },
    {
      title: "Investment Analysis Calculator",
      description: "Analyze real estate investment returns, cash flow, and ROI potential",
      icon: TrendingUp,
      path: "/real-estate/investment-analysis",
      color: "text-orange-600"
    },
    {
      title: "Down Payment Calculator",
      description: "Calculate how much down payment you need and monthly savings required",
      icon: PiggyBank,
      path: "/real-estate/down-payment",
      color: "text-pink-600"
    },
    {
      title: "Closing Costs Calculator",
      description: "Estimate total closing costs for buying or selling a property",
      icon: FileText,
      path: "/real-estate/closing-costs",
      color: "text-cyan-600"
    },
    {
      title: "Cap Rate Calculator",
      description: "Calculate capitalization rate for investment property analysis",
      icon: BarChart3,
      path: "/real-estate/cap-rate",
      color: "text-red-600"
    },
    {
      title: "Rental Yield Calculator",
      description: "Calculate rental yield and return on investment for rental properties",
      icon: Building,
      path: "/real-estate/rental-yield",
      color: "text-indigo-600"
    },
    {
      title: "Refinance Calculator",
      description: "Determine if refinancing your mortgage will save you money",
      icon: Percent,
      path: "/real-estate/refinance",
      color: "text-yellow-600"
    },
    {
      title: "Amortization Schedule",
      description: "View detailed payment schedule showing principal and interest breakdown",
      icon: Clock,
      path: "/real-estate/amortization",
      color: "text-emerald-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link> / <span className="text-foreground">Real Estate Calculators</span>
        </div>

        <div className="text-center mb-8">
          <Home className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Real Estate Calculators</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Make informed real estate decisions with powerful calculation tools for property valuation, affordability, and investment analysis.
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

export default RealEstate;
