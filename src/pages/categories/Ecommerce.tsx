
import { ShoppingCart, Calculator, TrendingUp, Percent } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Ecommerce = () => {
  const calculators = [
    {
      title: "Shipping Cost Calculator",
      description: "Calculate shipping costs based on weight, distance, and delivery options",
      icon: ShoppingCart,
      path: "/ecommerce/shipping-cost",
      color: "text-blue-600"
    },
    {
      title: "Product Pricing Calculator",
      description: "Determine optimal product pricing with costs, margins, and competitive analysis",
      icon: Calculator,
      path: "/ecommerce/product-pricing",
      color: "text-green-600"
    },
    {
      title: "E-commerce Profit Calculator",
      description: "Calculate net profit including all fees, costs, and taxes for online sales",
      icon: TrendingUp,
      path: "/ecommerce/profit-calculator",
      color: "text-purple-600"
    },
    {
      title: "Conversion Rate Calculator",
      description: "Track and optimize your website's conversion rates and performance metrics",
      icon: Percent,
      path: "/ecommerce/conversion-rate",
      color: "text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link> / <span className="text-foreground">E-commerce Calculators</span>
        </div>

        <div className="text-center mb-8">
          <ShoppingCart className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">E-commerce Calculators</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Optimize your online business with powerful e-commerce calculation tools for pricing, shipping, profits, and performance.
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

export default Ecommerce;
