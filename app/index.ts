import express, { Express, Request, Response } from "express";

//middleware imports
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

//import functions thats handle request
import register from "./routesFunctions/register";
import login from "./routesFunctions/login";
import {
  getDataForGuessDate,
  insertDataForGuessDate,
} from "./routesFunctions/guessDate";

//init server
const PORT: number = 8080;
const app: Express = express();
app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});

//middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//routes
app.get("/", (req: Request, res: Response) => {
  res.send("serwer działa");
});

app.post("/register", (req: Request, res: Response) => {
  register(req, res);
});

app.post("/login", (req: Request, res: Response) => {
  login(req, res);
});

app.get("/guessDate/getData", (req: Request, res: Response) => {
  getDataForGuessDate(res);
});

app.post("/guessDate/insertData", (req: Request, res: Response) => {
  insertDataForGuessDate(req, res);
});
