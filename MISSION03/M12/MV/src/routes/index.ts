import { Router } from "express";
import { UserRouter } from "../modules/user/user.routes";

const router = Router();

type IModuleRouter = { path: string; route: Router };

const modules: IModuleRouter[] = [
  {
    path: "/users",
    route: UserRouter,
  },
];

modules.forEach((module) => router.use(module.path, module.route));

export default router;
