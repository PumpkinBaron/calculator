/// Variables
const display = document.querySelector(".display-contents");
const buttons = document.querySelector(".buttons");
const error = "Cannot divide by zero";

const operators = ["+", "-", "*", "/"]
const numbers = ["0", "1", "2", "3",
                 "4", "5", "6", "7",
                 "8", "9"]

let firstNum = "";
let secondNum = "";
let operator = "";

let firstNumDecimalFlag = false;
let secondNumDecimalFlag = false;

/// Helper functions

/// Boolean checks

function correspondsToButton(keyboardInput){
    return operators.includes(keyboardInput)
        || numbers.includes(keyboardInput)
        || keyboardInput === "."
        || keyboardInput === "Delete"
        || keyboardInput === "Enter";
}

function isOperator(buttonInput){
    return operators.includes(buttonInput);
}

function isANumberOrDecimalPoint(string){
    return numbers.includes(string) 
        || string === ".";
}

function inputtingFirstNumber(buttonInput) {
    return operator === "" 
        && isANumberOrDecimalPoint(buttonInput);
}

function inputtingOperator(buttonInput) {
    return isOperator(buttonInput) 
         && firstNum !== "" 
         && secondNum === "";
}

function inputtingSecondNumber(buttonInput) {
    return operator !== ""  
        && isANumberOrDecimalPoint(buttonInput);
}

function isComputable(buttonInput) {
    return (buttonInput === "Enter" 
        && operator !== "" 
        && secondNum !==  "");
}

// Sub-operations

function compute(a,b){
    if (operator === "+") return a + b;
    if (operator === "-") return a - b;
    if (operator === "*") return a * b;
    if (operator === "/") return a / b;
}


function clear(){
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
    console.log(`A is ${a}, operator is ${operator}, and b is ${b}.`)
    let result = compute(a , b);

    console.log(`Result is now ${result}. Fixing to 5th decimal place...`)
    result = Number(result.toFixed(5));
    console.log(`Result is now ${result}.`)
    if (result > 1000000000){
        result = result.toExponential();
    }
    clear();
    firstNum = result + "";
}

function runBackspace(){
    console.log("Backspace...")
    if (secondNum === "" && operator === "") {
        firstNum = backspace(firstNum);
    } else if (firstNum !== "" && secondNum === ""){
        operator = "";
    } else if (firstNum !== "" && secondNum !== ""){
        secondNum = backspace(secondNum);
    }
}

function defineFirstNumber(buttonInput) {
    const newNum = firstNum + buttonInput;
    if (buttonInput === "." && firstNumDecimalFlag === false) {
    firstNum += buttonInput;
    firstNumDecimalFlag = true;
    } else if (buttonInput !== ".") {
    firstNum = newNum;
    }  
}

function defineSecondNumber(buttonInput) {
    console.log(`First number is ${firstNum}, which is not an empty string 
    ${firstNum !== ""} and Second number is ${secondNum} 
    and button input is ${isANumberOrDecimalPoint(buttonInput)} 
    Defining the second number...`);
    if (buttonInput === "." && secondNumDecimalFlag === false) {
    secondNum += buttonInput;
    secondNumDecimalFlag = true;
    } else if (buttonInput !== ".") {
    secondNum += buttonInput;
    }
    console.log(`Second number is now ${secondNum}`);
}

/// Main Function

function clickButton(buttonInput){

    console.log(`Received input ${buttonInput}.`)

    if (firstNum === error) {
        clear();
    }

    if (buttonInput === "Clear"){
        console.log("Clearing...")
         clear();
    }
    
    if (isComputable(buttonInput)) {
        console.log("Computing...")
        if (operator === "/" && secondNum === "0") {
            clear();
            firstNum = error;
        } else {
        operate();
        }
    }

    if (buttonInput === "Delete") {
        runBackspace();
    }

    // Call operate() by inputting an operator into the full calculator
    
    if (isOperator(buttonInput) && secondNum !== "") {
        operate();
        operator = buttonInput;
    }
    
    if (inputtingSecondNumber(buttonInput)){
       defineSecondNumber(buttonInput);
    }    

    if (inputtingOperator(buttonInput)) {
            operator = buttonInput;
    }
     if (inputtingFirstNumber(buttonInput)) {
        defineFirstNumber(buttonInput);
     }
    display.textContent = `${firstNum} ${operator} ${secondNum}`;
};

// Listen for button presses, either on screen or on the user's keyboard.

buttons.addEventListener('click', event => {
        if (event.target.id !== undefined ){
        clickButton(event.target.id.slice(1));
        }
});

document.addEventListener('keypress', event => {
    if (correspondsToButton(event.key)) {
        clickButton(event.key);
    }
    if (event.key === "C"){
        clickButton("Clear");
    }
    if (event.key === "="){
        clickButton("Enter");
    }
});

