function SocketStore()
{
  this.sockets = {};
}

SocketStore.prototype.add = function(socket)
{
  this.sockets[socket.id] = socket;
  return this;
};

SocketStore.prototype.remove = function(socket)
{
  delete this.sockets[socket.id];
  return this;
};

SocketStore.prototype.iterate = function(cb)
{
  var list = Object.keys(this.sockets);
  for(var i = 0; i < list.length; i++)
  {
    cb(this.sockets[list[i]]);
  }
};
