
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Financial Calculators
import LoanEMI from "./pages/financial/LoanEMI";
import Mortgage from "./pages/financial/Mortgage";
import Investment from "./pages/financial/Investment";

// Personal Calculators
import BMI from "./pages/personal/BMI";
import Age from "./pages/personal/Age";

// Mathematical Calculators
import Scientific from "./pages/mathematical/Scientific";
import UnitConverter from "./pages/mathematical/UnitConverter";

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
          
          {/* Financial Calculator Routes */}
          <Route path="/financial/loan-emi" element={<LoanEMI />} />
          <Route path="/financial/mortgage" element={<Mortgage />} />
          <Route path="/financial/investment" element={<Investment />} />
          
          {/* Personal Calculator Routes */}
          <Route path="/personal/bmi" element={<BMI />} />
          <Route path="/personal/age" element={<Age />} />
          
          {/* Mathematical Calculator Routes */}
          <Route path="/mathematical/scientific" element={<Scientific />} />
          <Route path="/mathematical/unit-converter" element={<UnitConverter />} />
          
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
