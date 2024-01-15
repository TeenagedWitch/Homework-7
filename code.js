let currentOperation = null;
let storedValue = null;

function appendToDisplay(value) {
  document.getElementById("display").value += value;
}

function nextOperation(value) {
  const display = document.getElementById("display");

  if (display.value !== "") {
    if (storedValue !== null) {
      calculateResult();
      storedValue = parseFloat(display.value);
    } else {
      storedValue = parseFloat(display.value);
    }
    currentOperation = value;
    document.getElementById(
      "secondary"
    ).value = `${storedValue} ${currentOperation}`;
    display.value = "";
  }
}

function clearDisplay() {
  document.getElementById("display").value = "";
  document.getElementById("secondary").value = "";
  currentOperation = null;
  storedValue = null;
}

function toggleSign() {
  const display = document.getElementById("display");
  const currentValue = display.value;

  if (currentValue !== "" && currentValue !== "0") {
    display.value =
      currentValue.charAt(0) === "-"
        ? currentValue.slice(1)
        : `-${currentValue}`;
  }
}

function backspace() {
  const display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
}

function roundTo8DecimalPlaces(value) {
  return parseFloat(value.toFixed(8));
}

function calculateResult() {
  const display = document.getElementById("display");

  try {
    const currentValue = parseFloat(display.value);
    switch (currentOperation) {
      case "+":
        storedValue = roundTo8DecimalPlaces(storedValue + currentValue);
        break;
      case "-":
        storedValue = roundTo8DecimalPlaces(storedValue - currentValue);
        break;
      case "*":
        storedValue = roundTo8DecimalPlaces(storedValue * currentValue);
        break;
      case "/":
        if (currentValue !== 0) {
          storedValue = roundTo8DecimalPlaces(storedValue / currentValue);
        } else {
          throw new Error("Division by zero");
        }
        break;
      default:
        storedValue = currentValue;
    }
    display.value = storedValue;
    document.getElementById("secondary").value = "";
    currentOperation = null;
  } catch (error) {
    display.value = "Error";
    storedValue = null;
    currentOperation = null;
  }
}
