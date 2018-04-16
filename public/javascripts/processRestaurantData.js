function displayRestaurant(url) {
    var formArray= $("div ul li div").serializeArray();
    var data={};
    for (index in formArray){
        data[formArray[index].name]= formArray[index].value;
        alert(formArray[index].value);
    }
    // const data = JSON.stringify($(this).serializeArray());

    processData(url, data);
    event.preventDefault();
}

function  processData(url,data) {
    var restID = $(event.target).attr('id');
    alert(restID);
    $.ajax({
        url: url ,
        data: {objectID:restID},
        dataType: 'json',
        type: 'POST',
        success: function (dataR) {
            var content = "";
            for (var i = 0; i < dataR.length; i++) {
                var restaurant = dataR[i];
                var id = restaurant.id;
                var name = restaurant.rest_name;
                var type = restaurant.cusine_type;
                var rank = restaurant.ranking;
                var feed = restaurant.feedback;
                var post = restaurant.postcode;
                var image = restaurant.image;

                content = '<div id="rests" class="w3-bar-item">'
                    +"Restaurant ID: "+id+" "
                    +"Restaurant Name: "+name+" "
                    +"Cusine Type: "+" " +type+" "
                    +"Ranking" + " " + rank+ " "
                    +"Feedback" + " " + feed+ " "
                    +"postcode" + " " + post+ " "
                    +"Image" + " " +image+ "" +
                    '</div>';
                alert(content);


                try{
                    $('RestaurantAbout').append(content);

                    //change div id as a _id
                    //$('#rests').attr('id',id);


                    //var theDiv = document.getElementById('RestaurantAbout');
                    //alert(theDiv);
                    //var content1 = document.createTextNode(content);
                    //theDiv.appendChild(content1);

                    // var contents = document.getElementById('RestaurantAbout');
                    // console.log(contents);
                    //contents.innerHTML="jerry";

                }catch(E){
                    alert(E);
                }
            }
            window.location.href = url;
        }
    });
}