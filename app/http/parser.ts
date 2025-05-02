export function requestParser(request: string): {
  version: string;
  path: string;
  method: string;
} {
  const requestLines = request.split("\r\n");
  const [version, path, method] = requestLines[0].split(" ");

  return {
    version,
    path,
    method,
  };
}
