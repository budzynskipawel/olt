$(function() {
  var wiadomosc = $('#wiadomosc'); //textarea
  var imie = $('#imie'); //input[type="text"]
  var nazwisko = $('#nazwisko'); //input[type="text"]
  var email = $('#email'); //input[type="text"]
  var texts = $('.form-text');
  var chars = $('#chars'); // Characters left span
  var checkboxes = $('input[type="checkbox"]');
  var body = $('body');
  console.log(checkboxes.id);
  var submitBtn = $('input[type="submit"]');
  var skad = '';



  //
  //Prevents from cut,copy,paste
  //
  function dontCopy(a) {
    a.on('cut copy paste', function(event) {
      event.preventDefault();
    });
  }
  dontCopy(texts);


  //
  //Counts end inserts how many characters are left
  //
  function showLength() {
    var currentText = wiadomosc.val();
    var charsLeft = "Pozostała ilość znaków: " + (2000 - currentText.length);
    chars.text(charsLeft);


  }
  wiadomosc.on('keyup', showLength);
  //
  //Activates submit
  //
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
  checkboxes.on('click', submitToggle);

  //
  // Empty fields VALIDATION
  //



  function emptyInput(a) {
    for(var i = 0; i < a.length; i++) {
      if($(a[i]).val() === '') {
        $(a[i]).addClass('empty');
        event.preventDefault();
        break;

      } else {
        $(a[i]).removeClass('empty');

      }

    }
  }

  function removeEmpty() {
    if($(this).val() !== '') {
      $(this).removeClass('empty')
    }
  };
  texts.on('keyup', removeEmpty);


  //
  // Name, surname Validation imie, nazwisko
  //
  var name = [A - Z][a - zA - Z][ ^ # & < > \~;$ ^ % {} ? ] {
    1,
    20
  }
  $;

  //
  // GENERAL VALIDATION
  //
  function generalValidation() {
    emptyInput(texts);
    // event.preventDefault();

  }



  submitBtn.on('click',
    generalValidation

  )

})
