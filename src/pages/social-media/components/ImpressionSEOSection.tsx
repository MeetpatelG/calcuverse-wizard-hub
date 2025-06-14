
import { Eye, User, Info, Image } from "lucide-react";
const faqs = [
  { q: "What does impression rate mean?", a: "Impression rate measures how often your followers see your posts: (Total Impressions ÷ Followers) × 100." },
  { q: "What is an impression?", a: "Any time your content appears on someone's screen (including repeat views), it counts as an impression." },
  { q: "Difference between impressions and reach?", a: "Reach counts unique users, while impressions count total displays (one user may generate many impressions)." },
  { q: "Is a higher impression rate better?", a: "Generally yes! It means your content is circulated widely among your followers." },
  { q: "Tips to grow impressions?", a: "Post regularly, use trending topics, vary your content, and post when your audience is online." },
];
export default function ImpressionSEOSection() {
  return (
    <section className="mt-12 rounded-lg bg-[#f8fbfa] p-8 shadow-inner">
      <div className="flex flex-col items-center text-center">
        <Eye size={48} className="text-blue-700 mb-2" />
        <h2 className="text-3xl font-bold mb-2">Impression Rate Demystified</h2>
        <p className="max-w-2xl text-gray-700 mb-6">
          Impressions reveal how many times your content reaches screens—see how to measure and amplify that visibility below.
        </p>
      </div>
      <div className="flex justify-center my-6">
        <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80" alt="Social impressions illustration" className="rounded-lg border shadow-sm max-w-[400px]" loading="lazy"/>
      </div>
      <div className="prose prose-lg max-w-none text-gray-800 mx-auto">
        <h3>Why Does Impression Rate Matter?</h3>
        <ul>
          <li><b>Gauge Content Reach:</b> Higher rates mean your content circulates well on your followers’ feeds.</li>
          <li><b>Optimize Posting Times:</b> Watch for higher impression rates and adjust your schedule.</li>
          <li><b>Spot Declines:</b> Sudden drops may prompt content or algorithm review.</li>
        </ul>
        <h4>Impression Rate Formula</h4>
        <pre className="bg-blue-50 text-slate-700 rounded p-4">
{`Impression Rate = (Total Impressions ÷ Followers) × 100`}
        </pre>
        <ul>
          <li><b>Total Impressions:</b> Number of displays (repeat views count)</li>
          <li><b>Followers:</b> Your current audience size</li>
        </ul>
        <h3>How to Use This Calculator</h3>
        <ol>
          <li>Input your total impressions and follower count.</li>
          <li>Click <b>Calculate</b> to see the % of impressions.</li>
          <li>Test different scenarios for deeper insights.</li>
        </ol>
        <div className="flex items-center gap-4 bg-white rounded-md border border-blue-100 shadow px-4 py-3 my-4">
          <Info size={28} className="text-primary" />
          <span className="text-blue-700 text-base font-medium">(Total Impressions / Followers) × 100</span>
        </div>
        <h3>How to Increase Impressions</h3>
        <ul>
          <li>Share at regular times when your audience is online</li>
          <li>Mix up content types and topics</li>
          <li>Use popular and relevant hashtags</li>
        </ul>
        <h3>Step-by-Step Visual Guide</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 my-8">
          <div className="bg-white border border-gray-200 rounded shadow-md w-80 p-4 flex flex-col items-center">
            <Image size={40} className="mb-2 text-purple-500"/>
            <p className="mb-2 text-gray-700">Step 1: Enter impressions and followers<br/><span className="block text-xs text-slate-500">e.g. Impressions: 1200, Followers: 1100</span></p>
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80" alt="Impression rate input" className="w-48 h-24 object-cover rounded" loading="lazy"/>
          </div>
          <div className="bg-white border border-gray-200 rounded shadow-md w-80 p-4 flex flex-col items-center">
            <Info size={38} className="mb-2 text-orange-400"/>
            <p className="mb-2 text-gray-700">Step 2: Click <span className="font-semibold">Calculate</span> for your rate.</p>
            <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80" alt="Impression rate results" className="w-48 h-24 object-cover rounded" loading="lazy"/>
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
          Use impression rate to maximize your social media visibility and spot trends that can shape your strategy for the better.
        </p>
      </div>
    </section>
  );
}
