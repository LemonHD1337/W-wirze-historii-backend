import { Router } from "express";
import UsersController from "../controllers/UserController";

const controller = new UsersController();

const usersRouter = Router();

usersRouter.get("/get/:id", controller.getDetails);
usersRouter.put("/update/:id", controller.updateDetails);
usersRouter.put("/update/password/:id", controller.updatePassword);
usersRouter.delete("/delete/:id", controller.delete);
usersRouter.post("/register", controller.register);
usersRouter.post("/login", controller.login);
usersRouter.post("/check/e-mail", controller.checkEmail);
usersRouter.post("/check/code", controller.checkCode);
usersRouter.get("/refresh/token", controller.refreshToken);

export default usersRouter;
