import { Router } from "express";
import GuessDateController from "../controllers/GuessDateController";
import authenticateToken from "../middleware/authenticateToken";

const controller = new GuessDateController();

const guessDateRouter = Router();

guessDateRouter.post("/create", authenticateToken, controller.create);
guessDateRouter.get("/get/random", controller.getRandom);
guessDateRouter.get("/get/all", controller.getAll);
guessDateRouter.get("/get/:id", controller.get);
guessDateRouter.put("/update/:id", authenticateToken, controller.update);

export default guessDateRouter;
