const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let currentPlayer = "O";
let moveCount = 0;
const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6],            // Diagonals
];

const startNewGame = () => {
  currentPlayer = "O";
  moveCount = 0;
  msgContainer.classList.add("hide");
  boxes.forEach(box => {
    box.innerText = "";
    box.disabled = false;
    box.style.backgroundColor = "#ffffc7";
    box.style.transform = "scale(1)";
  });
};

const endGame = (winner, pattern) => {
  boxes.forEach(box => box.disabled = true);
  if (pattern) {
    pattern.forEach(index => {
      boxes[index].style.backgroundColor = "#a1ffb3"; // Green for win
      boxes[index].style.transform = "scale(1.1)";
    });
    msg.innerText = `🎉 ${winner} wins!`;
  } else {
    msg.innerText = `🤝 It's a Draw!`;
  }
  msgContainer.classList.remove("hide");
};

const checkWin = () => {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      boxes[a].innerText &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[b].innerText === boxes[c].innerText
    ) {
      endGame(boxes[a].innerText, pattern);
      return true;
    }
  }
  return false;
};

const handleBoxClick = (box) => {
  if (box.innerText !== "") return;

  box.innerText = currentPlayer;
  box.style.color = currentPlayer === "O" ? "#b0413e" : "#3e57b0";
  box.disabled = true;
  moveCount++;

  if (checkWin()) return;

  if (moveCount === 9) {
    endGame(null); // Draw
    return;
  }

  currentPlayer = currentPlayer === "O" ? "X" : "O";
};

boxes.forEach(box => {
  box.addEventListener("click", () => handleBoxClick(box));
});

resetBtn.addEventListener("click", startNewGame);
newGameBtn.addEventListener("click", startNewGame);
