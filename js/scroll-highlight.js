import SplitType from "split-type";
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

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

// TODO переписать на символы (но там алгоритм о^2 будет)
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
      duration: 1
    });
  });
}


gsap.utils.toArray("[data-speed]").forEach(el => {
  gsap.to(el, {
    y: function() {return (1 - parseFloat(el.getAttribute("data-speed"))) * (ScrollTrigger.maxScroll(window) - (this.scrollTrigger ? this.scrollTrigger.start : '0'))},
    ease: "none",
    scrollTrigger: {
      trigger: el,
      start: "0",
      end: "max",
      invalidateOnRefresh: true,
      scrub: true,
    }
  });
});
