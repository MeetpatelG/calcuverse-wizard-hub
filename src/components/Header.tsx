
import { useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, Menu, X, Search, Globe } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigationItems = [
    {
      title: "Financial",
      items: [
        { name: "Loan EMI Calculator", href: "/financial/loan-emi" },
        { name: "Mortgage Calculator", href: "/financial/mortgage" },
        { name: "Investment Calculator", href: "/financial/investment" },
        { name: "Tax Calculator", href: "/financial/tax" },
        { name: "Budget Planner", href: "/financial/budget" },
        { name: "Compound Interest", href: "/financial/compound-interest" }
      ]
    },
    {
      title: "Personal",
      items: [
        { name: "Age Calculator", href: "/personal/age" },
        { name: "BMI Calculator", href: "/personal/bmi" },
        { name: "Calorie Calculator", href: "/personal/calorie" },
        { name: "Pregnancy Calculator", href: "/personal/pregnancy" }
      ]
    },
    {
      title: "Mathematical",
      items: [
        { name: "Scientific Calculator", href: "/mathematical/scientific" },
        { name: "Unit Converter", href: "/mathematical/unit-converter" },
        { name: "Percentage Calculator", href: "/mathematical/percentage" },
        { name: "Date Calculator", href: "/mathematical/date" }
      ]
    },
    {
      title: "Business",
      items: [
        { name: "Profit Margin", href: "/business/profit-margin" },
        { name: "Break-even Point", href: "/business/break-even" },
        { name: "ROI Calculator", href: "/business/roi" }
      ]
    }
  ];

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Calculator className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">CalcHub</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
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
              placeholder="Search calculators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Language Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <Globe className="h-4 w-4 mr-2" />
                EN
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Español</DropdownMenuItem>
              <DropdownMenuItem>Français</DropdownMenuItem>
              <DropdownMenuItem>Deutsch</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
                  placeholder="Search calculators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
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
