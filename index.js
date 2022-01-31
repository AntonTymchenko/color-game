const table = document.querySelector("#field");
const moveCount = document.querySelector("#moveCount");
const bestResult = document.querySelector("#bestResult");

let colors = ["red", "green", "blue"];

let rows = 3;
let cols = 3;

let move = 0;
const moveCollection = [];

table.addEventListener("click", changeCellBG);

function changeCellBG(e) {
  move += 1;
  if (e.target.localName === "td") {
    e.target.className = colors[changeCellClass(e.target.className)];
  }
  moveCount.textContent = move;
  if (endGame(e.target.className)) {
    moveCollection.push(move);
    bestResult.textContent = Math.min(...moveCollection);
    setTimeout(() => alert(`Вы закончили игру использовав ${move} ходов`), 0);
    setTimeout(() => refreshGame(), 10);
  }
}

function createTableRowsAndCols(rows, cols) {
  const trCollection = [];
  table.innerHTML = "";
  for (let i = 0; i < rows; i += 1) {
    const tr = document.createElement("tr");
    for (let j = 0; j < cols; j += 1) {
      const td = document.createElement("td");
      let classIndex = getRandomNumber(0, 3);
      td.className = colors[classIndex];
      tr.appendChild(td);
    }
    trCollection.push(tr);
  }
  table.append(...trCollection);
}
createTableRowsAndCols(rows, cols);

function getRandomNumber(min, max) {
  return Math.ceil(Math.random() * (max - min) + min) - 1;
}

function changeCellClass(className) {
  let indxClass = colors.findIndex((item) => item === className);
  if (indxClass === colors.length - 1) {
    indxClass = 0;
    return indxClass;
  }
  return (indxClass += 1);
}

function endGame(className) {
  const cellCollection = document.querySelectorAll("td");
  return [...cellCollection].every((item) => item.className === className);
}

function refreshGame() {
  move = 0;
  moveCount.textContent = move;
  createTableRowsAndCols(rows, cols);
}
