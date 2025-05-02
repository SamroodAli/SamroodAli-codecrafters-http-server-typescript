import * as net from "net";

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const request = data.toString();

    const requestLines = request.split("\r\n");
    const [_, path, __] = requestLines[0].split(" ");

    console.log(path);
    switch (path) {
      case "/": {
        socket.write("HTTP/1.1 200 OK\r\n\r\n");
        break;
      }
      default:
        {
          socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
        }
        socket.end();
    }
  });
});

server.listen(4221, "localhost");
