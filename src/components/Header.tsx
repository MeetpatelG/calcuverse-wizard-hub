import { useState } from "react";
import { Link } from "react-router-dom";
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
// Removed LanguageSelector import
import { useI18n } from "../i18n/I18nProvider";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useI18n();

  const navigationItems = [
    {
      title: t("Financial"),
      items: [
        { name: t("Loan EMI Calculator"), href: "/financial/loan-emi" },
        { name: t("Mortgage Calculator"), href: "/financial/mortgage" },
        { name: t("Investment Calculator"), href: "/financial/investment" },
        { name: t("Tax Calculator"), href: "/financial/tax" },
        { name: t("Budget Planner"), href: "/financial/budget" },
        { name: t("Compound Interest"), href: "/financial/compound-interest" }
      ]
    },
    {
      title: t("Personal"),
      items: [
        { name: t("Age Calculator"), href: "/personal/age" },
        { name: t("BMI Calculator"), href: "/personal/bmi" },
        { name: t("Calorie Calculator"), href: "/personal/calorie" },
        { name: t("Pregnancy Calculator"), href: "/personal/pregnancy" }
      ]
    },
    {
      title: t("Mathematical"),
      items: [
        { name: t("Scientific Calculator"), href: "/mathematical/scientific" },
        { name: t("Unit Converter"), href: "/mathematical/unit-converter" },
        { name: t("Percentage Calculator"), href: "/mathematical/percentage" },
        { name: t("Date Calculator"), href: "/mathematical/date" }
      ]
    },
    {
      title: t("Business"),
      items: [
        { name: t("Profit Margin"), href: "/business/profit-margin" },
        { name: t("Break-even Point"), href: "/business/break-even" },
        { name: t("ROI Calculator"), href: "/business/roi" }
      ]
    },
    {
      title: t("E-commerce"),
      items: [
        { name: t("Shipping Cost"), href: "/ecommerce/shipping-cost" },
        { name: t("Product Pricing"), href: "/ecommerce/product-pricing" },
        { name: t("Profit Calculator"), href: "/ecommerce/profit-calculator" },
        { name: t("Conversion Rate"), href: "/ecommerce/conversion-rate" }
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
        { name: t("Engagement Rate Calculator"), href: "/social-media/engagement-rate" }
        // Add more calculators here in the future
      ]
    }
    // PDF Converter category removed from navigationItems
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
              {/* Home Link */}
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
              {/* Existing and new category dropdowns */}
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
              type="text"
              placeholder={t("search.placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
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
                  type="text"
                  placeholder={t("search.placeholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
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
