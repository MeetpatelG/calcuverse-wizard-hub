
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BodyFatCalculator from "@/components/personal/BodyFatCalculator";

const BodyFat = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <a href="/" className="hover:text-foreground">Home</a> / <a href="/personal" className="hover:text-foreground">Personal Calculators</a> / <span className="text-foreground">Body Fat Calculator</span>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Body Fat Calculator</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estimate your body fat percentage using the US Navy or BMI formula.
          </p>
        </div>
        <div className="flex flex-col items-center max-w-xl mx-auto">
          <BodyFatCalculator />
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default BodyFat;
