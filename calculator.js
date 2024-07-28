class Calculator {
  constructor(dataPrevOperandTextElement, dataCurrentOperandTextElement) {
    this.dataCurrentOperandTextElement = dataCurrentOperandTextElement;
    this.dataPrevOperandTextElement = dataPrevOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.prevOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.indexOf(".") !== -1) return;
    this.currentOperand = this.currentOperand + number.toString();
  }

  choseOperation(operator) {
    if (this.currentOperand === "") {
      return;
    }
    if (this.prevOperand === "") {
      this.compute();
    }
    this.prevOperand = this.currentOperand;
    this.currentOperand = "";
    this.operation = operator;
  }

  compute() {
    const firstOperand = parseFloat(this.prevOperand);
    const secondOperand = parseFloat(this.currentOperand);
    if (isNaN(firstOperand) || isNaN(secondOperand)) {
      return;
    }
    let result;
    switch (this.operation) {
      case "+":
        result = firstOperand + secondOperand;
        break;
      case "-":
        result = firstOperand - secondOperand;
        break;
      case "*":
        result = firstOperand * secondOperand;
        break;
      case "/":
        result = firstOperand / secondOperand;
        break;
      default:
        return;
    }
    if (result) {
      this.prevOperand = "";
      this.currentOperand = result;
    }
    this.operation = undefined;
  }

  updateDisplay() {
    this.dataCurrentOperandTextElement.innerText = this.currentOperand;
    this.dataPrevOperandTextElement.innerText = this.prevOperand;
  }
}

const dataNumber = document.querySelectorAll("[data-number]");
const dataOperator = document.querySelectorAll("[data-operator]");
const dataAllClear = document.querySelector("[data-all-clear]");
const dataDelete = document.querySelector("[data-delete]");
const dataEquals = document.querySelector("[data-equals]");

const dataPrevOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const dataCurrentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  dataPrevOperandTextElement,
  dataCurrentOperandTextElement
);

dataNumber.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

dataDelete.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

dataAllClear.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

dataOperator.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.choseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

dataEquals.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});
