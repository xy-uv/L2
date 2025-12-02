import { Router } from "express";

const router = Router();

type IModuleRouter = { path: string; route: Router };

const modules: IModuleRouter[] = [];

modules.forEach((module) => router.use(module.path, module.route));

export default router;
