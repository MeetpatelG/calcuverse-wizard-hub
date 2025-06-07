
import { Calendar, Clock, Share2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BlogContent from "@/components/blog/BlogContent";
import BlogFAQ from "@/components/blog/BlogFAQ";
import BlogInfographic from "@/components/blog/BlogInfographic";

const BlogPost = () => {
  const post = {
    title: "Essential Financial Planning Tools Every Smart Investor Uses in 2024",
    description: "Discover the most powerful financial calculators and planning tools that can transform your wealth-building strategy and help you achieve financial freedom faster.",
    category: "Financial Planning",
    publishDate: "2024-06-07",
    readTime: "8 min read",
    image: "/placeholder.svg",
    metaDescription: "Master your finances with essential financial planning tools in 2024. Discover calculators for budgeting, investment planning, tax optimization, and wealth building strategies."
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground">Home</Link> / 
            <Link to="/blog" className="hover:text-foreground">Blog</Link> / 
            <span className="text-foreground">Financial Planning Tools</span>
          </div>

          {/* Back Button */}
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <article className="prose prose-lg max-w-none">
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline">{post.category}</Badge>
              </div>
              
              <h1 className="text-4xl font-bold mb-4 leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-6">
                {post.description}
              </p>

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

            {/* Blog Content */}
            <BlogContent />

            {/* Infographic */}
            <BlogInfographic />

            {/* FAQ Section */}
            <BlogFAQ />

            {/* Call to Action */}
            <div className="bg-primary/10 p-8 rounded-lg mt-12 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Take Control of Your Finances?</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Start using our comprehensive suite of financial calculators to plan your path to financial freedom.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/financial/budget">
                  <Button size="lg">Try Budget Calculator</Button>
                </Link>
                <Link to="/financial/investment">
                  <Button variant="outline" size="lg">Investment Planner</Button>
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

export default BlogPost;
