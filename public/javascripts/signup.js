
/*
This method is reposnible to recieve username and password from sign up page.
It then opens a new socket.io to connect to the server. it sends the credential to the server.
it will recieve a msg from the server: user added to the system or user already exists in the system.
 */
function sendUserInfo() {
    var socket = io.connect('http://localhost:3003');

    $('#form').submit(function(){
        var credential=[$('#user').val(),$('#psw').val()]
        socket.emit('join', credential);
        return false;
    });

    socket.on('messages', function (data) {
        alert(data);
        window.location.href = '/index';
    });
}