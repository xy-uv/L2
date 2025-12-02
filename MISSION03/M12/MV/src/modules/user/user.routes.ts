import { Router } from "express";
import { UserControllers } from "./user.controller";

const router = Router();

router.post("/", UserControllers.create);
router.get("/", UserControllers.read);
router.get("/:id", UserControllers.single);

export const UserRouter = router;
