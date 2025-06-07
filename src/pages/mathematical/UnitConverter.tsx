
import { useState } from "react";
import { Ruler, ArrowUpDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const UnitConverter = () => {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [category, setCategory] = useState("length");
  const [result, setResult] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const conversions = {
    length: {
      meter: 1,
      kilometer: 0.001,
      centimeter: 100,
      millimeter: 1000,
      inch: 39.3701,
      foot: 3.28084,
      yard: 1.09361,
      mile: 0.000621371
    },
    weight: {
      kilogram: 1,
      gram: 1000,
      pound: 2.20462,
      ounce: 35.274,
      ton: 0.001
    },
    temperature: {
      celsius: (c: number) => ({ celsius: c, fahrenheit: c * 9/5 + 32, kelvin: c + 273.15 }),
      fahrenheit: (f: number) => ({ celsius: (f - 32) * 5/9, fahrenheit: f, kelvin: (f - 32) * 5/9 + 273.15 }),
      kelvin: (k: number) => ({ celsius: k - 273.15, fahrenheit: (k - 273.15) * 9/5 + 32, kelvin: k })
    }
  };

  const unitOptions = {
    length: ['meter', 'kilometer', 'centimeter', 'millimeter', 'inch', 'foot', 'yard', 'mile'],
    weight: ['kilogram', 'gram', 'pound', 'ounce', 'ton'],
    temperature: ['celsius', 'fahrenheit', 'kelvin']
  };

  const convert = () => {
    if (!value || !fromUnit || !toUnit) return;

    const inputValue = parseFloat(value);
    let convertedValue = 0;

    if (category === 'temperature') {
      const tempConversions = conversions.temperature[fromUnit as keyof typeof conversions.temperature] as Function;
      const converted = tempConversions(inputValue);
      convertedValue = converted[toUnit];
    } else {
      const categoryConversions = conversions[category as keyof typeof conversions] as Record<string, number>;
      const baseValue = inputValue / categoryConversions[fromUnit];
      convertedValue = baseValue * categoryConversions[toUnit];
    }

    setResult(convertedValue);
    setCalculated(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <span>Home</span> / <span>Mathematical Calculators</span> / <span className="text-foreground">Unit Converter</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Ruler className="h-6 w-6 text-primary" />
                <CardTitle>Unit Converter</CardTitle>
              </div>
              <CardDescription>
                Convert between different units of measurement.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={(value) => {
                  setCategory(value);
                  setFromUnit("");
                  setToUnit("");
                  setCalculated(false);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="length">Length</SelectItem>
                    <SelectItem value="weight">Weight</SelectItem>
                    <SelectItem value="temperature">Temperature</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="value">Value</Label>
                <Input
                  id="value"
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter value"
                  className="text-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>From</Label>
                  <Select value={fromUnit} onValueChange={setFromUnit}>
                    <SelectTrigger>
                      <SelectValue placeholder="From unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {unitOptions[category as keyof typeof unitOptions].map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit.charAt(0).toUpperCase() + unit.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>To</Label>
                  <Select value={toUnit} onValueChange={setToUnit}>
                    <SelectTrigger>
                      <SelectValue placeholder="To unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {unitOptions[category as keyof typeof unitOptions].map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit.charAt(0).toUpperCase() + unit.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={convert} className="w-full" disabled={!value || !fromUnit || !toUnit}>
                Convert
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conversion Result</CardTitle>
              <CardDescription>Your converted value</CardDescription>
            </CardHeader>
            <CardContent>
              {calculated ? (
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground mb-2">
                      {value} {fromUnit} =
                    </div>
                    <div className="text-3xl font-bold text-primary">
                      {result.toLocaleString('en-US', { 
                        minimumFractionDigits: 0, 
                        maximumFractionDigits: 6 
                      })}
                    </div>
                    <div className="text-lg font-semibold mt-2">
                      {toUnit}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <ArrowUpDown className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter values and units to convert</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UnitConverter;
