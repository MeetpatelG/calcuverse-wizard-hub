
import { BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Business = () => {
  const calculators = [
    {
      title: "Profit Margin Calculator",
      description: "Calculate profit, profit margin, and markup percentage for your business",
      icon: BarChart3,
      path: "/business/profit-margin",
      color: "text-blue-600"
    }
  ];

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

export default Business;
