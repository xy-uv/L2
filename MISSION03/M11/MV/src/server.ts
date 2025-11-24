import http, { IncomingMessage, Server, ServerResponse } from "http";

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {}
);

server.listen(5000, () => {
  console.log(`Server is listening on port ${5000}`);
});
