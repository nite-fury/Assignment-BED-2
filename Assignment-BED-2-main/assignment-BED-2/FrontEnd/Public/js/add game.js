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
                <input class="form-check-input" type="checkbox" value=${data[cat].catid} id=${data[cat].catid}>
                <label class="form-check-label" for=${data[cat].catid}>
                ${data[cat].catname}
                </label>
                </div>
                `
            }
            $('#categories').append(tmphtml)
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
                        <input class="form-check-input" type="checkbox" value="${data[plat].platformid}" id="id_${data[plat].platformid}">
                        <label class="form-check-label" for="${data[plat].platformid}" value="${data[plat].platformid}">
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
                        console.log("#id_"+id)
                        $("#id_"+id).change(()=>{
                            if ($("#id_"+id).is(":checked")){
                                $('#price_'+id).empty()
                                $('#price_'+id).append(`
                                <input type="text" id="price${id}" class="form-control form-control-sm bg-light text-dark" placeholder="Price"/>
                                `)
                            }
                            else if (!$("#id_"+id).is(":checked")){
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
    })
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target).entries());
        console.log(data)
      });
    // $("#add_game").submit((e) => {
        
    //     let loginForm = $(this.serializeArray())
    //     console.log(loginForm)
        
        
        
    //     // $.ajax({    
    //     //     url: 'http://localhost:8081/game',
    //     //     type: 'POST',
    //     //     data: JSON.stringify(data),
    //     //     contentType: 'application/json',
    //     //     dataType: 'json',
    //     //     success: (data,status, xhr) => {
    //     //         if (!data) {
    //     //             $('#msg').text("Failed to submit")
    //     //             return;
    //     //         }
    //     //         location.reload()
    //     //         $('#msg').text("Data has been submitted Successfully!")
    //     //     },
    //     //     error: (xhr, status, err) => {
    //     //         console.log(err);
    //     //         $('#msg').text("Failed to submit")
    //     //     }
    //     // })
    //     e.preventDefault();
    //     return false
    // })
})