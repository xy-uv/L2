import { Router } from "express";
import { CommentController } from "./comment.controller";
import auth from "../../middlewares/auth";
import { Role } from "../../const/auth.constrain";

const router = Router();

router.post("/", auth(Role.admin, Role.user), CommentController.insert);

export const commentRouter: Router = router;
