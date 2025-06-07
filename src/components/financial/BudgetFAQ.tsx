
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const BudgetFAQ = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is the 50/30/20 budget rule?</AccordionTrigger>
          <AccordionContent>
            The 50/30/20 rule is a simple budgeting framework where you allocate 50% of your after-tax income to needs (housing, utilities, groceries), 30% to wants (entertainment, dining out), and 20% to savings and debt repayment. This rule provides a balanced approach to managing your finances while ensuring you save for the future.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>How much should I save each month?</AccordionTrigger>
          <AccordionContent>
            Financial experts generally recommend saving at least 20% of your income, but this can vary based on your age, income level, and financial goals. If you're just starting out, even saving 10% is a good beginning. The key is to save consistently and increase your savings rate as your income grows or expenses decrease.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>What should I include in my emergency fund?</AccordionTrigger>
          <AccordionContent>
            Your emergency fund should cover 3-6 months of essential expenses including housing, utilities, groceries, transportation, insurance, and minimum debt payments. Don't include discretionary spending like entertainment or dining out. The fund should be easily accessible in a high-yield savings account for unexpected situations like job loss or medical emergencies.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>How often should I review my budget?</AccordionTrigger>
          <AccordionContent>
            Review your budget monthly to track actual spending against your plan and make necessary adjustments. Conduct a more comprehensive review quarterly to assess progress toward financial goals and make strategic changes. Major life events like job changes, moving, or family changes should trigger immediate budget reviews.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>What if my expenses exceed my income?</AccordionTrigger>
          <AccordionContent>
            If expenses exceed income, prioritize essential expenses first and look for areas to cut non-essential spending. Consider ways to increase income through side hustles, skill development, or job advancement. Create a plan to eliminate the deficit within 2-3 months to avoid accumulating debt. Use our calculator to model different scenarios and find the right balance.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>How do I budget for irregular income?</AccordionTrigger>
          <AccordionContent>
            For irregular income, calculate your average monthly income over the past 6-12 months and budget based on the lower end of that range. Build a larger emergency fund (6-9 months of expenses) to smooth out income fluctuations. During high-income months, save the excess for lower-income periods. Consider percentage-based budgeting rather than fixed dollar amounts.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger>Should I pay off debt or save first?</AccordionTrigger>
          <AccordionContent>
            Start with a small emergency fund ($1,000) for unexpected expenses, then focus on high-interest debt (credit cards, personal loans). Once high-interest debt is eliminated, build your full emergency fund, then balance between investing and paying off lower-interest debt like mortgages. The key is to avoid accumulating new high-interest debt while building wealth.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8">
          <AccordionTrigger>How can I reduce my monthly expenses?</AccordionTrigger>
          <AccordionContent>
            Start by tracking all expenses for a month to identify spending patterns. Focus on big-ticket items like housing, transportation, and food. Consider downsizing housing, refinancing loans, switching to cheaper phone/internet plans, cooking more meals at home, and canceling unused subscriptions. Small changes in multiple categories can add up to significant monthly savings.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default BudgetFAQ;
