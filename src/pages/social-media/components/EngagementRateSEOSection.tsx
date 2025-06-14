
import React from "react";
import { BarChart2, ThumbsUp, Users, Lightbulb, Lock, Bookmark, HelpCircle, ArrowUpRight } from "lucide-react";

/**
 * Covers:
 * - Engaging intro
 * - What is the Social Media Engagement Rate Calculator
 * - How it works
 * - Key features and benefits
 * - Step-by-step instructions with screenshots/visuals
 * - Use cases
 * - Pro tips
 * - Privacy/Security info
 * - Call to action
 * - Detailed FAQ (at least 7 entries)
 * - Alt text for every image / illustration
 */

const faqs = [
  {
    q: "What is the Social Media Engagement Rate Calculator?",
    a: "It's an easy-to-use online tool that helps you instantly calculate your engagement rate on platforms like Instagram, Facebook, LinkedIn, and more. Just enter your likes, comments, and follower count to get your post's engagement percentage!"
  },
  {
    q: "Is it safe to input my account details?",
    a: "Absolutely. TechGuruTool's calculator never asks for your social media account login, nor does it store any numbers you enter. All calculations happen instantly in your browser."
  },
  {
    q: "What devices work with this tool?",
    a: "You can use the Engagement Rate Calculator on any modern device—PC, Mac, tablet, or smartphone. It's fully responsive and optimized for all major browsers."
  },
  {
    q: "Will this work for all social media platforms?",
    a: "Yes! While the classic formula covers all platforms that have likes and comments (including Instagram, Facebook, Twitter/X, LinkedIn, and more), you can use it for any site as long as you have the numbers."
  },
  {
    q: "How are my privacy and data protected?",
    a: "TechGuruTool uses secure HTTPS connections. No information is sent or saved—your calculations remain private, and your numbers are never shared."
  },
  {
    q: "Why is my engagement rate lower than expected?",
    a: "Engagement rate can drop if your follower count is high but your content gets fewer interactions, or if you have fake/inactive followers. Try engaging your audience with questions, fresh visuals, or trending topics to improve."
  },
  {
    q: "The result seems off. What should I do?",
    a: "Ensure you entered correct numbers for likes, comments, and followers. Followers must be greater than zero. Try refreshing the page or using a different browser if the problem continues."
  }
];

