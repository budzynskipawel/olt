document.addEventListener("DOMContentLoaded", function() {
  // alert("DOMContentLoaded");
  //hamburger
  var hamburger = document.getElementById('hamburger');
  var rightMenu = document.getElementById('right-menu');
  var rightMenuLinks = rightMenu.getElementsByTagName('a');
  console.log(rightMenuLinks);

  function showHideMenu() {
    hamburger.classList.toggle('hamburger-active');
    rightMenu.classList.toggle('move-left');
  };
  hamburger.addEventListener("click", showHideMenu);
  //close right menu after clicking on link;

  for(var i = 0; i < rightMenuLinks.length; i++) {
    if(rightMenuLinks[i].getAttribute("href") == '#') {
      rightMenuLinks[i].addEventListener("click", showHideMenu);
    }

  };

  //eo hamburger









});
