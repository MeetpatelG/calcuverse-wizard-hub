
import { ShoppingBasket, Info } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const DEFAULT_LOGS = [{ input: { carts: 100, checkouts: 60 }, result: 40 }];

export default function CartAbandonment() {
  const [logs, setLogs] = useState(DEFAULT_LOGS);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto mb-8">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-2">
              <ShoppingBasket className="h-8 w-8 text-sky-600" />
              <CardTitle>Cart Abandonment Rate Calculator</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-5 w-5 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Understand what percent of carts are abandoned pre-checkout.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <CardDescription>
              See what percent of users don’t complete checkout. Batch, logs, LaTeX, simple chart and export options.
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
                <li key={idx}>Carts: {log.input.carts}, Checkouts: {log.input.checkouts}, Abandoned: {log.result}%</li>
              ))}
            </ul>
            <div>
              <span className="font-medium">LaTeX Output:</span>
              <div className="bg-gray-50 rounded px-2 py-1 mt-1 text-xs text-gray-700">
                $ \text{{Abandonment}} = \left(1 - \frac{{C}}{{A}}\right) \times 100 $
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
