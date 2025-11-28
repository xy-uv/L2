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
