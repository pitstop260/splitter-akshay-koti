"use strict";

function noNegative(e) {
  if (e.keyCode == 189) {
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
    if (input2.value.trim() == "") {
      input2.classList.add("error1");
      icon1.classList.add("error1");

      setTimeout(function () {
        input2.classList.remove("error1");
        icon1.classList.remove("error1");
      }, 300);
    }

    input3.classList.add("error1");
    icon2.classList.add("error1");

    setTimeout(function () {
      input3.classList.remove("error1");
      icon2.classList.remove("error1");
    }, 300);
  }

  if (input2.value.trim() == "") {
    if (input3.value.trim() == "") {
      input3.classList.add("error1");
      icon2.classList.add("error1");

      setTimeout(function () {
        input3.classList.remove("error1");
        icon2.classList.remove("error1");
      }, 300);
    }

    input2.classList.add("error1");
    icon1.classList.add("error1");

    setTimeout(function () {
      input2.classList.remove("error1");
      icon1.classList.remove("error1");
    }, 300);
  }
}

const calculator = (button) => {
  if (input3.value.trim() === "" || input2.value.trim() === "") {
    validate();
  } else if (input2.value === "0") {
    noInfinity();
  } else {
    let totalTip =
      button === percentage
        ? (Number(input3.value) * Number(button.value.replaceAll("%", ""))) /
          100
        : (Number(input3.value) *
            Number(button.textContent.replaceAll("%", ""))) /
          100;
    let totalPeople = Number(input2.value);
    tip.textContent = `$${
      Math.round((totalTip / totalPeople + Number.EPSILON) * 100) / 100
    }`;
    total.textContent = `$${
      Math.round(
        ((totalTip + Number(input3.value)) / totalPeople + Number.EPSILON) * 100
      ) / 100
    }`;
  }
};

function noInfinity() {
  input2.value = "";
  document.querySelector(".no-zero").style.display = "block";
  setTimeout(function () {
    document.querySelector(".no-zero").style.display = "none";
  }, 1000);
}

tipButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator(button);
  });
});

percentage.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    if (percentage.value === "") {
      noInfinity();
      percentage.value = "0";
    } else if (input2.value === "0") {
      noInfinity();
    } else calculator(percentage);
  }
});

input2.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    if (percentage.value === "" && input3.value === "") {
      noInfinity();
      validate();
    } else if (input2.value === "0") {
      noInfinity();
    } else calculator(percentage);
  }
});

input3.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    if (percentage.value === "" && input2.value === "") {
      noInfinity();
      validate();
    } else if (input2.value === "0") {
      noInfinity();
    } else calculator(percentage);
  }
});

document.querySelector(".reset").addEventListener("click", function () {
  input3.value = "";
  input2.value = "";
  percentage.value = "";
  tip.textContent = "$0";
  total.textContent = "$0";
});

