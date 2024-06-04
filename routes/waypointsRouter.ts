import {Router} from "express";
import WaypointsController from "../controllers/WaypointsController";

const controller = new WaypointsController()

const waypointsRouter = Router()

waypointsRouter.post("/create", controller.create)
waypointsRouter.get("/get/all/:mapId", controller.getAllByMap)
waypointsRouter.delete("/delete/:id", controller.delete)

export default waypointsRouter