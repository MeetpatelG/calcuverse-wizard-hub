
import { useState } from "react";
import { Heart, Scale } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const BMI = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("metric");
  const [bmi, setBmi] = useState(0);
  const [category, setCategory] = useState("");
  const [calculated, setCalculated] = useState(false);

  const calculateBMI = () => {
    if (!height || !weight) return;

    let heightInM = parseFloat(height);
    let weightInKg = parseFloat(weight);

    // Convert to metric if needed
    if (unit === "imperial") {
      heightInM = heightInM * 0.3048; // feet to meters
      weightInKg = weightInKg * 0.453592; // pounds to kg
    } else {
      heightInM = heightInM / 100; // cm to meters
    }

    const calculatedBMI = weightInKg / (heightInM * heightInM);
    setBmi(calculatedBMI);
    setCalculated(true);

    // Determine category
    if (calculatedBMI < 18.5) {
      setCategory("Underweight");
    } else if (calculatedBMI < 25) {
      setCategory("Normal Weight");
    } else if (calculatedBMI < 30) {
      setCategory("Overweight");
    } else {
      setCategory("Obese");
    }
  };

  const getBMIColor = () => {
    if (bmi < 18.5) return "text-blue-600";
    if (bmi < 25) return "text-green-600";
    if (bmi < 30) return "text-yellow-600";
    return "text-red-600";
  };

  const getBMIBgColor = () => {
    if (bmi < 18.5) return "bg-blue-100";
    if (bmi < 25) return "bg-green-100";
    if (bmi < 30) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-6">
          <span>Home</span> / <span>Personal Calculators</span> / <span className="text-foreground">BMI Calculator</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-primary" />
                <CardTitle>BMI Calculator</CardTitle>
              </div>
              <CardDescription>
                Calculate your Body Mass Index (BMI) to assess if you're at a healthy weight.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Unit Selection */}
              <div className="space-y-3">
                <Label>Unit System</Label>
                <RadioGroup value={unit} onValueChange={setUnit} className="flex space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="metric" id="metric" />
                    <Label htmlFor="metric">Metric (cm, kg)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="imperial" id="imperial" />
                    <Label htmlFor="imperial">Imperial (ft, lbs)</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Height Input */}
              <div className="space-y-2">
                <Label htmlFor="height">
                  Height ({unit === "metric" ? "cm" : "feet"})
                </Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder={unit === "metric" ? "170" : "5.8"}
                  className="text-lg"
                  step={unit === "metric" ? "1" : "0.1"}
                />
              </div>

              {/* Weight Input */}
              <div className="space-y-2">
                <Label htmlFor="weight">
                  Weight ({unit === "metric" ? "kg" : "lbs"})
                </Label>
                <Input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={unit === "metric" ? "70" : "154"}
                  className="text-lg"
                  step={unit === "metric" ? "0.1" : "1"}
                />
              </div>

              <Button onClick={calculateBMI} className="w-full" disabled={!height || !weight}>
                Calculate BMI
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle>BMI Results</CardTitle>
              <CardDescription>
                Your Body Mass Index and health category assessment.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {calculated ? (
                <>
                  <div className={`${getBMIBgColor()} p-6 rounded-lg text-center`}>
                    <div className="text-sm text-muted-foreground mb-2">Your BMI</div>
                    <div className={`text-4xl font-bold ${getBMIColor()}`}>
                      {bmi.toFixed(1)}
                    </div>
                    <div className={`text-lg font-semibold mt-2 ${getBMIColor()}`}>
                      {category}
                    </div>
                  </div>

                  {/* BMI Scale */}
                  <div className="space-y-3">
                    <h3 className="font-semibold">BMI Categories</h3>
                    <div className="space-y-2">
                      <div className={`flex justify-between p-2 rounded ${bmi < 18.5 ? 'bg-blue-100' : 'bg-muted'}`}>
                        <span>Underweight</span>
                        <span>Below 18.5</span>
                      </div>
                      <div className={`flex justify-between p-2 rounded ${bmi >= 18.5 && bmi < 25 ? 'bg-green-100' : 'bg-muted'}`}>
                        <span>Normal Weight</span>
                        <span>18.5 - 24.9</span>
                      </div>
                      <div className={`flex justify-between p-2 rounded ${bmi >= 25 && bmi < 30 ? 'bg-yellow-100' : 'bg-muted'}`}>
                        <span>Overweight</span>
                        <span>25.0 - 29.9</span>
                      </div>
                      <div className={`flex justify-between p-2 rounded ${bmi >= 30 ? 'bg-red-100' : 'bg-muted'}`}>
                        <span>Obese</span>
                        <span>30.0 and above</span>
                      </div>
                    </div>
                  </div>

                  {/* Health Recommendations */}
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Health Recommendations</h4>
                    <p className="text-sm text-muted-foreground">
                      {bmi < 18.5 && "Consider consulting a healthcare provider about healthy weight gain strategies."}
                      {bmi >= 18.5 && bmi < 25 && "Great! You're in the healthy weight range. Maintain your current lifestyle."}
                      {bmi >= 25 && bmi < 30 && "Consider adopting a balanced diet and regular exercise routine."}
                      {bmi >= 30 && "Consult with a healthcare provider for a comprehensive weight management plan."}
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <Scale className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter your height and weight to calculate your BMI</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* SEO Content */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Understanding Body Mass Index (BMI)</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Body Mass Index (BMI) is a screening tool used to determine if you are underweight, 
                normal weight, overweight, or obese. It's calculated using your height and weight 
                and provides a general indication of whether you have a healthy body weight.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">How BMI is Calculated</h3>
              <p>
                BMI = weight (kg) / height (m)²
              </p>
              <p>
                For imperial units: BMI = (weight in pounds × 703) / (height in inches)²
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">BMI Limitations</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Does not distinguish between muscle and fat mass</li>
                <li>May not be accurate for athletes with high muscle mass</li>
                <li>Does not account for age, gender, or ethnicity differences</li>
                <li>Should be used as a screening tool, not a diagnostic measure</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BMI;
