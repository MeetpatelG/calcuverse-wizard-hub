
import { Hash, ThumbsUp, BarChart2, Info, Image } from "lucide-react";
const faqs = [
  { q: "What is hashtag performance?", a: "It measures how much using a hashtag in your posts increases (or decreases) your average engagement compared to posts without it." },
  { q: "What formula does this calculator use?", a: "((Avg. Engagement With Hashtag – Avg. Engagement Without Hashtag) ÷ Avg. Engagement Without Hashtag) × 100." },
  { q: "Why do hashtags work?", a: "They help place your content into trending or topical conversations, widening your reach!" },
  { q: "Can hashtags hurt engagement?", a: "Yes, if overused or poorly targeted, they may reduce quality or even look spammy." },
  { q: "Tips for smarter hashtag use?", a: "Mix popular and niche hashtags, test regularly, and monitor what brings the most engagement." },
];
export default function HashtagPerformanceSEOSection() {
  return (
    <section className="mt-12 rounded-lg bg-[#f7fafb] p-8 shadow-inner">
      <div className="flex flex-col items-center text-center">
        <Hash size={48} className="text-blue-700 mb-2" />
        <h2 className="text-3xl font-bold mb-2">Maximize Your Reach: Hashtag Performance Guide</h2>
        <p className="max-w-2xl text-gray-700 mb-6">
          Hashtags can increase your social media visibility and engagement—use this guide and calculator to discover your best performing tags!
        </p>
      </div>
      <div className="flex justify-center my-6">
        <img src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=600&q=80" alt="Hashtag analytics visualization" className="rounded-lg border shadow-sm max-w-[400px]" loading="lazy"/>
      </div>
      <div className="prose prose-lg max-w-none text-gray-800 mx-auto">
        <h3>Why Does Hashtag Performance Matter?</h3>
        <ul>
          <li><b>Smarter Strategy:</b> Focus on the hashtags that actually drive better results.</li>
          <li><b>Benchmarking:</b> Compare posts with and without hashtags to see real value.</li>
          <li><b>Content Discovery:</b> Identify new audiences and grow faster when the right tags are found.</li>
        </ul>
        <h4>Hashtag Performance Formula</h4>
        <pre className="bg-blue-50 text-slate-700 rounded p-4">
{`((Avg. Engagement With Hashtag – Avg. Engagement Without Hashtag) ÷ Avg. Engagement Without Hashtag) × 100`}
        </pre>
        <ul>
          <li><b>Avg. Engagement With Hashtag:</b> Total engagement divided by post count with hashtag.</li>
          <li><b>Avg. Engagement Without Hashtag:</b> Total engagement divided by post count without hashtag.</li>
        </ul>
        <h3>How to Use the Calculator</h3>
        <ol>
          <li>Input post counts and engagement for both cases.</li>
          <li>Click <b>Calculate</b> for the improvement %.</li>
        </ol>
        <div className="flex items-center gap-4 bg-white rounded-md border border-blue-100 shadow px-4 py-3 my-4">
          <Info size={28} className="text-primary" />
          <span className="text-blue-700 text-base font-medium">((Avg. With Hashtag – Avg. Without) / Avg. Without) × 100</span>
        </div>
        <h3>Improving Hashtag Performance</h3>
        <ul>
          <li>Test and rotate hashtags weekly</li>
          <li>Study top-performing competitor posts</li>
          <li>Watch engagement before/after adding certain tags</li>
        </ul>
        <h3>Step-by-Step Visual Guide</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 my-8">
          <div className="bg-white border border-gray-200 rounded shadow-md w-80 p-4 flex flex-col items-center">
            <Image size={40} className="mb-2 text-purple-500"/>
            <p className="mb-2 text-gray-700">Step 1: Enter stats for posts with and without hashtags<br/><span className="block text-xs text-slate-500">e.g. With: 10 posts, 1300 engagement<br/>Without: 8 posts, 560 engagement</span></p>
            <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&q=80" alt="Hashtag input form" className="w-48 h-24 object-cover rounded" loading="lazy"/>
          </div>
          <div className="bg-white border border-gray-200 rounded shadow-md w-80 p-4 flex flex-col items-center">
            <Info size={38} className="mb-2 text-orange-400"/>
            <p className="mb-2 text-gray-700">Step 2: Click <span className="font-semibold">Calculate</span> for instant improvement insights.</p>
            <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80" alt="Performance result visual" className="w-48 h-24 object-cover rounded" loading="lazy"/>
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
          Track, optimize, and get creative with your hashtags—let data guide your strategy for maximum exposure and engagement!
        </p>
      </div>
    </section>
  );
}
