import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calculator, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useI18n } from "../i18n/I18nProvider";

// --- NEW SEARCHABLE DATA ---

// Matches featuredCalculators and categories from homepage logic

const homepageFeaturedCalculators = [
  { 
    name: "Loan EMI Calculator", 
    route: "/financial/loan-emi"
  },
  { 
    name: "BMI Calculator",
    route: "/personal/bmi"
  },
  { 
    name: "Scientific Calculator",
    route: "/mathematical/scientific"
  },
  { 
    name: "Profit Margin Calculator",
    route: "/business/profit-margin"
  }
];

const homepageCategories = [
  {
    title: "Financial Calculators",
    route: "/financial",
    calculators: [
      { name: "Loan EMI", route: "/financial/loan-emi" },
      { name: "Mortgage", route: "/financial/mortgage" },
      { name: "Investment Returns", route: "/financial/investment" },
      { name: "Tax", route: "/financial/tax" },
      { name: "Budget Planner", route: "/financial/budget" },
      { name: "Compound Interest", route: "/financial/compound-interest" },
      { name: "Savings Goal Calculator", route: "/financial/savings-goal" },
      { name: "Debt Payoff Calculator", route: "/financial/debt-payoff" },
      { name: "Retirement Calculator", route: "/financial/retirement" },
      { name: "Net Worth Calculator", route: "/financial/net-worth" }
    ]
  },
  {
    title: "Personal Calculators",
    route: "/personal",
    calculators: [
      { name: "Age Calculator", route: "/personal/age" },
      { name: "BMI Calculator", route: "/personal/bmi" },
      { name: "Calorie Calculator", route: "/personal/calorie" },
      { name: "Pregnancy Due Date", route: "/personal/pregnancy" }
    ]
  },
  {
    title: "Mathematical Calculators",
    route: "/mathematical",
    calculators: [
      { name: "Scientific Calculator", route: "/mathematical/scientific" },
      { name: "Unit Converter", route: "/mathematical/unit-converter" },
      { name: "Quadratic Equation Solver", route: "/mathematical/quadratic-equation" },
      { name: "Prime Number Checker", route: "/mathematical/prime-checker" },
      { name: "GCD & LCM Calculator", route: "/mathematical/gcd-lcm" },
      { name: "Percentage Change Calculator", route: "/mathematical/percentage-change" },
      { name: "Probability Calculator", route: "/mathematical/probability" },
      { name: "Factorial Calculator", route: "/mathematical/factorial" },
      { name: "Prime Factorization Calculator", route: "/mathematical/prime-factorization" },
      { name: "Scientific Notation Converter", route: "/mathematical/scientific-notation" }
    ]
  },
  {
    title: "Business Calculators",
    route: "/business",
    calculators: [
      { name: "Profit Margin", route: "/business/profit-margin" },
      { name: "Break-even Point Calculator", route: "/business/break-even" },
      { name: "ROI Calculator", route: "/business/roi" },
      { name: "Business Valuation Calculator", route: "/business/business-valuation" },
      { name: "Cash Flow Calculator", route: "/business/cash-flow" },
      { name: "Startup Burn Rate Calculator", route: "/business/burn-rate" },
      { name: "Inventory Turnover Calculator", route: "/business/inventory-turnover" },
      { name: "Employee Cost Calculator", route: "/business/employee-cost" },
      { name: "Customer Lifetime Value Calculator", route: "/business/customer-lifetime-value" },
      { name: "Gross Profit Calculator", route: "/business/gross-profit" }
    ]
  },
  {
    title: "E-commerce Calculators",
    route: "/ecommerce",
    calculators: [
      { name: "Shipping Cost Calculator", route: "/ecommerce/shipping-cost" },
      { name: "Product Pricing Calculator", route: "/ecommerce/product-pricing" },
      { name: "E-commerce Profit Calculator", route: "/ecommerce/profit-calculator" },
      { name: "Conversion Rate Calculator", route: "/ecommerce/conversion-rate" },
      // New tools
      { name: "Coupon Discount Calculator", route: "/ecommerce/coupon-discount" },
      { name: "Sales Tax Calculator", route: "/ecommerce/sales-tax" },
      { name: "Average Order Value Calculator", route: "/ecommerce/average-order-value" },
      { name: "Cart Abandonment Rate Calculator", route: "/ecommerce/cart-abandonment" },
      { name: "Return on Ad Spend (ROAS) Calculator", route: "/ecommerce/roas" },
      { name: "Inventory Cost Calculator", route: "/ecommerce/inventory-cost" },
    ]
  },
  {
    title: "Real Estate Calculators",
    route: "/real-estate",
    calculators: [
      { name: "Property Value", route: "/real-estate/property-value" },
      { name: "Rent Affordability", route: "/real-estate/rent-affordability" },
      { name: "Mortgage Payment", route: "/real-estate/mortgage-payment" },
      { name: "Investment Analysis", route: "/real-estate/investment-analysis" }
    ]
  },
  {
    title: "Social Media Calculators",
    route: "/social-media",
    calculators: [
      { name: "Engagement Rate Calculator", route: "/social-media/engagement-rate" },
      { name: "Follower Growth Rate Calculator", route: "/social-media/follower-growth-rate" },
      { name: "Reach Calculator", route: "/social-media/reach" },
      { name: "Impression Calculator", route: "/social-media/impression" },
      { name: "Hashtag Performance Calculator", route: "/social-media/hashtag-performance" },
      { name: "Share Rate Calculator", route: "/social-media/share-rate" },
      { name: "Facebook Engagement Calculator", route: "/social-media/facebook-engagement" },
      { name: "Twitter Engagement Calculator", route: "/social-media/twitter-engagement" },
      { name: "YouTube Video Performance Calculator", route: "/social-media/youtube-video-performance" },
      { name: "LinkedIn Post Engagement Calculator", route: "/social-media/linkedin-post-engagement" }
    ]
  },
  {
    title: "Image Converter",
    route: "/image-converter",
    calculators: [
      { name: "JPG to PNG Converter", route: "/image-converter/jpg-to-png" },
      { name: "PNG to JPG Converter", route: "/image-converter/png-to-jpg" },
      { name: "WEBP to JPG Converter", route: "/image-converter/webp-to-jpg" },
      { name: "JPG to WEBP Converter", route: "/image-converter/jpg-to-webp" },
      { name: "PNG to WEBP Converter", route: "/image-converter/png-to-webp" },
      { name: "GIF to JPG Converter", route: "/image-converter/gif-to-jpg" },
      { name: "GIF to PNG Converter", route: "/image-converter/gif-to-png" },
      { name: "BMP to JPG Converter", route: "/image-converter/bmp-to-jpg" },
      { name: "TIFF to JPG Converter", route: "/image-converter/tiff-to-jpg" },
      { name: "HEIC to JPG Converter", route: "/image-converter/heic-to-jpg" },
      { name: "SVG to PNG Converter", route: "/image-converter/svg-to-png" },
      { name: "SVG to JPG Converter", route: "/image-converter/svg-to-jpg" },
      { name: "Image to PDF Converter", route: "/image-converter/image-to-pdf" },
      { name: "Image Resizer", route: "/image-converter/image-resizer" },
      { name: "Image Compressor", route: "/image-converter/image-compressor" },
      { name: "Image Format Converter", route: "/image-converter/image-format-converter" },
      { name: "Image Crop Tool", route: "/image-converter/image-crop" },
      { name: "Image Rotator", route: "/image-converter/image-rotator" },
      { name: "Batch Image Converter", route: "/image-converter/batch-image-converter" },
      { name: "Image Color Converter", route: "/image-converter/image-color-converter" }
    ]
  }
];

