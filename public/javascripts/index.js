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
This is the AJAX responsible to communicate with the index and insert urls.
The controller functions insert and getRest and insert communicate with this
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
This is the AJAX responsible to communicate with the getlocation function in the
controller. it recieves restaurants information and plot them on Google Map.
it uses clearMarker to clear all the markers from the map. it also uses the
user location to compute the distance between the user and the restaurants in order
to show restaurants only in certain radius.
 */
function map(url, data) {
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function (dataR) {
            var content = "";
           // console.log(dataR[0]);
          //  console.log(dataR[1]);

             pCode= dataR[0];
             nameRest=dataR[1];
             cusineType=dataR[2];
             var allRest= pCode.concat(nameRest,cusineType);
             console.log(allRest);

            clearMarkers();

            var userLatLng= new google.maps.LatLng(userPos.lat,userPos.lng);


           for(var i=0;i<allRest.length;i++){
                var pos = {
                    lat: allRest[i].lat,
                    lng: allRest[i].lng
                };

               var markerLatLng= new google.maps.LatLng(pos.lat,pos.lng);

               var radius=google.maps.geometry.spherical.computeDistanceBetween(userLatLng, markerLatLng);

               if (radius<1000){
                   var infoWindow=new google.maps.InfoWindow({
                       content: "<form  action=\"/sendInfo\" method=\"post\"><input id=\"id\" name=\"ObjectId\" type=\"hidden\" value="+allRest[i].id+"><button type=\"submit\">Go</button></form>"+"<br>" + allRest[i].rest_name+"<br>" +allRest[i].cusine_type+"<br>"+allRest[i].address
                   });
                var marker = new google.maps.Marker({
                    map: mapp,
                    position: pos
                });
                   marker.addListener( 'click', function() {
                       infoWindow.open(mapp, this);
                   });
                 markers.push(marker);

           }}
           },
        error: function (xhr, status, error) {
            alert('Error: ' + error.message);
        }
    });
}

/*
This is the AJAX responsible to communicate with the sendFeedback function in the
controller. it sends the updated points of a restaurant to the client (html page).
 */
function feedback(url, data) {
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function (dataR) {
            var content = "";
            console.log(dataR);

            //document.getElementById('results').innerHTML = JSON.stringify(ret);
        },
        error: function (xhr, status, error) {
            alert('Error: ' + error.message);
        }
    });
}

function insert(url, data) {
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function (dataR) {
            var content = "";
            //console.log(dataR);

            //document.getElementById('results').innerHTML = JSON.stringify(ret);
        },
        error: function (xhr, status, error) {
            alert('Error: ' + error.message);
        }
    });
}
function clearMarkers(){
    setMapOnAll(null);
}
function setMapOnAll(map){
    for (var i=0;i<markers.length;i++){
        markers[i].setMap(map);
    }
}

/*
This method recieves the data from the insert and index url.
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

<<<<<<< HEAD
function onSubmitInsert(url) {
    var formArray= $("form").serializeArray();
    var data={};
    for (index in formArray){
        data[formArray[index].name]= formArray[index].value;
    }
    // const data = JSON.stringify($(this).serializeArray());
    insert(url, data);
    event.preventDefault();
}

=======
/*
This method recieves the data from /geolocation url.
It sends the url and data to map function for AJAX communication.
 */
>>>>>>> documentation
function onSubmitMap(url) {
    var formArray= $("form").serializeArray();
    var data={};
    for (index in formArray){
        data[formArray[index].name]= formArray[index].value;
    }
    console.log(data);
    // const data = JSON.stringify($(this).serializeArray());
    map(url, data);
    event.preventDefault();
}

/*
This method recieves the data from /sendFeedback url.
It sends the url and data to feedback function for AJAX communication.
 */
function onSubmitFeedback(url) {
    var formArray= $("form").serializeArray();
    var data={};
    for (index in formArray){
        data[formArray[index].name]= formArray[index].value;
    }
    console.log(data);
    // const data = JSON.stringify($(this).serializeArray());
    feedback(url, data);
    event.preventDefault();
}