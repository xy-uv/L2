import { Router } from "express";
import { TodoControllers } from "./todo.controller";

const router = Router();

router.post("/", TodoControllers.insert);
router.get("/", TodoControllers.retrieves);
router.get("/:id", TodoControllers.retrieve);
router.patch("/:id", TodoControllers.modify);
router.delete("/:id", TodoControllers.destroy);

export const TodoRouter = router;
