// Created with this tutorial: https://youtu.be/j59qQ7YWLxw
// Credit to Web Dev Simplified for concept & full code

class Calculator {
    constructor(previousOperandTexElement, currentOperandTexElement) {
        this.previousOperandTexElement = previousOperandTexElement;
        this.currentOperandTexElement = currentOperandTexElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) { return; }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') {return;}
        if(this.previousOperand !== '') {this.compute();}
        this.operation = operation;
        this.previousOperand = this.currentOperand
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(curr)) {return;}
        switch (this.operation) {
            case '+':
                computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '*':
                computation = prev * curr;
                break;
            case '÷':
                computation = prev / curr;
                break;
            default:
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTexElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTexElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTexElement.innerText = '';
        }
    }
}

// source: https://stackoverflow.com/a/175787/7693234
function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

const body = document.body;
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTexElement = document.querySelector('[data-previous-operand]');
const currentOperandTexElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTexElement, currentOperandTexElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

body.addEventListener('keyup', event => {
    if(event.key.match(/[0-9.]/)) {
        calculator.appendNumber(event.key);
        calculator.updateDisplay();
    }
    else if (event.key.match(/[+-/*]/)) {
        calculator.chooseOperation(event.key);
        calculator.updateDisplay();
    }
    else if (event.key === 'Equals' || event.key === 'Enter') {
        calculator.compute();
        calculator.updateDisplay();
    }
    else if (event.key === 'Escape') {
        calculator.clear();
        calculator.updateDisplay();
    }
    else if (event.key === 'Backspace' || event.key === 'Delete') {
        calculator.delete();
        calculator.updateDisplay();
    }
    return;
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})