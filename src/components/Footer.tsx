
import { Link } from "react-router-dom";
import { Calculator, Mail, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    {
      title: "Financial Calculators",
      links: [
        { name: "Loan EMI Calculator", href: "/financial/loan-emi" },
        { name: "Mortgage Calculator", href: "/financial/mortgage" },
        { name: "Investment Calculator", href: "/financial/investment" },
        { name: "Tax Calculator", href: "/financial/tax" }
      ]
    },
    {
      title: "Personal Calculators",
      links: [
        { name: "Age Calculator", href: "/personal/age" },
        { name: "BMI Calculator", href: "/personal/bmi" },
        { name: "Calorie Calculator", href: "/personal/calorie" },
        { name: "Pregnancy Calculator", href: "/personal/pregnancy" }
      ]
    },
    {
      title: "Mathematical",
      links: [
        { name: "Scientific Calculator", href: "/mathematical/scientific" },
        { name: "Unit Converter", href: "/mathematical/unit-converter" },
        { name: "Percentage Calculator", href: "/mathematical/percentage" },
        { name: "Date Calculator", href: "/mathematical/date" }
      ]
    }
  ];

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Calculator className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">CalcHub</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              The ultimate destination for all your calculation needs. From financial planning to scientific computations, 
              we provide accurate, fast, and user-friendly calculators for every situation.
            </p>
            
            {/* Newsletter Subscription */}
            <div className="space-y-3">
              <h3 className="font-semibold">Stay Updated</h3>
              <div className="flex space-x-2">
                <Input placeholder="Enter your email" className="max-w-xs" />
                <Button size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          {quickLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.href} 
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright and Links */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-muted-foreground">
                © {currentYear} CalcHub. All rights reserved.
              </p>
              <div className="flex space-x-4 text-sm">
                <Link to="/privacy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-muted-foreground hover:text-primary">
                  Terms & Conditions
                </Link>
                <Link to="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
