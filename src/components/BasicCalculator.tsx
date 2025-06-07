
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BasicCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return firstValue / secondValue;
      case "=":
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const clearEntry = () => {
    setDisplay("0");
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="pb-3">
        <CardTitle className="text-center text-lg">Quick Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted p-3 rounded text-right text-2xl font-mono min-h-[3rem] flex items-center justify-end">
          {display}
        </div>
        
        <div className="grid grid-cols-4 gap-2">
          <Button variant="outline" onClick={clear} className="col-span-2">
            AC
          </Button>
          <Button variant="outline" onClick={clearEntry}>
            CE
          </Button>
          <Button variant="outline" onClick={() => inputOperation("÷")}>
            ÷
          </Button>

          <Button variant="outline" onClick={() => inputNumber("7")}>
            7
          </Button>
          <Button variant="outline" onClick={() => inputNumber("8")}>
            8
          </Button>
          <Button variant="outline" onClick={() => inputNumber("9")}>
            9
          </Button>
          <Button variant="outline" onClick={() => inputOperation("×")}>
            ×
          </Button>

          <Button variant="outline" onClick={() => inputNumber("4")}>
            4
          </Button>
          <Button variant="outline" onClick={() => inputNumber("5")}>
            5
          </Button>
          <Button variant="outline" onClick={() => inputNumber("6")}>
            6
          </Button>
          <Button variant="outline" onClick={() => inputOperation("-")}>
            -
          </Button>

          <Button variant="outline" onClick={() => inputNumber("1")}>
            1
          </Button>
          <Button variant="outline" onClick={() => inputNumber("2")}>
            2
          </Button>
          <Button variant="outline" onClick={() => inputNumber("3")}>
            3
          </Button>
          <Button variant="outline" onClick={() => inputOperation("+")} className="row-span-2">
            +
          </Button>

          <Button variant="outline" onClick={() => inputNumber("0")} className="col-span-2">
            0
          </Button>
          <Button variant="outline" onClick={() => inputNumber(".")}>
            .
          </Button>
        </div>
        
        <Button onClick={performCalculation} className="w-full">
          =
        </Button>
      </CardContent>
    </Card>
  );
};

export default BasicCalculator;
