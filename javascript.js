/// Variables
const display = document.querySelector(".display-contents");
const buttons = document.querySelector(".buttons");
/// "Enter" corresponds to "="
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
/// Checks if the keyboard input corresponds to a calculator button
function isButton(keyboardInput){
    return operators.includes(keyboardInput)
        || numbers.includes(keyboardInput)
        || keyboardInput === "."
        || keyboardInput === "Delete"
        || keyboardInput === "Backspace"
        || keyboardInput === "Enter";
}

function isOperator(buttonInput){
    return operators.includes(buttonInput);
}

function isANumberOrDecimalPoint(string){
    return numbers.includes(string) || string === ".";
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

/// Main Function
function clickButton(buttonInput){
    console.log(`Received input ${buttonInput}.`)
    // Operations
    if (buttonInput === "Clear"){
        console.log("Clearing...")
         clear();
    }
    // "Enter" corresponds to "=".
    if (buttonInput === "Enter" && operator !== "" && secondNum !==  "") {
        console.log("Computing...")
        if (operator === "/" && Number(secondNum) === 0) {
            clear();
            firstNum = "Cannot divide by 0";
        } else {
        operate();
        }
    }
    // Remove the last value, if any, from either firstNum, operator,
    // or secondNum in a way that feels like using a text editor.
    if (buttonInput === "Delete") {
        console.log("Backspace...")
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
        console.log("Computing via operator inputted to a full calculator...")
        operate();
        operator = buttonInput;
    }
        // Defining the second number
    if (operator !== ""  
        && isANumberOrDecimalPoint(buttonInput)){
        console.log(`First number is ${firstNum}, which is not an empty string 
            ${firstNum !== ""} and Second number is ${secondNum} 
            and button input is ${isANumberOrDecimalPoint(buttonInput)} 
            Defining the second number...`);
        if (buttonInput === "." && secondNumDecimalFlag === false) {
            secondNum += buttonInput;
            secondNumDecimalFlag = true;
        } else {
            secondNum += buttonInput;
        }
        console.log(`Second number is now ${secondNum}`);
    }    
    // Defining the operator
    if (isOperator(buttonInput) && firstNum !== "" && secondNum === ""){
        console.log(`Setting operator to ${buttonInput}...`)
            operator = buttonInput;
    }

    // Defining first number
    if (operator === "" 
        && isANumberOrDecimalPoint(buttonInput)){
            const newNum = firstNum + buttonInput;
        console.log(`First number is ${firstNum} 
            and button input is ${isANumberOrDecimalPoint(buttonInput)} 
            Defining the first number as ${newNum}...`);
        if (buttonInput === "." && firstNumDecimalFlag === false) {
            firstNum += buttonInput;
            firstNumDecimalFlag = true;
        } else {
            firstNum = newNum;
        }
        console.log(`First number is now ${firstNum}`);
    }

    console.log(`Current text content is ${display}. Redefining...`);
    display.textContent = `${firstNum} ${operator} ${secondNum}`;
    console.log(`Display set to ${display.textContent}`);
};

// Listen for button presses, either on screen or on the user's keyboard.
function getID(element) {
    return element.id;
}

buttons.addEventListener('click', event => {
        console.log(`Registered click on ${event.target.id}`);
        if (event.target.id !== undefined ){
        clickButton(event.target.id.slice(1));
        }
});

document.addEventListener('keypress', event => {
    console.log(`Registered keyboard input ${event.key}`);
    if (isButton(event.key)) {
        clickButton(event.key);
    } else if (event.shiftKey && event.key === "Backspace"){
        clickButton("clear");
    }
});

