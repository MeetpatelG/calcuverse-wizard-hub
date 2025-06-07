
import { useState } from "react";
import { Calculator } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Scientific = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? String(num) : display + num);
    }
  };

  const inputDot = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation) => {
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
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return firstValue / secondValue;
      case "^":
        return Math.pow(firstValue, secondValue);
      case "=":
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performScientificOperation = (func) => {
    const inputValue = parseFloat(display);
    let result;

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
      case "log":
        result = Math.log10(inputValue);
        break;
      case "ln":
        result = Math.log(inputValue);
        break;
      case "sqrt":
        result = Math.sqrt(inputValue);
        break;
      case "square":
        result = inputValue * inputValue;
        break;
      case "factorial":
        result = factorial(inputValue);
        break;
      case "pi":
        result = Math.PI;
        break;
      case "e":
        result = Math.E;
        break;
      default:
        return;
    }

    setDisplay(String(result));
    setWaitingForOperand(true);
  };

  const factorial = (n) => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const buttonClass = "h-12 text-lg font-semibold";
  const operatorClass = "h-12 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90";
  const scientificClass = "h-12 text-sm font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/90";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-6">
          <span>Home</span> / <span>Mathematical Calculators</span> / <span className="text-foreground">Scientific Calculator</span>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Calculator className="h-6 w-6 text-primary" />
                <CardTitle>Scientific Calculator</CardTitle>
              </div>
              <CardDescription>
                Advanced calculator with scientific functions for complex mathematical operations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Display */}
              <div className="bg-muted p-4 rounded-lg mb-6">
                <div className="text-right text-3xl font-mono break-all">
                  {display}
                </div>
              </div>

              {/* Calculator Buttons */}
              <div className="grid grid-cols-6 gap-2">
                {/* Scientific Functions Row 1 */}
                <Button onClick={() => performScientificOperation("sin")} className={scientificClass}>
                  sin
                </Button>
                <Button onClick={() => performScientificOperation("cos")} className={scientificClass}>
                  cos
                </Button>
                <Button onClick={() => performScientificOperation("tan")} className={scientificClass}>
                  tan
                </Button>
                <Button onClick={() => performScientificOperation("log")} className={scientificClass}>
                  log
                </Button>
                <Button onClick={() => performScientificOperation("ln")} className={scientificClass}>
                  ln
                </Button>
                <Button onClick={clear} variant="destructive" className={buttonClass}>
                  C
                </Button>

                {/* Scientific Functions Row 2 */}
                <Button onClick={() => performScientificOperation("sqrt")} className={scientificClass}>
                  √
                </Button>
                <Button onClick={() => performScientificOperation("square")} className={scientificClass}>
                  x²
                </Button>
                <Button onClick={() => performOperation("^")} className={scientificClass}>
                  x^y
                </Button>
                <Button onClick={() => performScientificOperation("factorial")} className={scientificClass}>
                  x!
                </Button>
                <Button onClick={() => performScientificOperation("pi")} className={scientificClass}>
                  π
                </Button>
                <Button onClick={() => performScientificOperation("e")} className={scientificClass}>
                  e
                </Button>

                {/* Number and Operation Buttons */}
                <Button onClick={() => inputNumber(7)} className={buttonClass}>7</Button>
                <Button onClick={() => inputNumber(8)} className={buttonClass}>8</Button>
                <Button onClick={() => inputNumber(9)} className={buttonClass}>9</Button>
                <Button onClick={() => performOperation("÷")} className={operatorClass}>÷</Button>
                <Button onClick={() => performOperation("×")} className={operatorClass}>×</Button>
                <Button onClick={() => setDisplay(display.slice(0, -1) || "0")} className={buttonClass}>⌫</Button>

                <Button onClick={() => inputNumber(4)} className={buttonClass}>4</Button>
                <Button onClick={() => inputNumber(5)} className={buttonClass}>5</Button>
                <Button onClick={() => inputNumber(6)} className={buttonClass}>6</Button>
                <Button onClick={() => performOperation("-")} className={operatorClass}>-</Button>
                <Button onClick={() => performOperation("+")} className={operatorClass}>+</Button>
                <Button onClick={() => setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display)} className={buttonClass}>±</Button>

                <Button onClick={() => inputNumber(1)} className={buttonClass}>1</Button>
                <Button onClick={() => inputNumber(2)} className={buttonClass}>2</Button>
                <Button onClick={() => inputNumber(3)} className={buttonClass}>3</Button>
                <Button onClick={() => inputNumber(0)} className={`${buttonClass} col-span-2`}>0</Button>
                <Button onClick={inputDot} className={buttonClass}>.</Button>

                <Button onClick={() => performOperation("=")} className={`${operatorClass} col-span-6`}>=</Button>
              </div>
            </CardContent>
          </Card>

          {/* Usage Guide */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Scientific Calculator Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Trigonometric Functions</h3>
                <p className="text-sm text-muted-foreground">
                  sin, cos, tan functions work with degrees. Enter angle in degrees before pressing the function.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Logarithmic Functions</h3>
                <p className="text-sm text-muted-foreground">
                  log = logarithm base 10, ln = natural logarithm (base e)
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Special Functions</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>√ = Square root</li>
                  <li>x² = Square</li>
                  <li>x^y = Power function</li>
                  <li>x! = Factorial</li>
                  <li>π = Pi (3.14159...)</li>
                  <li>e = Euler's number (2.71828...)</li>
                </ul>
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
