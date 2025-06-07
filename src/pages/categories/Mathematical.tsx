
import { Calculator, Ruler } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Mathematical = () => {
  const calculators = [
    {
      title: "Scientific Calculator",
      description: "Perform advanced mathematical calculations with scientific functions",
      icon: Calculator,
      path: "/mathematical/scientific",
      color: "text-blue-600"
    },
    {
      title: "Unit Converter",
      description: "Convert between different units of measurement",
      icon: Ruler,
      path: "/mathematical/unit-converter",
      color: "text-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link> / <span className="text-foreground">Mathematical Calculators</span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Mathematical Calculators</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Solve complex mathematical problems with our advanced calculation tools.
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

export default Mathematical;
