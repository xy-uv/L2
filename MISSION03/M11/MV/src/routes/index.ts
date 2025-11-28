import parser from "../helpers/parser";
import response from "../helpers/response";
import router from "../helpers/route_handler";

router("GET", "/", (_req, res) => {
  response(res, 200, {
    success: true,
    response: "ok",
    message: "Server is running",
  });
});

router("GET", "/health", (_req, res) => {
  response(res, 200, {
    success: true,
    response: "ok",
    message: "Server health is Good!!",
  });
});

router("POST", "/api/users", async (req, res) => {
  const body = await parser(req);
  response(res, 201, {
    success: true,
    response: "ok",
    message: "Data created done!",
    data: body,
  });
});
