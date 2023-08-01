$(document).ready(function () {
    $('#Login').click(function (){
      let data = {
        username:$('#username').val(),
        email:$('#email').val(),
        password:$('#password').val(),
      }
      if ($('#email').val().length === 0 || $('#password').val().length === 0 || $('#username').val().length === 0){
        $('#msg').text('Field is empty');
            return;
      }
      $.ajax({
        url: 'http://localhost:8081/users/',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
        success:(data, status, xhr) => {
          location.replace('http://localhost:3001/created.html');
        },
        error: (xhr, status, err) => {
          console.log(err);
          $('#msg').text('Account already exist!');
        }
      })
      return false;
    })
  });