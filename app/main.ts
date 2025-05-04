import * as net from "net";
import { requestParser } from "./http/parser";
import { routes } from "./routes";

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const request = data.toString();

    const requestObject = requestParser(request);

    console.log(requestObject);
    const controller = routes[requestObject.method + " " + requestObject.path];

    let response = "";
    if (typeof controller === "function") {
      response = controller(requestObject);
    }

    if (response) {
      socket.write(response);
    } else {
      socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
    }

    return socket.end();
  });
});

server.listen(4221, "localhost");
console.log("Server started listening on port http://localhost:4221");
