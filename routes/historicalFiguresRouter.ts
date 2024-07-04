import express from "express";
import upload from "../services/multer";
import HistoricalFiguresController from "../controllers/HistoricalFiguresController";
import authenticateToken from "../middleware/authenticateToken";

const controller = new HistoricalFiguresController();

const historicalFiguresRouter = express.Router();

const multerSave = upload.fields([
  { name: "pic", maxCount: 1 },
  { name: "doc", maxCount: 1 },
]);

historicalFiguresRouter.post(
  "/create",
  authenticateToken,
  multerSave,
  controller.create,
);
historicalFiguresRouter.get("/get/all", controller.getAll);
historicalFiguresRouter.get("/get/:id", controller.get);
historicalFiguresRouter.get("/page", controller.paginated);
historicalFiguresRouter.get("/search", controller.search);
historicalFiguresRouter.delete(
  "/delete/:id",
  authenticateToken,
  controller.delete,
);

export default historicalFiguresRouter;
