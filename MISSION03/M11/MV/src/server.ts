import http, { IncomingMessage, Server, ServerResponse } from "http";
import variable from "./config";

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {}
);

server.listen(variable.port, () => {
  console.log(`Server is listening on port ${variable.port}`);
});
