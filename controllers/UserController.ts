import { Request, Response } from "express";
import hashPassword from "../helpers/hashPassword";
import Users from "../models/Users";
import validateRegister from "../helpers/validateRegister";
import getLoginData from "../helpers/getLoginData";
import checkPassword from "../helpers/checkPassword";
import sendMail from "../helpers/sendMail";

interface IDataUser {
  name: string;
  surname: string;
  email: string;
  password: string;
  roleId: number;
}

export default class UsersController {
  async getDetails(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await Users.get(id);
      res.send(result);
    } catch (error) {
      console.log(error);
      res.status(309).send({ msg: error });
    }
  }

  async updateDetails(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await Users.update(id, req.body);
      res.send();
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: error });
    }
  }

  async updatePassword(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const password = await hashPassword(req.body.password);
      await Users.updatePassword(id, password);
      res.send();
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await Users.delete(id);
      res.send();
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: error });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const data: any = await validateRegister(req.body);
      const hashPass: any = await hashPassword(data.password);

      const user: IDataUser = {
        name: data.name,
        surname: data.surname,
        email: data.email,
        password: hashPass,
        roleId: 1,
      };
      await Users.register(user);
      res.send({ msg: "użytkownik stworzony" });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const userData = await getLoginData(req.body.email);
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

        res.status(200).json({
          auth: true,
          userId: userData.id,
          role: userData.role,
        });

        res.send();
      } else {
        res.status(200).json({
          auth: true,
          userId: userData.id,
          role: userData.role,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async checkEmail(req: Request, res: Response) {
    try {
      const data = await Users.checkEmail(String(req.body.email));
      console.log(data);
      await sendMail(String(req.body.email), Number(data.id));
      res.status(200).send(data);
    } catch (e) {
      res.sendStatus(500).json(e);
    }
  }

  async checkCode(req: Request, res: Response) {
    try {
      const data = await Users.checkCode(req.body.id);
      if (req.body.code === data.code) {
        await Users.deleteCode(data.id);
        res.sendStatus(200);
      } else {
        await Users.deleteCode(data.id);
        res.status(403).json({ message: "Błąd, należy jeszcze raz" });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }
}
