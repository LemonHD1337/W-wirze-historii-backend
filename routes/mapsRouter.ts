import MapsController from "../controllers/MapsController";
import { Router } from "express";
import authenticateToken from "../middleware/authenticateToken";

const controller = new MapsController();

const mapsRouter = Router();

mapsRouter.post("/create", authenticateToken, controller.create);
mapsRouter.put("/update/:id", authenticateToken, controller.update);
mapsRouter.delete("/delete/:id", authenticateToken, controller.delete);
mapsRouter.get("/get/all/:era", controller.getAllByEra);
mapsRouter.get("/get/:id", controller.get);

export default mapsRouter;
