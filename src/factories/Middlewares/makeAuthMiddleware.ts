import { AuthMiddleware } from "../../application/middlewares/AuthMiddleware";

export function makeAuthMiddleware() {
  return new AuthMiddleware().handle;
}
