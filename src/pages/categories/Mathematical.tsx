
import { Calculator, Ruler, SquareDot, PercentCircle, Divide, Plus, Hash, ChevronRight, CircleDashed, Sigma, Equal } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
  },
  {
    title: "Quadratic Equation Solver",
    description: "Find real roots of ax² + bx + c = 0 with step-by-step solution.",
    icon: SquareDot,
    path: "/mathematical/quadratic-equation",
    color: "text-rose-600"
  },
  {
    title: "Prime Number Checker",
    description: "Check if a number is prime quickly and efficiently.",
    icon: Hash,
    path: "/mathematical/prime-checker",
    color: "text-yellow-600"
  },
  {
    title: "GCD & LCM Calculator",
    description: "Find Greatest Common Divisor and Lowest Common Multiple.",
    icon: Divide,
    path: "/mathematical/gcd-lcm",
    color: "text-sky-600"
  },
  {
    title: "Percentage Change Calculator",
    description: "Calculate percentage increase or decrease between two values.",
    icon: PercentCircle,
    path: "/mathematical/percentage-change",
    color: "text-orange-600"
  },
  {
    title: "Probability Calculator",
    description: "Find the probability of an event (simple calculator).",
    icon: CircleDashed,
    path: "/mathematical/probability",
    color: "text-indigo-600"
  },
  {
    title: "Factorial Calculator",
    description: "Compute factorial values for integers up to 170.",
    icon: Plus,
    path: "/mathematical/factorial",
    color: "text-teal-600"
  },
  {
    title: "Prime Factorization Calculator",
    description: "Break down any integer into its prime factors with step-by-step details.",
    icon: Sigma,
    path: "/mathematical/prime-factorization",
    color: "text-fuchsia-600"
  },
  {
    title: "Scientific Notation Converter",
    description: "Convert numbers between decimal and scientific notation, with explanations.",
    icon: Equal,
    path: "/mathematical/scientific-notation",
    color: "text-emerald-600"
  }
];

const Mathematical = () => {
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
