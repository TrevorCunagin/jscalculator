class Calculator {
  constructor(previousOperandText, currentOperandText) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    this.clear();
  }

  delete() {

  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    //this.operation = undefined;
  }

  appendOperand(num) {
    this.currentOperand = num;
  }

  chooseOperation(operation) {

  }

  calculate() {

  }

  updateDisplay() {
    this.currentOperandText.innerText = this.currentOperand;
  }
}

const operandButtons = document.querySelectorAll('[data-operand]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelectorAll('[data-equal]');
const deleteButton = document.querySelectorAll('[data-delete]');
const clearButton = document.querySelectorAll('[data-clear]');
const previousOperandText = document.querySelectorAll('[data-prev-op]');
const currentOperandText = document.querySelectorAll('[data-current-op]');

const calculator = new Calculator(previousOperandText, currentOperandText);

operandButtons.forEach(button => {
  button.addEventListener('click', () => {
  calculator.appendOperand(button.innerText)
  calculator.updateDisplay()
  })
})
