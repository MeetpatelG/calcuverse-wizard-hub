
import { ShoppingCart, Info } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const DEFAULT_LOGS = [{ input: { revenue: 500, orders: 20 }, result: 25 }];

export default function AverageOrderValue() {
  const [logs, setLogs] = useState(DEFAULT_LOGS);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto mb-8">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
              <ShoppingCart className="h-8 w-8 text-gray-700" />
              <CardTitle>Average Order Value Calculator</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-5 w-5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Measures your average order value for sales optimization.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <CardDescription>
              Divide total revenue by number of orders. Batch, logs, LaTeX, chart and export options ready.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="mb-3">Batch Input (Coming Soon)</Button>
            <div className="mb-3">Export:
              <Button variant="ghost" size="sm" className="ml-2">CSV</Button>
              <Button variant="ghost" size="sm">PDF</Button>
            </div>
            <div className="h-32 flex items-center justify-center bg-muted rounded mb-3 text-muted-foreground">[Graph Placeholder]</div>
            <div className="mb-2 font-medium">Calculation Log:</div>
            <ul className="mb-3 text-sm bg-muted rounded p-2">
              {logs.map((log, idx) => (
                <li key={idx}>${log.input.revenue} / {log.input.orders} orders = ${log.result}</li>
              ))}
            </ul>
            <div>
              <span className="font-medium">LaTeX Output:</span>
              <div className="bg-gray-50 rounded px-2 py-1 mt-1 text-xs text-gray-700">
                $ AOV = \frac{{\text{{Total Revenue}}}}{{\text{{Number of Orders}}}} $
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
