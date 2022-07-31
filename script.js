// CONSTANTS
const MULTIPLY = "*";
const ADDITION = "+";
const MINUS = "-";
const DIVIDE = "/";
const EXPONENT = "^";
const NUMBER = 'number';
const OPERATOR = 'operator';
const EQUAL = "equal";
const DECIMAL = "decimal";
const BACSPC = "backspace"

// BUTTONS
const displayInput = document.getElementById('input');
const displayTotal = document.getElementById('result');
const clearAll = document.getElementById('clearAll');
const equalButton = document.getElementById('equal');

// object for storing values 
let brain = {
    number1: "",
    number2: "",
    operator: "",
    total: ""
}

// buttons actions
clearAll.onclick = () => resetCalculator();
equalButton.onclick = (e) => {
    if (brainFull(e)) {
        operate(e);
    }
}

// add event listers to operators and operands 
const buttons = document.querySelectorAll(".calcButton");
const buttonArray = Array.from(buttons);

buttonArray.forEach(button => {
    button.addEventListener('click', e => {
        parse(e);

    });
})

function parse(event) {

    // get the datatype
    let datatype = event.target.dataset.type;
    // get the value of the button
    let value = event.target.value;

    // check if brain has two operands and an operator
    if (brainFull() && datatype === OPERATOR) {
        operate(event);
    }

    // check if user wants to backspace
    if (value === BACSPC) {
        backspaceRemove();
    }


    if (datatype === NUMBER || datatype === DECIMAL) {
        if (brain.operator === "") {
            if (datatype === DECIMAL) {
                if (!checkDecimal(brain.number1)) {
                    brain.number1 += value;
                }
            } else {
                brain.number1 += value;
            }
        } else if (brain.operator !== "") {
            if (datatype === DECIMAL) {
                if (!checkDecimal(brain.number2)) {
                    brain.number2 += value;
                }
            } else {
                brain.number2 += value;
            }
        }
    }
    if (datatype === OPERATOR && !emptyBrain()) {
        brain.operator = value;
    }

    displayInput.textContent = brain.number1 + " " + brain.operator + " " +
        brain.number2;
}

function operate(event) {


    let divisionByZero = false;

    switch (brain.operator) {

        case MULTIPLY:
            brain.total = calculateMultiply();
            break;
        case DIVIDE:
            if (brain.number2 === "0") {
                divisionByZero = true;
                alert("Division by zero...lol");
            } else {
                brain.total = calculateDivide();
            }
            break;
        case ADDITION:
            brain.total = calculateAddition();
            break;
        case MINUS:
            brain.total = calculateMinus();
            break;
        case EXPONENT:
            brain.total = calculateExponent();
            break;
        default:
            break;
    }

    updateBrain(event, divisionByZero);
}

function updateBrain(event, divisionByZero) {
    // convert to 4 decimal places 
    brain.total = prettyRound(Number(brain.total), 4);

    // display to user
    displayInput.textContent = "";

    displayTotal.textContent = brain.total;

    if (!divisionByZero) {
        if (event.target.dataset.type === OPERATOR) {
            brain.number1 = brain.total;
            brain.operator = event.target.value;
            brain.number2 = "";
        }
    } else {
        resetCalculator();
    }
}


function prettyRound(num, decimals) {
    return parseFloat(num.toFixed(decimals));
}

function calculateMultiply() {
    return brain.number1 * brain.number2;
}

function calculateDivide() {
    return brain.number1 / brain.number2;
}

function calculateAddition() {
    return Number(brain.number1) + Number(brain.number2);
}

function calculateMinus() {
    return brain.number1 - brain.number2;
}

function calculateExponent() {
    return brain.number1 ** brain.number2;
}

function checkDecimal(number) {
    return number.includes(".");
}

function brainFull() {
    return brain.number1 !== "" && brain.number2 !== "" && brain.operator !== "";
}

function emptyBrain() {
    return brain.number1 === "" && brain.number2 === "" && brain.operator === "";
}

function backspaceRemove() {
    let temp;
    if (brainFull()) {
        temp = brain.number2.slice(0, -1);
        brain.number2 = temp;
    } else if (brain.number1 !== "" && brain.operator !== "") {
        temp = brain.operator.slice(0, -1);
        brain.operator = temp;
    } else if (brain.number1 !== "") {
        temp = brain.number1.slice(0, -1);
        brain.number1 = temp;
    }
}

function resetCalculator() {
    brain.number1 = ""
    brain.number2 = ""
    brain.operator = ""
    brain.total = ""
    brain.running = ""
    displayTotal.textContent = "";
    displayInput.textContent = "";
}