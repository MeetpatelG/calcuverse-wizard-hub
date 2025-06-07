
import { useState } from "react";
import { Calculator, Activity, Target, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Calorie = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState<{
    bmr: number;
    tdee: number;
    goalCalories: number;
    weightChangePerWeek: number;
  } | null>(null);

  const calculateCalories = () => {
    const ageNum = parseFloat(age) || 0;
    const heightNum = parseFloat(height) || 0;
    const weightNum = parseFloat(weight) || 0;

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr = 0;
    if (gender === "male") {
      bmr = 88.362 + (13.397 * weightNum) + (4.799 * heightNum) - (5.677 * ageNum);
    } else if (gender === "female") {
      bmr = 447.593 + (9.247 * weightNum) + (3.098 * heightNum) - (4.330 * ageNum);
    }

    // Activity level multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };

    const multiplier = activityMultipliers[activityLevel as keyof typeof activityMultipliers] || 1.2;
    const tdee = bmr * multiplier;

    // Goal adjustments
    let goalCalories = tdee;
    let weightChangePerWeek = 0;

    if (goal === "lose_1") {
      goalCalories = tdee - 500; // 1 lb per week
      weightChangePerWeek = -1;
    } else if (goal === "lose_2") {
      goalCalories = tdee - 1000; // 2 lbs per week
      weightChangePerWeek = -2;
    } else if (goal === "gain_1") {
      goalCalories = tdee + 500; // 1 lb per week
      weightChangePerWeek = 1;
    } else if (goal === "gain_2") {
      goalCalories = tdee + 1000; // 2 lbs per week
      weightChangePerWeek = 2;
    }

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      goalCalories: Math.round(goalCalories),
      weightChangePerWeek
    });
  };

  const resetCalculator = () => {
    setAge("");
    setGender("");
    setHeight("");
    setWeight("");
    setActivityLevel("");
    setGoal("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Calculator className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Calorie Calculator</h1>
            <p className="text-xl text-muted-foreground">
              Calculate your daily calorie needs based on your goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Enter your details to calculate calorie needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age (years)</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="30"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="175"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="70"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activity">Activity Level</Label>
                  <Select value={activityLevel} onValueChange={setActivityLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                      <SelectItem value="light">Light (light exercise 1-3 days/week)</SelectItem>
                      <SelectItem value="moderate">Moderate (moderate exercise 3-5 days/week)</SelectItem>
                      <SelectItem value="active">Active (hard exercise 6-7 days/week)</SelectItem>
                      <SelectItem value="very_active">Very Active (very hard exercise, physical job)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goal">Goal</Label>
                  <Select value={goal} onValueChange={setGoal}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lose_2">Lose 2 lbs per week</SelectItem>
                      <SelectItem value="lose_1">Lose 1 lb per week</SelectItem>
                      <SelectItem value="maintain">Maintain current weight</SelectItem>
                      <SelectItem value="gain_1">Gain 1 lb per week</SelectItem>
                      <SelectItem value="gain_2">Gain 2 lbs per week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-4">
                  <Button onClick={calculateCalories} className="flex-1">
                    Calculate Calories
                  </Button>
                  <Button onClick={resetCalculator} variant="outline">
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {result && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Your Calorie Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">BMR</p>
                      <p className="text-2xl font-bold">{result.bmr}</p>
                      <p className="text-xs text-muted-foreground">calories/day</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">TDEE</p>
                      <p className="text-2xl font-bold">{result.tdee}</p>
                      <p className="text-xs text-muted-foreground">calories/day</p>
                    </div>
                  </div>

                  <div className="text-center p-6 bg-primary/10 rounded-lg border-2 border-primary/20">
                    <p className="text-sm text-muted-foreground mb-2">Target Daily Calories</p>
                    <p className="text-4xl font-bold text-primary">{result.goalCalories}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {result.weightChangePerWeek !== 0 && (
                        `Expected: ${Math.abs(result.weightChangePerWeek)} lb/week ${result.weightChangePerWeek > 0 ? 'gain' : 'loss'}`
                      )}
                      {result.weightChangePerWeek === 0 && "Maintain current weight"}
                    </p>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>Important:</strong> These are estimates. Individual needs may vary. 
                      Consult a healthcare professional before making significant dietary changes.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Understanding Your Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What is BMR?</AccordionTrigger>
                    <AccordionContent>
                      Basal Metabolic Rate (BMR) is the number of calories your body needs to maintain basic physiological 
                      functions like breathing, circulation, and cell production while at rest. This represents about 60-70% 
                      of your total daily energy expenditure.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What is TDEE?</AccordionTrigger>
                    <AccordionContent>
                      Total Daily Energy Expenditure (TDEE) is your BMR multiplied by an activity factor. 
                      This represents the total calories you burn in a day including exercise and daily activities. 
                      This is your maintenance calories - eat this amount to maintain your current weight.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>How does weight loss/gain work?</AccordionTrigger>
                    <AccordionContent>
                      Weight change is based on caloric deficit or surplus. One pound of fat equals approximately 3,500 calories. 
                      To lose 1 pound per week, you need a deficit of 500 calories per day. To gain 1 pound per week, 
                      you need a surplus of 500 calories per day.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>Are these calculations accurate?</AccordionTrigger>
                    <AccordionContent>
                      These calculations use the Mifflin-St Jeor equation, which is considered one of the most accurate 
                      for most people. However, individual metabolism can vary due to factors like genetics, muscle mass, 
                      hormones, and medical conditions. Use these as a starting point and adjust based on your results.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Calorie;
