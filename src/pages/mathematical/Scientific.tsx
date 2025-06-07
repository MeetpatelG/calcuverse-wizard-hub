
import { useState } from "react";
import { Calculator, Function } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Scientific = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperator);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
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

  const performEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const performFunction = (func: string) => {
    const inputValue = parseFloat(display);
    let result = 0;

    switch (func) {
      case "sin":
        result = Math.sin(inputValue * Math.PI / 180);
        break;
      case "cos":
        result = Math.cos(inputValue * Math.PI / 180);
        break;
      case "tan":
        result = Math.tan(inputValue * Math.PI / 180);
        break;
      case "ln":
        result = Math.log(inputValue);
        break;
      case "log":
        result = Math.log10(inputValue);
        break;
      case "√":
        result = Math.sqrt(inputValue);
        break;
      case "x²":
        result = inputValue * inputValue;
        break;
      case "x³":
        result = inputValue * inputValue * inputValue;
        break;
      case "1/x":
        result = 1 / inputValue;
        break;
      case "π":
        result = Math.PI;
        break;
      case "e":
        result = Math.E;
        break;
    }

    setDisplay(String(result));
    setWaitingForOperand(true);
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <span>Home</span> / <span>Mathematical Calculators</span> / <span className="text-foreground">Scientific Calculator</span>
        </div>

        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Function className="h-6 w-6 text-primary" />
                <CardTitle>Scientific Calculator</CardTitle>
              </div>
              <CardDescription>
                Advanced mathematical calculations with scientific functions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Display */}
              <div className="bg-black text-white p-4 rounded text-right text-2xl font-mono mb-4 min-h-[60px] flex items-center justify-end">
                {display}
              </div>

              {/* Scientific Functions */}
              <div className="grid grid-cols-5 gap-2 mb-4">
                <Button variant="outline" onClick={() => performFunction("sin")}>sin</Button>
                <Button variant="outline" onClick={() => performFunction("cos")}>cos</Button>
                <Button variant="outline" onClick={() => performFunction("tan")}>tan</Button>
                <Button variant="outline" onClick={() => performFunction("ln")}>ln</Button>
                <Button variant="outline" onClick={() => performFunction("log")}>log</Button>
              </div>

              <div className="grid grid-cols-5 gap-2 mb-4">
                <Button variant="outline" onClick={() => performFunction("√")}>√</Button>
                <Button variant="outline" onClick={() => performFunction("x²")}>x²</Button>
                <Button variant="outline" onClick={() => performFunction("x³")}>x³</Button>
                <Button variant="outline" onClick={() => performFunction("1/x")}>1/x</Button>
                <Button variant="outline" onClick={() => performFunction("π")}>π</Button>
              </div>

              {/* Basic Calculator */}
              <div className="grid grid-cols-4 gap-2">
                <Button variant="destructive" onClick={clear}>C</Button>
                <Button variant="outline" onClick={() => performFunction("e")}>e</Button>
                <Button variant="outline" onClick={() => inputOperator("÷")}>÷</Button>
                <Button variant="outline" onClick={() => inputOperator("×")}>×</Button>

                <Button onClick={() => inputNumber("7")}>7</Button>
                <Button onClick={() => inputNumber("8")}>8</Button>
                <Button onClick={() => inputNumber("9")}>9</Button>
                <Button variant="outline" onClick={() => inputOperator("-")}>-</Button>

                <Button onClick={() => inputNumber("4")}>4</Button>
                <Button onClick={() => inputNumber("5")}>5</Button>
                <Button onClick={() => inputNumber("6")}>6</Button>
                <Button variant="outline" onClick={() => inputOperator("+")}>+</Button>

                <Button onClick={() => inputNumber("1")}>1</Button>
                <Button onClick={() => inputNumber("2")}>2</Button>
                <Button onClick={() => inputNumber("3")}>3</Button>
                <Button variant="default" className="row-span-2" onClick={performEquals}>=</Button>

                <Button className="col-span-2" onClick={() => inputNumber("0")}>0</Button>
                <Button onClick={() => inputNumber(".")}>.</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Scientific;
