// Class for animating counter

function Counter(counterClass) {
  this.element = document.getElementsByClassName(counterClass);

  var intervalId; //setInterval id
  var finalNumber = []; //final Number of each item
  var maxNum; //largest number among all item
  var counter = []; //counter for each item

  this.flag = 0; //to run only once

  var that = this;

  this.init = function() {
    for (i = 0; i < that.element.length; i++) {
      finalNumber.push(parseInt(that.element[i].innerHTML));
      counter[i] = 0;
    }

    maxNum = Math.max.apply(Math, finalNumber); //finds the max number among the array

    intervalId = setInterval(function() {
      for (i = 0; i < that.element.length; i++) {
        that.animate(i);
      }
    }, 100);
  }

  this.animate = function(i) {
    if (counter[i] == maxNum) {
      clearInterval(intervalId);
    }

    if (counter[i] <= finalNumber[i]) {
      that.element[i].innerHTML = counter[i];
      counter[i]++;
    }
  }
}


var counterClass = 'counter-number'; //Insert the class name of the number to be animated here

var posY; //scroll position of the window

var scrollCounter = new Counter(counterClass); //instance of the Counter class

var element = document.getElementsByClassName(counterClass)[0];

window.addEventListener('scroll', function() {
  var docViewTop = document.body.scrollTop;
  var docViewBottom = docViewTop + window.innerHeight;

  var elemTop = getOffset(element).top;

  if ((elemTop <= docViewBottom) && (elemTop >= docViewTop) && scrollCounter.flag == 0) {
    scrollCounter.init();
    scrollCounter.flag = 1;
  }
});

function getOffset(el) {

  const box = el.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset - document.documentElement.clientTop,
    left: box.left + window.pageXOffset - document.documentElement.clientLeft
  }
}
