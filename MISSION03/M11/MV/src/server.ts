import http, { IncomingMessage, Server, ServerResponse } from "http";
import variable from "./config";

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "GET" && req.url === "/") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Hello, World!" }));
    }
    if (req.method === "GET" && req.url === "/status") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "OK" }));
    }
    if (req.method === "POST" && req.url === "/echo") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ echo: body }));
      });
    }
  }
);

server.listen(variable.port, () => {
  console.log(`Server is listening on port ${variable.port}`);
});
