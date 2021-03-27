class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    //deletes last character in the calculator
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    //clears out the calculator
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    //adds next entered character
    appendOperand(num) {
        //prevents more than one dot from being added
        if (num === '.' && this.currentOperand.includes('.')) {
            return;
          }
        this.currentOperand = this.currentOperand.toString() + num.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') {
            return;
        }
        if (this.previousOperand !== '') {
            this.calculate();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    //calculates the specified operation
    calculate() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) {
            return;
        }
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    //retrieves the number that should be shown on the display
    getDisplayNumber(num) {
        const stringNumber = num.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    //updates the display once the user presses a button
    updateDisplay() {
        this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandText.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandText.innerText = '';
        }
      }
    }
    
    const operandButtons = document.querySelectorAll('[data-operand]');
    const operationButtons = document.querySelectorAll('[data-operation]');
    const equalButton = document.querySelector('[data-equal]');
    const deleteButton = document.querySelector('[data-delete]');
    const clearButton = document.querySelector('[data-clear]');
    const previousOperandText = document.querySelector('[data-prev-op]');
    const currentOperandText = document.querySelector('[data-current-op]');

    const calculator = new Calculator(previousOperandText, currentOperandText);

    operandButtons.forEach(button => {
        button.addEventListener('click', () => {
            calculator.appendOperand(button.innerText)
            calculator.updateDisplay()
        })
    })

    operationButtons.forEach(button => {
        button.addEventListener('click', () => {
            calculator.chooseOperation(button.innerText)
            calculator.updateDisplay()
        })
    })

    equalButton.addEventListener('click', button => {
        calculator.calculate()
        calculator.updateDisplay()
    })

    clearButton.addEventListener('click', button => {
        calculator.clear()
        calculator.updateDisplay()
    })

    deleteButton.addEventListener('click', button => {
        calculator.delete()
        calculator.updateDisplay()
    })
