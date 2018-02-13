var socket = io.connect();

socket.on('status', function (data) {
    console.log(data.status);
});

// const changeStatus = function(){
//     socket.emit('status', { data: 'data' });
// };
//
// setInterval(changeStatus, 5000);
