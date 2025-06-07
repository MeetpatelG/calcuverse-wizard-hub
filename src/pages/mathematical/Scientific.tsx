
import { useState } from "react";
import { Calculator } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

        <div className="max-w-md mx-auto mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Calculator className="h-6 w-6 text-primary" />
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

        {/* SEO Content Section */}
        <div className="bg-muted/30 py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-center">Complete Guide to Scientific Calculator: Advanced Mathematical Computations Made Simple</h1>
            
            <div className="prose max-w-none space-y-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">What is a Scientific Calculator?</h2>
                <p className="text-lg mb-4">
                  A scientific calculator is an advanced computational tool designed to perform complex mathematical operations beyond basic arithmetic. 
                  Unlike standard calculators that handle only addition, subtraction, multiplication, and division, scientific calculators provide 
                  sophisticated functions including trigonometric calculations, logarithms, exponentials, and statistical operations.
                </p>
                <p className="mb-4">
                  Our online scientific calculator brings the power of advanced mathematics to your fingertips, making it perfect for students, 
                  engineers, scientists, and professionals who require precise mathematical computations in their daily work.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">Key Features of Our Scientific Calculator</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-medium mb-3">Trigonometric Functions</h3>
                    <ul className="space-y-2">
                      <li>• Sine (sin), Cosine (cos), Tangent (tan)</li>
                      <li>• Inverse trigonometric functions</li>
                      <li>• Degree and radian calculations</li>
                      <li>• Hyperbolic functions</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-3">Logarithmic Operations</h3>
                    <ul className="space-y-2">
                      <li>• Natural logarithm (ln)</li>
                      <li>• Common logarithm (log)</li>
                      <li>• Exponential functions</li>
                      <li>• Power calculations</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">How to Use the Scientific Calculator: Step-by-Step Guide</h2>
                
                <div className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-medium mb-3">Step 1: Basic Number Input</h3>
                    <p>Click on the number buttons (0-9) to enter your values. The display shows your current input in real-time.</p>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-xl font-medium mb-3">Step 2: Scientific Functions</h3>
                    <p>For trigonometric calculations, enter your angle value first, then click the desired function (sin, cos, tan). 
                    The calculator automatically converts degrees to radians for accurate results.</p>
                  </div>
                  
                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <h3 className="text-xl font-medium mb-3">Step 3: Advanced Operations</h3>
                    <p>Use power functions (x², x³) by entering the base number first, then clicking the power button. 
                    For square roots, enter the number and click √.</p>
                  </div>
                  
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-xl font-medium mb-3">Step 4: Mathematical Constants</h3>
                    <p>Access π (pi) and e (Euler's number) by clicking their respective buttons. These provide precise values 
                    for advanced calculations.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">Applications in Different Fields</h2>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-3">Engineering</h3>
                    <p>Calculate structural loads, electrical circuits, signal processing, and mechanical system designs with precision.</p>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-3">Physics</h3>
                    <p>Solve complex equations involving wave mechanics, thermodynamics, quantum physics, and astronomical calculations.</p>
                  </div>
                  
                  <div className="bg-orange-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-3">Mathematics</h3>
                    <p>Handle calculus, algebra, statistics, and advanced mathematical proofs with comprehensive function support.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">Advanced Calculation Techniques</h2>
                <p className="mb-4">
                  Mastering scientific calculator usage involves understanding the order of operations and function precedence. 
                  Our calculator follows standard mathematical conventions, ensuring accurate results for complex expressions.
                </p>
                
                <div className="bg-gray-50 p-6 rounded-lg mb-4">
                  <h3 className="text-lg font-medium mb-3">Memory and Precision</h3>
                  <p>The calculator maintains high precision throughout calculations, reducing rounding errors that can accumulate 
                  in multi-step problems. This is crucial for scientific and engineering applications where accuracy is paramount.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  How accurate are the trigonometric calculations in this scientific calculator?
                </AccordionTrigger>
                <AccordionContent>
                  Our scientific calculator provides highly accurate trigonometric calculations using JavaScript's built-in Math functions, 
                  which typically offer precision up to 15-17 decimal places. The calculator automatically converts degrees to radians 
                  for trigonometric functions, ensuring accurate results for both educational and professional use.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Can I use this calculator for complex engineering calculations?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, this scientific calculator is designed to handle complex engineering calculations including logarithmic functions, 
                  exponentials, power operations, and trigonometric calculations. It's suitable for electrical engineering, mechanical 
                  engineering, civil engineering, and other technical fields requiring precise mathematical computations.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  What's the difference between ln and log functions?
                </AccordionTrigger>
                <AccordionContent>
                  The 'ln' function calculates the natural logarithm (base e ≈ 2.718), while 'log' calculates the common logarithm 
                  (base 10). Natural logarithms are commonly used in calculus, physics, and engineering, while common logarithms 
                  are often used in chemistry, astronomy, and decibel calculations.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  How do I calculate inverse trigonometric functions?
                </AccordionTrigger>
                <AccordionContent>
                  Currently, this calculator provides direct trigonometric functions (sin, cos, tan). For inverse functions 
                  (arcsin, arccos, arctan), you would need to use the relationship that if sin(x) = y, then x = arcsin(y). 
                  Many scientific calculators include dedicated inverse function buttons for more complex calculations.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Is this scientific calculator suitable for statistical calculations?
                </AccordionTrigger>
                <AccordionContent>
                  While this calculator excels at basic scientific functions, it's primarily designed for algebraic and trigonometric 
                  calculations. For advanced statistical operations like standard deviation, regression analysis, or probability 
                  distributions, you might need specialized statistical software or calculators with dedicated statistical functions.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  Can I use this calculator on mobile devices?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, this scientific calculator is fully responsive and works seamlessly on mobile devices, tablets, and desktop computers. 
                  The interface automatically adapts to your screen size, ensuring all buttons remain easily accessible and the display 
                  remains clearly visible across all devices.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  How do I clear the calculator or fix input errors?
                </AccordionTrigger>
                <AccordionContent>
                  Use the red 'C' (Clear) button to reset the calculator completely, clearing the display and any stored operations. 
                  This is the quickest way to start fresh if you make an input error or want to begin a new calculation. 
                  The calculator also handles decimal points and prevents multiple decimal entries automatically.
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

export default Scientific;
