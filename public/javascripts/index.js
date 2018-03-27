function sendAjaxQuery(url, data) {
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function (dataR) {
            // no need to JSON parse the result, as we are using
            // dataType:json, so JQuery knows it and unpacks the
            // object for us before returning it
            var ret = dataR;

            // in order to have the object printed by alert
            // we need to JSON stringify the object

            $.each(ret,function(i,j){

                content = '<ul class="w3-ul w3-card-4"><li class="w3-bar">' +
                    '<span class="w3-bar-item w3-button w3-white w3-xlarge w3-right">+</span>' +
                    '<img src="Images/img_avatar2.png" class="w3-bar-item w3-circle w3-hide-small" style="width:85px">' +
                    '<div id="ProductList" class="w3-bar-item"><span class="w3-large">'
                    +"Restaurant Name: "+j[i].rest_name+" "
                    +"Cusine Type: "+" " +j[i].cusine_type+" "
                    +"Ranking" + " " + j[i].ranking + " "
                    +"Feedback" + " " + j[i].feedback + " "
                    +"postcode" + " " + j[i].postcode + " "
                    +"Image" + " " + j[i].image + "" +
                    '</span>'+'</div></li></ul>';
                $('#ProductList').append(content);
            });

           //document.getElementById('results').innerHTML = JSON.stringify(ret);
        },
        error: function (xhr, status, error) {
            alert('Error: ' + error.message);
        }
    });
}

function onSubmit(url) {
    var formArray= $("form").serializeArray();
    var data={};
    for (index in formArray){
        data[formArray[index].name]= formArray[index].value;
    }
    // const data = JSON.stringify($(this).serializeArray());
    sendAjaxQuery(url, data);
    event.preventDefault();
}

