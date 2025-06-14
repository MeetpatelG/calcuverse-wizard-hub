
import { ThumbsUp, MessageCircle, Share2, User, HelpCircle, Info, Image } from "lucide-react";

const faqs = [
  { q: "What is Facebook Engagement Rate?", a: "It measures how actively your followers interact (likes, comments, shares) with your content as a percent of total followers. A higher rate means more engaged fans!" },
  { q: "Which interactions count as 'engagement'?", a: "Typically: likes, comments, and shares. Some marketers may include reactions and clicks for a broader measure." },
  { q: "How is Facebook Engagement Rate calculated?", a: "((Likes + Comments + Shares) ÷ Followers) × 100. This tool does it automatically for you!" },
  { q: "What is a typical engagement rate for Facebook pages?", a: "Average is around 1% of followers. Above 2% is strong, while 0.5% or less may be low." },
  { q: "How can I increase my engagement rate?", a: "Share valuable posts, ask questions, use eye-catching images, encourage comments, respond quickly, and know your audience." },
];

export default function FacebookEngagementSEOSection() {
  return (
    <section className="mt-12 rounded-lg bg-[#f8fafb] p-8 shadow-inner">
      <div className="flex flex-col items-center text-center">
        <ThumbsUp size={48} className="text-blue-600 mb-2" />
        <h2 className="text-3xl font-bold mb-2">Understanding Facebook Engagement Rate</h2>
        <p className="max-w-2xl text-gray-700 mb-6">
          Facebook engagement rate is one of the clearest signals of how much your community values your content. Track, compare, and optimize your strategy using our calculator and the guide below.
        </p>
      </div>
      <div className="flex justify-center my-6">
        <img
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80"
          alt="Facebook analytics visualization"
          className="rounded-lg border shadow-sm max-w-[400px]"
          loading="lazy"
        />
      </div>
      <div className="prose prose-lg max-w-none text-gray-800 mx-auto">
        <h3>What Does Engagement Rate Reveal?</h3>
        <p>
          Beyond likes, engagement rate shows how your followers actually interact. It’s a key signal for Facebook's algorithm—and your brand health!
        </p>
        <ul>
          <li><b>Spot Viral Content:</b> See which posts outperform and repeat success.</li>
          <li><b>Track Community Interest:</b> Gauge loyalty beyond just page likes.</li>
          <li><b>Prove ROI:</b> Use data-driven metrics in your reports or client pitches.</li>
        </ul>
        <h4>Facebook Engagement Rate Formula:</h4>
        <pre className="bg-blue-50 text-slate-700 rounded p-4">
{`Engagement Rate = ((Likes + Comments + Shares) ÷ Followers) × 100`}
        </pre>
        <ul>
          <li><b>Likes:</b> Reactions of all types.</li>
          <li><b>Comments:</b> Replies and user input.</li>
          <li><b>Shares:</b> Number of times shared.</li>
          <li><b>Followers:</b> Total as of post date.</li>
        </ul>
        <h3>How to Use This Calculator</h3>
        <ol>
          <li>Input likes, comments, shares, and follower count.</li>
          <li>Click <b>Calculate</b>—get your engagement percent instantly.</li>
          <li>Try different values or hit Reset to start over!</li>
        </ol>
        <div className="flex items-center gap-4 bg-white rounded-md border border-blue-100 shadow px-4 py-3 my-4">
          <Info size={28} className="text-primary" />
          <span className="text-blue-700 text-base font-medium">((Likes + Comments + Shares) / Followers) × 100</span>
        </div>
        <h3>Why Should You Track Engagement Rate?</h3>
        <ul>
          <li><b>Performance Check:</b> Understand which content works and why.</li>
          <li><b>Benchmark:</b> Compare to industry standards and competitors.</li>
          <li><b>Audience Health:</b> Spot sudden spikes/drops for deeper analysis.</li>
        </ul>
        <h3>Step-by-Step Visual Guide</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 my-8">
          <div className="bg-white border border-gray-200 rounded shadow-md w-80 p-4 flex flex-col items-center">
            <Image size={40} className="mb-2 text-purple-500"/>
            <p className="mb-2 text-gray-700">Step 1: Enter your stats<br/><span className="block text-xs text-slate-500">e.g. Likes: 120, Comments: 15, Shares: 22, Followers: 2900</span></p>
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80" alt="Calculator input" className="w-48 h-24 object-cover rounded" loading="lazy" />
          </div>
          <div className="bg-white border border-gray-200 rounded shadow-md w-80 p-4 flex flex-col items-center">
            <HelpCircle size={38} className="mb-2 text-orange-400"/>
            <p className="mb-2 text-gray-700">Step 2: Click <span className="font-semibold">Calculate</span> to get your % result.</p>
            <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80" alt="Result example" className="w-48 h-24 object-cover rounded" loading="lazy" />
          </div>
        </div>
        <h3>Frequently Asked Questions (FAQs)</h3>
        <div className="space-y-6 mt-4">
          {faqs.map((item, i) => (
            <details key={i} className="bg-blue-50 border-l-4 border-blue-300 rounded p-4">
              <summary className="font-semibold text-blue-900 cursor-pointer text-lg">{item.q}</summary>
              <div className="text-gray-700 whitespace-pre-line mt-2 pl-2">{item.a}</div>
            </details>
          ))}
        </div>
        <h3 className="mt-8">Conclusion</h3>
        <p>
          Master your Facebook content strategy by tracking engagement rate—the real metric for social success. Use the calculator above and insights here to grow your presence!
        </p>
      </div>
    </section>
  );
}
