$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:8081/game/desc/'+sessionStorage.priceid,
        type: 'GET',
        dataType: 'json',
        success:(data, status, xhr) => { // will be covered in assignment 2
            // $('value').appendTo('#id'); <-- this works too! (for append)
            //data.forEach(element => {}); <-- this works too! (for for loop)
            console.log(data)
            $('#game').empty();
            holdbadge = [];
            
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
})