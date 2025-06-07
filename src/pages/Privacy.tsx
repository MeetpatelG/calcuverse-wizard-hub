
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Cookie, Mail } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground">
              Your privacy is important to us. Learn how we protect your data.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Calculator Data</h3>
                  <p className="text-muted-foreground">
                    All calculations are performed locally in your browser. We do not store or transmit any of your calculation data, 
                    including financial information, personal metrics, or mathematical computations.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Usage Analytics</h3>
                  <p className="text-muted-foreground">
                    We may collect anonymous usage data to improve our services, including pages visited, 
                    calculators used, and general usage patterns. This data cannot be used to identify you personally.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Newsletter Subscription</h3>
                  <p className="text-muted-foreground">
                    If you subscribe to our newsletter, we collect your email address solely for sending you updates 
                    about new calculators and features.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cookie className="h-5 w-5" />
                  Cookies and Local Storage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We use cookies and local storage to enhance your experience:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Essential cookies for website functionality</li>
                  <li>Local storage to remember your preferences and recent calculations</li>
                  <li>Analytics cookies to understand how our site is used (anonymous)</li>
                </ul>
                <p className="text-muted-foreground">
                  You can disable cookies in your browser settings, though this may affect site functionality.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How We Protect Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We implement appropriate security measures to protect your information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>All calculations are performed client-side for maximum privacy</li>
                  <li>HTTPS encryption for all data transmission</li>
                  <li>Regular security updates and monitoring</li>
                  <li>No storage of sensitive financial or personal data</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Third-Party Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We may use third-party services for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Website hosting and content delivery</li>
                  <li>Anonymous analytics and performance monitoring</li>
                  <li>Email delivery for newsletter subscribers</li>
                </ul>
                <p className="text-muted-foreground">
                  These services have their own privacy policies and we encourage you to review them.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Your Rights and Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Request information about data we may have collected</li>
                  <li>Request deletion of your email from our newsletter list</li>
                  <li>Clear your local browser data at any time</li>
                  <li>Contact us with any privacy concerns</li>
                </ul>
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Contact Us</h4>
                  <p className="text-muted-foreground">
                    For any privacy-related questions or concerns, please contact us at:{" "}
                    <a href="mailto:meet03510@gmail.com" className="text-primary hover:underline">
                      meet03510@gmail.com
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Changes to This Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We may update this privacy policy from time to time. Any changes will be posted on this page 
                  with an updated revision date. We encourage you to review this policy periodically.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/" 
              className="text-primary hover:underline font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
