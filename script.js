let result = document.querySelector('.result');
let test = document.querySelector('.test');
const btn = document.querySelectorAll('.cal-btn');

let runningSum = 0;
let buffer = '0';
let waitingNum = 0;
let preOp;
let bufferOp;

function buttonClick(valueOfBtn){
    if(isNaN(valueOfBtn)){
        handleSymbol(valueOfBtn);
        if(runningSum == 0){
            result.innerText = buffer;
        }else{
            result.innerText = runningSum;
        }
    }else{
        handleNum(valueOfBtn);
        result.innerText = buffer;
    }
    // result.innerText = buffer;
}

function handleNum(valueOfBtn){
    if(buffer === '0'){
        buffer = valueOfBtn;
    }else{
        buffer+=valueOfBtn;
    }
}

function handleSymbol(symbol){
    switch(symbol){
        case 'AC':
            runningSum = 0;
            buffer = '0';
            waitingNum = 0;
            bufferOp = '';
            preOp = null;
            // test.innerText = '';
            break;
        case 'DE':
            if(buffer.length === 1){
                buffer = '0';
            }else{
                buffer = buffer.substring(0, buffer.length-1);
            }
            // preOp = null;
            break;
        case '%':
            if(preOp === null || preOp === undefined){
                runningSum = parseFloat(buffer)*0.01;
                runningSum = parseFloat(runningSum.toFixed(5));
            }else{
                let bufferPercentage = runningSum*parseFloat(buffer)*0.01;
                buffer = bufferPercentage.toString();
            }
            break;

        case '.':
            buffer += '.';
            break;
            
        case '=':
            if(preOp === null || preOp === undefined){
                return;
            }
            if(bufferOp){
                flushOperation(parseInt(buffer));
                buffer = runningSum;
                runningSum = waitingNum;
                handleSymbol(bufferOp);
                bufferOp = '';
            }else{
                flushOperation(parseFloat(buffer));
            }
            preOp = null;
            buffer = runningSum;
            runningSum = 0;
            waitingNum = 0;
            bufferOp = '';
            break;
        case '+':
        case '-':
            handleMath(symbol);
            break;
        case '*':
        case '/':
            if(preOp === '-' || preOp === '+'){
                // test.innerText = "need bufferOp";
                handleCalOrder(symbol);
            }else{
                // test.innerText = 'no need bufferOp'
                handleMath(symbol);
            }
            break;
    }
}

function handleMath(symbol){
    if(buffer === '0'){
        return;
    }
    preOp = symbol;
    const intBuffer = parseFloat(buffer);
    
    if(runningSum == 0){
        runningSum = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    // preOp = symbol;
    buffer = '0';
}

function flushOperation(intBuffer){
    if(preOp === '+'){
        runningSum += intBuffer;
    }else if(preOp === '-'){
        runningSum -= intBuffer;
    }else if(preOp === '*'){
        runningSum *= intBuffer;
    }else if(preOp === '/'){
        runningSum /= intBuffer;
    }

    runningSum = parseFloat(runningSum.toFixed(5));
}

function handleCalOrder(symbol){
    // test.innerText = 'in cal order';
    waitingNum = runningSum;
    runningSum = parseInt(buffer);
    bufferOp = preOp;
    preOp = symbol;
    buffer = '0';
}

function init(){
    btn.forEach(clickedBtn =>{
        clickedBtn.addEventListener('click', ()=>{
            let value = clickedBtn.innerText;
            buttonClick(value);
        })
    })
}

init();