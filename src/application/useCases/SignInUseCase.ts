import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { prismaClient } from "../lib/prismaClient";
import { InvalidCredentials } from "../errors/InvalidCredentials";
import { env } from "../config/env";

interface IINput {
  email: string;
  password: string;
}

interface IOutput {
  acessToken: string;
}

export class SignInUseCase {
  async execute(input: IINput): Promise<IOutput> {
    const { email, password } = input;

    const account = await prismaClient.account.findUnique({ where: { email } });

    if (!account) {
      throw new InvalidCredentials("Invalid credentials");
    }

    const isPasswordValid = await compare(password, account.password);

    if (!isPasswordValid) {
      throw new InvalidCredentials("Invalid credentials");
    }

    const acessToken = sign({ sub: account.id }, env.jwtSecret, {
      expiresIn: "7d",
    });

    return { acessToken };
  }
}
