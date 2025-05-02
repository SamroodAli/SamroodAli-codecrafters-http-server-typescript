import * as net from "net";

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  socket.on("ready", () => {
    socket.write("HTTP 1.1 OK\r\n\r\n");
  });

  socket.on("close", () => {
    socket.end();
  });
});

server.listen(4221, "localhost");
