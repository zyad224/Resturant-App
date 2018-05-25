var mapp;
var markers=[];
var userPos;
var pCode;
var nameRest;

function initMap() {
     mapp = new google.maps.Map(document.getElementById('map'), {
         center: {lat: 53.381812, lng: -1.482064},
         zoom: 10,
         mapTypeId: google.maps.MapTypeId.ROADMAP,
         disableDefaultUI: true
    });
    var infoWindow = new google.maps.InfoWindow({map: mapp});
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
             userPos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            infoWindow.setPosition(userPos);
            infoWindow.setContent('You are here.' + '<br>' + position.coords.latitude + '<br>' + position.coords.longitude);
            mapp.setCenter(userPos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    }

}

/*
This is the AJAX responsible to communicate with the index url.
The controller functions  getRest communicate with this
method.
 */
function sendAjaxQuery(url, data) {
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function (dataR) {
            var content = "";
            if(dataR.length==0) {
                alert("no rest");
                console.log('in');

            }
            else {
                $("#ProductList").empty();

                for (var i = 0; i < dataR.length; i++) {
                    var restaurant = dataR[i];
                    for (var j = 0; j < restaurant.length; j++) {

                        var id = restaurant[j]._id;
                        var name = restaurant[j].rest_name;
                        var type = restaurant[j].cusine_type;
                        var rank = restaurant[j].ranking;
                        var feed = restaurant[j].feedback;
                        var post = restaurant[j].postcode;
                        var image = restaurant[j].image;
                        var lat=restaurant[j].lat;
                        var lng=restaurant[j].lng;

                        content= '<li style="background-color: whitesmoke">' +
                            '<form action="/sendInfo" method="post"><input id="id" name="ObjectId" type="hidden" value="'+id+'">'+
                            '<div class="w3-bar-item" id="rests">' +
                            '<span><img src="'+image    +'" align="left" class="w3-bar-item w3-circle w3-hide-small" style="width:85px; height:75px"/></span>'+
                            '<span class="w3-large">'+name+'</span><br>'+
                            '<span>'
                            +"Cusine Type: "+" " +type+" "
                            +"Ranking: " + " " + rank+ " "
                            +"Postcode: " + " " + post+ " "+
                            '</span>'+
                            '</div>' +
                            '<button type="submit" class="button button4">Restaurant Page</button>'+
                            '</form>'+
                            '</li>';
                        //check the id if it does not exist, append
                        if ($("#" + id).length == 0) {
                            $('#ProductList').append(content);
                            //change div id as a _id
                            $('#rests').attr('id', id);
                        }
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


/*
This method recieves the data from the  index url.
It sends the url and data to the sendAjaxQuery function for
AJAX communication.
 */
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



