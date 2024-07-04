import express from "express";
import upload from "../services/multer";
import HistoricalFiguresController from "../controllers/HistoricalFiguresController";

const controller = new HistoricalFiguresController();

const historicalFiguresRouter = express.Router();

const multerSave = upload.fields([
  { name: "pic", maxCount: 1 },
  { name: "doc", maxCount: 1 },
]);

historicalFiguresRouter.post("/create", multerSave, controller.create);
historicalFiguresRouter.get("/get/all", controller.getAll);
historicalFiguresRouter.get("/get/:id", controller.get);
historicalFiguresRouter.get("/page", controller.paginated);
historicalFiguresRouter.get("/search", controller.search);
historicalFiguresRouter.delete("/delete/:id", controller.delete);

export default historicalFiguresRouter;
