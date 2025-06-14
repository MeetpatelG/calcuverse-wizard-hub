
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar, Droplet, Clock } from "lucide-react";

export interface PregnancyData {
  dueDate: Date;
  currentWeek: number;
  currentDay: number;
  trimester: number;
  daysLeft: number;
  conceptionDate: Date;
}

interface Props {
  onCalculate: (result: PregnancyData) => void;
}

const PregnancyCalculatorForm = ({ onCalculate }: Props) => {
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState("28");

  const calculatePregnancy = () => {
    if (!lastPeriod) return;
    const lmpDate = new Date(lastPeriod);
    const today = new Date();
    // Due date (280 days from LMP)
    const dueDate = new Date(lmpDate);
    dueDate.setDate(dueDate.getDate() + 280);
    // Conception date (14 days after LMP)
    const conceptionDate = new Date(lmpDate);
    conceptionDate.setDate(conceptionDate.getDate() + 14);
    // Current week and day
    const daysDifference = Math.floor((today.getTime() - lmpDate.getTime()) / (1000 * 60 * 60 * 24));
    const currentWeek = Math.floor(daysDifference / 7);
    const currentDay = daysDifference % 7;
    // Trimester
    let trimester = 1;
    if (currentWeek >= 13) trimester = 2;
    if (currentWeek >= 27) trimester = 3;
    // Days left
    const daysLeft = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    onCalculate({
      dueDate,
      currentWeek,
      currentDay,
      trimester,
      daysLeft,
      conceptionDate,
    });
  };

  const reset = () => {
    setLastPeriod("");
    setCycleLength("28");
    onCalculate(undefined as any); // undefined/null allowed to clear results
  };

  return (
    <Card className="shadow-xl border-2 border-pink-100 bg-gradient-to-tr from-white via-rose-50 to-pink-50 animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-pink-600">
          <Calendar className="h-6 w-6" />
          Pregnancy Information
        </CardTitle>
        <CardDescription>
          Enter your last menstrual period date and cycle length
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="last-period" className="flex items-center gap-2">
            <Droplet className="h-4 w-4 text-blue-500" />
            Last Menstrual Period (LMP)
          </Label>
          <Input
            id="last-period"
            type="date"
            value={lastPeriod}
            onChange={(e) => setLastPeriod(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="bg-white/60 border-pink-200 shadow-sm focus:ring-pink-400"
          />
          <p className="text-xs text-muted-foreground">
            First day of your last menstrual period
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cycle-length" className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-yellow-500" />
            Average Cycle Length (days)
          </Label>
          <Input
            id="cycle-length"
            type="number"
            placeholder="28"
            value={cycleLength}
            onChange={(e) => setCycleLength(e.target.value)}
            min="21"
            max="35"
            className="bg-white/60 border-pink-200 shadow-sm focus:ring-pink-400"
          />
          <p className="text-xs text-muted-foreground">
            Typical range: 21-35 days (average is 28 days)
          </p>
        </div>

        <div className="flex gap-3 mt-2">
          <Button
            onClick={calculatePregnancy}
            className="flex-1 bg-gradient-to-r from-pink-500 to-pink-400 hover:from-pink-400 hover:to-pink-500 text-white shadow-lg transition-all"
            disabled={!lastPeriod}
          >
            Calculate Due Date
          </Button>
          <Button
            onClick={reset}
            variant="outline"
            className="flex-1 border-pink-200 text-pink-600 hover:border-pink-300"
            type="button"
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PregnancyCalculatorForm;

