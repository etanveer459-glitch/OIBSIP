const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("mousedown", () => {
    button.style.transform = "scale(0.8)";
  });
  button.addEventListener("mouseup", () => {
    button.style.transform = "scale(1)";
  });
  button.addEventListener("mouseleave", () => {
    button.style.transform = "scale(1)";
  });
});
/*----------------- expression and result section ---------*/
const exdisplay = document.getElementById("expression");
let expression = "";

document.querySelectorAll(".number").forEach((button) => {
  button.addEventListener("click", () => {
    expression += button.textContent;
    exdisplay.textContent = expression;
    console.log(`${expression}`);
  });
});

document.querySelectorAll(".operator").forEach((button) => {
  button.addEventListener("click", () => {
    expression += button.textContent;
    exdisplay.textContent = expression;
  });
});

/*----------------equal function------------------*/
const resdisplay = document.getElementById("result");

document.getElementById("equal").addEventListener("click", () => {
  try {
    let expr = expression
      .replace(/%/g, "/100")
      .replace(/\^/g, "**")
      .replace(/√(\d+|\([^\)]+\))/g, (match, p1) => `Math.sqrt(${p1})`);
    let result = eval(expr);
    resdisplay.textContent = result;
    localStorage.setItem("lastresult", result);
  } catch (err) {
    resdisplay.textContent = "Error";
  }
});

document.querySelectorAll(".special-operators").forEach((button) => {
  button.addEventListener("click", () => {
    try {
      expression += button.textContent;
      exdisplay.textContent = expression;
    } catch (err) {
      console.log(err);
    }
  });
});

/*---------------------ans,clear,del-----------------------*/
const ans = document.getElementById("ans");
ans.addEventListener("click", () => {
  let storedresults = localStorage.getItem("lastresult");
  if (storedresults) {
    expression += storedresults;
    exdisplay.textContent = expression;
  }
});

const clear = document.getElementById("clear");
clear.addEventListener("click", () => {
  expression = "";
  exdisplay.textContent = "";
  resdisplay.textContent = "";
});

const del = document.getElementById("del");
del.addEventListener("click", () => {
  expression = expression.slice(0, -1);
  exdisplay.textContent = expression;
});
