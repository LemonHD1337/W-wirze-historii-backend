import { Router } from "express";
import WaypointsController from "../controllers/WaypointsController";
import authenticateToken from "../middleware/authenticateToken";

const controller = new WaypointsController();

const waypointsRouter = Router();

waypointsRouter.post("/create", authenticateToken, controller.create);
waypointsRouter.get("/get/all/:mapId", controller.getAllByMap);
waypointsRouter.delete("/delete/:id", authenticateToken, controller.delete);

export default waypointsRouter;
