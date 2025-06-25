import express from "express";

import { routeAdapter } from "./adapters/routeAdapter";

import { makeSignUpController } from "../factories/SignUp/makeSignUpController";
import { makeSignInController } from "../factories/SignIn/makeSignInController";
import { makeListUsersController } from "../factories/Users/makeListUsersController";

import { makeAuthMiddleware } from "../factories/Middlewares/makeAuthMiddleware";

const app = express();

app.use(express.json());

app.post("/sign-up", routeAdapter(makeSignUpController()));
app.post("/sign-in", routeAdapter(makeSignInController()));

app.get(
  "/users",
  makeAuthMiddleware(),
  routeAdapter(makeListUsersController())
);

app.listen(3001, () => {
  console.log("🔥 Server started at http://localhost:3001");
});
