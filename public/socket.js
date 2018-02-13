var socket = io.connect();

socket.on('status', function (data) {
    console.log(data.status);
    $(".status").text("Status: " + data.status);
});
