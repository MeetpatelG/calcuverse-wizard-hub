
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DebtPayoffCalculator from "@/components/financial/DebtPayoffCalculator";

const DebtPayoff = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <a href="/" className="hover:text-foreground">Home</a> / <a href="/financial" className="hover:text-foreground">Financial Calculators</a> / <span className="text-foreground">Debt Payoff Calculator</span>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Debt Payoff Calculator</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how long it will take to pay off your debt and explore different repayment strategies.
          </p>
        </div>
        <div className="flex flex-col items-center max-w-xl mx-auto">
          <DebtPayoffCalculator />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DebtPayoff;
