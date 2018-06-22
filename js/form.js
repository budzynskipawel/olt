$(function() {
  var wiadomosc = $('#wiadomosc'); //textarea
  var imie = $('#imie'); //input[type="text"]
  var nazwisko = $('#nazwisko'); //input[type="text"]
  var email = $('#email'); //input[type="text"]
  var inputs = $('input');
  var chars = $('#chars'); // Characters left span
  var checkboxes = $('input[type="checkbox"]');
  console.log(checkboxes.id);
  var submitBtn = $('input[type="submit"]');

  // submitBtn.on('click',
  //   function() {
  //     console.log('hejla');
  //     event.preventDefault();
  //   }
  // )

  function submitToggle() {
    var banka = 0;
    for(var i = 0; i < checkboxes.length; i++) {
      if(checkboxes[i].checked) {
        banka++;
      }
    }
    if(banka === 3) {
      submitBtn.prop("disabled", false)
    } else {
      submitBtn.prop("disabled", true)
    }


  }
  checkboxes.on('click', submitToggle)

  //Prevents from cut,copy,paste
  function dontCopy(a) {
    a.on('cut copy paste', function(event) {
      event.preventDefault();
    });
  }
  dontCopy(inputs);
  dontCopy(wiadomosc);


  //Counts end inserts how many characters are left
  function showLength() {
    var currentText = wiadomosc.val();
    var charsLeft = "Pozostała ilość znaków: " + (2000 - currentText.length);
    chars.text(charsLeft);


  }
  wiadomosc.on('keyup', showLength);

  //Activates submit


})
