document.addEventListener("DOMContentLoaded", function () {
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
  if (hamburger) {
    hamburger.addEventListener("click", showHideMenu);
  }

  //close right menu after clicking on link;

  for (var i = 0; i < rightMenuLinks.length; i++) {
    if (rightMenuLinks[i].getAttribute("href") == '#') {
      rightMenuLinks[i].addEventListener("click", showHideMenu);
    }

  };

  //eo hamburger

  //tiles full screen view:
  var tiles = document.getElementsByClassName('tile');
  var tileBackground = document.getElementById('tile-background');
  var newTile = document.createElement("div");
  var closeBtn = document.createElement('div');




  for (var i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener("click", showFullScreen)
  };
  if (tileBackground) {
    // tileBackground.addEventListener("click", hideFullScreen);
  }


  function showFullScreen() {

    newTile.innerHTML = this.innerHTML;
    tileBackground.appendChild(newTile);
    tileBackground.appendChild(closeBtn);
    closeBtn.classList.add('close-btn');
    closeBtn.style.color = 'gray';
    closeBtn.style.textAlign = 'center';
    closeBtn.innerText = "+";
    newTile.classList.add("fullScreen");
    closeBtn.addEventListener('click', hideFullScreen);
    console.log(newTile);
    tileBackground.classList.add("showBackground");

   
   
    

  };

  function hideFullScreen() {
    
    if(tileBackground){
      tileBackground.classList.toggle('showBackground');
    }
    // this.parentElement.classList.toggle("showBackground");
    event.stopPropagation();
  };

  //show more rows on click

  var more = document.getElementById('more');
  var hide = document.getElementsByClassName("hide");
  if (more) {

    more.addEventListener("click", showRows);
  }


  function showRows() {
    this.style.display = "none";
    console.log(hide);
    for (var i = 0; i <= hide.length; i++) {
      console.log(hide[i]);
      // hide[i].classList.remove("hide");
      hide[i].style.display = "flex";
    };



  };

  function rekl() {
    var reklList = $('.rekl-list');
    var reklTitle = reklList.find('li');
    var reklDesc = reklTitle.find('div');
    reklDesc.hide();
    reklTitle.on('click', toggleDesc);

    function toggleDesc() {
      reklDesc.slideUp(500);
      reklDesc.parent().removeClass('rekl-active');
      //        
      if ($(this).find('div').is(':visible')) {
        $(this).removeClass('rekl-active');
        $(this).find('div').slideUp(500);
        
      } else {
        $(this).find('div').slideDown(500);
        $(this).addClass('rekl-active');
      }
    };
  };
  rekl();





});