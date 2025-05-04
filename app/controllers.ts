import type { Request } from "./types";

export const getRoot = () => {
  return "HTTP/1.1 200 OK\r\n\r\n";
};

export const getEcho = (req: Request) => {
  console.log("I reached echo controller", req);
  return;
};
