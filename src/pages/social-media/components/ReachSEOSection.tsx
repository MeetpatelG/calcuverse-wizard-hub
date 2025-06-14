
import { BarChart2, User, Info, Image } from "lucide-react";
const faqs = [
  { q: "What is reach rate?", a: "Reach rate is the percentage of your followers who saw a particular post: (Unique Viewers ÷ Followers) × 100." },
  { q: "Why is reach rate important?", a: "It helps you understand your organic reach—how much of your audience is actually exposed to your content." },
  { q: "What affects reach on social media?", a: "Algorithm changes, posting times, engagement, and follower activity all impact reach." },
  { q: "How should I use reach rate?", a: "Monitor changes to optimize content timing and type. Consistency and relevance usually increase reach." },
  { q: "How can I boost reach?", a: "Test different posting schedules, leverage hashtags, and encourage followers to engage and share." },
];
export default function ReachSEOSection() {
  return (
    <section className="mt-12 rounded-lg bg-[#f7fafb] p-8 shadow-inner">
      <div className="flex flex-col items-center text-center">
        <BarChart2 size={48} className="text-blue-600 mb-2" />
        <h2 className="text-3xl font-bold mb-2">How to Calculate and Use Reach Rate</h2>
        <p className="max-w-2xl text-gray-700 mb-6">
          The organic reach of your posts is a major performance lever—see what works and optimize for more viewership.
        </p>
      </div>
      <div className="flex justify-center my-6">
        <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80" alt="Social media reach illustration" className="rounded-lg border shadow-sm max-w-[400px]" loading="lazy"/>
      </div>
      <div className="prose prose-lg max-w-none text-gray-800 mx-auto">
        <h3>What Does Reach Rate Reveal?</h3>
        <ul>
          <li><b>Content Visibility:</b> Find out how much of your audience sees your content.</li>
          <li><b>Test Post Timing:</b> See when your audience is most active and receptive.</li>
          <li><b>Optimize for Maximum Views:</b> Adjust posting frequency and style based on reach data.</li>
        </ul>
        <h4>Reach Rate Formula</h4>
        <pre className="bg-blue-50 text-slate-700 rounded p-4">
{`Reach Rate = (Unique Viewers ÷ Followers) × 100`}
        </pre>
        <ul>
          <li><b>Unique Viewers:</b> Unique accounts who saw your post.</li>
          <li><b>Followers:</b> Your audience size at post time.</li>
        </ul>
        <h3>How to Use the Calculator</h3>
        <ol>
          <li>Enter unique viewers and total followers for the post.</li>
          <li>Click <b>Calculate</b> for your metric.</li>
          <li>Compare rates across different posts to spot trends.</li>
        </ol>
        <div className="flex items-center gap-4 bg-white rounded-md border border-blue-100 shadow px-4 py-3 my-4">
          <Info size={28} className="text-primary" />
          <span className="text-blue-700 text-base font-medium">(Unique Viewers / Followers) × 100</span>
        </div>
        <h3>How to Optimize Reach</h3>
        <ul>
          <li>Post consistently at proven best times</li>
          <li>Use relevant hashtags and trending content</li>
          <li>Engage with your community to increase visibility</li>
        </ul>
        <h3>Step-by-Step Visual Guide</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 my-8">
          <div className="bg-white border border-gray-200 rounded shadow-md w-80 p-4 flex flex-col items-center">
            <Image size={40} className="mb-2 text-purple-500"/>
            <p className="mb-2 text-gray-700">Step 1: Enter viewers and follower numbers<br/><span className="block text-xs text-slate-500">e.g. Viewers: 2100, Followers: 4000</span></p>
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80" alt="Reach rate input" className="w-48 h-24 object-cover rounded" loading="lazy"/>
          </div>
          <div className="bg-white border border-gray-200 rounded shadow-md w-80 p-4 flex flex-col items-center">
            <Info size={38} className="mb-2 text-orange-400"/>
            <p className="mb-2 text-gray-700">Step 2: Click <span className="font-semibold">Calculate</span> for your post reach rate.</p>
            <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80" alt="Reach rate result" className="w-48 h-24 object-cover rounded" loading="lazy"/>
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
          Regularly track your reach rate to fine-tune your approach, time your posts better, and grow your organic presence.
        </p>
      </div>
    </section>
  );
}
