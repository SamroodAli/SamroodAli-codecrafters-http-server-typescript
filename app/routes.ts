import { getEcho, getRoot } from "./controllers";

export const routes: Record<string, any> = {
  "GET /": getRoot,
  "GET /echo/{str}": getEcho,
};
