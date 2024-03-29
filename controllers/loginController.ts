import { Request, Response } from "express";
import bcrypt from "bcrypt";
import CRUD from "../prisma/CRUD";

const crud = new CRUD();

interface UserData {
  password: string;
  id: number;
  role: string;
}

async function login(req: Request, res: Response) {
  const userData: UserData = await getLoginData(req.body.email, res);
  try {
    await checkPassword(req.body.password, userData.password);
    if (req.body.remember) {
      //cookie data
      const cookieData = {
        auth: true,
        userId: userData.id,
        role: userData.role,
      };

      //send cookie
      res.cookie("loggedIn", cookieData, {
        expires: new Date(Date.now() + 3600 * 2 * 30 * 1000),
        secure: false,
        sameSite: "lax",
      });

      const { id, role } = userData;
      res.status(200).json({
        auth: true,
        userId: id,
        role: role,
      });
    } else {
      const { id, role } = userData;
      res.status(200).json({
        auth: true,
        userId: id,
        role: role,
      });
    }
  } catch (error) {
    res.status(409).json({ error: error });
  }
}

async function getLoginData(email: string, res: Response): Promise<any> {
  try {
    const data = await crud.login(email);
    return data;
  } catch (err) {
    res.status(309).json({ error: err });
  }
}

function checkPassword(inputPassword: string, dbPassword: string) {
  return new Promise((resolve, reject) => {
    const isPasswordCorrect = bcrypt.compareSync(inputPassword, dbPassword);
    if (isPasswordCorrect) {
      resolve("zalogowany");
    } else {
      reject("złe hasło lub email");
    }
  });
}

export default login;
