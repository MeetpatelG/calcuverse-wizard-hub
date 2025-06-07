
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
