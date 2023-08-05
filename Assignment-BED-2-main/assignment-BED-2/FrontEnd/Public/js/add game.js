// name: lennon su chee
// class: DISM/FT/2A/02
// Admin no.: 2238801
$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:8081/gamecat',
        type: 'GET',
        dataType: 'json',
        success:(data, status, xhr) => {
            $('#categories').empty();
            tmphtml = []
            for(cat in data){
                console.log(data[cat])
                tmphtml += `
                <div class="form-check mb-1">
                <input class="form-check-input cat" type="checkbox" form="add_game" value=${data[cat].catid} id="catid_${data[cat].catid}">
                <label class="form-check-label" for=${data[cat].catid}>
                ${data[cat].catname}
                </label>
                </div>
                `
            }
            $('#categories').append(tmphtml)
            // Use .each() to iterate through each element with the class "form-check-input"
            $.ajax({
                url: 'http://localhost:8081/gameplat',
                type: 'GET',
                dataType: 'json',
                success:(data, status, xhr) => {
                    $('#platform').empty();
                    tmphtml = []
                    platid = []
                    for(plat in data){
                        console.log(data[plat])
                        tmphtml += `
                        <div class="form-check mb-1">
                        <input class="form-check-input plat" type="checkbox" form="add_game" value=${data[plat].platformid} id="platid_${data[plat].platformid}">
                        <label class="form-check-label" for="${data[plat].platformid}" value=platid${data[plat].platformid}>
                        ${data[plat].platform_name}
                        </label>
                        <main id="price_${data[plat].platformid}">
                        </main>
                        </div>
                        `
                        platid.push(data[plat].platformid)
                    }
                    $('#platform').append(tmphtml)
                    platid.forEach((id)=> {
                        console.log("#platid_"+id)
                        $("#platid_"+id).change(()=>{
                            if ($("#platid_"+id).is(":checked")){
                                $('#price_'+id).empty()
                                $('#price_'+id).append(`
                                <input type="number" class="priceval form-control form-control-sm bg-light text-dark"id="price${id}" form="add_game" class="form-control form-control-sm bg-light text-dark" placeholder="Price"/>
                                `)
                            }
                            else if (!$("#platid_"+id).is(":checked")){
                                $('#price_'+id).empty()
                            }
                        })

                    })
                },
                error: (xhr,status, err) => {
                    console.log(err);
                    console.log("Failed to pull cat data!");
                }
            })
        },
        error: (xhr, status, err) => {
            console.log(err);
            console.log("Failed to pull cat data!");
        }
    });
    $("#add_game").submit((e) => {
        e.preventDefault()
        cat = []
        plat = []
        platprice = []
        console.log($('#title').val())
        console.log($('#desc').val())
        console.log($('#year').val())
        $('.cat:checked').each(function() {
            var checkboxId = $(this).attr('id');    
            var parts = checkboxId.split('_');
            var pureid = parts[1]; 
            console.log(pureid);
            cat.push(pureid)
          });
          $('.plat:checked').each(function() {
            var checkboxId = $(this).attr('id');   
            var parts = checkboxId.split('_');
            var pureid = parts[1]; 
            console.log(pureid);
            plat.push(pureid)
          });
        $(".priceval").each(function() {
            var checkboxId = $(this).attr('id');    
            console.log(checkboxId +"|"+$("#"+checkboxId).val());
            if ($("#"+checkboxId).val().length != 0){
                platprice.push($("#"+checkboxId).val());
            }

        });        
        let data = {
            title: $('#title').val(),
            desc: $('#desc').val(),
            year: $('#year').val(),
            cat: cat,
            plat: plat,
            platprice: platprice
        }
        console.log(JSON.stringify(data))
        if (platprice.length != plat.length){
            $('#msg').text("Failed to submit")
        }
        else if (cat.length === 0){
            $('#msg').text("Failed to submit")
        }
        else if (plat.length === 0 ){
            $('#msg').text("Failed to submit")
        }
        else{
        let headers = {
            authorization: 'Bearer ' + localStorage.token
        }
        console.log(headers)
        $.ajax({    
            headers: headers,
            url: 'http://localhost:8081/game',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            success: (data,status, xhr) => {
                if (!data) {
                    $('#msg').text("Failed to submit")
                    return;
                }
                $('#msg').text("Data has been submitted Successfully!")
            },
            error: (xhr, status, err) => {
                console.log(err);
                $('#msg').text("Failed to submit")
            }
        })
        }
        return false;
    })
})