// name: lennon su chee
// class: DISM/FT/2A/02
// Admin no.: 2238801
$(document).ready(() => {
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
              tmpHtml += `<p>${index.platform_name}</p>`
              platid.push(index.platformid)
            }
            $('#result').append(tmpHtml)
    },
    error: (xhr, status, err) => {
        console.log(err);
        console.log("Failed to pull platform data!");
    }
});
$("#add_plat").submit((e) => {
    e.preventDefault()
    let data = {
        platform_name:$('#title').val(),
        description:$('#Description').val()
    }
    let headers = {
        authorization: 'Bearer ' + localStorage.token
    }
    $.ajax({
        headers: headers,
        url: 'http://localhost:8081/platform',
        type:'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
        success: (data,status, xhr) => {
            if(!data){
                $('#msg').text("Failed to submit")
                return;
            }
            $('#msg').text("Data has been submitted Successfully!")
        },
        error: (xhr, status, err) => {
            console.log("failed here")
            console.log(JSON.stringify(status))
            console.log(JSON.stringify(err))
            $('#msg').text("Failed to submit")
        }
    })
});
})