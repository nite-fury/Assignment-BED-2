// name: lennon su chee
// class: DISM/FT/2A/02
// Admin no.: 2238801
$(document).ready(function () {
    $('#Login').click(function (){
      let data = {
        email:$('#email').val(),
        password:$('#password').val()
      }
      if ($('#email').val().length === 0 || $('#password').val().length === 0){
        $('#msg').text('Field is empty');
            return;
      }
      $.ajax({
        url: 'http://localhost:8081/users/login',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
        success:(data, status, xhr) => {
          if (!data) {
            $('#msg').text('Credentials are incorrect');
            return;
          }
          localStorage.clear()
          localStorage.setItem('token', data.token);
          localStorage.setItem('userData', data.UserData);
          location.assign('http://localhost:3001/home.html');
        },
        error: (xhr, status, err) => {
          console.log(err);
          $('#msg').text('Credentials are incorrect');
        }
      })
      return false;
    })
  });
