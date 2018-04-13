var mapp;
var markers=[];
var userPos;
function initMap() {
     mapp = new google.maps.Map(document.getElementById('map'), {
         center: {lat: 53.381812, lng: -1.482064},
         zoom: 10,
         mapTypeId: google.maps.MapTypeId.ROADMAP
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


function map(url, data) {
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function (dataR) {
            var content = "";
            console.log(dataR[0]);
            var pCode= dataR[0];
            var nameRest=dataR[1];

            clearMarkers();
            var userLatLng= new google.maps.LatLng(userPos.lat,userPos.lng);
            var infoWindow=new google.maps.InfoWindow({map:mapp});

           for(var i=0;i<pCode.length;i++){
                var pos = {
                    lat: pCode[i].lat,
                    lng: pCode[i].lng
                };

               var markerLatLng= new google.maps.LatLng(pos.lat,pos.lng);

               var radius=google.maps.geometry.spherical.computeDistanceBetween(userLatLng, markerLatLng);

               if (radius<500){
                var marker = new google.maps.Marker({
                    map: mapp,
                    position: pos
                });
                markers.push(marker);
                   google.maps.event.addListener(marker, 'click', function() {
                       infoWindow.setContent(pCode[i].rest_name);
                       infoWindow.open(mapp, this);
                   });
           }}
            for(var i=0;i<nameRest.length;i++){
                var pos = {
                    lat: nameRest[i].lat,
                    lng: nameRest[i].lng

                };

                console.log(nameRest[i].rest_name);


                var marker = new google.maps.Marker({
                    map: mapp,
                    position: pos
                });
                markers.push(marker);
                    google.maps.event.addListener(marker, 'click', function() {
                        infoWindow.setContent(nameRest[i].rest_name);
                        infoWindow.open(mapp, this);
                    });


           }},
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