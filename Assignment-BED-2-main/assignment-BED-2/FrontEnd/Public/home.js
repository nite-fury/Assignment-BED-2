$(document).ready(function () {
    if (localStorage.length > 0) {
        local = JSON.parse(localStorage.userData)   
        console.log(local[0].username)
        $("#Login").replaceWith(`<a class="nav-link btn btn-sm btn-primary rounded-0 ms-3 text-light" href="profile.html" id="Login"><span class="text-capitalize">${local[0].username}</span> Profile</a>`);
      }
})