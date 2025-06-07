
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Legal Pages
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

// Category Pages
import Financial from "./pages/categories/Financial";
import Personal from "./pages/categories/Personal";
import Mathematical from "./pages/categories/Mathematical";
import Business from "./pages/categories/Business";

// Financial Calculators
import LoanEMI from "./pages/financial/LoanEMI";
import Mortgage from "./pages/financial/Mortgage";
import Investment from "./pages/financial/Investment";
import Tax from "./pages/financial/Tax";
import CompoundInterest from "./pages/financial/CompoundInterest";

// Personal Calculators
import BMI from "./pages/personal/BMI";
import Age from "./pages/personal/Age";
import Calorie from "./pages/personal/Calorie";
import Pregnancy from "./pages/personal/Pregnancy";

// Mathematical Calculators
import Scientific from "./pages/mathematical/Scientific";
import UnitConverter from "./pages/mathematical/UnitConverter";
import Percentage from "./pages/mathematical/Percentage";
import DateCalculator from "./pages/mathematical/Date";

// Business Calculators
import ProfitMargin from "./pages/business/ProfitMargin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Legal Pages */}
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          
          {/* Category Overview Routes */}
          <Route path="/financial" element={<Financial />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/mathematical" element={<Mathematical />} />
          <Route path="/business" element={<Business />} />
          
          {/* Financial Calculator Routes */}
          <Route path="/financial/loan-emi" element={<LoanEMI />} />
          <Route path="/financial/mortgage" element={<Mortgage />} />
          <Route path="/financial/investment" element={<Investment />} />
          <Route path="/financial/tax" element={<Tax />} />
          <Route path="/financial/compound-interest" element={<CompoundInterest />} />
          
          {/* Personal Calculator Routes */}
          <Route path="/personal/bmi" element={<BMI />} />
          <Route path="/personal/age" element={<Age />} />
          <Route path="/personal/calorie" element={<Calorie />} />
          <Route path="/personal/pregnancy" element={<Pregnancy />} />
          
          {/* Mathematical Calculator Routes */}
          <Route path="/mathematical/scientific" element={<Scientific />} />
          <Route path="/mathematical/unit-converter" element={<UnitConverter />} />
          <Route path="/mathematical/percentage" element={<Percentage />} />
          <Route path="/mathematical/date" element={<DateCalculator />} />
          
          {/* Business Calculator Routes */}
          <Route path="/business/profit-margin" element={<ProfitMargin />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
