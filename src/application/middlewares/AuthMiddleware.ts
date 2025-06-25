import { Request, Response, NextFunction } from "express";

import { verify } from "jsonwebtoken";

import { IMiddleware } from "../interfaces/IMiddleware";
import { env } from "../config/env";

export class AuthMiddleware implements IMiddleware {
  async handle(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    if (!authorization) response.status(401).json({ error: "Unathorized" });

    try {
      const [bearer, token] = (authorization ?? "").split(" ");

      if (bearer !== "Bearer" || !token) {
        throw new Error();
      }

      const payload = verify(token, env.jwtSecret);
      request.accountId = {
        accountId: payload,
      };
      next();
    } catch {
      response.status(401).json({ error: "Unauthorized" });
    }
  }
}
