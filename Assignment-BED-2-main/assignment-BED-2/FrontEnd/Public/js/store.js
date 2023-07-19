$(document).ready(() => {
  $.ajax({
      url: 'http://localhost:8081/game',
      type: 'GET',
      dataType: 'json',
      success:(data, status, xhr) => { // will be covered in assignment 2
          // $('value').appendTo('#id'); <-- this works too! (for append)
          //data.forEach(element => {}); <-- this works too! (for for loop)
          $('#results').empty();
          let price = [];
          let tmpHtml = "";
          for (const index of data){
            console.log(index.priceid)
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
                  <a href="/game.html"class="btn btn-danger" id="${index.priceid}">View More!</a>
                </div>
              </div>
            </div>
              `;
              price.push(index.priceid)
          }
          $('#results').append(tmpHtml); //<-- draws page only at the end
          price.forEach((id)=>{
            console.log(id)
            $("#"+id).click(() => {
              console.log(id)
              sessionStorage.setItem("priceid", $("#"+id).attr('id'))
            })
          })
          $.ajax({
            url: 'http://localhost:8081/gameplat',
            type: 'GET',
            dataType: 'json',
            success:(data, status, xhr) => {
              tmpHtml = ""
              console.log(data)
              platid = []
              for(const index of data){
                console.log(index)
                 pid ="plat"+index.platformid
                tmpHtml += `<li><a class="dropdown-item" href="" id=${pid}>${index.platform_name}</a></li>`
                platid.push(index.platformid)
              }
              $('#platres').append(tmpHtml)
              platid.forEach((id)=>{
                console.log(id)
                $("#plat"+id).click(() => {
                  $.ajax({
                    url: 'http://localhost:8081/gameplat/'+ id,
                    type: 'GET',
                    dataType: 'json',
                    success: (data, status, xhr) => {
                      $('#results').empty();
                      let tmpHtml = "";
                      let price = [];
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
                              <a href="/game.html"class="btn btn-danger" id="${index.priceid}">View More!</a>
                            </div>
                          </div>
                        </div>
                          `;
                          price.push(index.priceid)
                      }
                      $("#results").empty()
                      $('#results').append(tmpHtml); //<-- draws page only at the end  
                      price.forEach((id)=>{
                        ($("#"+id)).click(() => {
                          sessionStorage.setItem("priceid",  $("#"+id).attr('id'))
                        })
                      })
                    },
                    error: (xhr, status, err) => {
                    console.log(err);
                    console.log("Failed to pull game data!");
                }
                
                });
                return false  
                })
              })
            },
            error: (xhr, status, err) => {
              console.log(err);
              console.log("Failed to pull platform data!");
          }
        
          })
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
            let price = [];
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
                    <a href="/game.html"class="btn btn-danger" id="${index.priceid}">View More!</a>
                  </div>
                </div>
              </div>
                `;
                price.push(index.priceid)
            }
            $('#results').append(tmpHtml); //<-- draws page only at the end  
            price.forEach((id)=>{
              ($("#"+id)).click(() => {
                sessionStorage.setItem("priceid",  $("#"+id).attr('id'))
              })
            })
          },
          error: (xhr, status, err) => {
          console.log(err);
          console.log("Failed to pull game data!");
      }
      });
      return false;
  })
});