import { IController, IRequest, IResponse } from "../interfaces/IController";

export class ListUsersController implements IController {
  async handle(request: IRequest): Promise<IResponse> {
    return {
      statusCode: 200,
      body: {
        users: [
          { id: "1", name: "Lucas" },
          { id: "2", name: "Isabella" },
          { id: "3", name: "Gabriel" },
        ],
      },
    };
  }
}
