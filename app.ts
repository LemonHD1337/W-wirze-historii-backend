import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

//router imports
import eventsRouter from "./routes/eventsRouter";
import historicalFiguresRouter from "./routes/historicalFiguresRouter";
import guessDateRouter from "./routes/guessDateRouter";
import waypointsRouter from "./routes/waypointsRouter";
import mapsRouter from "./routes/mapsRouter";
import usersRouter from "./routes/usersRouter";

//init server
const PORT: number = Number(process.env["PORT"]);
const app: Express = express();
app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

//routes
app.get("/", (req: Request, res: Response) => {
  res.send("serwer działa");
});

app.use("/static", express.static("uploads", {}));
app.use("/events", eventsRouter);
app.use("/historicalFigures", historicalFiguresRouter);
app.use("/guessDate", guessDateRouter);
app.use("/waypoints", waypointsRouter);
app.use("/users", usersRouter);
app.use("/maps", mapsRouter);
