// export function for listening to the socket
module.exports = function (socket) {

    // broadcast a message to listeners
    socket.on('send:Message', function (data) {
        socket.broadcast.emit('send:Message', {
            text: data.message
        });
    });

    socket.on('send:StopCount', function (data) {
        console.log(data);
        socket.broadcast.emit('send:stopCount', {
        });
    });

    socket.on('send:StartTimer', function (data) {
        console.log(data.message);
        socket.broadcast.emit('send:StartTimer', {
        });
    });

    socket.on('send:StopTimer', function (data) {
        console.log(data.message);
        socket.broadcast.emit('send:StopTimer', {
        });
    });

    socket.on('send:SetTimer', function (data) {
        socket.broadcast.emit('send:SetTimer', {
            timer_init_val: data.message
        });
    });
};
