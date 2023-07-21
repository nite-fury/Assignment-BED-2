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
                    for(plat in data){
                        console.log(data[plat])
                        tmphtml += `
                        <div class="form-check mb-1">
                        <input class="form-check-input" type="checkbox" value=${data[plat].platformid} id=${data[plat].platformid}>
                        <label class="form-check-label" for=${data[plat].platformid}>
                        ${data[plat].platform_name}
                        </label>
                        </div>
                        `
                    }
                    $('#platform').append(tmphtml)
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
})