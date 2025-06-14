
import { Image, BarChart2, MousePointerClick, Info } from "lucide-react";

const faqs = [
  {
    q: "What is Social Media Engagement Rate?",
    a: "Social media engagement rate measures the level of interaction (likes, comments, shares, etc.) your content receives from your audience relative to your total followers. It helps in understanding how effectively your content resonates with your followers."
  },
  {
    q: "How is engagement rate calculated?",
    a: 'The engagement rate is typically calculated as:\n\nEngagement Rate = ((Likes + Comments) ÷ Followers) × 100.\n\nFor posts with only likes and comments.'
  },
  {
    q: "Why is a high engagement rate important?",
    a: "A high engagement rate signifies that your audience finds your content valuable and interesting, which can lead to stronger brand loyalty, higher reach, and greater potential for your posts to go viral."
  },
  {
    q: "What is a good engagement rate on social media?",
    a: "A good engagement rate varies by platform, but generally:\n- Instagram: 1-3% is average, 3%+ is great.\n- Facebook: 1%+ is good.\n- Twitter/X: 0.5-1% is decent.\nContext (industry, audience size) matters!"
  },
  {
    q: "Are likes more valuable than comments or shares?",
    a: "Not necessarily. Comments and shares often indicate a deeper level of engagement since they require more action and thought. Shares, in particular, help spread your content to wider audiences."
  },
  {
    q: "How can I improve my engagement rate?",
    a: "Consistently create high-quality, valuable content, use compelling visuals, engage with your audience, ask questions, encourage sharing, and post at optimal times when your followers are active."
  },
  {
    q: "Do fake followers affect engagement rate?",
    a: "Yes. If you have a lot of fake or inactive followers, your engagement rate will be lower because your real content isn’t reaching real people who interact with it. Focus on growing genuine followers."
  }
];

