
import { Share2, Eye, Info, Image } from "lucide-react";
const faqs = [
  { q: "What is share rate?", a: "Share rate is the percent of people who view your content and choose to share it: (Shares ÷ Views) × 100." },
  { q: "Why is share rate important?", a: "A higher share rate means your content is inspiring people to promote it for you, helping you go viral!" },
  { q: "What’s a good share rate?", a: "It varies by industry, but content with a share rate above 1% is strong—especially for organic growth." },
  { q: "How do I encourage more shares?", a: "Create helpful, relatable, or entertaining content; use catchy headlines and direct calls to action (\"Share this!\")." },
  { q: "Is share rate better than engagement rate?", a: "They’re different, but shares usually signal deeper value—people rarely share posts they don't endorse." },
];
export default function ShareRateSEOSection() {
  return (
    <section className="mt-12 rounded-lg bg-[#f8fbfc] p-8 shadow-inner">
      <div className="flex flex-col items-center text-center">
        <Share2 size={48} className="text-blue-600 mb-2" />
        <h2 className="text-3xl font-bold mb-2">Why Measure Share Rate?</h2>
        <p className="max-w-2xl text-gray-700 mb-6">
          Shares don’t just drive engagement—they multiply your organic exposure! See how to compute and use share rate insights below.
        </p>
      </div>
      <div className="flex justify-center my-6">
        <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80" alt="Share visualization" className="rounded-lg border shadow-sm max-w-[400px]" loading="lazy"/>
      </div>
      <div className="prose prose-lg max-w-none text-gray-800 mx-auto">
        <h3>Share Rate: What Does It Show?</h3>
        <ul>
          <li><b>Content Potential:</b> High rates mean your post sparks conversation and sharing—better chances of going viral.</li>
          <li><b>Word of Mouth:</b> Shares are genuine endorsements from your audience.</li>
          <li><b>Track Virality:</b> Use share rate to spot what has viral appeal and make more like it.</li>
        </ul>
        <h4>Share Rate Formula</h4>
        <pre className="bg-blue-50 text-slate-700 rounded p-4">
{`Share Rate = (Shares ÷ Views) × 100`}
        </pre>
        <ul>
          <li><b>Shares:</b> Number of times your post was shared.</li>
          <li><b>Views:</b> Number of post or video impressions.</li>
        </ul>
        <h3>How to Use the Calculator</h3>
        <ol>
          <li>Input your post’s shares and views.</li>
          <li>Click <b>Calculate</b> to derive your rate.</li>
          <li>Try it on multiple posts to compare performance.</li>
        </ol>
        <div className="flex items-center gap-4 bg-white rounded-md border border-blue-100 shadow px-4 py-3 my-4">
          <Info size={28} className="text-primary" />
          <span className="text-blue-700 text-base font-medium">(Shares / Views) × 100</span>
        </div>
        <h3>How to Get More Shares</h3>
        <ul>
          <li>Ask for shares directly (“Share if you agree!”)</li>
          <li>Make content that solves problems or sparks emotion</li>
          <li>Leverage trending topics and timely news</li>
        </ul>
        <h3>Step-by-Step Visual Guide</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 my-8">
          <div className="bg-white border border-gray-200 rounded shadow-md w-80 p-4 flex flex-col items-center">
            <Image size={40} className="mb-2 text-purple-500"/>
            <p className="mb-2 text-gray-700">Step 1: Enter shares and views<br/><span className="block text-xs text-slate-500">e.g. Shares: 90, Views: 4000</span></p>
            <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&q=80" alt="Share rate calculator input" className="w-48 h-24 object-cover rounded" loading="lazy"/>
          </div>
          <div className="bg-white border border-gray-200 rounded shadow-md w-80 p-4 flex flex-col items-center">
            <Info size={38} className="mb-2 text-orange-400"/>
            <p className="mb-2 text-gray-700">Step 2: Hit <span className="font-semibold">Calculate</span> to get your share rate instantly.</p>
            <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80" alt="Share rate result" className="w-48 h-24 object-cover rounded" loading="lazy"/>
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
          Share rate shows what content your audience loves to spread—use it to scale your social media reach with less effort!
        </p>
      </div>
    </section>
  );
}
