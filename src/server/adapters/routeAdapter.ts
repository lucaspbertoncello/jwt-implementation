import { Request, Response } from "express";
import { IController } from "../../application/interfaces/IController";

export function routeAdapter(controller: IController) {
  return async (request: Request, response: Response) => {
    const { statusCode, body } = await controller.handle({
      body: request.body,
      headers: request.headers,
      accountId: request.accountId?.sub,
    });

    response.status(statusCode).json(body);
  };
}
