import { Router } from "express";
import auth from "../../middlewares/auth";
import { Role } from "../../const/auth.constrain";
import { PostController } from "./post.controller";

const router = Router();

router.get("/", PostController.retrieves);
router.get("/:postId", PostController.retrieve);

router.post("/", auth(Role.user), PostController.insert);

export const PostRouter: Router = router;
