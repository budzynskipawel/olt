  var captchaOK = false;
  var submitBtn = $('input[type="submit"]');

  function enableBtn() {
    captchaOK = true;
    console.log('captcha');
    submitToggle();

  };

  function disableBtn() {
    captchaOK = false;
    console.log('falsecaptcha');
    submitBtn.prop("disabled", true)
  }



  $(function() {
    var wiadomosc = $('#wiadomosc'); //textarea
    var imie = $('#imie'); //input[type="text"]
    var nazwisko = $('#nazwisko'); //input[type="text"]
    var email = $('#email'); //input[type="text"]
    var texts = $('.form-text');
    var chars = $('#chars'); // Characters left span
    var checkboxes = $('input[type="checkbox"]');
    var body = $('body');

    var skad = '';
    var captcha = $('.recaptcha-checkbox-checkmark');



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



    submitToggle = function() {
      var banka = 0;
      for(var i = 0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked) {
          banka++;
        }
      }
      if((banka === 3) && (captchaOK)) {
        submitBtn.prop("disabled", false)
      } else {
        submitBtn.prop("disabled", true)
      }


    }
    checkboxes.on('click', submitToggle);

    captcha.on('click', function() {
      console.log('d');
    });


    // grecaptcha.render(
    //   submitToggle());

    //
    // Empty fields VALIDATION
    //



    function emptyInput(a) {
      console.log(a.length);
      console.log(a);
      var b;
      for(var i = 0; i < a.length; i++) {
        if($(a[i]).val() === '') {
          $(a[i]).addClass('empty');
          var offset = $(a[i]).offset();
          $('html, body').scrollTop(offset.top);
          console.log(a[i], 'zły');
          event.preventDefault();

          break;

        } else if((i === a.length - 1) && !($(a[i]).val() === '')) {
          testName(imie, nazwisko);
          testAddress(email);
          testTextarea(wiadomosc);
        } else {
          $(a[i]).removeClass('empty');
          console.log(a[i], 'dobry');

          console.log('extra');


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
    // var testName = /^[a-ząęćśółźżŁĆŻŹ-]+$/g;
    // console.log(testName);
    // console.log(testName.test(jan));

    var namePattern = /^[a-ząęćśółźż-]{3,20}$/i;
    // var emailPattern = /^[a-ząęćśółźż-]{3,20}$/i;
    var emailPattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    var textPattern = /^([0-9A-Za-zĄąĆćĘęŁłÓóŃńŚśŹźŻź,.!?'"();:/-])\w/;


    function testName() {
      console.log(arguments);
      for(var i = 0; i < arguments.length; i++) {
        var toTest = $(arguments[i]).val();
        if(!namePattern.test(toTest)) {
          $(arguments[i]).addClass('invalid');
          console.log(toTest, 'źle');
          var offset = $(arguments[i]).offset();
          $('html, body').scrollTop(offset.top);
          event.preventDefault();
          break;
        }
      }


    };

    function testAddress() {
      console.log(arguments);
      for(var i = 0; i < arguments.length; i++) {
        var toTest = $(arguments[i]).val();
        if(!emailPattern.test(toTest)) {
          $(arguments[i]).addClass('invalid');
          console.log(toTest, 'źle');
          var offset = $(arguments[i]).offset();
          $('html, body').scrollTop(offset.top);
          event.preventDefault();
          break;
        }
      }


    };

    function testTextarea() {
      console.log(arguments);
      for(var i = 0; i < arguments.length; i++) {
        var toTest = $(arguments[i]).val().replace(/\s+/g, '');
        console.log(toTest);
        if(!textPattern.test(toTest)) {
          $(arguments[i]).addClass('invalid');
          console.log(toTest, 'źle');
          var offset = $(arguments[i]).offset();
          $('html, body').scrollTop(offset.top);
          event.preventDefault();
          break;
        }
      }
    };


    function removeInvalid() {
      var toTest = $(this).val();
      if((($(this).attr('name', 'imie')) || ($(this).attr('name', 'nazwisko'))) && (namePattern.test(toTest))) {
        $(this).removeClass('invalid');
        console.log($(this), 'OK');
      } else if(($(this).attr('name', 'email')) && (emailPattern.test(toTest))) {
        $(this).removeClass('invalid');
        console.log($(this), 'OK');
      }
    };
    imie.on('keyup', removeInvalid);
    nazwisko.on('keyup', removeInvalid);
    email.on('keyup', removeInvalid);


    //
    // GENERAL VALIDATION
    //
    function generalValidation() {
      emptyInput(texts);
      event.preventDefault();


    }



    submitBtn.on('click',
      generalValidation
    );



  });