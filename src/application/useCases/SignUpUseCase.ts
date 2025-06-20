import { hash } from "bcryptjs";
import { prismaClient } from "../lib/prismaClient";
import { AccountAlreadyExists } from "../errors/AccountAlreadyExists";

interface IINput {
  name: string;
  email: string;
  password: string;
}

type IOutput = void;

export class SignUpUseCase {
  async execute(input: IINput): Promise<IOutput> {
    const { name, email, password } = input;

    const accountAlreadyExists = await prismaClient.account.findUnique({
      where: { email },
    });

    if (accountAlreadyExists) {
      throw new AccountAlreadyExists("This e-mail is already in use");
    }

    const hashedPassword = await hash(password, 12);

    await prismaClient.account.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }
}
