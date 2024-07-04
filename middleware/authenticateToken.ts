import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token && !req.cookies.refreshToken) {
    return res.sendStatus(401);
  }

  if (!token && req.cookies.refreshToken) {
    return res.status(401).send({ msg: "Refresh token" });
  }

  if (typeof token === "string" && process.env.ACCESS_TOKEN_SECRET) {
    jsonwebtoken.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          if (req.cookies.refreshToken) {
            return res.status(401).json({ msg: "Refresh token" });
          }
          return res.sendStatus(401);
        }

        next();
      },
    );
  }
}

export default authenticateToken;
