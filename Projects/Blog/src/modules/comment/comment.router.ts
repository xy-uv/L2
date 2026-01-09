import { Router } from "express";
import { CommentController } from "./comment.controller";
import auth from "../../middlewares/auth";
import { Role } from "../../const/auth.constrain";

const router = Router();

router.get("/author/:authorId", CommentController.retrieveByAuthor);
router.get("/:commentId", CommentController.retrieve);

router.post("/", auth(Role.admin, Role.user), CommentController.insert);

router.delete(
  "/:commentId",
  auth(Role.user, Role.admin),
  CommentController.destroy
);

router.patch(
  "/:commentId",
  auth(Role.user, Role.admin),
  CommentController.modify
);

export const commentRouter: Router = router;
