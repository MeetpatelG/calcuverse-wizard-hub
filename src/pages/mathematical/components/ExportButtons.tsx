
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportCSV, exportPDF } from "../utils/export";
import { useState } from "react";

type Props = {
  num: number;
  factors: number[];
  steps: string[];
};
export default function ExportButtons({ num, factors, steps }: Props) {
  const [pdfLoading, setPdfLoading] = useState(false);

  return (
    <div className="flex gap-3 mt-4">
      <Button
        size="sm"
        variant="outline"
        onClick={() => exportCSV(num, factors, steps)}
        title="Download results as CSV"
      >
        <Download className="mr-2" /> CSV
      </Button>
      <Button
        size="sm"
        variant="outline"
        disabled={pdfLoading}
        onClick={async () => {
          setPdfLoading(true);
          await exportPDF(num, factors, steps);
          setTimeout(() => setPdfLoading(false), 800);
        }}
        title="Export as PDF (opens print dialog)"
      >
        <Download className="mr-2" /> {pdfLoading ? "Exporting..." : "PDF"}
      </Button>
    </div>
  );
}
