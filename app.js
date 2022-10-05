const grids = document.querySelectorAll(".grid");
const playerX = "X";
const playerO = "O";

let turn = playerX;
const boardState = Array(grids.length);
boardState.fill(null);

// Elements

const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", startNewGame);

grids.forEach((grid) => grid.addEventListener("click", gridClick));

function hoverText() {
  grids.forEach((grid) => {
    grid.classList.remove("x-hover");
    grid.classList.remove("o-hover");
  });

  const hoverClass = `${turn.toLowerCase()}-hover`;
  //   const hoverClass = `x-hover`;

  grids.forEach((grid) => {
    if (grid.innerText == "") {
      grid.classList.add(hoverClass);
    }
  });
}

hoverText();

function gridClick(event) {
  if (gameOverArea.classList.contains("visible")) {
    return;
  }
  const grid = event.target;
  const gridNumber = grid.dataset.index;
  if (grid.innerText != "") {
    return;
  }

  if (turn === playerX) {
    grid.innerText = playerX;
    boardState[gridNumber - 1] = playerX;
    turn = playerO;
  } else {
    grid.innerText = playerO;
    boardState[gridNumber - 1] = playerO;
    turn = playerX;
  }

  hoverText();
  checkWin();
}

function checkWin() {
  for (const winningCombination of winningCombinations) {
    const { combo, strikeClass } = winningCombination;
    const tileValue1 = boardState[combo[0] - 1];
    const tileValue2 = boardState[combo[1] - 1];
    const tileValue3 = boardState[combo[2] - 1];
    if (
      tileValue1 != null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      strike.classList.add(strikeClass);
      gameOverScreen(tileValue1);
      return;
    }
  }

  const allFilled = boardState.every((grid) => grid !== null);
  if (allFilled) {
    gameOverScreen(null);
  }
}

function gameOverScreen(winnerText) {
  let text = "Draw!";
  if (winnerText != null) {
    text = `Winner is ${winnerText}!`;
  }
  gameOverArea.className = "visible";
  gameOverText.innerText = text;
}

function startNewGame() {
  strike.className = "strike";
  gameOverArea.className = "hidden";
  boardState.fill(null);
  grids.forEach((grid) => (grid.innerText = ""));
  turn = playerX;
  hoverText();
}

const winningCombinations = [
  { combo: [1, 2, 3], strikeClass: "strikeRow1" },
  { combo: [4, 5, 6], strikeClass: "strikeRow2" },
  { combo: [7, 8, 9], strikeClass: "strikeRow3" },
  { combo: [1, 4, 7], strikeClass: "strikeCol1" },
  { combo: [2, 5, 8], strikeClass: "strikeCol2" },
  { combo: [3, 6, 9], strikeClass: "strikeCol3" },
  { combo: [1, 5, 9], strikeClass: "strikeDiag1" },
  { combo: [3, 5, 7], strikeClass: "strikeDiag2" },
];
