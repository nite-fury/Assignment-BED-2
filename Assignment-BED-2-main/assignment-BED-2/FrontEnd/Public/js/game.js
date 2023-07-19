$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:8081/game/desc/'+sessionStorage.priceid,
        type: 'GET',
        dataType: 'json',
        success:(data, status, xhr) => { // will be covered in assignment 2
            // $('value').appendTo('#id'); <-- this works too! (for append)
            //data.forEach(element => {}); <-- this works too! (for for loop)
            $('#game').empty();
            holdbadge = [];
            sessionStorage.setItem("gameid",  data[0].gameid)
            for(badges in data){
                holdbadge += `<span class="badge bg-dark me-1">${data[badges].catname}</span>`
            }
            $('#game').append(`
            <div class="col-md-6 mb-4">
                <img src="./img/${data[0].image_url}" class="img-fluid" alt="" />
            </div>
            <!--Grid column-->
        
            <!--Grid column-->
            <div class="col-md-6 mb-4">
                <!--Content-->
                <div class="p-4">
                    <div class="mb-3">
                    <badge>
                    ${holdbadge}
                </badge>
                    </div>
        
                    <p class="lead">
                            ${data[0].title}
                    </p>
        
                    <strong><p style="font-size: 20px;">Description</p></strong>
        
                    <p>${data[0].description}</p>
        
                    <form class="d-flex justify-content-left">
                        <!-- Default input -->
                        <div class="form-outline me-1" style="width: 100px;">
                            <input type="number" value="1" class="form-control" />
                        </div>
                        <button class="btn btn-primary ms-1" type="submit">
                            Add to cart
                            <i class="fas fa-shopping-cart ms-1"></i>
                        </button>
                    </form>
                </div>
                <!--Content-->
            </div>`);
        },
        error: (xhr, status, err) => {
            console.log(err);
            console.log("Failed to pull user data!");
        }
    });
    if(localStorage.length != 0){
        $('#review').append(`
        <section>
        <div class="container my-5 py-5 text-dark">
          <div class="row d-flex justify-content-center">
            <div class="col-md-10 col-lg-8 col-xl-6">
              <div class="card">
                <div class="card-body p-4">
                  <div class="d-flex flex-start w-100">
                    <div class="w-100">
                      <h5>Add a comment</h5>
                      <fieldset class="rating" id="stars">
    <input type="radio" id="star5" name="rating" value="5" class="send"/><label class = "full" for="star5" title="Awesome - 5 stars"></label>
    <input type="radio" id="star4" name="rating" value="4" class="send"/><label class = "full" for="star4" title="Pretty good - 4 stars"></label>
    <input type="radio" id="star3" name="rating" value="3" class="send"/><label class = "full" for="star3" title="Meh - 3 stars"></label>
    <input type="radio" id="star2" name="rating" value="2" class="send"/><label class = "full" for="star2" title="Kinda bad - 2 stars"></label>
    <input type="radio" id="star1" name="rating" value="1" class="send"/><label class = "full" for="star1" title="Sucks big time - 1 star"></label>
</fieldset>
                      <div class="form-outline">
                        <textarea class="form-control" id="textArea" rows="4" maxlength = "200"></textarea>
                      </div>
                      <div class="d-flex justify-content-between mt-3">
                        <button type="button" class="btn btn-primary" id="post">Post</button>
                      </div>
                      <p class="bold text-danger" id="error"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>`)
    }
    $("#post").click(function (){
      if($.trim($('#textarea').val()).length > 0){
      let headers = {
        authorization: 'Bearer ' + localStorage.token
    }
        let data = {
            rating:$('.send:checked').val(),
            content:$('textArea').val(),
            gameid:sessionStorage.getItem("gameid")
        }
        $.ajax({
            headers: headers,
            url: 'http://localhost:8081/review',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            success:(data, status, xhr) => {
              if (!data) {
                console.log(data)
                return;
              }
              console.log(data)
            },
            error: (xhr, status, err) => {
              console.log(err);
            }
          })
          location.reload()
        }
        else {
          $('#error').empty()
          $('#error').append(`No Comment `)
        }
    })
    $.ajax({
      url: 'http://localhost:8081/review/' + sessionStorage.gameid,
      type: 'GET',
      dataType: 'json',
      success:(data, status, xhr) => {
        let tmpHtml = "";
        console.log(data)
        for (const info of data){
          console.log(info)
          if (info.rating === null){
            info.rating = "0"
          }
          tmpHtml +=`
          <div class="mb-3 mt-3">
          <h6 class="fw-bold mb-1 text-capitalize">${info.username}</h6>
          <div class="d-flex align-items-center mb-3">
            <p class="mb-0">
              <span class="badge bg-primary">${info.created_at}</span>
              <span class="badge bg-primary">${info.rating}/5 Rating</span>
            </p>
          </div>
          <p class="mb-0 text-wrap">
            ${info.content}
          </p>
        </div>
</section>
`}
$('#resultreview').append(tmpHtml)
      },
      error:(xhr,err,status) => {

      }
      
    })
})