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
           // var content = "";
            //console.log(dataR);
            //document.getElementById('results').innerHTML = JSON.stringify(ret);
            window.location.href="/index";
        },
        error: function (xhr, status, error) {
            alert('Error: ' + error.message);
        }
    });
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
    //const data = JSON.stringify($(this).serializeArray());
    feedback(url, data);
    event.preventDefault();
}