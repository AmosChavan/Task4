let memory = 0;
let history = [];

// Clear screen and reset the error state
function clearScreen() {
    document.getElementById("result").value = "";
    document.getElementById("expression").value = "";
    document.getElementById("result").classList.remove("error");
}

// Display values on the screen
function display(value) {
    // Automatically clear "Error" message on new input
    if (document.getElementById("result").value === "Error") {
        clearScreen();
    }
    document.getElementById("result").value += value;
    document.getElementById("expression").value += value;
}

// Calculate the result
function calculate() {
    try {
        const input = document.getElementById("result").value;
        const result = eval(input);
        document.getElementById("result").value = result;
        document.getElementById("expression").value = "";

        // Add to history
        addToHistory(`${input} = ${result}`);
    } catch {
        document.getElementById("result").value = "Error";
        document.getElementById("result").classList.add("error");
    }
}

// Function to calculate percentage
function calculatePercentage() {
    const input = document.getElementById("result").value;
    const result = parseFloat(input) / 100;
    document.getElementById("result").value = result;
}

// Scientific functions for trigonometry
function calculateTrig(func) {
    const input = parseFloat(document.getElementById("result").value);
    let result;
    switch (func) {
        case 'sin':
            result = Math.sin(input * (Math.PI / 180)); // Convert degrees to radians
            break;
        case 'cos':
            result = Math.cos(input * (Math.PI / 180));
            break;
        case 'tan':
            result = Math.tan(input * (Math.PI / 180));
            break;
    }
    document.getElementById("result").value = result;
    addToHistory(`${func}(${input}) = ${result}`);
}

// Calculate logarithm
function calculateLog() {
    const input = parseFloat(document.getElementById("result").value);
    const result = Math.log10(input);
    document.getElementById("result").value = result;
    addToHistory(`log(${input}) = ${result}`);
}

// Memory functions
function clearMemory() {
    memory = 0;
}

function recallMemory() {
    display(memory);
}

function addToMemory() {
    memory += parseFloat(document.getElementById("result").value) || 0;
}

function subtractFromMemory() {
    memory -= parseFloat(document.getElementById("result").value) || 0;
}

// Backspace function
function backspace() {
    const result = document.getElementById("result").value;
    document.getElementById("result").value = result.slice(0, -1);
    document.getElementById("expression").value = document.getElementById("expression").value.slice(0, -1);
}

// Theme toggle
function toggleTheme() {
    document.body.classList.toggle("light-theme");
}

// History management
function addToHistory(entry) {
    history.unshift(entry);
    if (history.length > 10) history.pop(); // Limit to 10 entries
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyDiv = document.getElementById("history");
    historyDiv.innerHTML = history.map(entry => `<div>${entry}</div>`).join("");
}

// Keyboard support
document.addEventListener("keydown", function(event) {
    const key = event.key;
    const validKeys = "0123456789.+-*/()";
    
    if (validKeys.includes(key)) {
        display(key);
    } else if (key === "Enter") {
        calculate();
    } else if (key === "Backspace") {
        backspace();
    } else if (key === "c" || key === "C") {
        clearScreen();
    }
});
