
import { useState } from "react";
import { Heart, Scale } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
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

        {/* SEO Content Section */}
        <div className="bg-muted/30 py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-center">Complete BMI Calculator Guide: Understanding Body Mass Index for Better Health</h1>
            
            <div className="prose max-w-none space-y-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">What is Body Mass Index (BMI)?</h2>
                <p className="text-lg mb-4">
                  Body Mass Index (BMI) is a widely used screening tool that helps determine whether an individual has a healthy body weight 
                  relative to their height. Developed by Belgian mathematician Adolphe Quetelet in the 19th century, BMI provides a simple 
                  numerical measure that can be used to categorize individuals into different weight status categories.
                </p>
                <p className="mb-4">
                  The BMI calculation is straightforward: it divides a person&apos;s weight in kilograms by the square of their height in meters 
                  (kg/m²). For those using imperial measurements, the formula is slightly modified to account for pounds and inches. 
                  This standardized measurement allows healthcare professionals and individuals to quickly assess weight-related health risks.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">How to Calculate BMI: Step-by-Step Instructions</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-medium mb-3">Metric System</h3>
                    <p className="font-semibold mb-2">Formula: BMI = weight (kg) ÷ height² (m²)</p>
                    <ol className="space-y-2">
                      <li>1. Measure your weight in kilograms</li>
                      <li>2. Measure your height in centimeters, then convert to meters</li>
                      <li>3. Square your height (multiply by itself)</li>
                      <li>4. Divide your weight by the squared height</li>
                    </ol>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-xl font-medium mb-3">Imperial System</h3>
                    <p className="font-semibold mb-2">Formula: BMI = (weight × 703) ÷ height² (inches²)</p>
                    <ol className="space-y-2">
                      <li>1. Measure your weight in pounds</li>
                      <li>2. Measure your height in inches</li>
                      <li>3. Square your height in inches</li>
                      <li>4. Multiply weight by 703, then divide by squared height</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">Understanding BMI Categories and Health Implications</h2>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-lg font-medium mb-3 text-blue-700">Underweight (BMI < 18.5)</h3>
                      <p className="mb-3">Individuals in this category may have insufficient body weight for their height.</p>
                      <p className="text-sm"><strong>Health risks:</strong> Malnutrition, weakened immune system, osteoporosis, fertility issues</p>
                    </div>
                    
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="text-lg font-medium mb-3 text-green-700">Normal Weight (BMI 18.5-24.9)</h3>
                      <p className="mb-3">This range indicates a healthy weight for most adults.</p>
                      <p className="text-sm"><strong>Health benefits:</strong> Lower risk of chronic diseases, better energy levels, optimal health outcomes</p>
                    </div>
                    
                    <div className="bg-yellow-50 p-6 rounded-lg">
                      <h3 className="text-lg font-medium mb-3 text-yellow-700">Overweight (BMI 25.0-29.9)</h3>
                      <p className="mb-3">Weight above the normal range but below obesity levels.</p>
                      <p className="text-sm"><strong>Health risks:</strong> Increased risk of cardiovascular disease, type 2 diabetes, sleep apnea</p>
                    </div>
                    
                    <div className="bg-red-50 p-6 rounded-lg">
                      <h3 className="text-lg font-medium mb-3 text-red-700">Obese (BMI ≥ 30.0)</h3>
                      <p className="mb-3">Significantly increased health risks requiring medical attention.</p>
                      <p className="text-sm"><strong>Health risks:</strong> Heart disease, stroke, diabetes, certain cancers, sleep disorders</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">BMI Limitations and Alternative Measurements</h2>
                <p className="mb-4">
                  While BMI is a useful screening tool, it has several limitations that individuals should understand:
                </p>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Muscle vs. Fat Mass</h3>
                    <p className="text-sm">BMI doesn't distinguish between muscle and fat. Athletes with high muscle mass may have elevated BMI scores despite low body fat percentages.</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Age and Gender Variations</h3>
                    <p className="text-sm">BMI standards may not account for natural changes in body composition with age or differences between men and women.</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Ethnic Differences</h3>
                    <p className="text-sm">Different ethnic groups may have varying health risks at the same BMI levels, particularly Asian populations who may face health risks at lower BMI values.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">Healthy Weight Management Strategies</h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-3">Nutrition</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Balanced diet with fruits and vegetables</li>
                      <li>• Appropriate portion control</li>
                      <li>• Regular meal timing</li>
                      <li>• Adequate hydration</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-3">Physical Activity</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• 150 minutes moderate exercise weekly</li>
                      <li>• Strength training 2-3 times per week</li>
                      <li>• Daily movement and activity</li>
                      <li>• Progressive fitness goals</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-3">Lifestyle</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Adequate sleep (7-9 hours)</li>
                      <li>• Stress management techniques</li>
                      <li>• Regular health check-ups</li>
                      <li>• Social support systems</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions About BMI</h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Is BMI an accurate measure of health for everyone?
                </AccordionTrigger>
                <AccordionContent>
                  BMI is a useful screening tool but not a perfect measure of individual health. It doesn't account for muscle mass, 
                  bone density, body composition, or distribution of fat. Athletes, elderly individuals, and certain ethnic groups 
                  may need alternative assessments. It's best used as one factor among many in evaluating overall health status.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  How often should I calculate my BMI?
                </AccordionTrigger>
                <AccordionContent>
                  For most adults, calculating BMI quarterly (every 3 months) is sufficient for monitoring weight status. 
                  However, if you're actively trying to lose or gain weight, monthly calculations can help track progress. 
                  Remember that BMI is just one indicator - focus on overall health improvements rather than just the number.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  What should I do if my BMI indicates I'm overweight or obese?
                </AccordionTrigger>
                <AccordionContent>
                  If your BMI indicates overweight or obesity, consult with a healthcare provider for a comprehensive assessment. 
                  They can evaluate other health factors and recommend appropriate strategies. Generally, gradual weight loss through 
                  balanced nutrition and regular physical activity is recommended, aiming for 1-2 pounds per week.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Can BMI be used for children and teenagers?
                </AccordionTrigger>
                <AccordionContent>
                  BMI for children and teens (ages 2-19) is calculated the same way but interpreted differently using age and 
                  sex-specific percentiles rather than fixed categories. Pediatric BMI considers normal growth and development 
                  patterns. Always consult with a pediatrician for children's weight assessments rather than using adult BMI categories.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Does BMI account for different body types and genetics?
                </AccordionTrigger>
                <AccordionContent>
                  BMI doesn't account for individual body types, genetic factors, or natural body composition variations. 
                  Some people naturally carry more muscle mass or have different fat distribution patterns. Genetic factors 
                  can influence metabolism, body shape, and weight distribution. Consider BMI alongside other health indicators 
                  and family history for a complete picture.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  What are some alternatives to BMI for measuring health?
                </AccordionTrigger>
                <AccordionContent>
                  Alternative measurements include waist circumference, waist-to-hip ratio, body fat percentage, and waist-to-height ratio. 
                  These can provide additional insights into health risks. Laboratory tests like blood pressure, cholesterol levels, 
                  and blood sugar are also important health indicators that complement BMI measurements.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  How does age affect BMI interpretation?
                </AccordionTrigger>
                <AccordionContent>
                  As people age, muscle mass naturally decreases and fat distribution changes, which can affect BMI interpretation. 
                  Some research suggests slightly higher BMI ranges might be acceptable for older adults. However, the standard 
                  BMI categories are still widely used. Older adults should focus on maintaining muscle mass through resistance 
                  training and adequate protein intake alongside weight management.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BMI;