// For the “screenshot” step, we use visual placeholders to simulate user steps in the calculator.
export default function EngagementRateSEOSection() {
  return (
    <section className="mt-12 rounded-lg bg-[#f7fafc] p-8 shadow-inner">
      {/* Hero and Introduction */}
      <div className="flex flex-col items-center text-center">
        <BarChart2 size={48} className="text-blue-600 mb-2" />
        <h2 className="text-3xl font-bold mb-2">What is Social Media Engagement Rate? A Complete Guide</h2>
        <p className="max-w-2xl text-gray-700 mb-6">
          Social media engagement rate provides a direct measure of how your digital audience interacts with your content—an essential metric for influencers, brands, marketers, and content creators. Understanding and optimizing your engagement rate can unlock organic growth, boost reach, and identify what truly captivates your community.
        </p>
      </div>
      
      {/* Visual/Illustration */}
      <div className="flex justify-center my-6">
        <img
          src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=600&q=80"
          alt="Social media analytics illustration"
          className="rounded-lg border shadow-sm max-w-[400px]"
          loading="lazy"
        />
      </div>

      {/* Main SEO Content Body */}
      <div className="prose prose-lg max-w-none text-gray-800 mx-auto">
        <h3>What Does Engagement Rate Actually Tell You?</h3>
        <p>
          Engagement rate measures your audience’s willingness to interact with your social media content, not just watch passively. Whether you’re looking to boost brand loyalty, foster a vibrant community, or prove ROI for clients, this metric is often favored over follower count or reach alone because it reflects real, meaningful interaction.
        </p>
        <h4>Key Benefits of Tracking Engagement Rate:</h4>
        <ul>
          <li><strong>Measure Content Resonance:</strong> See which posts get the most traction and replicate success.</li>
          <li><strong>Monitor Growth:</strong> As your engagement rises, your posts are more likely to be algorithmically boosted.</li>
          <li><strong>Benchmark Performance:</strong> Compare across posts, campaigns, or competitors.</li>
        </ul>
        <h4>The Engagement Rate Formula: Breaking it Down</h4>
        <p>
          The most common formula is:
        </p>
        <pre className="bg-blue-50 text-slate-700 rounded p-4">
{`Engagement Rate = ((Likes + Comments) ÷ Followers) × 100`}
        </pre>
        <ul>
          <li><strong>Likes:</strong> All positive reactions, e.g. ❤ on Instagram, Facebook, LinkedIn.</li>
          <li><strong>Comments:</strong> Any reply or user comment.</li>
          <li><strong>Followers:</strong> The total audience following your account at the time of posting.</li>
        </ul>
        <h3>How to Use This Calculator</h3>
        <ol>
          <li>Enter the number of likes your post or account received.</li>
          <li>Enter the number of comments (optional, set to 0 if none).</li>
          <li>Fill in your follower count at the posting time.</li>
          <li>Click <b>Calculate</b> to instantly get your engagement rate as a percentage.</li>
        </ol>
        <div className="flex items-center gap-4 bg-white rounded-md border border-blue-100 shadow px-4 py-3 my-4">
          <MousePointerClick size={28} className="text-primary" />
          <span className="text-blue-700 text-base font-medium">Engagement Rate = ((Likes + Comments) / Followers) × 100</span>
        </div>

        <h3>Why Does Engagement Rate Matter?</h3>
        <p>
          A high engagement rate means your community is compelled to interact, not just scroll by. Brands and agencies often use this data to assess influencer value, campaign ROI, or to identify brand advocates within their audience.
        </p>
        <p>
          Even if your following is small, a high engagement rate can increase the organic reach of your posts thanks to platform algorithms prioritizing interactive content.
        </p>
        
        <h4>Comparing Engagement Across Platforms</h4>
        <ul>
          <li><b>Instagram:</b> Average: 1–3% — Over 3% is high. Micro-influencers tend to have higher rates.</li>
          <li><b>Facebook:</b> Around 1% is typical.</li>
          <li><b>Twitter (X):</b> Averages 0.5–1%.</li>
          <li><b>LinkedIn:</b> Aim for 1–2% for most industries.</li>
        </ul>
        <h4>What Affects Engagement Rate?</h4>
        <ul>
          <li>Content quality and relevance</li>
          <li>Audience size (smaller, niche accounts often have higher rates)</li>
          <li>Posting time and consistency</li>
          <li>Type of media (images, videos, carousels typically outperform plain text)</li>
        </ul>
        <h4>Pro Tips to Boost Engagement Rate</h4>
        <ul>
          <li>Use calls-to-action (questions, prompts, polls)</li>
          <li>Incorporate eye-catching visuals or memes</li>
          <li>Respond to comments and messages quickly</li>
          <li>Leverage trending hashtags or topics</li>
        </ul>
        <h3>How To Use the Engagement Rate Calculator — Visual Guide</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 my-8">
          <div className="bg-white border border-gray-200 rounded shadow-md w-80 p-4 flex flex-col items-center">
            <Image size={40} className="mb-2 text-purple-500" />
            <p className="mb-2 text-gray-700">Step 1: Enter your numbers in the fields:
              <br/>
              <span className="block text-xs text-slate-500">e.g. Likes: 140, Comments: 13, Followers: 3200</span>
            </p>
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&q=80"
              alt="Calculator screenshot"
              className="w-48 h-24 object-cover rounded"
              loading="lazy"
            />
          </div>
          <div className="bg-white border border-gray-200 rounded shadow-md w-80 p-4 flex flex-col items-center">
            <Info size={38} className="mb-2 text-orange-400" />
            <p className="mb-2 text-gray-700">Step 2: Click <span className="font-semibold">Calculate</span> to see your engagement rate instantly. Try different scenarios or hit <span className="font-semibold">Reset</span> to start over.</p>
            <img
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=300&q=80"
              alt="Results screenshot"
              className="w-48 h-24 object-cover rounded"
              loading="lazy"
            />
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
          Calculating and tracking engagement rate helps you optimize your content strategy, grow your brand, and demonstrate real value. Use our Engagement Rate Calculator above to streamline your analytics, uncover trends, and start building a more connected social media presence today!
        </p>
      </div>
    </section>
  );
}
