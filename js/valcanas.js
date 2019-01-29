$(document).ready(function(){

    const $inputsConFondo = $('#name, #msg, #mail, #pass');    
    const $submit = $('input[type="submit"]');    
    const $fetch = $('#fetch');
    
    $submit.click(function(e){
      e.preventDefault();
      
      const inputData = {
      name: $('#name').val(),
      email: $('#email').val(),
      pass: $('#pass').val(),
      cumple: $('#cumple').val(),
      gustos: {
        genero_peli: $('#genero_peli').val(),
        genero_music: $('#genero_music').val()
      },
      message: $('#msg').val()
    }
      $.ajax({
          url: 'https://valcanas-test.firebaseio.com/.json',
          type: "POST",
          data: JSON.stringify(inputData),
          success: function (data) {
          console.log(data);
          alert('Su formulario ha sido enviado');
          },
          error: function(error) {
          console.log(error);
          }
      });
  });

  function calculate_age(birthday) {
    var milisegundos = Date.now() - Date.parse(birthday);
    var edad = new Date(milisegundos);
    console.log(Math.abs(edad.getUTCFullYear() - 1970));
    return Math.abs(edad.getUTCFullYear() - 1970);
}

  $fetch.click(function() {
      $('#fetch').hide();
    $.ajax({
          url: 'https://valcanas-test.firebaseio.com/.json',
          type: "GET",
          success: function (data) {
              $('#formulario').hide();
              $('#responsesContainer').append('<h1>Gustos de los compañeros:</h1>');
              Object.values(data).map(function(response) {
                let edad = calculate_age(response.cumple);
                $('#responsesContainer')
                .append(`<h3>${response.name}</h3>`)
                .append(`<li>Genero pelis: ${response.gustos.genero_peli}</li>`)
                .append(`<li>Genero musical: ${response.gustos.genero_music}</li>`)
                .append(`<li>Tiene: ${edad} años</li>`);
              });
              const scifiUsers = Object.values(data).filter(function(response) {
                return response.gustos.genero_peli == 'scifi';
              });
              if (scifiUsers.length > 0) {
                  
                $('#scifiUsers').append('<h1>Los siguientes usuarios ven cine SciFi:</h1>')
                    scifiUsers.map(function(user) {

                    $('#scifiUsers')
                    .append(`<h3>${user.name}</h3>`)
                    .append(`<li>ademas escucha: ${user.gustos.genero_music}<h2>`)
                    .append(`<li>Y nos dice esto: ${user.message}<h3>`);
                  });            
              }
          },
          error: function(error) {
          console.log(error);
          }
      });
  })
    const $reset = $('input[type="reset"]');
    $reset.click(function(){
      $submit.attr('disabled','disabled').addClass("disabled");
      $inputsConFondo.removeClass('focusValidado').addClass('focusDisabled');
  });
    let $name, $message, $email, $pass;
    const regexFilterForEmail = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    $('#name').keyup(function() {
      if ($.trim($('#name').val()) !=='') {
          $('#name').removeClass('focusDisabled').addClass('focusValidado')
      } else {
          if ($('#name').hasClass('focusValidado')) {
              $('#name').removeClass('focusValidado').addClass('focusDisabled');
          }
      }
    })
    $('#msg').keyup(function() {
      if ($.trim($('#msg').val()) !=='') {
          $('#msg').removeClass('focusDisabled').addClass('focusValidado')
      } else {
          if ($('#msg').hasClass('focusValidado')) {
              $('#msg').removeClass('focusValidado').addClass('focusDisabled');
          }
      }
    })
    $('#pass').keyup(function() {
      if ($.trim($('#pass').val().length) > 7) {
          $('#pass').removeClass('focusDisabled').addClass('focusValidado')
      } else {
          if ($('#pass').hasClass('focusValidado')) {
              $('#pass').removeClass('focusValidado').addClass('focusDisabled');
          }
      }
    })
    $('#mail').keyup(function() {
      if (regexFilterForEmail.test($.trim($('#mail').val()))) {
          $('#mail').removeClass('focusDisabled').addClass('focusValidado')
      } else {
          if ($('#mail').hasClass('focusValidado')) {
              $('#mail').removeClass('focusValidado').addClass('focusDisabled');
          }
      }
    })
    $('form').keyup(function() {
      let $name =  $.trim($('#name').val());
      let $message = $.trim($('#msg').val());
      let $email = $.trim($('#mail').val());
      let $pass = $.trim($('#pass').val());
      if ($name != '' && $message != "" && $pass.length > 7 && regexFilterForEmail.test($email) ) {
        $submit.removeAttr("disabled").removeClass("disabled");
      } else {
          if (!$submit.hasClass('disabled')) {
              $submit.addClass("disabled").attr('disabled','disabled');
          }
      }
    })







    
})