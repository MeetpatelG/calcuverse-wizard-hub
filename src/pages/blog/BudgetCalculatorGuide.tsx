
import { Calendar, Clock, Share2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const BudgetCalculatorGuide = () => {
  const post = {
    title: "Complete Guide to Budget Calculators: Take Control of Your Finances",
    description: "Learn how to use budget calculators effectively to track expenses, plan savings, and achieve your financial goals with practical tips and strategies.",
    category: "Budgeting",
    publishDate: "2024-06-06",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1554224154-26032fced8bd?w=800&h=400&fit=crop"
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground">Home</Link> / 
            <Link to="/blog" className="hover:text-foreground">Blog</Link> / 
            <span className="text-foreground">Budget Calculator Guide</span>
          </div>

          <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <article className="prose prose-lg max-w-none">
            <header className="mb-8">
              <Badge variant="outline" className="mb-4">{post.category}</Badge>
              <h1 className="text-4xl font-bold mb-4 leading-tight">{post.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{post.description}</p>
              
              <div className="flex items-center justify-between border-b border-border pb-6 mb-8">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.publishDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </header>

            {/* Featured Image */}
            <div className="mb-8">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">Why Budget Calculators Are Essential</h2>
                <p className="text-muted-foreground mb-4">
                  Budget calculators are powerful tools that help you visualize your financial situation, track spending patterns, and make informed decisions about your money. They transform complex financial data into actionable insights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Key Features of Effective Budget Calculators</h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Income tracking and categorization</li>
                  <li>Expense monitoring by category</li>
                  <li>Savings goal planning</li>
                  <li>Debt payment tracking</li>
                  <li>Visual reports and charts</li>
                </ul>
              </section>

              <div className="bg-primary/10 p-8 rounded-lg text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Start Budgeting?</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Use our comprehensive budget calculator to take control of your finances today.
                </p>
                <Link to="/financial/budget">
                  <Button size="lg">Try Budget Calculator</Button>
                </Link>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BudgetCalculatorGuide;
