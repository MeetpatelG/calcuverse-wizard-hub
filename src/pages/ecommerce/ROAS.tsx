
import { ShoppingBag, Info } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const DEFAULT_LOGS = [{ input: { revenue: 400, adSpend: 100 }, result: 4 }];

export default function ROAS() {
  const [logs, setLogs] = useState(DEFAULT_LOGS);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto mb-8">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
              <ShoppingBag className="h-8 w-8 text-lime-600" />
              <CardTitle>Return on Ad Spend (ROAS) Calculator</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-5 w-5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Calculate the revenue generated per dollar spent on ads.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <CardDescription>
              Enter ad spend / revenue to measure ad performance. Batch, logs, LaTeX, chart/export stub included.
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
                <li key={idx}>Rev: ${log.input.revenue} / Ad spend: ${log.input.adSpend} → ROAS: {log.result}x</li>
              ))}
            </ul>
            <div>
              <span className="font-medium">LaTeX Output:</span>
              <div className="bg-gray-50 rounded px-2 py-1 mt-1 text-xs text-gray-700">
                {"$ ROAS = \\frac{\\text{Revenue}}{\\text{Ad\\ Spend}} $"}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
