
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BBTOvulationCalculator from "@/components/personal/BBTOvulationCalculator";

const BBTOvulation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <a href="/" className="hover:text-foreground">Home</a> / <a href="/personal" className="hover:text-foreground">Personal Calculators</a> / <span className="text-foreground">BBT Ovulation Calculator</span>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">BBT Ovulation Calculator</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Predict your ovulation and fertile window using your basal body temperature (BBT) pattern and cycle dates.
          </p>
        </div>
        <div className="flex flex-col items-center max-w-xl mx-auto">
          <BBTOvulationCalculator />
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default BBTOvulation;
