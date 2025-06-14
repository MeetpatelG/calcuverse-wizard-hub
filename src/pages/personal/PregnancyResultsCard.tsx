
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { PregnancyData } from "./PregnancyCalculatorForm";
import { formatDate, getTrimesterInfo } from "./pregnancy-utils";

interface Props {
  result: PregnancyData;
}

const PregnancyResultsCard = ({ result }: Props) => (
  <Card className="shadow-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-white to-pink-50 animate-fade-in">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-blue-800">
        <Heart className="h-5 w-5 text-pink-400 animate-pulse" />
        <span>Your Pregnancy Details</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      {/* Soft decorative image above results */}
      <div className="flex justify-center mb-2">
        <img
          src="/photo-1581091226825-a6a2a5aee158.jpg"
          alt="Pregnancy planning visual"
          className="rounded-xl border border-pink-100 shadow-md w-[220px] h-auto"
          width="220"
          height="140"
          loading="lazy"
        />
      </div>
      <div className="text-center p-6 bg-pink-50/80 dark:bg-pink-900/20 rounded-xl border-2 border-pink-200 dark:border-pink-700 shadow-sm">
        <p className="text-sm text-muted-foreground mb-1">Estimated Due Date</p>
        <p className="text-3xl font-bold text-pink-600 dark:text-pink-400 tracking-tight">
          {formatDate(result.dueDate)}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-muted rounded-xl shadow">
          <p className="text-xs text-muted-foreground">Current Week</p>
          <p className="text-2xl font-bold text-blue-900">{result.currentWeek}</p>
          <p className="text-xs text-muted-foreground">weeks + {result.currentDay} days</p>
        </div>
        <div className="text-center p-4 bg-muted rounded-xl shadow">
          <p className="text-xs text-muted-foreground">Trimester</p>
          <p className="text-2xl font-bold text-blue-700">{result.trimester}</p>
          <p className="text-xs text-muted-foreground">{getTrimesterInfo(result.trimester)?.name}</p>
        </div>
        <div className="text-center p-4 bg-muted rounded-xl shadow">
          <p className="text-xs text-muted-foreground">Days Until Due Date</p>
          <p className="text-2xl font-bold text-yellow-700">
            {result.daysLeft > 0 ? result.daysLeft : 'Past due'}
          </p>
        </div>
        <div className="text-center p-4 bg-muted rounded-xl shadow">
          <p className="text-xs text-muted-foreground">Conception Date</p>
          <p className="text-sm font-medium text-blue-600">{formatDate(result.conceptionDate)}</p>
          <p className="text-xs text-muted-foreground">Estimated</p>
        </div>
      </div>
      <div className="bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-4 shadow">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
          {getTrimesterInfo(result.trimester)?.name} ({getTrimesterInfo(result.trimester)?.weeks} weeks)
        </h4>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          {getTrimesterInfo(result.trimester)?.description}
        </p>
      </div>
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 shadow">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>Important:</strong> This is an estimate based on your last menstrual period. 
          Only an ultrasound can provide a more accurate due date. Always consult your healthcare provider.
        </p>
      </div>
    </CardContent>
  </Card>
);

export default PregnancyResultsCard;

