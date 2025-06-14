import { Linkedin, ThumbsUp, MessageCircle, Share2, Info, Image, HelpCircle } from "lucide-react";
const faqs = [
  { q: "How is LinkedIn engagement rate calculated?", a: "It’s ((Likes + Comments + Shares) ÷ Reach) × 100—'Reach' being how many people actually saw your post." },
  { q: "Why use reach instead of followers?", a: "Reach shows your content’s real exposure; only people who saw the post can interact!" },
  { q: "What counts as engagement on LinkedIn?", a: "Likes, comments, and shares—these reactions show your post's traction and spark the algorithm." },
  { q: "What is a decent post engagement rate?", a: "Generally 1–2% is normal; niche or smaller audiences often see higher rates." },
  { q: "Tips to grow LinkedIn engagement?", a: "Post at optimal times, use rich imagery, reply to comments, tag people, and provide actionable insights in your posts." },
];
export default function LinkedinPostEngagementSEOSection() {
  return (
    <section className="mt-12 rounded-lg bg-[#f7fafd] p-8 shadow-inner">
      <div className="flex flex-col items-center text-center">
        <Linkedin size={48} className="text-blue-700 mb-2" />
        <h2 className="text-3xl font-bold mb-2">LinkedIn Post Engagement Rate Guide</h2>
        <p className="max-w-2xl text-gray-700 mb-6">Learn how to analyze post-level engagement using LinkedIn’s data. This guide will help you boost your presence and network value!</p>
      </div>
      <div className="flex justify-center my-6">
        <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80" alt="LinkedIn analytics example" className="rounded-lg border shadow-sm max-w-[400px]" loading="lazy" />
      </div>
      <div className="prose prose-lg max-w-none text-gray-800 mx-auto">
        <h3>Why Track LinkedIn Post Engagement?</h3>
        <ul>
          <li><b>Measure Impact:</b> See what content drives business conversations.</li>
          <li><b>Optimize Content:</b> Double down on the posts with highest engagement per reach.</li>
          <li><b>Prove Professional Value:</b> Demonstrate results to clients or employers.</li>
        </ul>
        <h4>LinkedIn Post Engagement Rate Formula:</h4>
        <pre className="bg-blue-50 text-slate-700 rounded p-4">
{`Engagement Rate = ((Likes + Comments + Shares) ÷ Reach) × 100`}
        </pre>
        <ul>
          <li><b>Likes, Comments, Shares:</b> All post-level actions count.</li>
          <li><b>Reach:</b> The number of unique viewers for that post.</li>
        </ul>
        <h3>How to Use This Calculator</h3>
        <ol>
          <li>Input likes, comments, shares, and your post’s reach.</li>
          <li>Click <b>Calculate</b> and review your rate!</li>
          <li>Try new numbers or reset for multiple posts.</li>
        </ol>
        <div className="flex items-center gap-4 bg-white rounded-md border border-blue-100 shadow px-4 py-3 my-4">
          <Info size={28} className="text-primary" />
          <span className="text-blue-700 text-base font-medium">((Likes + Comments + Shares) / Reach) × 100</span>
        </div>
        <h3>What Makes Engagement Go Up?</h3>
        <ul>
          <li>Direct questions or calls for advice</li>
          <li>Rich visual content (slides, images, video)</li>
          <li>Mentions or tags of industry peers</li>
        </ul>
        <h3>Step-by-Step Visual Guide</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 my-8">
          <div className="bg-white border border-gray-200 rounded shadow-md w-80 p-4 flex flex-col items-center">
            <Image size={40} className="mb-2 text-purple-500"/>
            <p className="mb-2 text-gray-700">Step 1: Enter your numbers<br/><span className="block text-xs text-slate-500">e.g. Likes: 70, Comments: 6, Shares: 4, Reach: 430</span></p>
            <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&q=80" alt="LinkedIn calculator input" className="w-48 h-24 object-cover rounded" loading="lazy" />
          </div>
          <div className="bg-white border border-gray-200 rounded shadow-md w-80 p-4 flex flex-col items-center">
            <HelpCircle size={38} className="mb-2 text-orange-400"/>
            <p className="mb-2 text-gray-700">Step 2: Click <span className="font-semibold">Calculate</span> for your results and insights.</p>
            <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80" alt="LinkedIn results" className="w-48 h-24 object-cover rounded" loading="lazy"/>
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
        <p>LinkedIn rewards engagement more than vanity metrics. Use this rate to fine-tune your networking and authority-building posts!</p>
      </div>
    </section>
  );
}
