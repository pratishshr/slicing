function Animator(element) {
  this.el = element;
  var that = this;
  var animationID;
  var initial;
  var cssProp;
  var counter;
  var current;
  var step;
  var animDuration;
  var initital;

  this.init = function(cssProperty, value, duration) {
    counter = 0;
    cssProp = cssProperty;
    var style = window.getComputedStyle(element);
    initial = style.getPropertyValue(cssProperty);
    initial = parseInt(initial);
    animDuration = duration;
    step = value / (duration / 50);
    that.animation();
  }

  this.animation = function() {
      animationID = window.requestAnimationFrame(that.animation);
      counter++;
      current = step * counter;

      element.style[cssProp] = current + initial + 'px';

      if (counter >= animDuration / 50) {
        window.cancelAnimationFrame(animationID);
      }
    }
  
  // should stop the animation in current position
  this.stop = function() {
    clearInterval(intervalId);
  }

  // should stop the animation and element's properties should be at "end" value
  this.finish = function(width) {
    window.cancelAnimationFrame(animationID);
    element.style[cssProp] = initial + width + 'px';
  }

  this.startPosition = function() {
    window.cancelAnimationFrame(animationID);
    element.style[cssProp] = 0 + 'px';
  }
}
