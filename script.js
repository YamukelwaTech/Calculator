document.addEventListener("DOMContentLoaded", function () {
  // Declare variables to store calculator state
  let entry = "";
  let ans = "";
  let current = "";
  let log = "";
  let decimal = true;
  let reset = "";

  // Function to round a value if it includes a decimal
  const round = (val) => {
    // Convert value to string and split into array of characters
    val = val.toString().split("");
    // Check if value includes a decimal point
    if (val.indexOf(".") !== -1) {
      // Extract decimal part of the value
      let valTest = val.slice(val.indexOf(".") + 1, val.length);
      // Extract integer part of the value
      val = val.slice(0, val.indexOf(".") + 1);
      // Find index of first non-zero digit after decimal point
      let i = 0;
      while (valTest[i] < 1) {
        i++;
      }
      // Join the decimal part with the first non-zero digits
      valTest = valTest.join("").slice(0, i + 2);
      // Remove trailing zeros if present
      if (valTest[valTest.length - 1] === "0") {
        valTest = valTest.slice(0, -1);
      }
      // Return the rounded value
      return val.join("") + valTest;
    } else {
      // If value has no decimal, return the original value
      return val.join("");
    }
  };

  // Add click event listener to all buttons
  document.querySelectorAll("button").forEach(function (button) {
    button.addEventListener("click", function () {
      // Get the value of the clicked button
      entry = this.getAttribute("value");

      // Reset log if necessary
      if (reset) {
        if (entry === "/" || entry === "*" || entry === "-" || entry === "+") {
          log = ans;
        } else {
          ans = "";
        }
      }
      reset = false;

      // Handle clear entry and all clear operations
      if (entry === "ac" || (entry === "ce" && current === "noChange")) {
        ans = "";
        current = "";
        entry = "";
        log = "";
        document.getElementById("history").innerHTML = "0";
        document.getElementById("answer").innerHTML = "0";
        decimal = true;
      } else if (entry === "ce") {
        // Remove last entry from history and answer
        document.getElementById("history").innerHTML = log.slice(0, -current.length);
        log = log.slice(0, -current.length);
        ans = ans.slice(0, -current.length);
        current = ans;
        // Reset history if necessary
        if (log.length === 0 || log === " ") {
          document.getElementById("history").innerHTML = "0";
        }
        document.getElementById("answer").innerHTML = "0";
        entry = "";
        decimal = true;
      }

      // Prevent multiple decimal points in a number
      if (entry === "." || entry === "0.") {
        if (!decimal) {
          entry = "";
        }
      }

      // Prevent improper use of first digit
      if (
        (ans.length === 0 && isNaN(entry) && entry !== ".") ||
        (ans.length === 0 && entry === "0")
      ) {
        entry = "";
        ans = "";
      }

      // Prevent extra operators
      if (current !== "noChange") {
        if (
          (current === "" && isNaN(entry) && entry !== ".") ||
          (isNaN(current) && isNaN(entry) && entry !== ".")
        ) {
          entry = "";
        }
      }

      // Combine digits
      while (Number(entry) || entry === "0" || current === ".") {
        if (isNaN(current) && entry === "0" && current !== ".") {
          entry = "";
        } else if (isNaN(current) && Number(entry) && current !== ".") {
          current = "";
        }
        if (entry === ".") {
          decimal = false;
        }
        if (current === "0." && isNaN(entry)) {
          entry = "";
        } else {
          if (current[current.length - 1] === ".") {
            current = current.concat(entry);
          } else {
            current += entry;
          }
          ans += entry;
          document.getElementById("answer").innerHTML = current;
          log += entry;
          document.getElementById("history").innerHTML = log;
          entry = "";
        }
      }

      // Handle decimal point entry
      if (entry === ".") {
        if (current === "" || isNaN(current[current.length - 1])) {
          current = "0.";
          ans += entry;
          document.getElementById("answer").innerHTML = "0.";
          log += current;
          document.getElementById("history").innerHTML = log;
        } else {
          current = current.concat(".");
          ans = ans.concat(".");
          log = ans;
          document.getElementById("history").innerHTML = ans;
          document.getElementById("answer").innerHTML = current;
        }
        entry = "";
        decimal = false;
      } else if (entry === "/") {
        // Handle division operation
        current = "/";
        ans = round(eval(ans)) + current;
        log += current;
        document.getElementById("history").innerHTML = log;
        document.getElementById("answer").innerHTML = "/";
        entry = "";
        decimal = true;
      } else if (entry === "*") {
        // Handle multiplication operation
        current = "*";
        ans = round(eval(ans)) + current;
        log += "x";
        document.getElementById("history").innerHTML = log;
        document.getElementById("answer").innerHTML = "x";
        entry = "";
        decimal = true;
      } else if (entry === "-") {
        // Handle subtraction operation
        current = "-";
        ans = round(eval(ans)) + current;
        log += current;
        document.getElementById("history").innerHTML = log;
        document.getElementById("answer").innerHTML = "-";
        entry = "";
        decimal = true;
      } else if (entry === "+") {
        // Handle addition operation
        current = "+";
        ans = round(eval(ans)) + current;
        log += current;
        document.getElementById("history").innerHTML = log;
        document.getElementById("answer").innerHTML = "+";
        entry = "";
        decimal = true;
      } else if (entry === "=") {
        // Handle equals operation
        if (current[current.length - 1] === ".") {
          entry = "";
        } else {
          current = eval(ans).toString();
          document.getElementById("answer").innerHTML = round(eval(ans));
          ans = round(eval(ans));
          log += entry + ans;
          document.getElementById("history").innerHTML = log;
          log = ans;
          entry = "";
          reset = true;
          decimal = true;
        }
        current = "noChange";
      }
      entry = "";

      if (reset) {
        log = "";
      }

      // Check for digit limit on screen
      if (
        document.getElementById("entry").children[0].innerText.length > 8 ||
        document.getElementById("history").innerText.length > 22
      ) {
        document.getElementById("answer").innerHTML = "0";
        document.getElementById("history").innerHTML = "Digit Limit Met";
        current = "";
        ans = "";
        log = "";
        decimal = true;
      }
    });
  });
});
