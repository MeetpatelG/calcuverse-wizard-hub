
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const ProfitMarginFAQ = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const faqs = [
    {
      id: "what-is-profit-margin",
      question: "What is profit margin?",
      answer: "Profit margin is a financial metric that measures how much profit a company makes for every dollar of revenue. It's expressed as a percentage and calculated by dividing profit by revenue. A higher profit margin indicates better financial efficiency."
    },
    {
      id: "profit-vs-markup",
      question: "What's the difference between profit margin and markup?",
      answer: "Profit margin is calculated based on selling price (profit ÷ selling price), while markup is calculated based on cost price (profit ÷ cost price). For example, if you buy for $100 and sell for $150, your markup is 50% but your profit margin is 33.3%."
    },
    {
      id: "good-profit-margin",
      question: "What is considered a good profit margin?",
      answer: "Good profit margins vary by industry. Generally, a net profit margin of 10% is considered average, 20% is high, and 5% is low. Service businesses typically have higher margins (15-20%) than retail businesses (2-6%)."
    },
    {
      id: "improve-profit-margin",
      question: "How can I improve my profit margins?",
      answer: "You can improve profit margins by: increasing prices, reducing costs, improving operational efficiency, focusing on higher-margin products/services, negotiating better supplier terms, or reducing waste and overhead expenses."
    },
    {
      id: "gross-vs-net-margin",
      question: "What's the difference between gross and net profit margin?",
      answer: "Gross profit margin only considers direct costs (cost of goods sold), while net profit margin includes all expenses including overhead, taxes, and interest. Net profit margin gives a more complete picture of overall profitability."
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
        <CardDescription>
          Common questions about profit margin calculations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {faqs.map((faq) => (
          <Collapsible key={faq.id} open={openItems[faq.id]} onOpenChange={() => toggleItem(faq.id)}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg bg-muted p-4 text-left hover:bg-muted/80">
              <span className="font-medium">{faq.question}</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${openItems[faq.id] ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              <p className="text-muted-foreground">{faq.answer}</p>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
};

export default ProfitMarginFAQ;
