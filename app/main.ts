import * as net from "net";
import { requestParser } from "./http/parser";
import { routes } from "./routes";

function recurser(path: string, acc = {}) {
  console.log(path, acc);
  if (path === "") return;

  console.log(path);
  const slashSplit = path.split("/");
  console.log(slashSplit);
  const parent = slashSplit[0];
  const rest = slashSplit.slice(1).join("/");
  console.log(parent);
  console.log(rest);
  return recurser(rest);
}

const routeMatcher = (completePath: string) => {
  // const [reqMethod, reqPath] = completePath.split(" ");

  const allRoutes = Object.keys(routes);
  allRoutes.forEach((route) => {
    const [method, path] = route.split(" ");
    recurser(path);
  });
};

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    const request = data.toString();

    const requestObject = requestParser(request);

    const controller = routes[requestObject.method + " " + requestObject.path];

    routeMatcher(requestObject.method + " " + requestObject.path);
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

routeMatcher("GET /echo/abc");
