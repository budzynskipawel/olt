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
  if(hamburger) {
    hamburger.addEventListener("click", showHideMenu);
  }

  //close right menu after clicking on link;

  for(var i = 0; i < rightMenuLinks.length; i++) {
    if(rightMenuLinks[i].getAttribute("href") == '#') {
      rightMenuLinks[i].addEventListener("click", showHideMenu);
    }

  };

  //eo hamburger

  //tiles full screen view:
  var tiles = document.getElementsByClassName('tile');
  var tileBackground = document.getElementById('tile-background');
  var newTile = document.createElement("div");

  for(var i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener("click", showFullScreen)
  };
  if(tileBackground) {
    tileBackground.addEventListener("click", hideFullScreen);
  }


  function showFullScreen() {

    newTile.innerHTML = this.innerHTML;
    tileBackground.appendChild(newTile);
    newTile.classList.add("fullScreen");
    console.log(newTile);
    tileBackground.classList.add("showBackground");
  };

  function hideFullScreen() {
    this.classList.toggle("showBackground");
  }

  //show more rows on click

  var more = document.getElementById('more');
  var hide = document.getElementsByClassName("hide");
  if(more) {

    more.addEventListener("click", showRows);
  }


  function showRows() {
    this.style.display = "none";

    for(var i = 0; i < hide.length; i++) {
      hide[i].classList.remove("hide");
    };



  };







});
