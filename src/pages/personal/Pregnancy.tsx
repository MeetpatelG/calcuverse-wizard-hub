
import { useState } from "react";
import { Baby, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PregnancyCalculatorForm, { PregnancyData } from "./PregnancyCalculatorForm";
import PregnancyResultsCard from "./PregnancyResultsCard";
import PregnancyCalculatorArticle from "./PregnancyCalculatorArticle";

const Pregnancy = () => {
  const [result, setResult] = useState<PregnancyData | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-bl from-white via-rose-50 to-blue-50 flex flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl mx-auto animate-fade-in">
          <div className="text-center mb-10 animate-scale-in">
            <Baby className="h-16 w-16 text-primary mx-auto mb-4 bg-pink-50 p-2 rounded-full shadow-sm" />
            {/* Featured image for visual appeal */}
            <div className="flex justify-center mb-5">
              <img
                src="/photo-1649972904349-6e44c42644a7.jpg"
                alt="Woman sitting on a bed using a laptop"
                className="rounded-2xl shadow-lg border-2 border-pink-100 max-w-full w-[340px] md:w-[400px] h-auto"
                width="400"
                height="256"
                loading="lazy"
              />
            </div>
            <h1 className="text-4xl font-bold mb-3 tracking-tight text-pink-700 drop-shadow">
              Pregnancy Calculator
            </h1>
            <p className="text-xl text-muted-foreground mb-3">
              Calculate your due date and track your pregnancy progress
            </p>
            {/* Motivational Quote */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
              <span className="italic text-pink-600 font-medium">"Every pregnancy is a unique journey – let's make yours special."</span>
              <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="animate-fade-in">
              <PregnancyCalculatorForm onCalculate={setResult} />
            </div>
            <div className={`${result ? "animate-scale-in" : "opacity-60"} transition-all`}>
              {result && <PregnancyResultsCard result={result} />}
            </div>
          </div>

          <div className="animate-fade-in">
            <PregnancyCalculatorArticle />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pregnancy;

