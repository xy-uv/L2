import { Router } from "express";
import { UserControllers } from "./user.controller";

const router = Router();

router.post("/", UserControllers.insert);
router.get("/", UserControllers.read);
router.get("/:id", UserControllers.single);
router.patch("/:id", UserControllers.update);
router.delete("/:id", UserControllers.remove);

export const UserRouter = router;
