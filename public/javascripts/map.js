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
This method recieves the data from /geolocation url.
It sends the url and data to map function for AJAX communication.
 */

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

function clearMarkers(){
    setMapOnAll(null);
}
function setMapOnAll(map){
    for (var i=0;i<markers.length;i++){
        markers[i].setMap(map);
    }
}