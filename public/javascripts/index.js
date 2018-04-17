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

                    content = '<ul class="form-wrapper">' +
                        '<li class="w3-bar">' +
                        '<form  action="/sendInfo" method="post"><input id="id" name="ObjectId" type="hidden" value="'+id+'"><button type="submit">Go</button>'+
                        '<div id="rests" >'
                        +"Restaurant ID: "+id+" "
                        +"Restaurant Name: "+name+" "
                        +"Cusine Type: "+" " +type+" "
                        +"Ranking" + " " + rank+ " "
                        +"Feedback" + " " + feed+ " "
                        +"postcode" + " " + post+ " "
                        +"Image" + " " +image+ "" +
                        '</div></form></li></ul>';
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

               if (radius<500){
                   var infoWindow=new google.maps.InfoWindow({
                       content: "<form  action=\"/sendInfo\" method=\"post\"><input id=\"id\" name=\"ObjectId\" type=\"hidden\" value="+allRest[i].id+"><button type=\"submit\">Go</button></form>"+"<br>" + allRest[i].rest_name+"<br>" +allRest[i].cusine_type+"<br>"+allRest[i].telephone+"<br>"+allRest[i].address
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

function clearMarkers(){
    setMapOnAll(null);
}
function setMapOnAll(map){
    for (var i=0;i<markers.length;i++){
        markers[i].setMap(map);
    }
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