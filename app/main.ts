import * as net from "net";
import { requestParser } from "./http/parser";

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const request = data.toString();

    const { path } = requestParser(request);

    const responses: Record<string, any> = {
      "/": "HTTP/1.1 200 OK\r\n\r\n",
    };

    const response = responses[path];

    if (response) {
      socket.write(response);
    } else {
      socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
    }

    return socket.end();
  });
});

server.listen(4221, "localhost");
