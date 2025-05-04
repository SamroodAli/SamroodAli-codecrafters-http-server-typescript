export function requestParser(request: string): {
  version: string;
  path: string;
  method: string;
} {
  const requestLines = request.split("\r\n");
  const [method, path, version] = requestLines[0].split(" ");

  return {
    version,
    path,
    method,
  };
}
