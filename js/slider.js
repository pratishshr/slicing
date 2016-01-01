function Slider() {
  var sliderLong;
  var shiftMargin;
  var animator;
  var counter;
  var allSlides;
  var slideLength;
  var slidePos;
  var style;
  var imageWidth;
  var posImage;
  var flag = 0;
  var nextImage;
  var previousImage;
  
  var imageBotton;
  var seeker;

  // for right and left arrows
  var rightArrow;
  var leftArrow;
  
  var  mainId;

  var that = this;

  this.init = function() {
    sliderLong = document.getElementsByClassName('slider-long')[0]; 
    posImage = document.getElementsByClassName('seeker');
    nextImage = document.getElementsByClassName('next-image')[0];
    previousImage = document.getElementsByClassName('previous-image')[0];
    rightArrow = document.getElementsByClassName('image-right')[0];
    leftArrow = document.getElementsByClassName('image-left')[0];

    imageBottom = document.getElementsByClassName('image-bottom')[0];
    seeker = document.getElementsByClassName('seeker');

    allSlides = sliderLong.getElementsByTagName('li');
    slideLength = allSlides.length;
    shiftMargin = 0;

    style = window.getComputedStyle(allSlides[0]);
    imageWidth = parseInt(style.getPropertyValue('width'));

    flag = 0;
    slidePos = 0
    counter = 0;
    animator = new Animator(sliderLong);
    sliderLong.style.marginLeft = 0 + 'px';

    previousImage.innerHTML = 0 + ' / ' + slideLength;
    nextImage.innerHTML = (counter + 2) + ' / ' + slideLength;


    for (var i = 0; i < slideLength; i++) {
      var span = document.createElement('span');
      span.className = 'seeker';
      span.id = i;
      if (i == 0) {
        span.className += ' active';
      }
      imageBottom.appendChild(span);
      seeker[i].addEventListener('click', that.seekerClick);
    }

    that.addEvents();

    mainId = setTimeout(that.slide, 2000);
  }

  this.slide = function() {

    counter++;
    flag = 0;

    if (counter >= slideLength) {
      animator.init("margin-left", (imageWidth * (slideLength - 1)), 1000);
      counter = 0;
    } else if (counter < 0) {
      counter = 0;
    } else {
      animator.init("margin-left", -imageWidth, 1000);
    }

    that.checkArrows();
    that.checkPosition();
    mainId = setTimeout(that.slide, 2000);
  }

  //take width again when window is resized
  that.updateImageWidth = function() {
    allSlides = sliderLong.getElementsByTagName('li');
    style = window.getComputedStyle(allSlides[0]);
    imageWidth = parseInt(style.getPropertyValue('width'));
    animator.startPosition();
    counter = 0;
    that.checkPosition();
  }

  //update arrows
  this.checkArrows = function() {
    previousImage.innerHTML = counter + ' / ' + slideLength;

    if (counter == 4) {
      nextImage.innerHTML = 1 + ' / ' + slideLength;
    } else {
      nextImage.innerHTML = (counter + 2) + ' / ' + slideLength;
    }
  }

  this.checkPosition = function() {
    that.checkArrows();
    for (var j = 0; j < slideLength; j++) {
      posImage[j].className = 'seeker';
    }
    posImage[counter].className += ' active';
  }


  this.seekerClick = function() {
    clearTimeout(mainId);
    slidePos = parseInt(sliderLong.style.marginLeft);
   
    if ((slidePos % imageWidth) == 0) {
      animator.init("margin-left", (counter - this.id) * imageWidth, 1000);
      counter = parseInt(this.id);
    }

    mainId = setTimeout(that.slide, 2000);
    that.checkPosition();
  }

  this.addEvents = function () {
    rightArrow.addEventListener('click', function() {
    clearTimeout(mainId);
    slidePos = parseInt(sliderLong.style.marginLeft);

    if ((slidePos % imageWidth) == 0 && (slidePos > -(imageWidth * (slideLength - 1)))) {
      counter++;
      that.checkPosition();
      animator.init("margin-left", -imageWidth, 1000);
    } else {
      that.checkPosition();
      animator.finish(-imageWidth);
    }
    mainId = setTimeout(that.slide, 2000);
    that.checkArrows()
    });


  leftArrow.addEventListener('click', function() {
    clearTimeout(mainId);

    slidePos = parseInt(sliderLong.style.marginLeft);

    if ((slidePos % imageWidth) == 0 && (slidePos < 0)) {
      counter--;
      that.checkPosition();
      animator.init("margin-left", imageWidth, 1000);
      flag = 1;
    } else if ((slidePos < 0) && flag == 0) {
      counter--;
      that.checkPosition();
      animator.finish(0);
      flag = 0;
    }
    mainId = setTimeout(that.slide, 2000);
    that.checkArrows()
  });


  document.addEventListener("visibilitychange", function() {
    if (document.hidden == true) {
      animator.startPosition();
      counter = 0;
      that.checkPosition();
    }
   }, false);
  }
}  

var slider = new Slider();
slider.init();