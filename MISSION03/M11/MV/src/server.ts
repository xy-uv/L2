import http, { IncomingMessage, Server, ServerResponse } from "http";
import variable from "./config";
import { routes, TRouteHandler } from "./helpers/route_handler";
import "./routes";

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method?.toUpperCase() || "";
    const path = req.url || "";
    const map = routes.get(method);
    const handler: TRouteHandler | undefined = map?.get(path);

    if (handler) {
      handler(req, res);
    } else {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          success: false,
          message: "Request url not found",
          path_url: path,
        })
      );
    }

    //   if (req.method === "GET" && req.url === "/") {
    //     res.writeHead(200, { "Content-Type": "application/json" });
    //     res.end(JSON.stringify({ message: "Hello, World!" }));
    //   }
    //   if (req.method === "GET" && req.url === "/status") {
    //     res.writeHead(200, { "Content-Type": "application/json" });
    //     res.end(JSON.stringify({ status: "OK" }));
    //   }
    //   if (req.method === "POST" && req.url === "/echo") {
    //     let body = "";
    //     req.on("data", (chunk) => {
    //       body += chunk;
    //     });
    //     req.on("end", () => {
    //       res.writeHead(200, { "Content-Type": "application/json" });
    //       res.end(JSON.stringify({ echo: body }));
    //     });
    //   }
  }
);

server.listen(variable.port, () => {
  console.log(`Server is listening on port ${variable.port}`);
});
