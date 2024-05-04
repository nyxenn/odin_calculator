let display_el = document.querySelector(".display");
let current_active_el;

let display;
let current = "0";
let prev;
let next_number_resets_display = false;
let last_selected_operator;

document
  .querySelectorAll(".action")
  .forEach((a) => a.addEventListener("click", (e) => perform_action(e.target)));

document
  .querySelectorAll(".operator")
  .forEach((o) =>
    o.addEventListener("click", (e) => select_operator(e.target)),
  );

document
  .querySelectorAll(".number")
  .forEach((n) => n.addEventListener("click", (e) => append_number(e.target)));

function perform_action(element) {
  set_active_class(element);
  switch (element.innerText) {
    case "AC":
      reset();
      break;
    case "+/-":
      if (display.length < 1) break;
      display = +display * -1 + "";
      current = display;
      update_display();
      break;
    case "%":
      if (display.length < 1) break;
      display = +display / 100 + "";
      current = display;
      update_display();
      break;
  }
}

function reset() {
  display = "";
  current = "0";
  prev = undefined;
  next_number_resets_display = false;
  update_display();
}

function select_operator(element) {
  set_active_class(element);

  if (prev == undefined) {
    prev = current;
    next_number_resets_display = true;
    if (element.innerText != "=") last_selected_operator = element.innerText;
    update_display();
    return;
  }

  prev = +prev;
  current = +current;

  switch (last_selected_operator) {
    case "*":
      prev = prev * current;
      break;
    case "/":
      if (current == 0) {
        display = "omg no";
        update_display();
        return;
      }

      prev = prev / current;
      break;
    case "-":
      prev = prev - current + "";
      break;
    case "+":
      prev = prev + current + "";
      break;
  }

  if (element.innerText != "=") last_selected_operator = element.innerText;
  prev = Math.round(prev * 1000) / 1000;

  display = prev + "";
  next_number_resets_display = true;
  update_display();
}

function append_number(element) {
  set_active_class(element);

  if (next_number_resets_display) {
    current = "0";
    next_number_resets_display = false;
  }

  if (current == "0") {
    display = element.innerText;
    current = element.innerText;
    update_display();
    return;
  }

  display += element.innerText;
  current += element.innerText;

  update_display();
}

function update_display() {
  display_el.innerText = display;
}

function set_active_class(element) {
  if (current_active_el) current_active_el.classList.toggle("active");
  element.classList.toggle("active");
  current_active_el = element;
}
