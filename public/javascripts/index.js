function sendAjaxQuery(url, data) {
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function (dataR) {
            var content = "";
            $("#ProductList").empty();

            for (var i = 0; i < dataR.length; i++) {
                var restaurant = dataR[i];
                for(var j = 0; j < restaurant.length; j++){

                    var id = restaurant[j]._id;
                    var name = restaurant[j].rest_name;
                    var type  = restaurant[j].cusine_type;
                    var rank = restaurant[j].ranking;
                    var feed = restaurant[j].feedback;
                    var post = restaurant[j].postcode;
                    var image = restaurant[j].image;

                    content = '<ul class="w3-ul w3-card-4">' +
                        '<li class="w3-bar">' +
                        '<div id="rests" class="w3-bar-item">'
                        +"Restaurant ID: "+id+" "
                        +"Restaurant Name: "+name+" "
                        +"Cusine Type: "+" " +type+" "
                        +"Ranking" + " " + rank+ " "
                        +"Feedback" + " " + feed+ " "
                        +"postcode" + " " + post+ " "
                        +"Image" + " " +image+ "" +
                        '</div></li></ul>';
                    //check the id if it does not exist, append
                    if($("#" + id).length == 0) {
                        $('#ProductList').append(content);
                        //change div id as a _id
                        $('#rests').attr('id',id);
                    }
               }
            }
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

