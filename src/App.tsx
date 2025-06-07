
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Financial Calculators
import LoanEMI from "./pages/financial/LoanEMI";

// Personal Calculators
import BMI from "./pages/personal/BMI";

// Mathematical Calculators
import Scientific from "./pages/mathematical/Scientific";

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
          
          {/* Personal Calculator Routes */}
          <Route path="/personal/bmi" element={<BMI />} />
          
          {/* Mathematical Calculator Routes */}
          <Route path="/mathematical/scientific" element={<Scientific />} />
          
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
