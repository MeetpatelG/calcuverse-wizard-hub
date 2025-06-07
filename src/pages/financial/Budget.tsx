
import { useState } from "react";
import { Calculator, PiggyBank, TrendingUp, Target, DollarSign, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BudgetForm from "@/components/financial/BudgetForm";
import BudgetResults from "@/components/financial/BudgetResults";
import BudgetFAQ from "@/components/financial/BudgetFAQ";

const Budget = () => {
  const [result, setResult] = useState<{
    totalIncome: number;
    totalExpenses: number;
    surplus: number;
    savingsRate: number;
    categories: Array<{name: string; amount: number; percentage: number}>;
  } | null>(null);
  const [calculated, setCalculated] = useState(false);

  const handleCalculate = (data: {
    totalIncome: number;
    totalExpenses: number;
    surplus: number;
    savingsRate: number;
    categories: Array<{name: string; amount: number; percentage: number}>;
  }) => {
    setResult(data);
    setCalculated(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <PiggyBank className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Budget Calculator</h1>
            <p className="text-xl text-muted-foreground">
              Plan and track your monthly budget to achieve financial goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <BudgetForm onCalculate={handleCalculate} />
            <BudgetResults 
              totalIncome={result?.totalIncome || 0}
              totalExpenses={result?.totalExpenses || 0}
              surplus={result?.surplus || 0}
              savingsRate={result?.savingsRate || 0}
              categories={result?.categories || []}
              calculated={calculated}
            />
          </div>

          {/* SEO Content Section */}
          <div className="bg-muted/30 rounded-lg p-8 mb-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Complete Guide to Budget Planning</h2>
              
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="text-lg leading-relaxed mb-6">
                  Effective budget planning is the foundation of financial success and long-term wealth building. Our comprehensive budget calculator helps you track income, categorize expenses, and identify opportunities for savings and investment. Take control of your finances with data-driven budgeting strategies that align with your financial goals.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                  <div className="bg-card p-6 rounded-lg border">
                    <Calculator className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2">Smart Analysis</h3>
                    <p className="text-sm">Get detailed insights into your spending patterns and savings potential with automated calculations.</p>
                  </div>
                  <div className="bg-card p-6 rounded-lg border">
                    <Target className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2">Goal Setting</h3>
                    <p className="text-sm">Set and track financial goals with realistic budgeting targets and progress monitoring.</p>
                  </div>
                  <div className="bg-card p-6 rounded-lg border">
                    <TrendingUp className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2">Savings Growth</h3>
                    <p className="text-sm">Maximize your savings rate and build wealth through strategic budget allocation and expense optimization.</p>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold mb-4">Understanding Budget Categories</h3>
                <p className="mb-4">
                  Effective budgeting requires categorizing expenses into essential and discretionary spending. Essential expenses include housing, utilities, groceries, transportation, and minimum debt payments. Discretionary expenses cover entertainment, dining out, hobbies, and non-essential purchases that can be adjusted to improve your savings rate.
                </p>

                <p className="mb-6">
                  The 50/30/20 rule is a popular budgeting framework: allocate 50% of after-tax income to needs, 30% to wants, and 20% to savings and debt repayment. However, adjust these percentages based on your personal financial situation, goals, and life stage to create a sustainable and effective budget plan.
                </p>

                <h3 className="text-2xl font-semibold mb-4">Benefits of Regular Budget Tracking</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li><strong>Financial Awareness:</strong> Understand exactly where your money goes each month</li>
                  <li><strong>Expense Control:</strong> Identify and eliminate unnecessary spending patterns</li>
                  <li><strong>Savings Acceleration:</strong> Increase your savings rate through optimized spending</li>
                  <li><strong>Debt Reduction:</strong> Allocate more funds toward debt elimination strategies</li>
                  <li><strong>Goal Achievement:</strong> Stay on track for major financial milestones</li>
                  <li><strong>Emergency Preparedness:</strong> Build and maintain adequate emergency funds</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4">Budget Optimization Strategies</h3>
                <p className="mb-4">
                  Successful budgeting involves regular review and adjustment of spending categories. Start by tracking all expenses for a month to establish baseline spending patterns. Then identify areas where you can reduce costs without significantly impacting your quality of life. Focus on high-impact categories like housing, transportation, and food where small percentage reductions can yield substantial savings.
                </p>

                <div className="bg-card p-6 rounded-lg border my-6">
                  <h4 className="font-semibold mb-3">💡 Budgeting Tip</h4>
                  <p className="text-sm">
                    Use the pay-yourself-first principle by treating savings as a non-negotiable expense. Automate transfers to savings accounts immediately after receiving income to ensure consistent wealth building.
                  </p>
                </div>

                <h3 className="text-2xl font-semibold mb-4">Emergency Fund Planning</h3>
                <p className="mb-4">
                  An emergency fund should cover 3-6 months of essential expenses and be easily accessible in a high-yield savings account. Include this fund as a priority in your budget allocation, aiming to contribute consistently until you reach your target amount. Emergency funds provide financial security and prevent debt accumulation during unexpected situations.
                </p>

                <p className="mb-6">
                  Calculate your emergency fund target by multiplying your monthly essential expenses by your desired coverage period. Start with a smaller goal if necessary, such as $1,000, then gradually build toward the full target amount through consistent monthly contributions included in your budget plan.
                </p>

                <h3 className="text-2xl font-semibold mb-4">Debt Management in Budgeting</h3>
                <p className="mb-4">
                  Incorporate debt repayment strategies into your budget using either the debt snowball or debt avalanche method. The snowball method focuses on paying minimum amounts on all debts while directing extra payments toward the smallest balance. The avalanche method targets the highest interest rate debt first to minimize total interest paid.
                </p>

                <p className="mb-6">
                  Regardless of the method chosen, allocate a specific percentage of your income toward debt repayment above minimum payments. This accelerated approach reduces the total interest paid and shortens the debt repayment timeline, freeing up more money for savings and investment in the future.
                </p>

                <h3 className="text-2xl font-semibold mb-4">Technology and Budget Management</h3>
                <p className="mb-6">
                  Modern budgeting benefits from technology integration through apps, automated categorization, and real-time spending alerts. However, the fundamental principles remain consistent: track income, categorize expenses, set savings targets, and regularly review progress. Use our budget calculator as a starting point, then implement ongoing tracking systems that work with your lifestyle and preferences.
                </p>
              </div>
            </div>
          </div>

          <BudgetFAQ />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Budget;
