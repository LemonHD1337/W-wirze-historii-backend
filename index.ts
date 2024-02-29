import express, { Express, Request, Response } from "express";

//middleware imports
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";

//import controllers
import register from "./controllers/registerController";
import login from "./controllers/loginController";
import {
  deleteAccount,
  getUserInfo,
  updateUserInfo,
  updateUserPassword,
} from "./controllers/userController";

import {
  getRecordForGuessDate,
  insertDataForGuessDate,
  getDataForGuessDate,
  getRecordGuessDateById,
  updateDataGuessDate,
} from "./controllers/guessDateController";
import {
  addContentHistoricalFigures,
  getContentHistoricalFigures,
  getInfoHistoricalFigure,
  searchHistoricalFigure,
  deleteHistoricalFigure,
} from "./controllers/historicalFiguresController";
import {
  deleteMap,
  getMaps,
  createMap,
  getMapById,
  updateMapById,
} from "./controllers/mapController";

import {
  createEvent,
  deleteEvent,
  getEventsByEra,
  getEvents,
  getEventById,
  searchEvents,
} from "./controllers/eventsController";

import {
  addWaypoint,
  getWaypoints,
  deleteWaypointById,
} from "./controllers/waypointsController";

//init server
const PORT: number = 8080;
const app: Express = express();
app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});

//middlewares
app.use(express.static("uploads"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 1000000000 } });

//routes
app.get("/", (req: Request, res: Response) => {
  res.send("serwer działa");
});

app.get("/uploads");

//user api
app.post("/register", register);
app.post("/login", login);
app.post("/user/get", getUserInfo);
app.put("/user/update", updateUserInfo);
app.put("/user/update/password", updateUserPassword);
app.delete("/user/delete/:id", deleteAccount);

//guess date game api
app.get("/guessDate/getRecord", getRecordForGuessDate);
app.post("/guessDate/getRecord", getRecordGuessDateById);
app.get("/guessDate/getData", getDataForGuessDate);
app.post("/guessDate/updateData", updateDataGuessDate);
app.post("/guessDate/insertData", insertDataForGuessDate);

//historical figures api
app.post(
  "/add/historicalFigures",
  upload.fields([
    { name: "pic", maxCount: 1 },
    { name: "doc", maxCount: 1 },
  ]),
  addContentHistoricalFigures
);
app.get("/get/historicalFigures", getContentHistoricalFigures);
app.get("/get/historicalFiguresInfo/:id", getInfoHistoricalFigure);
app.post("/get/historicalFiguresInfo/search", searchHistoricalFigure);
app.post("/delete/historicalFigure", deleteHistoricalFigure);

//map api
app.post("/map/get", getMaps);
app.post("/map/create", createMap);
app.delete("/map/delete/:id", deleteMap);
app.get("/map/get/:id", getMapById);
app.put("/map/get/:id", updateMapById);

//events api
app.post(
  "/all/event/create",
  upload.fields([
    { name: "pic", maxCount: 1 },
    { name: "doc", maxCount: 1 },
  ]),
  createEvent
);
app.delete("/all/event/delete/:id", deleteEvent);
app.get("/all/events", getEvents);
app.post("/all/events", getEventsByEra);
app.get("/all/event/:id", getEventById);
app.post("/all/events/search", searchEvents);

//waypoints api
app.post("/map/addWaypoint", addWaypoint);
app.get("/map/getWaypoints/:id", getWaypoints);
app.delete("/map/deleteWaypoint/:id", deleteWaypointById);
