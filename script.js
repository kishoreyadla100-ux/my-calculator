const mainDisplay = document.getElementById('main-display');
const historyDisplay = document.getElementById('history');

// 1. Handle Button Clicks
function append(value) {
    if (mainDisplay.value === "Error") clearDisplay();
    
    // Logic: Don't allow two operators in a row
    const lastChar = mainDisplay.value.slice(-1);
    const ops = ['+', '-', '*', '/', '.'];
    if (ops.includes(lastChar) && ops.includes(value)) return;

    mainDisplay.value += value;
}

function clearDisplay() {
    mainDisplay.value = '';
    historyDisplay.innerText = '';
}

function backspace() {
    mainDisplay.value = mainDisplay.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = mainDisplay.value.replace(/×/g, '*').replace(/÷/g, '/');
        if (!expression) return;

        historyDisplay.innerText = mainDisplay.value + " =";
        let result = eval(expression);
        
        // Cleanup long decimals
        mainDisplay.value = Number.isInteger(result) ? result : result.toFixed(4);
    } catch {
        mainDisplay.value = "Error";
        setTimeout(clearDisplay, 1500);
    }
}

// 2. Add Keyboard Support (Pro Feature)
document.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9) append(e.key);
    if (e.key === '+') append('+');
    if (e.key === '-') append('-');
    if (e.key === '*') append('*');
    if (e.key === '/') append('/');
    if (e.key === '.') append('.');
    if (e.key === 'Enter' || e.key === '=') calculate();
    if (e.key === 'Backspace') backspace();
    if (e.key === 'Escape') clearDisplay();
});