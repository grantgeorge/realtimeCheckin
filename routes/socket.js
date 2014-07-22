/*
 * Serve content over a socket
 */

module.exports = function (socket) {

  socket.on('send:checkin', function (attendee) {
    socket.broadcast.emit('send:checkin', attendee);
  });

  // broadcast a user's message to other users
  socket.on('send:message', function (message) {
    socket.broadcast.emit('send:message', {
      text: data.message
    });
  });

};