import { Router } from "express";
import { UserRouter } from "../modules/user/user.routes";
import { TodoRouter } from "../modules/todo/todo.route";

const router = Router();

type IModuleRouter = { path: string; route: Router };

const modules: IModuleRouter[] = [
  {
    path: "/users",
    route: UserRouter,
  },
  {
    path: "/todos",
    route: TodoRouter,
  },
];

modules.forEach((module) => router.use(module.path, module.route));

export default router;
