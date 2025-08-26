console.log("script loaded");

const display = document.querySelector("#display");
let decimalAdded = false;
let lastInput = "";

function appendToDisplay(input) {
    if (
        display.value === "ERROR" ||
        display.value === "Infinity" ||
        display.value === "NaN"
    ) {
        display.value = "";
    }

    if (input === "+" || input === "-" || input === "*" || input === "/") {
        decimalAdded = false;
        if (input === "-" && display.value === "") {
            display.value += input;
        } else if (lastInput === ".") {
            display.value = display.value.slice(0, -1) + input;
            decimalAdded = false;
        } else if (
            display.value !== "" &&
            !["+", "-", "*", "/"].includes(lastInput)
        ) {
            display.value += input;
        }
    } else if (input === ".") {
        if (display.value === "" || ["+", "-", "*", "/"].includes(lastInput)) {
            display.value += "0.";
            decimalAdded = true;
        } else if (!decimalAdded) {
            display.value += input;
            decimalAdded = true;
        }
    } else if (input === "(") {
        if (
            display.value === "" ||
            ["+", "-", "*", "/", "("].includes(lastInput)
        ) {
            display.value += input;
        } else if (!isNaN(parseInt(lastInput)) || lastInput === ")") {
            display.value += "*" + input;
        }
    } else if (input === ")") {
        // Allow ')' only if there's an unmatched '(' and last input is a number, ')', or '.'
        const openCount = (display.value.match(/\(/g) || []).length;
        const closeCount = (display.value.match(/\)/g) || []).length;
        if (openCount > closeCount && /\d|\)|\./.test(lastInput)) {
            display.value += input;
        }
    } else {
        display.value += input;
    }
    lastInput = input;
}

function clearDisplay() {
    display.value = "";
    decimalAdded = false;
    lastInput = "";
}

function deleteLast() {
    if (display.value) {
        if (lastInput === ".") {
            decimalAdded = false;
        } else if (
            display.value === "ERROR" ||
            display.value === "Infinity" ||
            display.value === "NaN"
        ) {
            display.value = "";
        }
        display.value = display.value.slice(0, -1);
        lastInput = display.value[display.value.length - 1] || "";
    }
}

function calculate() {
    if (display.value && display.value !== "ERROR") {
        try {
            display.value = math.evaluate(display.value).toString();
        } catch (error) {
            display.value = "ERROR";
        }
    }
}
