
import { useState } from "react";
import { Truck, Package } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ShippingCost = () => {
  const [weight, setWeight] = useState("");
  const [distance, setDistance] = useState("");
  const [shippingType, setShippingType] = useState("");
  const [packageType, setPackageType] = useState("");
  const [shippingCost, setShippingCost] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const calculateShipping = () => {
    if (!weight || !distance || !shippingType) return;

    const weightNum = parseFloat(weight);
    const distanceNum = parseFloat(distance);
    
    let baseCost = weightNum * 0.5; // Base cost per kg
    let distanceCost = distanceNum * 0.1; // Cost per km
    
    // Shipping type multipliers
    const multipliers = {
      standard: 1,
      express: 1.5,
      overnight: 2.5,
      international: 3
    };
    
    // Package type fees
    const packageFees = {
      envelope: 0,
      small: 2,
      medium: 5,
      large: 10,
      fragile: 15
    };
    
    const typeMultiplier = multipliers[shippingType as keyof typeof multipliers] || 1;
    const packageFee = packageFees[packageType as keyof typeof packageFees] || 0;
    
    const totalCost = (baseCost + distanceCost) * typeMultiplier + packageFee;
    
    setShippingCost(totalCost);
    setCalculated(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <span>Home</span> / <span>E-commerce Calculators</span> / <span className="text-foreground">Shipping Cost Calculator</span>
        </div>

        <div className="text-center mb-8">
          <Truck className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Shipping Cost Calculator</h1>
          <p className="text-xl text-muted-foreground">
            Calculate accurate shipping costs for your e-commerce business
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Package className="h-6 w-6 text-primary" />
                <CardTitle>Shipping Details</CardTitle>
              </div>
              <CardDescription>
                Enter package and shipping information to calculate costs.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="weight">Package Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="2.5"
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="distance">Distance (km)</Label>
                <Input
                  id="distance"
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                  placeholder="150"
                />
              </div>

              <div className="space-y-2">
                <Label>Shipping Type</Label>
                <Select value={shippingType} onValueChange={setShippingType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select shipping type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard (5-7 days)</SelectItem>
                    <SelectItem value="express">Express (2-3 days)</SelectItem>
                    <SelectItem value="overnight">Overnight</SelectItem>
                    <SelectItem value="international">International</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Package Type</Label>
                <Select value={packageType} onValueChange={setPackageType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select package type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="envelope">Envelope</SelectItem>
                    <SelectItem value="small">Small Package</SelectItem>
                    <SelectItem value="medium">Medium Package</SelectItem>
                    <SelectItem value="large">Large Package</SelectItem>
                    <SelectItem value="fragile">Fragile Item</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={calculateShipping} className="w-full" disabled={!weight || !distance || !shippingType}>
                Calculate Shipping Cost
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Cost Results</CardTitle>
              <CardDescription>Your calculated shipping cost</CardDescription>
            </CardHeader>
            <CardContent>
              {calculated ? (
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground mb-2">Total Shipping Cost</div>
                    <div className="text-3xl font-bold text-primary">
                      ${shippingCost.toFixed(2)}
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Weight: {weight} kg</span>
                      <span>Distance: {distance} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Type: {shippingType}</span>
                      <span>Package: {packageType}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <Truck className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter shipping details to calculate cost</p>
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

export default ShippingCost;
