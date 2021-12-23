
const wheel = document.getElementById("wheel-face");
const buttonSpin = document.getElementById("button-spin");
const displayWin = document.querySelector(".display-win");
const displayLose = document.querySelector(".display-lose");

const roue = new FortuneWheel({
  wheel: wheel,
  symbolSegments: [
    "Bag ???",
    "Today's Deal",
    "Today's Deal",
    "Free samples",
    "Free samples",
    "100$",
    "100$",
    "Amazing coupon",
    "Amazing coupon",
    "Gift card",
    "Gift card",
    "Bag ???",
  ],
  buttonSpin: buttonSpin,
  winSymbol: "100$",
  displayWin: displayWin,
  displayLose: displayLose,
});

/* Écoute du clic */

buttonSpin.addEventListener("click", () => {
  roue.spinTheWheel();
});
