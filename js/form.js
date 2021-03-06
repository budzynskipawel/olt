  // activates submit when captcha

  var captchaOK = false;
  var submitBtn = $('input[type="submit"]');
  var wrongFiles = $('#wrongFiles');

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



  $(function () {
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
      a.on('cut copy paste', function (event) {
        event.preventDefault();
      });
    }
    dontCopy(texts);


    //
    //Counts and inserts how many characters are left
    //
    function showLength() {
      var currentText = wiadomosc.val();
      var charsLeft = "Pozostała ilość znaków: " + (2000 - currentText.length);
      chars.text(charsLeft);


    }
    wiadomosc.on('keyup', showLength);

    // 
    //Shows uploaded files: 
    // 

    var uploadedFiles = $("#uploadedFiles");
    var fileInput = $("#fileUpload");

    fileInput.on("change", function () {
      var fileCount = this.files.length;
      var fileSize = 0;
      var uploadLabel = '<h4>Załączone pliki: ' + fileCount + '</h4>';

      for (var i = 0; i < fileCount; i++) {
        uploadLabel += this.files[i].name + "<br>";
        fileSize += this.files[i].size;
      };
      uploadedFiles.html(uploadLabel);


      //start



      if (fileSize > 6291456) {

        fileInput.addClass('invalid');
        wrongFiles.text('Łączny rozmiar plików przekracza 6MB');
      } else {
        fileInput.removeClass('invalid');
        wrongFiles.text(' ');
      };
      //stop

    });


    //
    //Activates submit
    //





    submitToggle = function () {
      var banka = 0;
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          banka++;
        }
      }
      if ((banka === 3) && (captchaOK)) {
        submitBtn.prop("disabled", false)
      } else {
        submitBtn.prop("disabled", true)
      }


    }
    checkboxes.on('click', submitToggle);

    captcha.on('click', function () {
      console.log('d');
    });


    // grecaptcha.render(
    //   submitToggle());

    //
    // Empty fields VALIDATION
    //



    function emptyInput(a, event) { //dodane
      console.log(a.length);
      console.log(a);
      var b;
      for (var i = 0; i < a.length; i++) {
        if ($(a[i]).val() === '') {
          $(a[i]).addClass('empty');
          var offset = $(a[i]).offset();
          $('html, body').scrollTop(offset.top);
          console.log(a[i], 'zły');
          event.preventDefault();

          break;

        } else if ((i === a.length - 1) && !($(a[i]).val() === '')) {
          testName([imie, nazwisko], event);
          // testAddress([email], event);
          // testTextarea([wiadomosc], event);
        } else {
          $(a[i]).removeClass('empty');
          console.log(a[i], 'dobry');

          console.log('extra');


        }


      };
      testUpload(event);
    }

    function removeEmpty() {
      if ($(this).val() !== '') {
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

    var namePattern = /^[a-ząęćśńółźż-]{3,20}$/i;
    // var emailPattern = /^[a-ząęćśółźż-]{3,20}$/i;
    var emailPattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    // var textPattern = /^([0-9A-Za-zĄąĆćĘęŁłÓóŃńŚśŹźŻź,.!?'"();:/-])\w/;
    var textPattern = /^[A-Za-zĄąĆćĘęŁłÓóŃńŚśŹźŻź0-9?,\.!?'"();:/_-]{3,2000}$/;

    function testName(arguments, event) {
      console.log(arguments);
      for (var i = 0; i < arguments.length; i++) {
        var toTest = $(arguments[i]).val().trim();
        if (!namePattern.test(toTest)) {
          $(arguments[i]).addClass('invalid');
          console.log(toTest, 'źle');
          var offset = $(arguments[i]).offset();

          $('html, body').scrollTop(offset.top);
          event.preventDefault();
          break;
        } else if (i === arguments.length - 1) {
          testAddress([email], event);
        }

      }


    };

    function testAddress(arguments, event) {
      console.log(arguments);
      for (var i = 0; i < arguments.length; i++) {
        var toTest = $(arguments[i]).val().trim();
        if (!emailPattern.test(toTest)) {
          $(arguments[i]).addClass('invalid');
          console.log(toTest, 'źle');
          var offset = $(arguments[i]).offset();
          $('html, body').scrollTop(offset.top);
          event.preventDefault();
          break;
        } else {
          testTextarea([wiadomosc], event);
        }

      }


    };

    function testTextarea(arguments, event) {
      console.log(arguments);
      for (var i = 0; i < arguments.length; i++) {
        var toTest = $(arguments[i]).val().replace(/\s+/g, '');
        console.log(toTest);
        if (!textPattern.test(toTest)) {
          $(arguments[i]).addClass('invalid');
          console.log(toTest, 'źle');
          var offset = $(arguments[i]).offset();
          $('html, body').scrollTop(offset.top);
          event.preventDefault();
          break;
        }
      }
    };

    function testUpload(event) {
      var upload = $('#fileUpload');

      // var numFiles = $("#fileUpload",this)[0].files.length;
      var numFiles = upload[0].files.length;
      // alert(numFiles);
      console.log('plikow:', numFiles);

      if (numFiles > 10) {
        upload.addClass('invalid');
        wrongFiles.text('Za dużo plików!');
        var offset = upload.offset();
        $('html, body').scrollTop(offset.top);
        event.preventDefault();



      } else {
        upload.removeClass('invalid');
        var fileSize = 0;
        for (var i = 0; i < (numFiles); i++) {
          fileSize += upload[0].files[i].size;
        };

        if (fileSize > 6291456) {

          event.preventDefault();
          upload.addClass('invalid');
          wrongFiles.text('Łączny rozmiar plików przekracza 6MB');

        } else {


        }


      };

    };





    function removeInvalid() {
      var toTest = $(this).val();
      if ((($(this).attr('name') === 'imie') || ($(this).attr('name') === 'nazwisko')) && (namePattern.test(toTest))) {
        $(this).removeClass('invalid');
        console.log($(this).val(), ' OK');
      } else if (($(this).attr('name') === 'email') && (emailPattern.test(toTest))) {
        $(this).removeClass('invalid');
        console.log($(this).val(), ' OK');
      } else if (($(this).prop('tagName') === "TEXTAREA") && (textPattern.test(toTest))) {
        $(this).removeClass('invalid');
        console.log($(this).val(), ' OK');
      }
    };

    
    nazwisko.on('keyup', removeInvalid);
    imie.on('keyup', removeInvalid);
    
    email.on('keyup', removeInvalid);
    wiadomosc.on('keyup', removeInvalid);


    //
    // GENERAL VALIDATION
    //
    function generalValidation(event) { // dodane
      emptyInput(texts, event);
    




    };



    submitBtn.on('click',
      generalValidation
    );



  });