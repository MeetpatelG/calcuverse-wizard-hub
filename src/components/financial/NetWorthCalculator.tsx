
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NetWorthCalculator = () => {
  const [assets, setAssets] = useState([{ name: "", value: "" }]);
  const [liabilities, setLiabilities] = useState([{ name: "", value: "" }]);
  const [result, setResult] = useState<number | null>(null);

  const handleAssetChange = (idx: number, field: string, value: string) => {
    setAssets(as =>
      as.map((a, i) => (i === idx ? { ...a, [field]: value } : a))
    );
  };

  const handleLiabilityChange = (idx: number, field: string, value: string) => {
    setLiabilities(ls =>
      ls.map((l, i) => (i === idx ? { ...l, [field]: value } : l))
    );
  };

  const addAsset = () => setAssets([...assets, { name: "", value: "" }]);
  const addLiability = () => setLiabilities([...liabilities, { name: "", value: "" }]);

  const removeAsset = (idx: number) => setAssets(assets.filter((_, i) => i !== idx));
  const removeLiability = (idx: number) => setLiabilities(liabilities.filter((_, i) => i !== idx));

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const totalAssets = assets.reduce((sum, a) => sum + (parseFloat(a.value) || 0), 0);
    const totalLiab = liabilities.reduce((sum, l) => sum + (parseFloat(l.value) || 0), 0);
    setResult(totalAssets - totalLiab);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Net Worth Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleCalculate}>
          <div>
            <h4 className="font-semibold mb-2">Assets</h4>
            {assets.map((a, idx) => (
              <div className="flex gap-2 mb-2" key={idx}>
                <Input
                  className="flex-1"
                  placeholder="Asset name (e.g. Savings)"
                  value={a.name}
                  onChange={e => handleAssetChange(idx, "name", e.target.value)}
                  required
                />
                <Input
                  className="w-32"
                  type="number"
                  placeholder="Value"
                  min="0"
                  value={a.value}
                  onChange={e => handleAssetChange(idx, "value", e.target.value)}
                  required
                />
                {assets.length > 1 && (
                  <Button type="button" variant="destructive" onClick={() => removeAsset(idx)}>-</Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" className="mt-1" onClick={addAsset}>Add Asset</Button>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Liabilities</h4>
            {liabilities.map((l, idx) => (
              <div className="flex gap-2 mb-2" key={idx}>
                <Input
                  className="flex-1"
                  placeholder="Liability name (e.g. Credit Card)"
                  value={l.name}
                  onChange={e => handleLiabilityChange(idx, "name", e.target.value)}
                  required
                />
                <Input
                  className="w-32"
                  type="number"
                  placeholder="Value"
                  min="0"
                  value={l.value}
                  onChange={e => handleLiabilityChange(idx, "value", e.target.value)}
                  required
                />
                {liabilities.length > 1 && (
                  <Button type="button" variant="destructive" onClick={() => removeLiability(idx)}>-</Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" className="mt-1" onClick={addLiability}>Add Liability</Button>
          </div>
          <Button className="w-full mt-2" type="submit">
            Calculate Net Worth
          </Button>
        </form>
        {result !== null && (
          <div className="mt-6 text-center">
            <div className="text-lg font-semibold">Your Net Worth:</div>
            <div className={`text-2xl font-bold ${result >= 0 ? "text-green-700" : "text-red-700"}`}>
              {result.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </div>
            <div className="text-muted-foreground mt-2 text-sm">
              Net worth = Total Assets minus Total Liabilities.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NetWorthCalculator;
