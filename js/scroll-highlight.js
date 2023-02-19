import SplitType from "split-type";
import { gsap, ScrollTrigger } from "gsap/all";

let text;
let elems_array;
function runSplit() {
  text = new SplitType('#manifest', {types: 'lines, words'});
  elems_array = document.querySelectorAll('.line');
  elems_array.forEach(elem => {
    elem.insertAdjacentHTML('beforeend', '<div class="line-mask"></div>');
  });
  runAnimation();
}

runSplit();

window.addEventListener('resize', function () {
  text.revert();
  runSplit();
});

function runAnimation() {
  gsap.registerPlugin(ScrollTrigger);
  elems_array.forEach((elem) => {
    let triggerElement = elem;
    let targetElement = elem.querySelector('.line-mask');

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "top center",
        end: "bottom center",
        scrub: 1
      }
    });
    tl.to(targetElement, {
      width: 0,
      opacity: 0,
      duration: 2
    });
  });
}

