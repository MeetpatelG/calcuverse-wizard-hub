
import { useState } from "react";
import { Baby } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PregnancyCalculatorForm, { PregnancyData } from "./PregnancyCalculatorForm";
import PregnancyResultsCard from "./PregnancyResultsCard";
import PregnancyCalculatorArticle from "./PregnancyCalculatorArticle";

const Pregnancy = () => {
  const [result, setResult] = useState<PregnancyData | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-bl from-white via-rose-50 to-blue-50">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Baby className="h-16 w-16 text-primary mx-auto mb-4" />
            {/* Featured image for visual appeal */}
            <div className="flex justify-center mb-5">
              <img
                src="/photo-1649972904349-6e44c42644a7"
                alt="Woman sitting on a bed using a laptop"
                className="rounded-2xl shadow-lg border border-pink-50 max-w-full w-[340px] md:w-[400px] h-auto"
                width="400"
                height="256"
                loading="lazy"
              />
            </div>
            <h1 className="text-4xl font-bold mb-4">Pregnancy Calculator</h1>
            <p className="text-xl text-muted-foreground">
              Calculate your due date and track your pregnancy progress
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <PregnancyCalculatorForm onCalculate={setResult} />
            {result && <PregnancyResultsCard result={result} />}
          </div>

          <div>
            <PregnancyCalculatorArticle />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pregnancy;
