
import { UserPlus, UserCheck, TrendingUp, Info, Image } from "lucide-react";
const faqs = [
  { q: "What is follower growth rate?", a: "It’s the percent increase or decrease in your social media followers over a defined time period." },
  { q: "How do I calculate growth rate?", a: "((Ending Followers – Starting Followers) ÷ Starting Followers) × 100. This tool does the work for you!" },
  { q: "How often should I check my growth?", a: "Weekly or monthly is common; analyze during campaigns for more insights." },
  { q: "What’s a good growth rate?", a: "It varies by niche and channel—any positive percent means you’re growing. Sudden spikes or drops may indicate something worth investigating." },
  { q: "Tips for steady audience growth?", a: "Post valuable content, optimize your profile, use relevant hashtags, collaborate, and engage directly with your followers." },
];
export default function FollowerGrowthRateSEOSection() {
  return (
    <section className="mt-12 rounded-lg bg-[#fefdff] p-8 shadow-inner">
      <div className="flex flex-col items-center text-center">
        <TrendingUp size={48} className="text-green-600 mb-2" />
        <h2 className="text-3xl font-bold mb-2">Follower Growth Rate: Your Audience Momentum Metric</h2>
        <p className="max-w-2xl text-gray-700 mb-6">
          Want to see which strategies deliver real results? Follower growth rate tracks your speed of audience expansion—see how to use and interpret it below.
        </p>
      </div>
      <div className="flex justify-center my-6">
        <img src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=600&q=80" alt="Follower growth analytics" className="rounded-lg border shadow-sm max-w-[400px]" loading="lazy"/>
      </div>
      <div className="prose prose-lg max-w-none text-gray-800 mx-auto">
        <h3>Why Track Growth Rate?</h3>
        <ul>
          <li><b>See Progress:</b> Watch for upward (or downward) trends in your audience numbers.</li>
          <li><b>Compare Strategies:</b> Track what works for your audience—giveaways, collabs, series, or new platforms.</li>
          <li><b>Spot Real Growth:</b> Ensure spikes aren’t just bots or fake accounts by comparing to engagement rate.</li>
        </ul>
        <h4>Follower Growth Rate Formula</h4>
        <pre className="bg-blue-50 text-slate-700 rounded p-4">
{`Growth Rate = ((Ending Followers - Starting Followers) ÷ Starting Followers) × 100`}
        </pre>
        <ul>
          <li><b>Starting Followers:</b> Where you began.</li>
          <li><b>Ending Followers:</b> Where you ended.</li>
        </ul>
        <h3>How to Use This Calculator</h3>
        <ol>
          <li>Input your starting and ending follower values.</li>
          <li>Click <b>Calculate</b> to see percentage change.</li>
          <li>Track weekly, monthly, or another custom period.</li>
        </ol>
        <div className="flex items-center gap-4 bg-white rounded-md border border-blue-100 shadow px-4 py-3 my-4">
          <Info size={28} className="text-primary" />
          <span className="text-blue-700 text-base font-medium">((Ending Followers – Starting Followers) / Starting Followers) × 100</span>
        </div>
        <h3>How to Sustain Growth</h3>
        <ul>
          <li>Share unique, consistent content</li>
          <li>Engage in comments, stories, polls</li>
          <li>Analyze times when growth spikes or drops</li>
        </ul>
        <h3>Step-by-Step Visual Guide</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 my-8">
          <div className="bg-white border border-gray-200 rounded shadow-md w-80 p-4 flex flex-col items-center">
            <Image size={40} className="mb-2 text-purple-500"/>
            <p className="mb-2 text-gray-700">Step 1: Enter starting/ending followers<br/><span className="block text-xs text-slate-500">e.g. Start: 1200, End: 1377</span></p>
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80" alt="Growth entry example" className="w-48 h-24 object-cover rounded" loading="lazy"/>
          </div>
          <div className="bg-white border border-gray-200 rounded shadow-md w-80 p-4 flex flex-col items-center">
            <HelpCircle size={38} className="mb-2 text-orange-400"/>
            <p className="mb-2 text-gray-700">Step 2: Hit <span className="font-semibold">Calculate</span> for your growth percent.</p>
            <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80" alt="Growth rate results" className="w-48 h-24 object-cover rounded" loading="lazy"/>
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
          Keep an eye on your follower growth trends! Use the calculator and advice above to celebrate successes and troubleshoot slowdowns.
        </p>
      </div>
    </section>
  );
}
