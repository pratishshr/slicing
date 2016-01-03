//for post section, when on 1024 screen, making the next post in opposite direction
//otherwise, in greater than 1024, making the post in opposite direction after 2 posts

function reversePost() {
  var screenSize = window.innerWidth;

  var posts = document.getElementsByClassName('posts')[0];
  var postListItem = posts.getElementsByTagName('li');

  if (screenSize <= 1024) {
    for (var i = 0; i < postListItem.length; i++) {
      if (i % 2 == 0) {
        postListItem[i].className = '';
      } else {
        postListItem[i].className = 'opposite';
      }
    }
  } else {
    var opposite = 0;
    for (var i = 0; i < postListItem.length; i++) {
      if (i % 2 == 0 && i != 0) {
        opposite = (opposite == 1 ? 0 : 1);
      }
      if (opposite == 0) {
        postListItem[i].classList.remove('opposite');

      } else {
        postListItem[i].className = 'opposite';
      }
    }
  }
}

reversePost();
