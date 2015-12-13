// function Counter() {
//   this.element = document.getElementsByClassName('counter-number');

//   var intervalId;

//   var that = this;
//   var finalNumber = [];
//   var final;
//   var counter = [];
//   this.init = function(){
//       for( i =0;i< that.element.length; i++){
//         finalNumber[i] = parseInt(that.element[i].innerHTML)  ;
//         counter[i] = 0;
//       }
//       final = Math.max.apply(Math, finalNumber);;
//       console.log(finalNumber);
    
//       intervalId= setInterval(function(){
//           for(j = 0; j< that.element.length; j++){
//           that.animate(j);
//       }  
      
//       }, 100);


//   }

//   this.animate = function(j){
//   if(counter[j] == final){
//       clearInterval(intervalId);
//   }

//   if(counter[j] != finalNumber[j]){
//     that.element[j].innerHTML = counter[j] + 1;
//     counter[j]++;
//   }
   
//   }
// } 

// var flag = 0;
// window.addEventListener('scroll', function(){
//   var top = window.scrollY;
//   console.log(top);
//   if(top >= 607 && flag != 1){
//     var counter = new Counter();
//     counter.init();
//     flag =1;
//   }
// })
