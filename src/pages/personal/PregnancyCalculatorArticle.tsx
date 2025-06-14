
import React from "react";
import { Baby, CalendarCheck2, HeartPulse, ShieldCheck, Star, Bookmark, Info } from "lucide-react";

const faq = [
  {
    q: "How accurate is the Pregnancy Calculator?",
    a: "The Pregnancy Calculator provides an estimated due date based on the information you supply, such as your last menstrual period (LMP) and average cycle length. While it's a useful guideline, actual delivery dates can vary – only about 5% of babies arrive on their exact due date! For the highest accuracy, especially when irregular cycles are involved, consult your healthcare provider and consider an early ultrasound."
  },
  {
    q: "Is my data safe on TechGuruTool?",
    a: "Absolutely. The Pregnancy Calculator on TechGuruTool processes your entered information locally in your browser — none of your personal data is stored, shared, or transmitted. Your privacy and safety are top priorities."
  },
  {
    q: "Does the tool work on mobile devices and tablets?",
    a: "Yes! TechGuruTool’s Pregnancy Calculator is fully responsive and optimized for all devices, including smartphones, tablets, laptops, and desktops. Enjoy the same smooth experience no matter where you access it."
  },
  {
    q: "What if I don’t remember the exact date of my last period?",
    a: "If you don’t know the exact date, use your best estimate. For the most precise results, try to enter the first day of your last menstrual period. Healthcare professionals may use ultrasounds or additional questions to refine the estimated due date."
  },
  {
    q: "Can I calculate pregnancy for irregular cycles?",
    a: "Yes, you can specify your average cycle length in the tool (typical range: 21–35 days). For highly irregular cycles, results may be less precise; consult your healthcare provider for further guidance."
  },
  {
    q: "Is the Pregnancy Calculator free to use?",
    a: "Yes, TechGuruTool’s Pregnancy Calculator is 100% free to use — no registration, fees, or hidden costs."
  },
  {
    q: "I see different due dates from medical apps. Why?",
    a: "Different calculators or apps may use slightly different methods or assumptions (e.g., standard vs. customized cycle lengths). TechGuruTool’s uses widely accepted guidelines based on your input for optimal accuracy."
  }
];

