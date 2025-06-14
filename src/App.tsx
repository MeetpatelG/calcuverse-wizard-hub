
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { I18nProvider } from "./i18n/I18nProvider";

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
import SocialMedia from "./pages/categories/SocialMedia";
import EngagementRate from "./pages/social-media/EngagementRate";
import FollowerGrowthRate from "./pages/social-media/FollowerGrowthRate";
import Reach from "./pages/social-media/Reach";
import Impression from "./pages/social-media/Impression";
import HashtagPerformance from "./pages/social-media/HashtagPerformance";
import ShareRate from "./pages/social-media/ShareRate";
import FacebookEngagement from "./pages/social-media/FacebookEngagement";
import TwitterEngagement from "./pages/social-media/TwitterEngagement";
import YouTubeVideoPerformance from "./pages/social-media/YouTubeVideoPerformance";
import LinkedinPostEngagement from "./pages/social-media/LinkedinPostEngagement";

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
import BodyFat from "./pages/personal/BodyFat";
import IdealWeight from "./pages/personal/IdealWeight";
import BMR from "./pages/personal/BMR";
import WaterIntake from "./pages/personal/WaterIntake";
import BBTOvulation from "./pages/personal/BBTOvulation";
import WaistHipRatio from "./pages/personal/WaistHipRatio";

// Mathematical Calculators
import Scientific from "./pages/mathematical/Scientific";
import UnitConverter from "./pages/mathematical/UnitConverter";
import Percentage from "./pages/mathematical/Percentage";
import DateCalculator from "./pages/mathematical/Date";
import QuadraticEquation from "./pages/mathematical/QuadraticEquation";
import PrimeChecker from "./pages/mathematical/PrimeChecker";
import GcdLcm from "./pages/mathematical/GcdLcm";
import PercentageChange from "./pages/mathematical/PercentageChange";
import Probability from "./pages/mathematical/Probability";
import Factorial from "./pages/mathematical/Factorial";
import PrimeFactorization from "./pages/mathematical/PrimeFactorization";
import ScientificNotation from "./pages/mathematical/ScientificNotation";

// Business Calculators
import BreakEven from "./pages/business/BreakEven";
import ROI from "./pages/business/ROI";
import BusinessValuation from "./pages/business/BusinessValuation";
import CashFlow from "./pages/business/CashFlow";
import BurnRate from "./pages/business/BurnRate";
import InventoryTurnover from "./pages/business/InventoryTurnover";
import EmployeeCost from "./pages/business/EmployeeCost";
import ProfitMargin from "./pages/business/ProfitMargin";
import CustomerLifetimeValue from "./pages/business/CustomerLifetimeValue";
import GrossProfit from "./pages/business/GrossProfit";

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

// PDF Tools
import PDFToWord from "./pages/pdf/PDFToWord";
import WordToPDF from "./pages/pdf/WordToPDF";
import PDFToExcel from "./pages/pdf/PDFToExcel";
import ExcelToPDF from "./pages/pdf/ExcelToPDF";
import PDFToPPT from "./pages/pdf/PDFToPPT";
import PPTToPDF from "./pages/pdf/PPTToPDF";
import Merge from "./pages/pdf/Merge";
import Split from "./pages/pdf/Split";
import Compress from "./pages/pdf/Compress";
import Editor from "./pages/pdf/Editor";
import Viewer from "./pages/pdf/Viewer";
import Rotate from "./pages/pdf/Rotate";
import PageRemover from "./pages/pdf/PageRemover";
import AddPageNumbers from "./pages/pdf/AddPageNumbers";
import AddWatermark from "./pages/pdf/AddWatermark";
import PasswordProtect from "./pages/pdf/PasswordProtect";
import Unlock from "./pages/pdf/Unlock";
import PDFToImage from "./pages/pdf/PDFToImage";
import ImageToPDF from "./pages/pdf/ImageToPDF";
import OCR from "./pages/pdf/OCR";

