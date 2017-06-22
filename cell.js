function Cell(index) {
  this.index = index;
  this.cellType = -1;
  this.cellVisibility = false;
}

Cell.prototype.setType = function (cellType) {
  this.cellType = cellType;
}

Cell.prototype.setVisibility = function (cellVisibility) {
  this.cellVisibility = cellVisibility;
}
Cell.prototype.draw = function (rowDiv, clicked) {
  var that = this;
  if (this.div) {
    this.update();
    return;
  }
  this.div = document.createElement('div');
  this.div.className = 'cell';
  this.update();
  this.div.addEventListener('click', function () {
    clicked(that);
  }, false);
  rowDiv.appendChild(this.div);
}
Cell.prototype.update = function () {
  if (this.cellVisibility) {
    if (this.cellType < 0) {
      this.div.classList.add('empty');
    }
    if (this.cellType == 0) {
      this.div.classList.add('bomb');
    }
    if (this.cellType > 0) {
      this.div.classList.add('number');
      this.div.innerText = this.cellType;
    }
  }
}

Cell.prototype.isBomb = function () {
  return this.cellType == 0;
}

Cell.prototype.isEmpty = function () {
  return this.cellType == -1;
}

Cell.prototype.isNumber = function () {
  return this.cellType > 0;
}

Cell.prototype.reveal = function () {
  this.setVisibility(true);
  this.update();
}
