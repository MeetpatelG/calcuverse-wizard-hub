
import { useState } from "react";
import { Home, MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PropertyValue = () => {
  const [squareFeet, setSquareFeet] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertyAge, setPropertyAge] = useState("");
  const [results, setResults] = useState<{
    estimatedValue: number;
    pricePerSqFt: number;
    valueRange: { min: number; max: number };
  } | null>(null);
  const [calculated, setCalculated] = useState(false);

  const calculateValue = () => {
    if (!squareFeet || !bedrooms || !bathrooms || !location || !propertyType) return;

    const sqFt = parseFloat(squareFeet);
    const age = parseFloat(propertyAge) || 0;
    
    // Base price per square foot by location
    const locationMultipliers = {
      urban: 200,
      suburban: 150,
      rural: 100,
      waterfront: 300
    };
    
    // Property type multipliers
    const typeMultipliers = {
      house: 1,
      condo: 0.85,
      townhouse: 0.9,
      apartment: 0.8
    };
    
    const basePricePerSqFt = locationMultipliers[location as keyof typeof locationMultipliers] || 150;
    const typeMultiplier = typeMultipliers[propertyType as keyof typeof typeMultipliers] || 1;
    
    // Age depreciation (1% per year after 10 years)
    const ageMultiplier = age > 10 ? 1 - ((age - 10) * 0.01) : 1;
    
    const adjustedPricePerSqFt = basePricePerSqFt * typeMultiplier * ageMultiplier;
    const baseValue = sqFt * adjustedPricePerSqFt;
    
    // Bedroom/bathroom bonus
    const roomBonus = (parseInt(bedrooms) * 5000) + (parseInt(bathrooms) * 3000);
    
    const estimatedValue = baseValue + roomBonus;
    const valueRange = {
      min: estimatedValue * 0.85,
      max: estimatedValue * 1.15
    };

    setResults({
      estimatedValue,
      pricePerSqFt: adjustedPricePerSqFt,
      valueRange
    });
    setCalculated(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <span>Home</span> / <span>Real Estate Calculators</span> / <span className="text-foreground">Property Value Calculator</span>
        </div>

        <div className="text-center mb-8">
          <Home className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Property Value Calculator</h1>
          <p className="text-xl text-muted-foreground">
            Estimate your property's market value
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <MapPin className="h-6 w-6 text-primary" />
                <CardTitle>Property Details</CardTitle>
              </div>
              <CardDescription>
                Enter your property information for valuation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="squareFeet">Square Feet</Label>
                <Input
                  id="squareFeet"
                  type="number"
                  value={squareFeet}
                  onChange={(e) => setSquareFeet(e.target.value)}
                  placeholder="2000"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    placeholder="3"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    placeholder="2"
                    step="0.5"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Location Type</Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urban">Urban</SelectItem>
                    <SelectItem value="suburban">Suburban</SelectItem>
                    <SelectItem value="rural">Rural</SelectItem>
                    <SelectItem value="waterfront">Waterfront</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Property Type</Label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">Single Family House</SelectItem>
                    <SelectItem value="condo">Condominium</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyAge">Property Age (years)</Label>
                <Input
                  id="propertyAge"
                  type="number"
                  value={propertyAge}
                  onChange={(e) => setPropertyAge(e.target.value)}
                  placeholder="10"
                />
              </div>

              <Button onClick={calculateValue} className="w-full" disabled={!squareFeet || !bedrooms || !bathrooms || !location || !propertyType}>
                Calculate Property Value
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Property Valuation</CardTitle>
              <CardDescription>Estimated market value</CardDescription>
            </CardHeader>
            <CardContent>
              {calculated && results ? (
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground mb-2">Estimated Value</div>
                    <div className="text-3xl font-bold text-primary">
                      ${results.estimatedValue.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-muted p-4 rounded">
                      <div className="text-xs text-muted-foreground">Price per Square Foot</div>
                      <div className="font-semibold text-lg">${results.pricePerSqFt.toFixed(0)}</div>
                    </div>
                    <div className="bg-muted p-4 rounded">
                      <div className="text-xs text-muted-foreground">Value Range</div>
                      <div className="font-semibold text-lg">
                        ${results.valueRange.min.toLocaleString()} - ${results.valueRange.max.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-card border p-4 rounded">
                    <h4 className="font-semibold mb-2">Property Summary</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Size:</span> <span>{squareFeet} sq ft</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bedrooms:</span> <span>{bedrooms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bathrooms:</span> <span>{bathrooms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Type:</span> <span className="capitalize">{propertyType}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <Home className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter property details to get valuation</p>
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

export default PropertyValue;
