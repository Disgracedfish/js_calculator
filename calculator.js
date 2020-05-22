const inputDisplay = document.getElementById('display-input');
const historyDisplay = document.getElementById('display-history');
const buttons = document.getElementsByClassName('button');
const numberButtons = document.getElementsByClassName('number-input');
const operatorButtons = document.getElementsByClassName('operator');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear-button');
const delButton = document.getElementById('delete');

var inputStream = '';
var lastOp = '';
var isPreviousResult = false;

function add(a, b) {
    return a+b;
}
function multiply(a,b) {
    return a*b;
}
function divide(a,b) {
    return a/b;
}
function subtract(a,b) {
    return a-b;
}
function operate(opp, a, b) {
    var operators = {
        '+': add(a,b),
        '-': subtract(a,b),
        '×': multiply(a,b),
        '*': multiply(a,b),
        'x': multiply(a,b),
        '÷': divide(a,b),
        '/': divide(a.b)
        
    }
    console.log(operators[opp]);
return operators[opp];
}

function numPushed(e) {
    if (isPreviousResult) {
        historyDisplay.textContent = 'Ans = ' + inputStream;
        inputStream ='';
        isPreviousResult = false;
    }
    
    inputStream+=e.target.value;
    lastOp = '';
    updateDisplay();
}

function equalsPushed(e) {
    historyDisplay.textContent = inputStream + ' =';
    let expression = parseInputStream();
    
    if ('+-×÷'.includes(expression[expression.length-1])) {
        return; // prevents somene from hitting equals after an operator
    } 
    
    // do multiplication division first
    while (expression.includes('÷') || expression.includes('×')) {
        let index = expression.findIndex((x) => {
            return x === '×' || x === '÷';
        })

        let operator = expression[index];
        let num1 = parseFloat(expression[index-1]);
        let num2 = parseFloat(expression[index+1]);
        let term = operate(operator,num1,num2);
        expression.splice(index-1,3,term);
    }

    while (expression.includes('+') || expression.includes('-')) {
        let index = expression.findIndex((x) => {
            return x === '+' || x === '-';
        })
        let operator = expression[index];
        let num1 = parseFloat(expression[index-1]);
        let num2 = parseFloat(expression[index+1]);
        let term = operate(operator,num1,num2);
        expression.splice(index-1,3,term);
    }

 expression[0] = Math.round(10000*expression[0])/10000
 inputStream = expression.join();
 updateDisplay();
 isPreviousResult = true;



}

function delPushed(e) {
    currentStream = parseInputStream()
    
    if (currentStream[currentStream.length-1].length ===1){ //if it is an operator or single number
        inputStream = currentStream.slice(0,currentStream.length-1).join(' ')
    } else {
        inputStream = inputStream.slice(0,inputStream.length-1);
    }
    updateDisplay();

}

function cPushed(e) {
    historyDisplay.textContent = '';
    inputStream = '';
    lastOp = '';
    isPreviousResult = false;
    updateDisplay();
}

function opPushed(e) {
    if (isPreviousResult) {
        isPreviousResult = false;
    }
    
    if (lastOp === e.target.value) {return;} // if you click same op twice in a row do nothing
    
    else if (lastOp === '') {
        if (inputStream ==='' && e.target.value ==='-') {
            inputStream += '-'
        } else {
            inputStream += ' ' + e.target.value + ' '; //if the last entry wasn't an operator, add it
            lastOp = e.target.value;
        }
    } else {
        inputStream = inputStream.slice(0,inputStream.length-3)+ ' ' + e.target.value + ' ';
    }
    updateDisplay();
}

function updateDisplay() {
    inputDisplay.textContent = inputStream;
}

function parseInputStream() {
    parsedStream = inputStream.split(' ');
    let length = parsedStream.length;
    return (parsedStream[length-1].length ===0) ?  parsedStream.slice(0,length-1):  parsedStream;
}

function transition(e) {
    e.target.classList.add('clicked');
}
function removeTransition (e) {
    e.target.classList.remove('clicked');
}


function keyPressed(e) {
    if ('1234567890'.includes(e.key)) {
        let key = {target: {value:e.key }}
        numPushed(key);
    }

    if (e.key==='x' || e.key === '*') {
        let key = {target: {value: '×'}}
        opPushed(key)
    }

    if (e.key === '/') {
        let key = {target: {value: '÷'}}
        opPushed(key)
    }

    if (e.key === '-') {
        let key = {target: {value: '-'}}
        opPushed(key)
    }

    if (e.key === '+') {
        let key = {target: {value: '+'}}
        opPushed(key)
    }

    if (e.key === 'Enter') {
        equalsPushed();
        let button = {target: equalsButton};
        transition(button);
    }

    if (e.key ==='c' || e.key === 'C') {
        cPushed();
    }

    if (e.keyCode === 8) {
        delPushed();
    }
    
    for (let i = 0; i<buttons.length; i++) {
        if (e.key === buttons[i].value) {
            let button = {target:buttons[i]};
            transition(button);
        }
    }
}


document.addEventListener('keydown', keyPressed)
equalsButton.addEventListener('click', equalsPushed);
clearButton.addEventListener('click', cPushed);
delButton.addEventListener('click', delPushed);
for (let i = 0; i<buttons.length; i++) {
    buttons[i].addEventListener('click', transition);
    buttons[i].addEventListener('transitionend', removeTransition);
}
for (let i = 0; i<numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', numPushed)
}
for (let i = 0; i<operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', opPushed)
}



