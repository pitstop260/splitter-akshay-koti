"use strict";

function noNegative(e) {
  if (
    !(
      (e.keyCode > 95 && e.keyCode < 106) ||
      (e.keyCode > 47 && e.keyCode < 58) ||
      e.keyCode == 8
    )
  ) {
    return false;
  }
}

const input1 = document.getElementById("percentage");
const input2 = document.getElementById("people1");
const input3 = document.getElementById("bill");
const tipButton = document.querySelectorAll(".b");
const tip = document.querySelector(".tip");
const total = document.querySelector(".total");
const icon1 = document.querySelector(".fa-user");
const icon2 = document.querySelector(".fa-dollar-sign");
const percentage = document.getElementById("percentage");

input1.onkeydown = noNegative;
input2.onkeydown = noNegative;
input3.onkeydown = noNegative;

function validate() {
  if (input3.value.trim() == "") {
    input3.classList.add("error1");
    icon2.classList.add("error1");

    setTimeout(function () {
      input3.classList.remove("error1");
      icon2.classList.remove("error1");
    }, 300);
  }

  if (input2.value.trim() == "") {
    input2.classList.add("error1");
    icon1.classList.add("error1");

    setTimeout(function () {
      input2.classList.remove("error1");
      icon1.classList.remove("error1");
    }, 300);
  }
}

const calculator = (button) => {
  if (input3.value.trim() === "") {
    validate();
  } else if (input2.value.trim() === "") {
    validate();
  } else {
    let totalTip =
      button === percentage
        ? (Number(input3.value) * Number(button.value.replaceAll("%", ""))) /
          100
        : (Number(input3.value) *
            Number(button.textContent.replaceAll("%", ""))) /
          100;
    let totalPeople = Number(input2.value);
    tip.textContent = `$${totalTip / totalPeople}`;
    total.textContent = `$${(totalTip + Number(input3.value)) / totalPeople}`;
  }
};

tipButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator(button);
  });
});

percentage.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    console.log(percentage.value);
    calculator(percentage);
  }
});

document.querySelector(".reset").addEventListener("click", function () {
  input3.value = "";
  input2.value = "";
  percentage.value = "";
  tip.textContent = "$0";
  total.textContent = "$0";
});
