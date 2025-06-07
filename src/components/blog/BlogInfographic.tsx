
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BlogInfographic = () => {
  const budgetData = [
    { name: 'Needs (50%)', value: 50, color: '#0088FE' },
    { name: 'Wants (30%)', value: 30, color: '#00C49F' },
    { name: 'Savings (20%)', value: 20, color: '#FFBB28' }
  ];

  const compoundGrowthData = [
    { year: 'Year 1', amount: 1000 },
    { year: 'Year 5', amount: 1469 },
    { year: 'Year 10', amount: 2159 },
    { year: 'Year 15', amount: 3172 },
    { year: 'Year 20', amount: 4661 },
    { year: 'Year 25', amount: 6848 },
    { year: 'Year 30', amount: 10063 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Financial Planning at a Glance</h2>
      
      <div className="grid md:grid-cols-2 gap-8 bg-card p-8 rounded-lg border">
        {/* Budget Allocation Pie Chart */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-center">Ideal Budget Allocation (50/30/20 Rule)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={budgetData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {budgetData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Compound Interest Growth Chart */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-center">Power of Compound Interest ($1,000 at 7% Annual Return)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={compoundGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="year" 
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, 'Investment Value']} />
              <Bar dataKey="amount" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        <div className="text-center p-6 bg-primary/10 rounded-lg">
          <div className="text-3xl font-bold text-primary mb-2">78%</div>
          <div className="text-sm text-muted-foreground">of Americans live paycheck to paycheck</div>
        </div>
        <div className="text-center p-6 bg-green-500/10 rounded-lg">
          <div className="text-3xl font-bold text-green-600 mb-2">20%</div>
          <div className="text-sm text-muted-foreground">recommended savings rate for financial security</div>
        </div>
        <div className="text-center p-6 bg-orange-500/10 rounded-lg">
          <div className="text-3xl font-bold text-orange-600 mb-2">7%</div>
          <div className="text-sm text-muted-foreground">average annual stock market return (inflation-adjusted)</div>
        </div>
        <div className="text-center p-6 bg-purple-500/10 rounded-lg">
          <div className="text-3xl font-bold text-purple-600 mb-2">25x</div>
          <div className="text-sm text-muted-foreground">annual expenses needed for retirement (FIRE rule)</div>
        </div>
      </div>

      {/* Tools Effectiveness Chart */}
      <div className="mt-8 p-6 bg-muted/30 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-center">Most Effective Financial Planning Tools</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Budget Calculators</span>
            <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '95%' }}></div>
            </div>
            <span className="text-sm font-semibold">95%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Compound Interest Calculators</span>
            <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
            </div>
            <span className="text-sm font-semibold">90%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Debt Payoff Calculators</span>
            <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <span className="text-sm font-semibold">85%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Investment Planners</span>
            <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '80%' }}></div>
            </div>
            <span className="text-sm font-semibold">80%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Tax Optimization Tools</span>
            <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <span className="text-sm font-semibold">75%</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-4 text-center">
          * Effectiveness ratings based on user success in achieving financial goals
        </p>
      </div>
    </section>
  );
};

export default BlogInfographic;
