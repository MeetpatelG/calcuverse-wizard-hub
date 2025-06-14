
import { Youtube, ThumbsUp, MessageCircle, Share2, HelpCircle, Info, Image, Eye } from "lucide-react";
const faqs = [
  { q: "What is YouTube video engagement rate?", a: "It’s the percentage of people who liked, commented, or shared versus total viewers—a snapshot of content appeal!" },
  { q: "How do I calculate it?", a: "((Likes + Comments + Shares) ÷ Views) × 100 — this tool does all the math for you." },
  { q: "Why track video engagement?", a: "It uncovers what excites your audience—and helps your channel grow via the YouTube algorithm." },
  { q: "What’s a good engagement rate?", a: "2% is average, 4%+ is great for most niches. Audience size and content type also play a role." },
  { q: "How can I boost engagement on my channel?", a: "Encourage comments, reply quickly, use end screens, add calls to action, and create shareable stories." },
];
export default function YouTubeVideoPerformanceSEOSection() {
  return (
    <section className="mt-12 rounded-lg bg-[#fafeff] p-8 shadow-inner">
      <div className="flex flex-col items-center text-center">
        <Youtube size={48} className="text-red-600 mb-2" />
        <h2 className="text-3xl font-bold mb-2">Crack the Code: YouTube Video Engagement Rate</h2>
        <p className="max-w-2xl text-gray-700 mb-6">
          Want to go viral? Start by measuring and improving engagement—discover how below.
        </p>
      </div>
      <div className="flex justify-center my-6">
        <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80" alt="YouTube analytics visualization" className="rounded-lg border shadow-sm max-w-[400px]" loading="lazy"/>
      </div>
      <div className="prose prose-lg max-w-none text-gray-800 mx-auto">
        <h3>Why Engagement Rate Matters for YouTube?</h3>
        <ul>
          <li><b>YouTube Algorithm:</b> Rewards highly engaged videos with more promotion.</li>
          <li><b>Audience Insight:</b> Pinpoint topics and formats viewers love.</li>
          <li><b>Monetization:</b> Brands look for top engagement rates for partnerships.</li>
        </ul>
        <h4>Video Engagement Rate Formula</h4>
        <pre className="bg-blue-50 text-slate-700 rounded p-4">
{`Engagement Rate = ((Likes + Comments + Shares) ÷ Views) × 100`}
        </pre>
        <ul>
          <li><b>Likes, Comments, Shares:</b> All viewer interactions.</li>
          <li><b>Views:</b> Total video views in the period you want to track.</li>
        </ul>
        <h3>How to Use This Calculator</h3>
        <ol>
          <li>Enter your video’s Views, Likes, Comments, Shares.</li>
          <li>Click <b>Calculate</b> to reveal your number.</li>
          <li>Experiment with new video stats to compare!</li>
        </ol>
        <div className="flex items-center gap-4 bg-white rounded-md border border-blue-100 shadow px-4 py-3 my-4">
          <Info size={28} className="text-primary" />
          <span className="text-blue-700 text-base font-medium">((Likes + Comments + Shares) / Views) × 100</span>
        </div>
        <h3>How to Drive Engagement Up?</h3>
        <ul>
          <li>Add CTAs, ask viewers to like, comment, and share</li>
          <li>Respond to comments quickly</li>
          <li>Embed your video in blog posts and share on social</li>
        </ul>
        <h3>Step-by-Step Visual Guide</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 my-8">
          <div className="bg-white border border-gray-200 rounded shadow-md w-80 p-4 flex flex-col items-center">
            <Image size={40} className="mb-2 text-purple-500"/>
            <p className="mb-2 text-gray-700">Step 1: Enter your metrics<br/><span className="block text-xs text-slate-500">E.g. Views: 4000, Likes: 90, Comments: 13, Shares: 6</span></p>
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80" alt="YouTube form input" className="w-48 h-24 object-cover rounded" loading="lazy"/>
          </div>
          <div className="bg-white border border-gray-200 rounded shadow-md w-80 p-4 flex flex-col items-center">
            <HelpCircle size={38} className="mb-2 text-orange-400"/>
            <p className="mb-2 text-gray-700">Step 2: Hit <span className="font-semibold">Calculate</span> for instant results and tips.</p>
            <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80" alt="Result displayed" className="w-48 h-24 object-cover rounded" loading="lazy"/>
          </div>
        </div>
        <h3>FAQs</h3>
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
          Consistently measure and improve your video engagement for YouTube growth! Use the calculator and content above to fine-tune your channel.
        </p>
      </div>
    </section>
  );
}
