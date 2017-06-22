/*jslint browser:true */
var gameContainer = document.querySelector('#game');
var popup = document.querySelector('#popup');
var message = document.querySelector('#message');
var date = 0;


popup.addEventListener('click', function () {
  this.style.visibility = 'hidden';
}, false);

function doStuff(form) {
  fieldManager.clearField();
  fieldManager.initializeField(parseInt(form.rows.value), parseInt(form.columns.value), parseInt(form.bombs.value));
  fieldManager.createField();
  date = new Date();
}
