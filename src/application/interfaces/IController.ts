export interface IRequest {
  body?: Record<string, any>;
  headers?: Record<string, any>;
  accountId?: string | undefined;
}

export interface IResponse {
  statusCode: number;
  body?: Record<string, any | null> | null;
}

export interface IController {
  handle(request: IRequest): Promise<IResponse>;
}
