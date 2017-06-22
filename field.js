var fieldManager = (function() {
  var R = 8;
  var C = 8;
  var bombs = 8;
  var cells = [];
  var rows = [];

  function initializeField(numRows, numCols, numBombs) {
    R = numRows;
    C = numCols;
    bombs = numBombs;
  }

  function clearField() {
    gameContainer.innerHTML = '';
    cells = [];
    rows = [];
  }

  function generateCells() {
    for (var i = 0; i < R * C; i++) {
      cells.push(new Cell(i));
    }
  }

  function randomizeBombs() {
    var alreadySet = [];
    for (var i = 0; i < bombs; i++) {
      var number = Math.floor(Math.random() * (R * C));
      while (alreadySet.indexOf(number) >= 0) {
        number = Math.floor(Math.random() * (R * C));
      }
      alreadySet.push(number);
      cells[number].setType(0);
      updateNumbers(number);
    }
    console.log(cells);
  }

  function updateNumbers(cellNumber) {
    var leftSide = cellNumber % C === 0;
    var rightSide = (cellNumber + 1) % C === 0;
    var topSide = cellNumber - C < 0;
    var bottomSide = cellNumber + C >= C * R;
    if (!leftSide) {
      increaseBombCount(cellNumber - 1);
      if (!topSide) {
        increaseBombCount(cellNumber - C - 1);
      }
      if (!bottomSide) {
        increaseBombCount(cellNumber + C - 1);
      }
    }
    if (!rightSide) {
      if (!topSide) {
        increaseBombCount(cellNumber - C + 1);
      }
      if (!bottomSide) {
        increaseBombCount(cellNumber + C + 1);
      }
      increaseBombCount(cellNumber + 1);
    }
    if (!bottomSide) {
      increaseBombCount(cellNumber + C);
    }
    if (!topSide) {
      increaseBombCount(cellNumber - C);
    }
  }

  function increaseBombCount(cellNumber) {
    if (cells[cellNumber].cellType === -1) {
      cells[cellNumber].cellType = 1;
    } else if (cells[cellNumber].cellType === 0) {

    } else {
      cells[cellNumber].cellType++;
    }
  }

  function draw(container) {
    var rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    rows.push(rowDiv);
    for (var i = 0; i < cells.length; i++) {
      cells[i].draw(rowDiv, clicked);
      if ((i + 1) % C == 0) {
        rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
      }
      gameContainer.appendChild(rowDiv);
    }
  }

  function createField(numRow, numCol, numberOfBombs) {
    generateCells(numRow, numCol, numberOfBombs);
    randomizeBombs();
    draw(gameContainer);
  }

  function resetField() {
    clearField();
    generateCells(this.R, this.C, this.bombs);
    randomizeBombs();
    draw(gameContainer);
  }

  function clicked(cell) {
    if(cell.cellVisibility){
      return;
    }
    cells[cell.index].reveal();
    if(cell.isBomb()){
      message.innerText = 'You Lost :(';
      message.style.color = 'red';
      popup.style.visibility = 'visible';
    }
    if(cell.isNumber()){
    }
    if(cell.isEmpty()){
      var queue = traverseMatrix(cell.index, []);
      for(var i = 0 ; i < queue.length; i++){
        cells[queue[i]].reveal();
      }
    }
    if(checkGameOver()){
      revealAll();
      var elapsedTime = new Date - date;
      message.innerText = 'You Won! :) [' + elapsedTime/1000 + 's]';
      message.style.color = 'green';
      popup.style.visibility = 'visible';
    }
  }

  function traverseMatrix(index, queue){
    if(queue.indexOf(index) !== -1)
      return queue;
    if(cells[index].isNumber()){
      queue.push(index);
      return queue;
    }else if(cells[index].isEmpty()){
      queue.push(index);
    }
    else{ return queue; }

    var leftSide = index % C === 0;
    var rightSide = (index + 1) % C === 0;
    var topSide = index - C < 0;
    var bottomSide = index + C >= C * R;

    if (!leftSide) {
      queue.concat(traverseMatrix(index - 1, queue));
      if (!topSide) {
        queue.concat(traverseMatrix(index - C - 1, queue));
      }
      if (!bottomSide) {
        queue.concat(traverseMatrix(index + C - 1, queue));
      }
    }
    if (!rightSide) {
      if (!topSide) {
        queue.concat(traverseMatrix(index - C + 1, queue));
      }
      if (!bottomSide) {
        queue.concat(traverseMatrix(index + C + 1, queue));
      }
      queue.concat(traverseMatrix(index + 1, queue));
    }
    if (!bottomSide) {
      queue.concat(traverseMatrix(index + C, queue));
    }
    if (!topSide) {
      queue.concat(traverseMatrix(index - C, queue));
    }
    return queue;
  }

  function checkGameOver(){
    return cells.every(function(cell){
      return cell.cellVisibility || cell.isBomb();
    });
  }

  function revealAll(){
    cells.forEach(function(cell){
      cell.reveal();
    });
  }

  return {
    initializeField: initializeField,
    clearField: clearField,
    createField: createField,
    resetField: resetField
  };
})();
