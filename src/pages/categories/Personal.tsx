
import { User, Calendar, Flame, HeartPulse, Scale, Droplet, GlassWater, Gauge, Egg } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Personal = () => {
  const calculators = [
    {
      title: "BMI Calculator",
      description: "Calculate your Body Mass Index and assess your health status",
      icon: User,
      path: "/personal/bmi",
      color: "text-blue-600"
    },
    {
      title: "Age Calculator",
      description: "Calculate your exact age in years, months, days, and more",
      icon: Calendar,
      path: "/personal/age",
      color: "text-green-600"
    },
    {
      title: "Calorie Calculator",
      description: "Estimate your daily calorie needs based on activity and goals",
      icon: Flame,
      path: "/personal/calorie",
      color: "text-orange-500"
    },
    {
      title: "Pregnancy Due Date Calculator",
      description: "Find your expected delivery date and pregnancy schedule",
      icon: Egg,
      path: "/personal/pregnancy",
      color: "text-pink-400"
    },
    {
      title: "Body Fat Calculator",
      description: "Estimate your body fat percentage using measurements",
      icon: HeartPulse,
      path: "/personal/body-fat",
      color: "text-red-500"
    },
    {
      title: "Ideal Weight Calculator",
      description: "Calculate your ideal body weight using several formulas",
      icon: Scale,
      path: "/personal/ideal-weight",
      color: "text-indigo-500"
    },
    {
      title: "BMR Calculator",
      description: "Calculate your Basal Metabolic Rate to understand your metabolism",
      icon: Gauge,
      path: "/personal/bmr",
      color: "text-fuchsia-500"
    },
    {
      title: "Water Intake Calculator",
      description: "Find how much water you should drink daily for health",
      icon: GlassWater,
      path: "/personal/water-intake",
      color: "text-sky-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link> / <span className="text-foreground">Personal Calculators</span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Personal Calculators</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track and calculate personal metrics to maintain a healthy lifestyle.
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

export default Personal;