export default function EngagementRateSEOSection() {
  return (
    <section className="mt-12 rounded-lg bg-white/95 p-0 shadow-md shadow-blue-100" aria-label="Social Media Engagement Rate Guide">
      {/* Introduction */}
      <div className="px-6 py-8 text-center border-b border-blue-50 bg-gradient-to-r from-blue-50 via-white to-indigo-50 rounded-t-lg">
        <BarChart2 size={48} className="text-blue-500 mx-auto mb-3" />
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-3">Social Media Engagement Rate Calculator – Ultimate Guide</h2>
        <p className="max-w-2xl mx-auto text-lg text-slate-700">
          Supercharge your social strategy with our Engagement Rate Calculator! Instantly measure the real impact of your posts across platforms—no signup, math, or spreadsheets needed. Perfect for influencers, brands, marketers, and anyone who cares about building a thriving online presence.
        </p>
      </div>
      {/* Visual Highlight */}
      <div className="flex justify-center items-center bg-gradient-to-tr from-indigo-50 via-white to-blue-50 py-8 lg:py-10">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=700&q=80"
          alt="People analyzing social media charts"
          className="rounded-lg shadow-xl border bg-white max-w-[480px] w-full"
          loading="lazy"
        />
      </div>

      <div className="prose lg:prose-lg max-w-3xl mx-auto px-6 py-8 md:px-12" style={{background: "transparent"}}>
        {/* What Is The Calculator? */}
        <h2 className="text-blue-700">What Is a Social Media Engagement Rate Calculator?</h2>
        <p>
          An <strong>Engagement Rate Calculator</strong> is a fast, hassle-free tool that helps you see how well your content resonates with your followers. By entering just a few numbers—likes, comments, and followers—you can instantly discover the percentage of your audience that actively engages with your posts. This sharp metric is essential for tracking growth, proving value to clients or partners, and optimizing your content performance in today's digital world.
        </p>
        {/* How It Works */}
        <h2 className="text-indigo-700 mt-10">How Does the Engagement Rate Calculator Work?</h2>
        <p>
          The process is simple: <span className="font-medium">just type in your total likes, total comments, and follower count</span> for a post. Our calculator crunches the numbers using the most reliable formula:
        </p>
        <pre className="bg-blue-50 text-blue-900 rounded p-4 font-mono text-base">
          Engagement Rate = ((Likes + Comments) ÷ Followers) × 100
        </pre>
        <ul>
          <li><b>Likes:</b> Total likes or positive reactions to your post.</li>
          <li><b>Comments:</b> All public comments or replies.</li>
          <li><b>Followers:</b> Your audience size at the time of posting.</li>
        </ul>
        <img
          src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=720&q=80"
          alt="Social media engagement process illustration"
          className="mx-auto my-6 rounded-md border shadow-lg w-full max-w-xl"
          loading="lazy"
        />

        {/* Key Features */}
        <h2 className="text-blue-600 mt-12">Key Features (Why Users Love This Calculator)</h2>
        <ul>
          <li><ThumbsUp size={20} className="inline mr-2 text-blue-500" /> <b>Instant Results:</b> See your engagement rate with one click.</li>
          <li><Users size={20} className="inline mr-2 text-indigo-500" /> <b>Universal Compatibility:</b> Works for Instagram, Facebook, Twitter/X, LinkedIn, and more.</li>
          <li><Lightbulb size={20} className="inline mr-2 text-yellow-400" /> <b>No Login Needed:</b> No accounts or signups—just fast, anonymous calculations.</li>
          <li><Lock size={20} className="inline mr-2 text-gray-500" /> <b>100% Private:</b> Your numbers stay on your device.</li>
          <li><HelpCircle size={20} className="inline mr-2 text-blue-400" /> <b>Easy to Use:</b> Simple, mobile-friendly interface for anyone.</li>
        </ul>

        {/* Step-by-step Instructions */}
        <h2 className="mt-12 text-blue-700">How to Use the Social Media Engagement Rate Calculator (Step-by-Step)</h2>
        <ol className="list-decimal pl-5">
          <li>
            <b>Enter your likes:</b> Type the total number of likes for your post.
            <img
              src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=360&q=80"
              alt="Calculator likes field screenshot"
              className="rounded border mx-auto my-3 max-w-xs"
              loading="lazy"
            />
          </li>
          <li>
            <b>Enter comments (optional):</b> Fill in the number of comments or set it to 0 if none.
            <img
              src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=360&q=80"
              alt="Calculator comments input screenshot"
              className="rounded border mx-auto my-3 max-w-xs"
              loading="lazy"
            />
          </li>
          <li>
            <b>Type your follower count:</b> Add your followers number at posting time. Remember, this should be greater than zero.
            <img
              src="https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?auto=format&fit=crop&w=360&q=80"
              alt="Calculator followers input field"
              className="rounded border mx-auto my-3 max-w-xs"
              loading="lazy"
            />
          </li>
          <li>
            <b>Click <span className="font-semibold text-primary underline">Calculate</span>:</b> Instantly see your post’s engagement percentage. Try the <span className="font-semibold text-muted-foreground">Reset</span> button to start again.
            <img
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=360&q=80"
              alt="Engagement rate calculation result screenshot"
              className="rounded border mx-auto my-3 max-w-xs"
              loading="lazy"
            />
          </li>
        </ol>

        {/* Use Cases */}
        <h2 className="mt-12 text-indigo-700">Practical Use Cases</h2>
        <ul>
          <li><b>Influencers & Creators:</b> Compare post performance, attract more sponsors, and track your personal growth.</li>
          <li><b>Brands & Agencies:</b> Evaluate influencer campaigns, prove client success, and interpret social ROI.</li>
          <li><b>Social Media Managers:</b> Spot viral content, test new formats, and share easy-to-read reports with stakeholders.</li>
          <li><b>Anyone Curious:</b> See if your audience is real and engaged, not just a passive follower count!</li>
        </ul>

        {/* Pro Tips */}
        <h2 className="mt-10 text-blue-700">Pro Tips To Boost Your Engagement Rate</h2>
        <ul className="not-prose">
          <li className="mb-2"><Lightbulb className="inline mr-2 text-yellow-400" /> Ask questions and encourage comments for deeper interactions.</li>
          <li className="mb-2"><Lightbulb className="inline mr-2 text-yellow-400" /> Use high-quality images/videos to catch attention.</li>
          <li className="mb-2"><Lightbulb className="inline mr-2 text-yellow-400" /> Post at times when your followers are most active.</li>
          <li className="mb-2"><Lightbulb className="inline mr-2 text-yellow-400" /> Engage back—reply to comments/messages to create real conversation.</li>
        </ul>

        {/* Privacy & Security */}
        <h2 className="mt-12 text-indigo-700">Privacy & Security—Your Data is Always Safe</h2>
        <div className="flex flex-col md:flex-row items-center gap-6 bg-blue-50 rounded-lg p-6 mb-8 border border-blue-100 shadow-sm">
          <Lock size={38} className="text-blue-400 mb-2 md:mb-0" />
          <div>
            <p className="font-semibold text-blue-700 mb-2">No account needed. No data stored. 100% secure.</p>
            <p className="mb-0 text-base">
              All calculations run directly in your browser—nothing you enter is sent to any server or stored.
              TechGuruTool is built with HTTPS and respects your privacy, so you can calculate confidently, any time.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <h2 className="mt-12 text-blue-700">Ready To Track Real Social Impact?</h2>
        <div className="flex flex-col md:flex-row items-center gap-6 bg-white border-l-4 border-blue-300 rounded shadow px-6 py-6 mt-2 mb-10">
          <ArrowUpRight size={32} className="text-primary mb-2 md:mb-0" />
          <div>
            <p className="mb-2 text-xl font-bold text-blue-800">Try the Social Media Engagement Rate Calculator Now—Free & Instant!</p>
            <ul className="text-base mb-2">
              <li className="mb-1">✔️ <b>No login</b> required</li>
              <li className="mb-1">✔️ <b>No installation</b>—just click and go</li>
              <li>✔️ <b>100% free and privacy-friendly</b></li>
            </ul>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <a
                href="#"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition font-semibold"
                style={{boxShadow:'0 2px 8px rgb(59 130 246 / 10%)'}}
                aria-label="Open the Engagement Rate Calculator tool"
              >
                Try The Calculator Now
              </a>
              <button
                className="inline-flex items-center text-sm text-blue-700 hover:text-blue-900 px-2 py-1 font-medium rounded bg-blue-50"
                aria-label="Bookmark this tool"
                tabIndex={0}
                onClick={() => {
                  if (window) {
                    window.alert("Press Ctrl + D (Windows) or Cmd + D (Mac) to bookmark this page!");
                  }
                }}
              >
                <Bookmark className="mr-1" size={18} /> Bookmark
              </button>
              <a
                href="/"
                className="inline-block text-sm text-blue-700 hover:text-blue-900 underline ml-4"
                aria-label="Explore other tools on TechGuruTool"
              >
                Explore More Tools
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <h2 className="mt-12 text-blue-700">Frequently Asked Questions (FAQs)</h2>
        <div className="space-y-6 mt-4">
          {faqs.map((item, i) => (
            <details key={i} className="bg-blue-50 border-l-4 border-blue-300 rounded p-4 hover:shadow transition">
              <summary className="font-semibold text-blue-900 cursor-pointer text-lg">{item.q}</summary>
              <div className="text-slate-800 whitespace-pre-line mt-2 pl-2">{item.a}</div>
            </details>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-base text-slate-600 mb-2">
            Still have questions? <a href="mailto:meet03510@gmail.com" className="underline text-blue-700 hover:text-blue-900">Contact our team for help!</a>
          </p>
        </div>
      </div>
    </section>
  );
}
