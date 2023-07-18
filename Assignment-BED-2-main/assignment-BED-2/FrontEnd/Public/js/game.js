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
            console.log(data)
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
    <input type="radio" id="star4half" name="rating" value="4.5" class="send"/><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>
    <input type="radio" id="star4" name="rating" value="4" class="send"/><label class = "full" for="star4" title="Pretty good - 4 stars"></label>
    <input type="radio" id="star3half" name="rating" value="3.5" class="send"/><label class="half" for="star3half" title="Meh - 3.5 stars"></label>
    <input type="radio" id="star3" name="rating" value="3" class="send"/><label class = "full" for="star3" title="Meh - 3 stars"></label>
    <input type="radio" id="star2half" name="rating" value="2.5" class="send"/><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>
    <input type="radio" id="star2" name="rating" value="2" class="send"/><label class = "full" for="star2" title="Kinda bad - 2 stars"></label>
    <input type="radio" id="star1half" name="rating" value="1.5" class="send"/><label class="half" for="star1half" title="Meh - 1.5 stars"></label>
    <input type="radio" id="star1" name="rating" value="1" class="send"/><label class = "full" for="star1" title="Sucks big time - 1 star"></label>
    <input type="radio" id="starhalf" name="rating" value="0.5" class="send"/><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>
</fieldset>
                      <div class="form-outline">
                        <textarea class="form-control" id="textArea" rows="4" maxlength = "200"></textarea>
                      </div>
                      <div class="d-flex justify-content-between mt-3">
                        <button type="button" class="btn btn-primary" id="post">Post</button>
                      </div>
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
        store = JSON.parse(localStorage.userData)
        console.log(store[0].userid)
        let data = {
            userid:store[0].userid,
            rating:$('.send:checked').val(),
            content:$('textArea').val(),
            gameid:sessionStorage.getItem("gameid")
        }
        $.ajax({
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
          return false;
    })
})