// var sliderLong = document.getElementsByClassName('slider-long')[0];

// var shiftMargin = 0;
var imageWidth = 1280;
var sliderLong = document.getElementsByClassName("slider-long")[0];
var animator = new Animator(sliderLong);
var counter = 0;
var allSlides = sliderLong.children;
var slideLength = allSlides.length;
var slidePos = 0;
var posImage = document.getElementsByClassName('seeker');
var flag = 0;

var nextImage = document.getElementsByClassName('next-image')[0];
var previousImage = document.getElementsByClassName('previous-image')[0];
sliderLong.style.marginLeft = 0 + 'px';

// for right and left arrows
var rightArrow = document.getElementsByClassName('image-right')[0];
var leftArrow = document.getElementsByClassName('image-left')[0];
leftArrow.style.display = 'none';
nextImage.innerHTML = (counter + 2) +  ' / ' + slideLength;

//check arrows
function checkArrows(){
  console.log(counter);
  nextImage.innerHTML = (counter + 2) +  ' / ' + slideLength;
  previousImage.innerHTML = counter +  ' / ' + slideLength;
  if(counter == 0 ){
    console.log('hello');
    leftArrow.style.display = 'none';
    rightArrow.style.display = 'block';
  }else if(counter == slideLength - 1 ){
    console.log("helll");
    rightArrow.style.display = 'none';
    leftArrow.style.display = 'block';
  }else{
    leftArrow.style.display = 'block';
    rightArrow.style.display = 'block';
  }
}

//position images, bottom seekerss
function checkPosition() {
  checkArrows()
  for (var j = 0; j < slideLength; j++) {
    posImage[j].className = 'seeker';
  }
  posImage[counter].className += ' active';
}

function slide() {
  counter++;
  flag = 0;

  if (counter >= slideLength) {
    animator.animate("margin-left", (imageWidth * (slideLength - 1)), 1000);
    counter = 0;
  } else if (counter < 0) {
    counter = 0;
  } else {
    animator.animate("margin-left", -imageWidth, 1000);
  }

  checkArrows();
 
  checkPosition();
}

var mainId = setInterval(slide, 2000);



//for seekers
var imageBottom = document.getElementsByClassName('image-bottom')[0];
var seeker = document.getElementsByClassName('seeker');

for (var i = 0; i < slideLength; i++) {
  var span = document.createElement('span');
  span.className = 'seeker';
  span.id = i;
  if (i == 0) {
    span.className += ' active';
  }
  imageBottom.appendChild(span);
  seeker[i].addEventListener('click', seekerClick);
}

//seeker clicker
function seekerClick() {
  clearInterval(mainId);
  slidePos = parseInt(sliderLong.style.marginLeft);
  if ((slidePos % imageWidth) == 0) {
    animator.animate("margin-left", (counter - this.id) * imageWidth, 1000);
    counter = parseInt(this.id);
  }

  mainId = setInterval(slide, 2000);
  checkPosition();
}


rightArrow.addEventListener('click', function() {
  clearInterval(mainId);
  slidePos = parseInt(sliderLong.style.marginLeft);


  if ((slidePos % imageWidth) == 0 && (slidePos > -(imageWidth * (slideLength - 1)))) {
    counter++;
    checkPosition();
    animator.animate("margin-left", -imageWidth, 1000);
  } else {
    checkPosition();
    animator.finish(-imageWidth);
  }
  mainId = setInterval(slide, 2000);
  checkArrows()
});


leftArrow.addEventListener('click', function() {
  clearInterval(mainId);

  slidePos = parseInt(sliderLong.style.marginLeft);

  if ((slidePos % imageWidth) == 0 && (slidePos < 0)) {
    counter--;
    checkPosition();
    animator.animate("margin-left", imageWidth, 1000);
    flag = 1;
  } else if ((slidePos < 0) && flag == 0) {
    counter--;
    checkPosition();
    animator.finish(0);
    flag = 0;
  }
  mainId = setInterval(slide, 2000);
  checkArrows()
});