// Placeholder tool pages
import ImageConverterIndex from "./pages/image-converter/Index";
import JpgToPng from "./pages/image-converter/JpgToPng";
import PngToJpg from "./pages/image-converter/PngToJpg";
import WebpToJpg from "./pages/image-converter/WebpToJpg";
import JpgToWebp from "./pages/image-converter/JpgToWebp";
import PngToWebp from "./pages/image-converter/PngToWebp";
import GifToJpg from "./pages/image-converter/GifToJpg";
import GifToPng from "./pages/image-converter/GifToPng";
import BmpToJpg from "./pages/image-converter/BmpToJpg";
import TiffToJpg from "./pages/image-converter/TiffToJpg";
import HeicToJpg from "./pages/image-converter/HeicToJpg";
import SvgToPng from "./pages/image-converter/SvgToPng";
import SvgToJpg from "./pages/image-converter/SvgToJpg";
import ImageToPdf from "./pages/image-converter/ImageToPdf";
import ImageResizer from "./pages/image-converter/ImageResizer";
import ImageCompressor from "./pages/image-converter/ImageCompressor";
import ImageFormatConverter from "./pages/image-converter/ImageFormatConverter";
import ImageCrop from "./pages/image-converter/ImageCrop";
import ImageRotator from "./pages/image-converter/ImageRotator";
import BatchImageConverter from "./pages/image-converter/BatchImageConverter";
import ImageColorConverter from "./pages/image-converter/ImageColorConverter";

const queryClient = new QueryClient();

