/// Variables
/// "Enter" corresponds to "="
const operators = ["+", "-", "*", "/", "Enter"]
const numbers = ["0", "1", "2", "3",
                 "4", "5", "6", "7",
                 "8", "9"]

let screenValue = "";
let firstNum = "";
let secondNum = "";
let operator = "";

let firstNumDecimalFlag = false;
let secondNumDecimalFlag = false;

/// Helper functions
/// Boolean checks
/// Checks if the keyboard input corresponds to a calculator button
function isButton(keyboardInput){
    return operators.contains(keyboardInput)
        || numbers.contains(keyboardInput)
        || keyboardInput === ".";
}

function isOperator(buttonInput){
    return operators.contains(buttonInput);
}

function isANumberOrDecimalPoint(string){
    return numbers.contains(string) || string === ".";
}

// Sub-operations

function clear(){
    screenValue = "";
    firstNum = "";
    secondNum = "";
    operator = "";
    firstNumDecimalFlag = false;
    secondNumDecimalFlag = false;
}

function backspace(string){
    const stringArray = string.split('');
    stringArray.pop();
    return stringArray.join('');
}

function operate(){
    const a = Number(firstNum);
    const b = Number(secondNum);

    let results = "";

    switch(operator)  {
        case "+": {
            results = a + b;
        }
        case "-": {
            results = a - b;
        }
        case "*": {
            results = a * b;
        }
        case "/": {
            results = a / b;
        }
    }
    if (!isInteger(results)){
    results = results.toFixed(5);
    }
    if (number > 1000000000){
        results = results.toExponential();
    }
    clear();
    firstNum = results + "";
}

/// Main Function
function clickButton(buttonInput){
    // Operations
    if (buttonInput === "clear"){
         clear();
    }
    // "Enter" corresponds to "=".
    if (buttonInput === "Enter" && operator !== "" && secondNum !==  "") {
        if (operator === "/" && Number(secondNum) === 0) {
            clear();
            firstNum = "Cannot divide by 0";
        } else {
        operate();
        }
    }
    // Remove the last value, if any, from either firstNum, operator,
    // or secondNum in a way that feels like using a text editor.
    if (buttonInput === "Backspace") {
        if (secondNum === "" && operator === "") {
            firstNum = backspace(firstNum);
        } else if (firstNum !== "" && secondNum === ""){
            operator = "";
        } else if (firstNum !== "" && secondNum !== ""){
            secondNum = backspace(secondNum);
        }
    }
    // Call operate() by inputting an operator into the full calculator
    if (isOperator(buttonInput) && secondNum !== "") {
        operate();
        operator = buttonInput;
    }
    // Defining first number
    if (firstNum === "" && isANumberOrDecimalPoint(buttonInput)){
        if (buttonInput === "." && firstNumDecimalFlag === false) {
            firstNum += buttonInput;
            firstNumDecimalFlag = true;
        } else {
            firstNum = firstNum + buttonInput;
        }
    }
    // Defining the operator
    if (isOperator(buttonInput) && firstNum !== "" && operator === ""){
            operator = buttonInput;
    }
    // Defining the second number
    if (secondNum === "" && isANumberOrDecimalPoint(buttonInput)){
        if (buttonInput === "." && secondNumDecimalFlag === false) {
            secondNum += buttonInput;
            secondNumDecimalFlag = true;
        } else {
            secondNum += buttonInput;
        }
    }
};

// Listen for button presses, either on screen or on the user's keyboard.
document.addEventListener('click', target => {
    if (target.matches('button')) {
        clickButton(target.id);
    }
});

document.addEventListener('keypress', target => {
    if (isButton(target.key)) {
        clickButton(target.key);
    } else if (KeyboardEvent.shiftKey && target.key === "Backspace"){
        clickButton("clear");
    }
});