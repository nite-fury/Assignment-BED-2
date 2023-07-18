$(document).ready(() => {
  $.ajax({
      url: 'http://localhost:8081/game',
      type: 'GET',
      dataType: 'json',
      success:(data, status, xhr) => { // will be covered in assignment 2
          // $('value').appendTo('#id'); <-- this works too! (for append)
          //data.forEach(element => {}); <-- this works too! (for for loop)
          $('#results').empty();
          let tmpHtml = "";
          for (const index of data){
              tmpHtml +=`
              <div class="col-lg-4 col-md-6 mb-4">
              <div class="card">
                <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                  <img src="./img/${index.image_url}" class="img-fluid" />
                  <a href="#!">
                  </a>
                </div>
                <div class="card-body">
                  <h5 class="card-title">${index.title}</h5>
                  <h6 class="card-title">Available on ${index.Platform_name} at $${index.price}</h6>
                  <p class="card-text">
                    ${index.description}
                  </p>
                  <a href="/game.html"class="btn btn-primary" id="view">View More!</a>
                </div>
              </div>
            </div>
              `;
          }
          $('#results').append(tmpHtml); //<-- draws page only at the end
      },
      error: (xhr, status, err) => {
          console.log(err);
          console.log("Failed to pull user data!");
      }
  });
  $('#Search').click(() => {
      let searchbox = $('#searchbox').val();
      $.ajax({
          url: 'http://localhost:8081/game/'+ searchbox,
          type: 'GET',
          dataType: 'json',
          success: (data, status, xhr) => {
            $('#results').empty();
            let tmpHtml = "";
            for (const index of data){
                tmpHtml +=`
                <div class="col-lg-4 col-md-6 mb-4">
                <div class="card">
                  <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                    <img src="./img/${index.image_url}" class="img-fluid" />
                    <a href="#!">
                    </a>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">${index.title}</h5>
                    <h6 class="card-title">Available on ${index.Platform_name} at $${index.price}</h6>
                    <p class="card-text">
                      ${index.description}
                    </p>
                    <a href="/game.html"class="btn btn-primary" id="view">View More!</a>
                  </div>
                </div>
              </div>
                `;
            }
            $('#results').append(tmpHtml); //<-- draws page only at the end  
          },
          error: (xhr, status, err) => {
          console.log(err);
          console.log("Failed to pull user data!");
      }
      })
      return false;
  })
});