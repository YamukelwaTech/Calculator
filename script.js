document.addEventListener("DOMContentLoaded", function () {
  let entry = "";
  let ans = "";
  let current = "";
  let log = "";
  let decimal = true;
  let reset = "";

  const round = (val) => {
    val = val.toString().split("");
    if (val.indexOf(".") !== -1) {
      let valTest = val.slice(val.indexOf(".") + 1, val.length);
      val = val.slice(0, val.indexOf(".") + 1);
      let i = 0;
      while (valTest[i] < 1) {
        i++;
      }
      valTest = valTest.join("").slice(0, i + 2);
      if (valTest[valTest.length - 1] === "0") {
        valTest = valTest.slice(0, -1);
      }
      return val.join("") + valTest;
    } else {
      return val.join("");
    }
  };

  document.querySelectorAll("button").forEach(function (button) {
    button.addEventListener("click", function () {
      entry = this.getAttribute("value");

      if (reset) {
        if (entry === "/" || entry === "*" || entry === "-" || entry === "+") {
          log = ans;
        } else {
          ans = "";
        }
      }
      reset = false;

      if (entry === "ac" || (entry === "ce" && current === "noChange")) {
        ans = "";
        current = "";
        entry = "";
        log = "";
        document.getElementById("history").innerHTML = "0";
        document.getElementById("answer").innerHTML = "0";
        decimal = true;
      } else if (entry === "ce") {
        document.getElementById("history").innerHTML = log.slice(0, -current.length);
        log = log.slice(0, -current.length);
        ans = ans.slice(0, -current.length);
        current = ans;
        if (log.length === 0 || log === " ") {
          document.getElementById("history").innerHTML = "0";
        }
        document.getElementById("answer").innerHTML = "0";
        entry = "";
        decimal = true;
      }

      if (entry === "." || entry === "0.") {
        if (!decimal) {
          entry = "";
        }
      }

      if (
        (ans.length === 0 && isNaN(entry) && entry !== ".") ||
        (ans.length === 0 && entry === "0")
      ) {
        entry = "";
        ans = "";
      }

      if (current !== "noChange") {
        if (
          (current === "" && isNaN(entry) && entry !== ".") ||
          (isNaN(current) && isNaN(entry) && entry !== ".")
        ) {
          entry = "";
        }
      }

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
        current = "/";
        ans = round(eval(ans)) + current;
        log += current;
        document.getElementById("history").innerHTML = log;
        document.getElementById("answer").innerHTML = "/";
        entry = "";
        decimal = true;
      } else if (entry === "*") {
        current = "*";
        ans = round(eval(ans)) + current;
        log += "x";
        document.getElementById("history").innerHTML = log;
        document.getElementById("answer").innerHTML = "x";
        entry = "";
        decimal = true;
      } else if (entry === "-") {
        current = "-";
        ans = round(eval(ans)) + current;
        log += current;
        document.getElementById("history").innerHTML = log;
        document.getElementById("answer").innerHTML = "-";
        entry = "";
        decimal = true;
      } else if (entry === "+") {
        current = "+";
        ans = round(eval(ans)) + current;
        log += current;
        document.getElementById("history").innerHTML = log;
        document.getElementById("answer").innerHTML = "+";
        entry = "";
        decimal = true;
      } else if (entry === "=") {
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
