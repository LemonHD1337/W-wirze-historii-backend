import { Request, Response } from "express";
import hashPassword from "../helpers/hashPassword";
import validateRegister from "../helpers/validateRegister";
import CRUD from "../prisma/CRUD";

const crud = new CRUD();

async function register(req: Request, res: Response) {
  try {
    const data: any = await validateRegister(req.body);
    const hashPass: any = await hashPassword(data.password);
    const user = {
      name: data.name,
      surname: data.surname,
      email: data.email,
      password: hashPass,
      roleId: 1,
    };
    const result = await crud.registerUser(user);
    res.send({ msg: "użytkownik stworzony" });
  } catch (error) {
    res.status(309).json(error);
  }
}

export default register;
