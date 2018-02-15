document.addEventListener("DOMContentLoaded", function() {
  // alert("DOMContentLoaded");
  //hamburger
  var hamburger = document.getElementById('hamburger');
  var rightMenu = document.getElementById('right-menu');
  hamburger.addEventListener("click", function onClick(event) {
    hamburger.classList.toggle('hamburger-active');
    rightMenu.classList.toggle('move-left');

  });
  //eo hamburger


})
