import { Router } from "express";
import GuessDateController from "../controllers/GuessDateController";

const controller = new GuessDateController();

const guessDateRouter = Router();

guessDateRouter.post("/create", controller.create);
guessDateRouter.get("/get/random", controller.getRandom);
guessDateRouter.get("/get/all", controller.getAll);
guessDateRouter.get("/get/:id", controller.get);
guessDateRouter.put("/update/:id", controller.update);

export default guessDateRouter;
