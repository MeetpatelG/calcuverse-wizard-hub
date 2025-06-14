
import { Twitter, MessageCircle, Repeat, User, HelpCircle, Info, Image } from "lucide-react";

const faqs = [
  { q: "What is Twitter Engagement Rate?", a: "Measures how often your followers interact with your tweets (likes, replies, retweets) as a percent of your total following." },
  { q: "How do I calculate it?", a: "((Likes + Replies + Retweets) ÷ Followers) × 100. Just use our tool above!" },
  { q: "Is a higher engagement rate better?", a: "Yes! It usually means your content sparks more discussion and sharing, boosting organic reach." },
  { q: "What’s a ‘good’ engagement rate on Twitter?", a: "Most brands see around 0.5–1%. Over 1% is strong for larger accounts; micro-influencers may see higher." },
  { q: "How can I grow my engagement?", a: "Try polls, ask questions, reply to users, tweet at peak times, and use relevant hashtags." },
];

export default function TwitterEngagementSEOSection() {
  return (
    <section className="mt-12 rounded-lg bg-[#f8fafb] p-8 shadow-inner">
      <div className="flex flex-col items-center text-center">
        <Twitter size={48} className="text-sky-500 mb-2" />
        <h2 className="text-3xl font-bold mb-2">Maximizing Twitter Engagement: The Key Metric</h2>
        <p className="max-w-2xl text-gray-700 mb-6">On X (Twitter), engagement tracks the likes, replies, and retweets your tweets inspire. Get actionable tips and the formula to improve your tweet performance below!</p>
      </div>
      <div className="flex justify-center my-6">
        <img
          src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=600&q=80"
          alt="Twitter engagement illustration"
          className="rounded-lg border shadow-sm max-w-[400px]"
          loading="lazy"
        />
      </div>
      <div className="prose prose-lg max-w-none text-gray-800 mx-auto">
        <h3>Why Track Tweet Engagement?</h3>
        <ul>
          <li><b>Optimize Your Voice:</b> Learn what works for your unique followers.</li>
          <li><b>Algorithm Boost:</b> Twitter shows engaging tweets to more users.</li>
          <li><b>Prove Value:</b> Strong engagement can attract partners and sponsors.</li>
        </ul>
        <h4>Engagement Rate Formula for Twitter</h4>
        <pre className="bg-blue-50 text-slate-700 rounded p-4">
{`Engagement Rate = ((Likes + Replies + Retweets) ÷ Followers) × 100`}
        </pre>
        <ul>
          <li><b>Likes:</b> Hearts on your tweet.</li>
          <li><b>Replies:</b> Direct responses/conversations.</li>
          <li><b>Retweets:</b> Number of shares.</li>
          <li><b>Followers:</b> Your audience size at tweet time.</li>
        </ul>
        <h3>How to Use This Calculator</h3>
        <ol>
          <li>Enter likes, replies, retweets, and follower count.</li>
          <li>Click <b>Calculate</b> for instant results.</li>
          <li>Explore scenarios; use <b>Reset</b> to start over.</li>
        </ol>
        <div className="flex items-center gap-4 bg-white rounded-md border border-blue-100 shadow px-4 py-3 my-4">
          <Info size={28} className="text-primary" />
          <span className="text-blue-700 text-base font-medium">((Likes + Replies + Retweets) / Followers) × 100</span>
        </div>
        <h3>Best Practices to Boost Results</h3>
        <ul>
          <li>Reply fast to comments and mentions</li>
          <li>Use Twitter polls, threads, and visuals</li>
          <li>Schedule tweets when your audience is active</li>
        </ul>
        <h3>Step-by-Step Visual Guide</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 my-8">
          <div className="bg-white border border-gray-200 rounded shadow-md w-80 p-4 flex flex-col items-center">
            <Image size={40} className="mb-2 text-purple-500"/>
            <p className="mb-2 text-gray-700">Step 1: Fill fields with tweet stats<br/><span className="block text-xs text-slate-500">E.g. Likes: 30, Replies: 4, Retweets: 9, Followers: 970</span></p>
            <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=300&q=80" alt="Twitter input example" className="w-48 h-24 object-cover rounded" loading="lazy" />
          </div>
          <div className="bg-white border border-gray-200 rounded shadow-md w-80 p-4 flex flex-col items-center">
            <HelpCircle size={38} className="mb-2 text-orange-400"/>
            <p className="mb-2 text-gray-700">Step 2: Hit <span className="font-semibold">Calculate</span> for your answer, try new numbers anytime.</p>
            <img src="https://images.unsplash.com/photo-1473091534298-04dcbce3278c?auto=format&fit=crop&w=300&q=80" alt="Result sample" className="w-48 h-24 object-cover rounded" loading="lazy" />
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
          Track every tweet's engagement to grow, learn, and impress your audience or clients. Use the calculator and SEO advice above for Twitter/X success!
        </p>
      </div>
    </section>
  );
}
