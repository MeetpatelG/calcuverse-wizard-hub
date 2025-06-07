
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BudgetFormProps {
  onCalculate: (data: {
    totalIncome: number;
    totalExpenses: number;
    surplus: number;
    savingsRate: number;
    categories: Array<{name: string; amount: number; percentage: number}>;
  }) => void;
}

interface ExpenseCategory {
  id: string;
  name: string;
  amount: number;
}

const BudgetForm = ({ onCalculate }: BudgetFormProps) => {
  const [income, setIncome] = useState("");
  const [categories, setCategories] = useState<ExpenseCategory[]>([
    { id: "1", name: "Housing", amount: 0 },
    { id: "2", name: "Transportation", amount: 0 },
    { id: "3", name: "Food", amount: 0 },
    { id: "4", name: "Utilities", amount: 0 },
  ]);

  const addCategory = () => {
    const newCategory: ExpenseCategory = {
      id: Date.now().toString(),
      name: "",
      amount: 0
    };
    setCategories([...categories, newCategory]);
  };

  const removeCategory = (id: string) => {
    if (categories.length > 1) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const updateCategory = (id: string, field: keyof ExpenseCategory, value: string | number) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, [field]: value } : cat
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const totalIncome = parseFloat(income) || 0;
    const totalExpenses = categories.reduce((sum, cat) => sum + (cat.amount || 0), 0);
    const surplus = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? (surplus / totalIncome) * 100 : 0;

    const categoriesWithPercentage = categories.map(cat => ({
      name: cat.name || "Unnamed Category",
      amount: cat.amount || 0,
      percentage: totalIncome > 0 ? ((cat.amount || 0) / totalIncome) * 100 : 0
    }));

    onCalculate({
      totalIncome,
      totalExpenses,
      surplus,
      savingsRate,
      categories: categoriesWithPercentage
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Budget Planner</CardTitle>
        <CardDescription>
          Enter your monthly income and expenses to create your budget
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="income">Monthly Income ($)</Label>
            <Input
              id="income"
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="5000"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <Label>Expense Categories</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addCategory}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </div>
            
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="flex gap-3 items-center">
                  <Input
                    placeholder="Category name"
                    value={category.name}
                    onChange={(e) => updateCategory(category.id, "name", e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={category.amount || ""}
                    onChange={(e) => updateCategory(category.id, "amount", parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.01"
                    className="w-32"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeCategory(category.id)}
                    disabled={categories.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full">
            Calculate Budget
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BudgetForm;
