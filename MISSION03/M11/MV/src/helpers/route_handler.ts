import { IncomingMessage, ServerResponse } from "http";

export type TRouteHandler = (req: IncomingMessage, res: ServerResponse) => void;

export const routes: Map<string, Map<string, TRouteHandler>> = new Map();

function router(method: string, path: string, handler: TRouteHandler) {
  if (!routes.has(method)) routes.set(method, new Map());
  routes.get(method)!.set(path, handler);
}

export default router;
