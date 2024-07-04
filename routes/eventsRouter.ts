import express from "express";
import upload from "../services/multer";
import EventsController from "../controllers/EventsController";
import authenticateToken from "../middleware/authenticateToken";

const controller = new EventsController();

const eventsRouter = express.Router();

const multerSave = upload.fields([
  { name: "pic", maxCount: 1 },
  { name: "doc", maxCount: 1 },
]);

eventsRouter.post("/create", authenticateToken, multerSave, controller.create);
eventsRouter.delete("/delete/:id", authenticateToken, controller.delete);
eventsRouter.get("/get/all/:era", controller.getEventByEra);
eventsRouter.get("/get/:id", controller.get);
eventsRouter.get("/search", controller.search);
eventsRouter.get("/page", controller.paginated);

export default eventsRouter;
