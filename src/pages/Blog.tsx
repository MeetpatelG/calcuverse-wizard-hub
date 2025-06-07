
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Blog = () => {
  const blogPosts = [
    {
      title: "Essential Financial Planning Tools Every Smart Investor Uses in 2024",
      description: "Discover the most powerful financial calculators and planning tools that can transform your wealth-building strategy and help you achieve financial freedom faster.",
      slug: "financial-planning-tools-2024",
      category: "Financial Planning",
      publishDate: "2024-06-07",
      readTime: "8 min read",
      image: "/placeholder.svg",
      featured: true
    },
    {
      title: "Complete Guide to Budget Calculators: Take Control of Your Finances",
      description: "Learn how to use budget calculators effectively to track expenses, plan savings, and achieve your financial goals with practical tips and strategies.",
      slug: "budget-calculator-guide",
      category: "Budgeting",
      publishDate: "2024-06-06",
      readTime: "6 min read",
      image: "/placeholder.svg",
      featured: false
    },
    {
      title: "Investment Calculator Strategies: Maximize Your Returns in 2024",
      description: "Master investment calculations with compound interest, risk assessment, and portfolio optimization techniques that professional investors use.",
      slug: "investment-calculator-strategies",
      category: "Investment",
      publishDate: "2024-06-05",
      readTime: "7 min read",
      image: "/placeholder.svg",
      featured: false
    },
    {
      title: "Mortgage Calculator Mastery: Find Your Perfect Home Loan",
      description: "Navigate mortgage calculations, compare loan options, and understand how different factors affect your monthly payments and total interest.",
      slug: "mortgage-calculator-mastery",
      category: "Real Estate",
      publishDate: "2024-06-04",
      readTime: "9 min read",
      image: "/placeholder.svg",
      featured: false
    },
    {
      title: "Tax Calculator Tips: Optimize Your Tax Planning Strategy",
      description: "Discover advanced tax calculation techniques, deduction strategies, and year-end planning tips to minimize your tax burden legally.",
      slug: "tax-calculator-optimization",
      category: "Tax Planning",
      publishDate: "2024-06-03",
      readTime: "5 min read",
      image: "/placeholder.svg",
      featured: false
    },
    {
      title: "Compound Interest Calculator: The 8th Wonder of the World Explained",
      description: "Understand the power of compound interest with real examples, calculations, and strategies to accelerate your wealth building journey.",
      slug: "compound-interest-explained",
      category: "Investment",
      publishDate: "2024-06-02",
      readTime: "6 min read",
      image: "/placeholder.svg",
      featured: false
    },
    {
      title: "Business Profit Margin Calculator: Boost Your Bottom Line",
      description: "Learn to calculate and improve profit margins, understand markup vs margin, and implement pricing strategies that maximize profitability.",
      slug: "profit-margin-calculator-guide",
      category: "Business",
      publishDate: "2024-06-01",
      readTime: "7 min read",
      image: "/placeholder.svg",
      featured: false
    },
    {
      title: "Personal Finance Calculator Suite: Your Complete Financial Toolkit",
      description: "Explore essential personal finance calculators including emergency fund, debt payoff, and retirement planning tools for financial success.",
      slug: "personal-finance-calculator-suite",
      category: "Personal Finance",
      publishDate: "2024-05-31",
      readTime: "8 min read",
      image: "/placeholder.svg",
      featured: false
    },
    {
      title: "Scientific Calculator Functions: Advanced Mathematical Operations",
      description: "Master scientific calculator functions for complex calculations, trigonometry, logarithms, and statistical operations in academic and professional settings.",
      slug: "scientific-calculator-functions",
      category: "Mathematics",
      publishDate: "2024-05-30",
      readTime: "6 min read",
      image: "/placeholder.svg",
      featured: false
    },
    {
      title: "Unit Converter Calculator: Master International Measurements",
      description: "Navigate global measurements with confidence using unit conversion techniques for length, weight, temperature, and currency calculations.",
      slug: "unit-converter-calculator",
      category: "Mathematics",
      publishDate: "2024-05-29",
      readTime: "4 min read",
      image: "/placeholder.svg",
      featured: false
    },
    {
      title: "Financial Independence Calculator: Your Path to Early Retirement",
      description: "Calculate your FIRE number, understand withdrawal rates, and create a roadmap to financial independence with proven mathematical strategies.",
      slug: "financial-independence-calculator",
      category: "Retirement Planning",
      publishDate: "2024-05-28",
      readTime: "10 min read",
      image: "/placeholder.svg",
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <BookOpen className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Financial Planning Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Expert insights, tips, and strategies to help you master your finances and build lasting wealth
            </p>
          </div>

          <div className="space-y-8">
            {blogPosts.map((post) => (
              <Card key={post.slug} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        {post.featured && <Badge variant="secondary">Featured</Badge>}
                        <Badge variant="outline">{post.category}</Badge>
                      </div>
                      <CardTitle className="text-2xl hover:text-primary transition-colors">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </CardTitle>
                      <CardDescription className="text-base line-clamp-3">
                        {post.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(post.publishDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {post.readTime}
                          </div>
                        </div>
                        <Link 
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 text-primary hover:underline"
                        >
                          Read More <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
