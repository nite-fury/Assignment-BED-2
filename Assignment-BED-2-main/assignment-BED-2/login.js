  $(document).ready(function () {
    $('#Login').click(function (){
      let data = {
        email:$('#email').val(),
        password:$('#password').val()
      }
      $.ajax({
        url: 'http://localhost:8081/user/login',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
        success:(data, status, xhr) => {
          if (!data) {
            alert('Failed to login!');
            return;
          }
          localStorage.setItem('token', data.token);
          localStorage.setItem('userData', data.UserData);
          location.assign('http://localhost:3001/home.html');
        },
        error: (xhr, status, err) => {
          console.log(err);
          alert('Failed to login!');
        }
      })
      return false;
    })
  });