const App = () => (
  <I18nProvider>
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
            <Route path="/social-media" element={<SocialMedia />} />
            <Route path="/social-media/engagement-rate" element={<EngagementRate />} />
            <Route path="/social-media/follower-growth-rate" element={<FollowerGrowthRate />} />
            <Route path="/social-media/reach" element={<Reach />} />
            <Route path="/social-media/impression" element={<Impression />} />
            <Route path="/social-media/hashtag-performance" element={<HashtagPerformance />} />
            <Route path="/social-media/share-rate" element={<ShareRate />} />
            <Route path="/social-media/facebook-engagement" element={<FacebookEngagement />} />
            <Route path="/social-media/twitter-engagement" element={<TwitterEngagement />} />
            <Route path="/social-media/youtube-video-performance" element={<YouTubeVideoPerformance />} />
            <Route path="/social-media/linkedin-post-engagement" element={<LinkedinPostEngagement />} />
            
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
            <Route path="/personal/body-fat" element={<BodyFat />} />
            <Route path="/personal/ideal-weight" element={<IdealWeight />} />
            <Route path="/personal/bmr" element={<BMR />} />
            <Route path="/personal/water-intake" element={<WaterIntake />} />
            <Route path="/personal/bbt-ovulation" element={<BBTOvulation />} />
            <Route path="/personal/waist-hip-ratio" element={<WaistHipRatio />} />
            
            {/* Mathematical Calculator Routes */}
            <Route path="/mathematical/scientific" element={<Scientific />} />
            <Route path="/mathematical/unit-converter" element={<UnitConverter />} />
            <Route path="/mathematical/percentage" element={<Percentage />} />
            <Route path="/mathematical/date" element={<DateCalculator />} />
            <Route path="/mathematical/quadratic-equation" element={<QuadraticEquation />} />
            <Route path="/mathematical/prime-checker" element={<PrimeChecker />} />
            <Route path="/mathematical/gcd-lcm" element={<GcdLcm />} />
            <Route path="/mathematical/percentage-change" element={<PercentageChange />} />
            <Route path="/mathematical/probability" element={<Probability />} />
            <Route path="/mathematical/factorial" element={<Factorial />} />
            <Route path="/mathematical/prime-factorization" element={<PrimeFactorization />} />
            <Route path="/mathematical/scientific-notation" element={<ScientificNotation />} />
            
            {/* Business Calculator Routes */}
            <Route path="/business/profit-margin" element={<ProfitMargin />} />
            <Route path="/business/break-even" element={<BreakEven />} />
            <Route path="/business/roi" element={<ROI />} />
            <Route path="/business/business-valuation" element={<BusinessValuation />} />
            <Route path="/business/cash-flow" element={<CashFlow />} />
            <Route path="/business/burn-rate" element={<BurnRate />} />
            <Route path="/business/inventory-turnover" element={<InventoryTurnover />} />
            <Route path="/business/employee-cost" element={<EmployeeCost />} />
            <Route path="/business/customer-lifetime-value" element={<CustomerLifetimeValue />} />
            <Route path="/business/gross-profit" element={<GrossProfit />} />
            
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
            
            {/* PDF Tool Routes */}
            <Route path="/pdf/pdf-to-word" element={<PDFToWord />} />
            <Route path="/pdf/word-to-pdf" element={<WordToPDF />} />
            <Route path="/pdf/pdf-to-excel" element={<PDFToExcel />} />
            <Route path="/pdf/excel-to-pdf" element={<ExcelToPDF />} />
            <Route path="/pdf/pdf-to-ppt" element={<PDFToPPT />} />
            <Route path="/pdf/ppt-to-pdf" element={<PPTToPDF />} />
            <Route path="/pdf/merge" element={<Merge />} />
            <Route path="/pdf/split" element={<Split />} />
            <Route path="/pdf/compress" element={<Compress />} />
            <Route path="/pdf/editor" element={<Editor />} />
            <Route path="/pdf/viewer" element={<Viewer />} />
            <Route path="/pdf/rotate" element={<Rotate />} />
            <Route path="/pdf/page-remover" element={<PageRemover />} />
            <Route path="/pdf/add-page-numbers" element={<AddPageNumbers />} />
            <Route path="/pdf/add-watermark" element={<AddWatermark />} />
            <Route path="/pdf/password-protect" element={<PasswordProtect />} />
            <Route path="/pdf/unlock" element={<Unlock />} />
            <Route path="/pdf/pdf-to-image" element={<PDFToImage />} />
            <Route path="/pdf/image-to-pdf" element={<ImageToPDF />} />
            <Route path="/pdf/ocr" element={<OCR />} />
            
            {/* Image Converter Category and Tool Routes */}
            <Route path="/image-converter" element={<ImageConverterIndex />} />
            <Route path="/image-converter/jpg-to-png" element={<JpgToPng />} />
            <Route path="/image-converter/png-to-jpg" element={<PngToJpg />} />
            <Route path="/image-converter/webp-to-jpg" element={<WebpToJpg />} />
            <Route path="/image-converter/jpg-to-webp" element={<JpgToWebp />} />
            <Route path="/image-converter/png-to-webp" element={<PngToWebp />} />
            <Route path="/image-converter/gif-to-jpg" element={<GifToJpg />} />
            <Route path="/image-converter/gif-to-png" element={<GifToPng />} />
            <Route path="/image-converter/bmp-to-jpg" element={<BmpToJpg />} />
            <Route path="/image-converter/tiff-to-jpg" element={<TiffToJpg />} />
            <Route path="/image-converter/heic-to-jpg" element={<HeicToJpg />} />
            <Route path="/image-converter/svg-to-png" element={<SvgToPng />} />
            <Route path="/image-converter/svg-to-jpg" element={<SvgToJpg />} />
            <Route path="/image-converter/image-to-pdf" element={<ImageToPdf />} />
            <Route path="/image-converter/image-resizer" element={<ImageResizer />} />
            <Route path="/image-converter/image-compressor" element={<ImageCompressor />} />
            <Route path="/image-converter/image-format-converter" element={<ImageFormatConverter />} />
            <Route path="/image-converter/image-crop" element={<ImageCrop />} />
            <Route path="/image-converter/image-rotator" element={<ImageRotator />} />
            <Route path="/image-converter/batch-image-converter" element={<BatchImageConverter />} />
            <Route path="/image-converter/image-color-converter" element={<ImageColorConverter />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </I18nProvider>
);

export default App;
