
import { Link } from "react-router-dom";
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  Linkedin, 
  UserPlus, 
  BarChart3, 
  Users, 
  Hash, 
  Share2
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const calculators = [
  {
    title: "Engagement Rate Calculator",
    description: "Easily calculate your social media engagement rate based on likes, comments, and followers.",
    icon: Instagram,
    path: "/social-media/engagement-rate",
    color: "text-pink-600"
  },
  {
    title: "Follower Growth Rate Calculator",
    description: "Analyze your follower growth over time on any platform.",
    icon: UserPlus,
    path: "/social-media/follower-growth-rate",
    color: "text-green-600"
  },
  {
    title: "Reach Calculator",
    description: "Estimate the potential reach of your social media posts.",
    icon: BarChart3,
    path: "/social-media/reach",
    color: "text-blue-500"
  },
  {
    title: "Impression Calculator",
    description: "Calculate the number of times your content is displayed to users.",
    icon: Users,
    path: "/social-media/impression",
    color: "text-purple-600"
  },
  {
    title: "Hashtag Performance Calculator",
    description: "Discover the impact of hashtags on your posts.",
    icon: Hash,
    path: "/social-media/hashtag-performance",
    color: "text-gray-700"
  },
  {
    title: "Share Rate Calculator",
    description: "Compute how often your content is shared by your audience.",
    icon: Share2,
    path: "/social-media/share-rate",
    color: "text-orange-500"
  },
  {
    title: "Facebook Engagement Calculator",
    description: "Track likes, comments, shares, and post engagement specifically for Facebook.",
    icon: Facebook,
    path: "/social-media/facebook-engagement",
    color: "text-blue-700"
  },
  {
    title: "Twitter Engagement Calculator",
    description: "Assess your tweets' performance with Twitter-specific metrics.",
    icon: Twitter,
    path: "/social-media/twitter-engagement",
    color: "text-sky-400"
  },
  {
    title: "YouTube Video Performance Calculator",
    description: "Analyze views, likes, comments, and shares for YouTube videos.",
    icon: Youtube,
    path: "/social-media/youtube-video-performance",
    color: "text-red-600"
  },
  {
    title: "LinkedIn Post Engagement Calculator",
    description: "Measure likes, comments, shares, and reach for LinkedIn posts.",
    icon: Linkedin,
    path: "/social-media/linkedin-post-engagement",
    color: "text-blue-800"
  }
];

const SocialMedia = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link> / <span className="text-foreground">Social Media Calculators</span>
        </div>
        <div className="text-center mb-8">
          <Instagram className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Social Media Calculators</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Optimize your social media strategy with powerful engagement and growth analysis tools.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc) => (
            <Link key={calc.title} to={calc.path} tabIndex={0}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer focus:ring-2 focus:ring-primary focus:outline-none">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <calc.icon className={`h-8 w-8 ${calc.color}`} />
                    <CardTitle className="text-lg">{calc.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {calc.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SocialMedia;

