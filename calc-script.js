function lighten(e) {
    e.target.style.opacity = "0.5";
}

function darken(e) {
    e.target.style.opacity = "1";
}

function inputNumber(e) {
    const pressedNumber = e.target.textContent;
    
    if (display.textContent == '0') {
        if (pressedNumber.textContent == '0') {
            return;
        }
        
        if (pressedNumber != '.') {
            display.textContent = '';
        }
    }
    
    if (pressedNumber == '.') {
        if (display.textContent.includes('.')) {
            return
        }        
    }   
    
    if (!selectedOperation) {
        display.textContent += pressedNumber;     
    } else {
        if (firstClickOnOperation) {
            display.textContent = pressedNumber;               
        } else{
            display.textContent += pressedNumber;  
        }
        firstClickOnOperation = false;        
    }
}

function setPosNegStatus(e) {
    if (display.textContent != '0') {
        firstClickOnOperation = false;
        isDisplayPositive = !isDisplayPositive;

        if (!isDisplayPositive) {
            display.textContent = '-' + display.textContent;                            
        } else {
            display.textContent = display.textContent.slice(1);
        }
    }
}

function add(n1, n2) {
    return n1 + n2;
}

function subtract(n1, n2) {
    return n1 - n2;
}

function multiply(n1, n2) {
    return n1 * n2;
}

function divide(n1, n2) {
    return n1 / n2;
}

function computeResult() {
    if (selectedOperation) {
        const presentVal = Number(display.textContent);  
        display.textContent = selectedOperation(previousVal, presentVal);
        previousVal = display.textContent;    
        selectedOperation = null;         
    }
    
    if (Number(display.textContent) > -1) {
        isDisplayPositive = true;     
    } else {
        isDisplayPositive = false;
    }
  
}

function clickedOperationActions() {

    computeResult(); 
    firstClickOnOperation = true;
    previousVal = Number(display.textContent);

}

function prepareAddition() {
    clickedOperationActions();   
    selectedOperation = add;

}

function prepareSubtraction() {
    clickedOperationActions();    
    selectedOperation = subtract;
}

function prepareMultiplication() {
    clickedOperationActions();   
    selectedOperation = multiply;
}

function prepareDivision() {
    clickedOperationActions();    
    selectedOperation = divide;
}

function clearResult() {
    display.textContent = '0';
    isDisplayPositive = true;
    selectedOperation = null;
    firstClickOnOperation = false;
    previousVal = 0;    
}

function getHundredthValue() {
    display.textContent = Number(display.textContent) / 100; 
}

let buttons = document.querySelectorAll('div[class~="button"]');
let numericButtons = document.querySelectorAll('div[class~="numeric"]');
let clear = document.querySelector('#clear');
let positiveNegative = document.querySelector('#pos-neg');
let percentageBtn = document.querySelector('#perc');

let addBtn = document.querySelector('#add');
let subtractBtn = document.querySelector('#subt');
let multiplyBtn = document.querySelector('#mult');
let divideBtn = document.querySelector('#divi');
let computeResultBtn = document.querySelector('#equal');

let isDisplayPositive = true;
let selectedOperation = null;
let previousVal = 0;
let firstClickOnOperation = false;

let display = document.querySelector('#disp');

buttons.forEach((item) => {
    item.addEventListener('mouseover', lighten);
    item.addEventListener('mouseleave', darken);
});

numericButtons.forEach((item) => {
    item.addEventListener('click', inputNumber);
});

clear.addEventListener('click', clearResult);

positiveNegative.addEventListener('click', setPosNegStatus);
percentageBtn.addEventListener('click', getHundredthValue);

computeResultBtn.addEventListener('click', computeResult);
addBtn.addEventListener('click', prepareAddition);
subtractBtn.addEventListener('click', prepareSubtraction);
multiplyBtn.addEventListener('click', prepareMultiplication);
divideBtn.addEventListener('click', prepareDivision);

