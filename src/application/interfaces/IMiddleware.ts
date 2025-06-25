import { NextFunction, Request, Response } from "express";

export interface IData {
  accountId: Record<string, string>;
}

export interface IMiddleware {
  handle(request: Request, response: Response, next: NextFunction);
}
