import MapsController from "../controllers/MapsController";
import { Router } from "express";

const controller = new MapsController();

const mapsRouter = Router();

mapsRouter.post("/create", controller.create);
mapsRouter.put("/update/:id", controller.update);
mapsRouter.delete("/delete/:id", controller.delete);
mapsRouter.get("/get/all/:era", controller.getAllByEra);
mapsRouter.get("/get/:id", controller.get);

export default mapsRouter;
