import SplitType from 'split-type'

function runSplit() {
  const text = new SplitType('#manifest', {types: 'lines, words'});
  console.log(text.chars);

  const this_elem = document.getElementsByClassName('char');
  this_elem.insertAdjacentHTML('beforeend','<div class="char-line"></div>');
}

window.addEventListener('load', function () {
  runSplit();
});
// console.log(text.chars);
