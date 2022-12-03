document.addEventListener("DOMContentLoaded", function() {
  console.log("Hello, webpage!")
});

document.addEventListener("DOMContentLoaded", function() {
  type()
});

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("navbar").style.top = "0";
  }
}

let controller = new ScrollMagic.Controller();
let timeline = new TimelineMax();

timeline
    .to(".girl", 10, { y: -650 })
    .to(".mountain", 10, { y: -400 }, "-=10")
    .fromTo(".bg", { y: -50 }, { y: 0, duration: 10 }, "-=10")
    .to(".content", 10, { top: "0%" }, "-=10")

let scene = new ScrollMagic.Scene({
  triggerElement: "section",
  duration: "300%",
  triggerHook: 0,
})
    .setTween(timeline)
    .setPin("section")
    .addTo(controller);

const texts = ['webpage.', 'projects.', 'portfolio.']
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

function type() {

  if (count === texts.length){
    count = 0;
  }
  currentText = texts[count];

  if (letter.length === currentText.length) {
    letter = currentText.slice(0, ++index);
    document.querySelector('.typing').textContent = letter;
    count++;
    index = 0;
    setTimeout(untype, 1000);
  }
  else {
    letter = currentText.slice(0, ++index);
    document.querySelector('.typing').textContent = letter;
    setTimeout(type, 200)
  }

}

function untype() {

  if (letter.length === 0) {
    letter = currentText.slice(0, --index);
    document.querySelector('.typing').textContent = letter;
    index = 0;
    setTimeout(type, 100);
  }
  else {
    letter = currentText.slice(0, --index);
    document.querySelector('.typing').textContent = letter;
    setTimeout(untype, 100)
  }

}
