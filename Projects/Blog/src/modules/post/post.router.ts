import { Router } from "express";
import auth from "../../middlewares/auth";
import { Role } from "../../const/auth.constrain";
import { PostController } from "./post.controller";

const router = Router();

router.get("/", PostController.retrieves);
router.get("/:postId", PostController.retrieve);
router.get("/stats", auth(Role.admin), PostController.stats);
router.get("/my-posts", auth(Role.admin, Role.user), PostController.myPosts);

router.post("/", auth(Role.user), PostController.insert);

router.patch("/:postId", auth(Role.admin, Role.user), PostController.modify);

router.delete("/:postId", auth(Role.admin, Role.user), PostController.destroy);

export const PostRouter: Router = router;