const PregnancyCalculatorArticle: React.FC = () => (
  <article>
    <section className="w-full rounded-2xl bg-white shadow-md border border-pink-100 mb-12 mt-16 px-4 py-10 md:px-10 md:py-16 max-w-4xl mx-auto">
      <header className="mb-8 text-center">
        <div className="flex justify-center mb-3">
          <Baby className="w-12 h-12 text-pink-400 bg-pink-100 rounded-full p-2 shadow" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">
          Pregnancy Calculator: Track Your Journey with TechGuruTool
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          Discover how our free Pregnancy Calculator empowers expecting parents, healthcare professionals, and anyone wanting to estimate due dates — all with security, accuracy, and ease of use at heart.
        </p>
      </header>
      <figure className="flex justify-center mb-8">
        <img
          src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80"
          className="rounded-2xl shadow-lg border border-pink-50"
          alt="Happy couple looking at pregnancy ultrasound and using a digital pregnancy calculator"
          width="500"
          height="320"
          loading="lazy"
        />
      </figure>

      <h3 className="text-2xl font-semibold mb-4 text-blue-700 bg-blue-50 px-3 py-2 rounded">What is a Pregnancy Calculator?</h3>
      <p className="mb-4 text-base">
        A Pregnancy Calculator is an online tool that estimates your baby’s expected due date and tracks your progress through each stage of pregnancy.
        By entering key details — like the first day of your last menstrual period (LMP) and your average cycle length — you’ll get personalized insights: from your estimated delivery date to current trimester, conception date, and more.
      </p>
      <ul className="mb-6 bg-yellow-50 border-l-4 border-yellow-300 pl-6 py-4 rounded">
        <li className="flex items-center mb-2"><Star className="w-5 h-5 text-yellow-500 mr-2" /> Instantly calculates due date, conception date, and gestational age.</li>
        <li className="flex items-center mb-2"><CalendarCheck2 className="w-5 h-5 text-blue-500 mr-2" /> Helps you monitor key milestones: trimesters, weeks, and days left.</li>
        <li className="flex items-center mb-2"><HeartPulse className="w-5 h-5 text-pink-500 mr-2" /> Ideal for expectant mothers, families, midwives, and doctors.</li>
        <li className="flex items-center"><ShieldCheck className="w-5 h-5 text-green-500 mr-2" /> 100% private — your data never leaves your device.</li>
      </ul>

      <h3 className="text-2xl font-semibold mb-4 text-teal-700 bg-teal-50 px-3 py-2 rounded">How Does the Pregnancy Calculator Work?</h3>
      <p className="mb-4">
        The TechGuruTool Pregnancy Calculator uses the date of your last menstrual period (LMP) and the typical length of your menstrual cycle to calculate your estimated due date. Here’s how:
      </p>
      <ol className="list-decimal pl-8 mb-4 space-y-2">
        <li>
          <b>Input Data:</b> Enter the first day of your last menstrual period and your average cycle length.
        </li>
        <li>
          <b>Calculation:</b> The tool adds 280 days (40 weeks) to your LMP, adjusting for custom cycle lengths if needed, to estimate your due date.
        </li>
        <li>
          <b>Trimester Tracking:</b> The calculator identifies your current trimester and gestational week.
        </li>
        <li>
          <b>Extras:</b> See your estimated conception date and days left until your due date.
        </li>
      </ol>
      
      <figure className="flex justify-center mb-8">
        <img
          src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80"
          className="rounded-xl shadow border border-pink-100"
          alt="Pregnancy calendar, weeks and trimesters visual illustration"
          width="500"
          height="320"
          loading="lazy"
        />
      </figure>

      <h2 className="text-2xl font-semibold mb-4 text-purple-700 bg-purple-50 px-3 py-2 rounded">Key Features of TechGuruTool’s Pregnancy Calculator</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <li className="flex items-start gap-3 bg-gray-50 rounded-lg p-4 border border-gray-100 shadow-sm h-full">
          <Info className="w-6 h-6 shrink-0 text-blue-400 mt-1" />
          <div>
            <b>Simple & Intuitive Interface:</b> Designed for all users, with clear input fields and instant results.
          </div>
        </li>
        <li className="flex items-start gap-3 bg-pink-50 rounded-lg p-4 border border-pink-100 shadow-sm h-full">
          <CalendarCheck2 className="w-6 h-6 shrink-0 text-pink-400 mt-1" />
          <div>
            <b>Comprehensive Results:</b> Get due date, conception date, trimester info, and days remaining, all at a glance.
          </div>
        </li>
        <li className="flex items-start gap-3 bg-green-50 rounded-lg p-4 border border-green-100 shadow-sm h-full">
          <ShieldCheck className="w-6 h-6 shrink-0 text-green-500 mt-1" />
          <div>
            <b>100% Privacy-First:</b> No sign-up. No data sharing. Fully browser-based for maximum privacy.
          </div>
        </li>
        <li className="flex items-start gap-3 bg-yellow-50 rounded-lg p-4 border border-yellow-100 shadow-sm h-full">
          <Star className="w-6 h-6 shrink-0 text-yellow-400 mt-1" />
          <div>
            <b>Free & Unlimited:</b> No registration, no costs — use the tool as often as you like.
          </div>
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4 text-lime-700 bg-lime-50 px-3 py-2 rounded">How to Use the Pregnancy Calculator: Step-by-Step Guide</h2>
      <ol className="list-decimal pl-8 mb-8 space-y-3">
        <li><b>Open:</b> Visit the TechGuruTool Pregnancy Calculator page.</li>
        <li>
          <b>Enter LMP:</b> In the “Last Menstrual Period” field, select or type the date when your last period started.
        </li>
        <li>
          <b>Add Cycle Length:</b> Enter your typical menstrual cycle length. Most users have a cycle of about 28 days, but you can adjust for your body.
        </li>
        <li>
          <b>Calculate:</b> Click the <span className="bg-blue-100 rounded px-2 py-1">Calculate Due Date</span> button. Instantly see your estimated due date and pregnancy details.
        </li>
        <li>
          <b>Explore Results:</b> Review your due date, gestational week, current trimester, days left, and more.
        </li>
        <li>
          <b>Bookmark & Share:</b> Save the page for easy future reference, or share your results with your healthcare provider or loved ones.
        </li>
      </ol>
      <figure className="flex justify-center mb-8">
        <img
          src="https://images.unsplash.com/photo-1519864600265-abb2b4305bc9?auto=format&fit=crop&w=800&q=80"
          className="rounded-2xl shadow border border-teal-100"
          alt="Pregnant woman using a health app on a tablet"
          width="500"
          height="320"
          loading="lazy"
        />
      </figure>

      <h2 className="text-2xl font-semibold mb-4 text-rose-700 bg-rose-50 px-3 py-2 rounded">Practical Use Cases for the Pregnancy Calculator</h2>
      <ul className="list-disc pl-6 mb-8 space-y-2">
        <li><b>Expectant Parents:</b> Monitor due dates and trimester transitions, and better prepare for checkups or milestones.</li>
        <li><b>Partners & Families:</b> Share important dates and plan celebrations or support routines.</li>
        <li><b>Healthcare Professionals:</b> Quickly estimate EDDs during appointments for enhanced patient care.</li>
        <li><b>Fertility Planners:</b> Calculate conception windows for planning or fertility management.</li>
        <li><b>Birth Educators:</b> Demonstrate pregnancy math and tracking to students or clients.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4 text-cyan-700 bg-cyan-50 px-3 py-2 rounded">Expert Tips for Getting the Most from the Tool</h2>
      <ul className="mb-8 space-y-2">
        <li><b>Double-Check Dates:</b> The more accurate your LMP and cycle length, the better your results.</li>
        <li><b>Bookmark for Follow-Up:</b> Save the tool to your phone’s home screen or browser bookmarks for easy access throughout your pregnancy journey.</li>
        <li><b>Update Regularly:</b> If your circumstances change (e.g., new LMP or cycle pattern), recalculate for most up-to-date estimates.</li>
        <li><b>Consult Professionals:</b> Use this tool as a helpful guide, but always discuss with your doctor or midwife for medical advice.</li>
      </ul>


      <h2 className="text-2xl font-semibold mb-4 text-indigo-700 bg-indigo-50 px-3 py-2 rounded">Your Privacy & Security: Zero Data Stored</h2>
      <div className="flex md:flex-row flex-col items-center md:items-start gap-4 mb-8">
        <ShieldCheck className="w-14 h-14 text-green-500 shrink-0 bg-green-50 rounded-full p-3 border-2 border-green-100 shadow" />
        <div className="flex-1">
          <p>
            <b>You’re in control:</b> Everything you enter – your LMP, cycle length, or other details – is processed instantly and never leaves your device. No data is uploaded or collected. Your privacy is always protected on TechGuruTool.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-pink-700 bg-pink-50 px-3 py-2 rounded">Frequently Asked Questions</h2>
      <dl className="mb-10 divide-y divide-pink-100">
        {faq.map((item, idx) => (
          <div key={idx} className="py-4">
            <dt className="font-semibold text-base text-pink-800 flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-pink-400" /> {item.q}
            </dt>
            <dd className="pl-6 text-gray-700">{item.a}</dd>
          </div>
        ))}
      </dl>

      <aside className="bg-gradient-to-r from-blue-50 via-pink-50 to-yellow-50 border-l-4 border-blue-300 py-6 px-6 rounded-xl shadow text-center mb-10">
        <Bookmark className="w-8 h-8 text-blue-400 mb-2 mx-auto" />
        <h3 className="text-xl font-semibold mb-1 text-blue-700">Give the Pregnancy Calculator a Try!</h3>
        <p className="mb-2">
          Ready to take control of your pregnancy timeline? Try our free Pregnancy Calculator now — and bookmark TechGuruTool for quick access any time.
        </p>
        <a
          href="/personal/pregnancy"
          className="inline-block mt-3 px-6 py-2 bg-pink-600 text-white font-semibold rounded shadow hover:bg-pink-700 transition"
        >
          Start Calculating My Due Date
        </a>
      </aside>

      <footer className="text-center text-sm text-muted-foreground">
        Looking for more helpful tools? <a className="text-blue-600 underline hover:text-pink-600" href="/">Browse all calculators on TechGuruTool</a>
      </footer>
    </section>
  </article>
);

export default PregnancyCalculatorArticle;
