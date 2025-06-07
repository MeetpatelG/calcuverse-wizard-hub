
import { Calendar, Clock, Share2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const InvestmentCalculatorStrategies = () => {
  const post = {
    title: "Investment Calculator Strategies: Maximize Your Returns in 2024",
    description: "Master investment calculations with compound interest, risk assessment, and portfolio optimization techniques that professional investors use.",
    category: "Investment",
    publishDate: "2024-06-05",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop"
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground">Home</Link> / 
            <Link to="/blog" className="hover:text-foreground">Blog</Link> / 
            <span className="text-foreground">Investment Calculator Strategies</span>
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
                <h2 className="text-2xl font-bold mb-4">Professional Investment Calculation Techniques</h2>
                <p className="text-muted-foreground mb-4">
                  Professional investors rely on sophisticated calculations to make informed decisions. Learn the same techniques they use to evaluate opportunities and maximize returns.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Key Investment Metrics to Calculate</h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Return on Investment (ROI)</li>
                  <li>Compound Annual Growth Rate (CAGR)</li>
                  <li>Risk-adjusted returns</li>
                  <li>Portfolio diversification ratios</li>
                  <li>Dollar-cost averaging benefits</li>
                </ul>
              </section>

              <div className="bg-primary/10 p-8 rounded-lg text-center">
                <h3 className="text-2xl font-bold mb-4">Start Calculating Your Investment Returns</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Use our investment calculator to plan your portfolio and maximize returns.
                </p>
                <Link to="/financial/investment">
                  <Button size="lg">Try Investment Calculator</Button>
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

export default InvestmentCalculatorStrategies;
