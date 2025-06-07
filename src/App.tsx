
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

// Blog Pages
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BudgetCalculatorGuide from "./pages/blog/BudgetCalculatorGuide";
import InvestmentCalculatorStrategies from "./pages/blog/InvestmentCalculatorStrategies";

// Category Pages
import Financial from "./pages/categories/Financial";
import Personal from "./pages/categories/Personal";
import Mathematical from "./pages/categories/Mathematical";
import Business from "./pages/categories/Business";
import Ecommerce from "./pages/categories/Ecommerce";
import RealEstate from "./pages/categories/RealEstate";

// Financial Calculators
import Budget from "./pages/financial/Budget";
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

// E-commerce Calculators
import ShippingCost from "./pages/ecommerce/ShippingCost";
import ProductPricing from "./pages/ecommerce/ProductPricing";
import ProfitCalculator from "./pages/ecommerce/ProfitCalculator";
import ConversionRate from "./pages/ecommerce/ConversionRate";

// Real Estate Calculators
import PropertyValue from "./pages/real-estate/PropertyValue";
import RentAffordability from "./pages/real-estate/RentAffordability";
import MortgagePayment from "./pages/real-estate/MortgagePayment";
import InvestmentAnalysis from "./pages/real-estate/InvestmentAnalysis";
import DownPayment from "./pages/real-estate/DownPayment";
import ClosingCosts from "./pages/real-estate/ClosingCosts";
import CapRate from "./pages/real-estate/CapRate";
import RentalYield from "./pages/real-estate/RentalYield";
import Refinance from "./pages/real-estate/Refinance";
import Amortization from "./pages/real-estate/Amortization";

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
          
          {/* Blog Pages */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/financial-planning-tools-2024" element={<BlogPost />} />
          <Route path="/blog/budget-calculator-guide" element={<BudgetCalculatorGuide />} />
          <Route path="/blog/investment-calculator-strategies" element={<InvestmentCalculatorStrategies />} />
          
          {/* Category Overview Routes */}
          <Route path="/financial" element={<Financial />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/mathematical" element={<Mathematical />} />
          <Route path="/business" element={<Business />} />
          <Route path="/ecommerce" element={<Ecommerce />} />
          <Route path="/real-estate" element={<RealEstate />} />
          
          {/* Financial Calculator Routes */}
          <Route path="/financial/budget" element={<Budget />} />
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
          
          {/* E-commerce Calculator Routes */}
          <Route path="/ecommerce/shipping-cost" element={<ShippingCost />} />
          <Route path="/ecommerce/product-pricing" element={<ProductPricing />} />
          <Route path="/ecommerce/profit-calculator" element={<ProfitCalculator />} />
          <Route path="/ecommerce/conversion-rate" element={<ConversionRate />} />
          
          {/* Real Estate Calculator Routes */}
          <Route path="/real-estate/property-value" element={<PropertyValue />} />
          <Route path="/real-estate/rent-affordability" element={<RentAffordability />} />
          <Route path="/real-estate/mortgage-payment" element={<MortgagePayment />} />
          <Route path="/real-estate/investment-analysis" element={<InvestmentAnalysis />} />
          <Route path="/real-estate/down-payment" element={<DownPayment />} />
          <Route path="/real-estate/closing-costs" element={<ClosingCosts />} />
          <Route path="/real-estate/cap-rate" element={<CapRate />} />
          <Route path="/real-estate/rental-yield" element={<RentalYield />} />
          <Route path="/real-estate/refinance" element={<Refinance />} />
          <Route path="/real-estate/amortization" element={<Amortization />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