// Flattened searchable calculators list for header search:
const getAllSearchableCalculators = () => {
  const calcFromCats = homepageCategories.flatMap(cat =>
    cat.calculators.map(calc => ({
      name: calc.name,
      route: calc.route || cat.route // fallback to category route
    }))
  );
  // Add featured calculators if not duplicates
  const unique = new Map();
  [...calcFromCats, ...homepageFeaturedCalculators].forEach(item => {
    if (!unique.has(item.name)) unique.set(item.name, item);
  });
  return Array.from(unique.values());
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // --- SEARCH LOGIC ---
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1); // for keyboard nav
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const { t } = useI18n();

  // Build searchable calculators list
  const calculatorsList = getAllSearchableCalculators();

  // Filtered suggestions by search query
  const query = searchQuery.trim().toLowerCase();
  const suggestions = query
    ? calculatorsList.filter(item =>
        item.name.toLowerCase().includes(query)
      ).slice(0, 7)
    : [];

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(!!e.target.value);
    setHighlightIndex(-1);
  };

  // Handle suggestion selection (mouse or Enter)
  const handleSelectSuggestion = (index: number) => {
    const suggestion = suggestions[index];
    if (suggestion) {
      navigate(suggestion.route);
      setShowSuggestions(false);
      setSearchQuery("");
    }
  };

  // Handle keyboard (up/down/enter/esc)
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex(i => Math.min(i + 1, suggestions.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex(i => Math.max(i - 1, 0));
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0 && highlightIndex < suggestions.length) {
        handleSelectSuggestion(highlightIndex);
      } else if (suggestions.length > 0) {
        handleSelectSuggestion(0); // default: select first
      }
    }
    if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  // Hide suggestions when clicking outside
  useEffect(() => {
    if (!showSuggestions) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [showSuggestions]);

  const navigationItems = [
    {
      title: t("Financial"),
      items: [
        { name: t("Loan EMI Calculator"), href: "/financial/loan-emi" },
        { name: t("Mortgage Calculator"), href: "/financial/mortgage" },
        { name: t("Investment Calculator"), href: "/financial/investment" },
        { name: t("Tax Calculator"), href: "/financial/tax" },
        { name: t("Budget Planner"), href: "/financial/budget" },
        { name: t("Compound Interest"), href: "/financial/compound-interest" },
        { name: t("Savings Goal Calculator"), href: "/financial/savings-goal" },
        { name: t("Debt Payoff Calculator"), href: "/financial/debt-payoff" },
        { name: t("Retirement Calculator"), href: "/financial/retirement" },
        { name: t("Net Worth Calculator"), href: "/financial/net-worth" }
      ]
    },
    {
      title: t("Personal"),
      items: [
        { name: t("BMI Calculator"), href: "/personal/bmi" },
        { name: t("Age Calculator"), href: "/personal/age" },
        { name: t("Calorie Calculator"), href: "/personal/calorie" },
        { name: t("Pregnancy Due Date Calculator"), href: "/personal/pregnancy" },
        { name: t("Body Fat Calculator"), href: "/personal/body-fat" },
        { name: t("Ideal Weight Calculator"), href: "/personal/ideal-weight" },
        { name: t("BMR Calculator"), href: "/personal/bmr" },
        { name: t("Water Intake Calculator"), href: "/personal/water-intake" },
        { name: t("BBT Ovulation Calculator"), href: "/personal/bbt-ovulation" },
        { name: t("Waist-to-Hip Ratio Calculator"), href: "/personal/waist-hip-ratio" },
      ]
    },
    {
      title: t("Mathematical"),
      items: [
        { name: t("Scientific Calculator"), href: "/mathematical/scientific" },
        { name: t("Unit Converter"), href: "/mathematical/unit-converter" },
        { name: t("Quadratic Equation Solver"), href: "/mathematical/quadratic-equation" },
        { name: t("Prime Number Checker"), href: "/mathematical/prime-checker" },
        { name: t("GCD & LCM Calculator"), href: "/mathematical/gcd-lcm" },
        { name: t("Percentage Change Calculator"), href: "/mathematical/percentage-change" },
        { name: t("Probability Calculator"), href: "/mathematical/probability" },
        { name: t("Factorial Calculator"), href: "/mathematical/factorial" },
        { name: t("Prime Factorization Calculator"), href: "/mathematical/prime-factorization" },
        { name: t("Scientific Notation Converter"), href: "/mathematical/scientific-notation" }
      ]
    },
    {
      title: t("Business"),
      items: [
        { name: t("Profit Margin Calculator"), href: "/business/profit-margin" },
        { name: t("Break-even Point Calculator"), href: "/business/break-even" },
        { name: t("ROI Calculator"), href: "/business/roi" },
        { name: t("Business Valuation Calculator"), href: "/business/business-valuation" },
        { name: t("Cash Flow Calculator"), href: "/business/cash-flow" },
        { name: t("Startup Burn Rate Calculator"), href: "/business/burn-rate" },
        { name: t("Inventory Turnover Calculator"), href: "/business/inventory-turnover" },
        { name: t("Employee Cost Calculator"), href: "/business/employee-cost" },
        { name: t("Customer Lifetime Value Calculator"), href: "/business/customer-lifetime-value" },
        { name: t("Gross Profit Calculator"), href: "/business/gross-profit" }
      ]
    },
    {
      title: t("E-commerce"),
      items: [
        { name: t("Shipping Cost Calculator"), href: "/ecommerce/shipping-cost" },
        { name: t("Product Pricing Calculator"), href: "/ecommerce/product-pricing" },
        { name: t("E-commerce Profit Calculator"), href: "/ecommerce/profit-calculator" },
        { name: t("Conversion Rate Calculator"), href: "/ecommerce/conversion-rate" },
        // New tools
        { name: "Coupon Discount Calculator", href: "/ecommerce/coupon-discount" },
        { name: "Sales Tax Calculator", href: "/ecommerce/sales-tax" },
        { name: "Average Order Value Calculator", href: "/ecommerce/average-order-value" },
        { name: "Cart Abandonment Rate Calculator", href: "/ecommerce/cart-abandonment" },
        { name: "Return on Ad Spend (ROAS) Calculator", href: "/ecommerce/roas" },
        { name: "Inventory Cost Calculator", href: "/ecommerce/inventory-cost" },
      ]
    },
    {
      title: t("Real Estate"),
      items: [
        { name: t("Property Value"), href: "/real-estate/property-value" },
        { name: t("Rent Affordability"), href: "/real-estate/rent-affordability" },
        { name: t("Mortgage Payment"), href: "/real-estate/mortgage-payment" },
        { name: t("Investment Analysis"), href: "/real-estate/investment-analysis" },
        { name: t("Down Payment"), href: "/real-estate/down-payment" },
        { name: t("Closing Costs"), href: "/real-estate/closing-costs" },
        { name: t("Cap Rate"), href: "/real-estate/cap-rate" },
        { name: t("Rental Yield"), href: "/real-estate/rental-yield" },
        { name: t("Refinance"), href: "/real-estate/refinance" },
        { name: t("Amortization"), href: "/real-estate/amortization" }
      ]
    },
    {
      title: t("Social Media"),
      items: [
        { name: t("Engagement Rate Calculator"), href: "/social-media/engagement-rate" },
        { name: t("Follower Growth Rate Calculator"), href: "/social-media/follower-growth-rate" },
        { name: t("Reach Calculator"), href: "/social-media/reach" },
        { name: t("Impression Calculator"), href: "/social-media/impression" },
        { name: t("Hashtag Performance Calculator"), href: "/social-media/hashtag-performance" },
        { name: t("Share Rate Calculator"), href: "/social-media/share-rate" },
        { name: t("Facebook Engagement Calculator"), href: "/social-media/facebook-engagement" },
        { name: t("Twitter Engagement Calculator"), href: "/social-media/twitter-engagement" },
        { name: t("YouTube Video Performance Calculator"), href: "/social-media/youtube-video-performance" },
        { name: t("LinkedIn Post Engagement Calculator"), href: "/social-media/linkedin-post-engagement" }
      ]
    },
    {
      title: t("Image Converter"),
      items: [
        { name: t("JPG to PNG Converter"), href: "/image-converter/jpg-to-png" },
        { name: t("PNG to JPG Converter"), href: "/image-converter/png-to-jpg" },
        { name: t("WEBP to JPG Converter"), href: "/image-converter/webp-to-jpg" },
        { name: t("JPG to WEBP Converter"), href: "/image-converter/jpg-to-webp" },
        { name: t("PNG to WEBP Converter"), href: "/image-converter/png-to-webp" },
        { name: t("GIF to JPG Converter"), href: "/image-converter/gif-to-jpg" },
        { name: t("GIF to PNG Converter"), href: "/image-converter/gif-to-png" },
        { name: t("BMP to JPG Converter"), href: "/image-converter/bmp-to-jpg" },
        { name: t("TIFF to JPG Converter"), href: "/image-converter/tiff-to-jpg" },
        { name: t("HEIC to JPG Converter"), href: "/image-converter/heic-to-jpg" },
        { name: t("SVG to PNG Converter"), href: "/image-converter/svg-to-png" },
        { name: t("SVG to JPG Converter"), href: "/image-converter/svg-to-jpg" },
        { name: t("Image to PDF Converter"), href: "/image-converter/image-to-pdf" },
        { name: t("Image Resizer"), href: "/image-converter/image-resizer" },
        { name: t("Image Compressor"), href: "/image-converter/image-compressor" },
        { name: t("Image Format Converter"), href: "/image-converter/image-format-converter" },
        { name: t("Image Crop Tool"), href: "/image-converter/image-crop" },
        { name: t("Image Rotator"), href: "/image-converter/image-rotator" },
        { name: t("Batch Image Converter"), href: "/image-converter/batch-image-converter" },
        { name: t("Image Color Converter"), href: "/image-converter/image-color-converter" }
      ]
    }
    // No PDF entry
  ];

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Calculator className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">{t("site.title")}</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                  >
                    {t("Home") || "Home"}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              {navigationItems.map((category) => (
                <NavigationMenuItem key={category.title}>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    {category.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                      {category.items.map((item) => (
                        <NavigationMenuLink key={item.name} asChild>
                          <Link
                            to={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{item.name}</div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search Bar */}
          <div className="hidden md:flex relative max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              ref={inputRef}
              type="text"
              placeholder={t("search.placeholder")}
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(!!searchQuery)}
              onKeyDown={handleInputKeyDown}
              className="pl-10"
              autoComplete="off"
            />
            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div
                ref={suggestionRef}
                className="absolute top-full left-0 z-50 mt-2 w-full bg-white border border-gray-200 rounded shadow-lg max-h-80 overflow-y-auto"
                role="listbox"
              >
                {suggestions.map((item, idx) => (
                  <div
                    key={item.name}
                    role="option"
                    aria-selected={idx === highlightIndex}
                    className={`
                      px-4 py-2 cursor-pointer flex items-center transition 
                      ${idx === highlightIndex ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-gray-100'}
                    `}
                    onMouseDown={e => {
                      // Prevent input blur
                      e.preventDefault();
                      handleSelectSuggestion(idx);
                    }}
                    onMouseEnter={() => setHighlightIndex(idx)}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* REMOVED Language Toggle Section */}
          {/* <div className="hidden md:flex">
            <LanguageSelector />
          </div> */}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder={t("search.placeholder")}
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={() => setShowSuggestions(!!searchQuery)}
                  onKeyDown={handleInputKeyDown}
                  className="pl-10"
                  autoComplete="off"
                />
                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div
                    ref={suggestionRef}
                    className="absolute top-full left-0 z-50 mt-2 w-full bg-white border border-gray-200 rounded shadow-lg max-h-80 overflow-y-auto"
                    role="listbox"
                  >
                    {suggestions.map((item, idx) => (
                      <div
                        key={item.name + "-mobile"}
                        role="option"
                        aria-selected={idx === highlightIndex}
                        className={`
                          px-4 py-2 cursor-pointer flex items-center transition 
                          ${idx === highlightIndex ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-gray-100'}
                        `}
                        onMouseDown={e => {
                          e.preventDefault();
                          handleSelectSuggestion(idx);
                        }}
                        onMouseEnter={() => setHighlightIndex(idx)}
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* REMOVED Language Selector for Mobile */}
              {/* <div className="flex justify-end">
                <LanguageSelector />
              </div> */}

              {/* Home Link for Mobile */}
              <div>
                <Link
                  to="/"
                  className="block text-base font-semibold py-2 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("Home") || "Home"}
                </Link>
              </div>

              {/* Mobile Navigation */}
              {navigationItems.map((category) => (
                <div key={category.title}>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-2">{category.title}</h3>
                  <div className="space-y-1 ml-4">
                    {category.items.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block text-sm py-2 hover:text-primary"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
