document.addEventListener("DOMContentLoaded", function () {
  addCalculator(); // Add the first calculator on load

  // Handling Enter and Escape globally
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      // Check if the currently focused element is a calculator display
      const focusedDisplay = document.activeElement;
      if (focusedDisplay && focusedDisplay.classList.contains("display")) {
        // Find the closest calculator container
        const calculator = focusedDisplay.closest(".calculator");
        if (calculator) {
          // Find the '=' button within this calculator and trigger it
          const equalsButton = calculator.querySelector(".equals");
          if (equalsButton) {
            executeCalculation(equalsButton);
          }
        }
      }
    } else if (event.key === "Escape") {
      // Trigger 'C' for the last focused calculator
      if (
        document.activeElement &&
        document.activeElement.classList.contains("display")
      ) {
        clearDisplay(document.activeElement.nextElementSibling); // Assuming the history element is always next
      }
    }
  });
});

function addCalculator() {
  const calculatorHTML = `
    <div class="calculator" >
    <label contenteditable="true" style="padding:10px;font-weight:bold">Calculator</label>
    <div class="close-btn-div"><span class="close-btn" onclick='closecalc(this)'>&times;</span></div>
      <input type="text" class="display" onkeypress="return isNumberKey(event)" onfocus="setCurrent(this)" >
      <span class="history"></span>
      <hr>
      <button onclick="calculate(this, '7')">7</button>
      <button onclick="calculate(this, '8')">8</button>
      <button onclick="calculate(this, '9')">9</button>
      <button onclick="calculate(this, '/')">/</button>
      <br>
      <button onclick="calculate(this, '4')">4</button>
      <button onclick="calculate(this, '5')">5</button>
      <button onclick="calculate(this, '6')">6</button>
      <button onclick="calculate(this, '*')">*</button>
      <br>
      <button onclick="calculate(this, '1')">1</button>
      <button onclick="calculate(this, '2')">2</button>
      <button onclick="calculate(this, '3')">3</button>
      <button onclick="calculate(this, '-')">-</button>
      <br>
      <button onclick="calculate(this, '0')">0</button>
      <button onclick="calculate(this, '.')">.</button>
      <button onclick="calculate(this, '+')">+</button>
      <button onclick="executeCalculation(this)" class="equals">=</button>
      <button onclick="clearDisplay(this)" class="clear">C</button>
    </div>
  `;

  document
    .getElementById("calculators")
    .insertAdjacentHTML("beforeend", calculatorHTML);
}

function calculate(element, value) {
  const display = element.parentNode.querySelector(".display");
  if (display.value === "" && ["/", "*", "-", "+"].includes(value)) {
    return; // Prevent entering an operator first
  }
  display.value += value;
}

function executeCalculation(element) {
  // Navigate to the parent `.calculator` element to keep actions contained within one calculator.
  const calculator = element.closest(".calculator");
  const display = calculator.querySelector(".display");
  const history = calculator.querySelector(".history"); // Works the same for span or div.

  try {
    let result = eval(display.value);
    if (result !== undefined) {
      // Update only this calculator's history.
      history.textContent = `${display.value}`;
      display.value = result;
    }
  } catch (error) {
    display.value = "Error";
    // Optionally clear or update the history on error.
    history.textContent = ""; // Clear history or provide error message as needed.
  }
}

function clearDisplay(element) {
  if (element.classList.contains("display")) {
    // If the element is the display input itself
    element.value = "";
    element.parentNode.querySelector(".history").textContent = ""; // Clear history
  } else {
    // If the element is the 'C' button
    const display = element.parentNode.querySelector(".display");
    display.value = "";
    element.parentNode.querySelector(".history").textContent = ""; // Clear history
  }
}
function isNumberKey(evt) {
  var charCode = evt.which ? evt.which : event.keyCode;
  if (
    (charCode >= 48 && charCode <= 57) || // Numbers
    charCode === 43 || // Plus (+)
    charCode === 45 || // Minus (-)
    charCode === 42 || // Asterisk (*)
    charCode === 47 || // Slash (/)
    charCode === 37 || // Percent (%)
    charCode === 46 || // Decimal point (.)
    charCode === 40 || // Opening parenthesis
    charCode === 41 // Closing parenthesis
  ) {
    return true;
  } else {
    return false;
  }
}

function setCurrent(evt) {
  // Optional: A function to set the current active calculator, if needed for future functionality
}

function closecalc(calc){
  calc.closest('.calculator').remove();
}
