import { Request, Response } from "express";
import CRUD from "../prisma/CRUD";
import hashPassword from "../helpers/hashPassword";

const crud = new CRUD();

const getUserInfo = async (req: Request, res: Response) => {
  try {
    const result = await crud.getUserInfo(req.body.id);
    res.send(result);
  } catch (error) {
    res.status(309).send({ msg: error });
  }
};

const updateUserInfo = async (req: Request, res: Response) => {
  try {
    await crud.updateUserInfo(req.body);
    res.send();
  } catch (error) {
    res.status(309).send({ msg: error });
  }
};

const updateUserPassword = async (req: Request, res: Response) => {
  try {
    const password: any = hashPassword(req.body.password);
    await crud.updateUserPassword({ id: req.body.id, password: password });
    res.send();
  } catch (error) {
    res.status(309).send({ msg: error });
  }
};

const deleteAccount = async (req: Request, res: Response) => {
  try {
    await crud.deleteAccount(Number(req.params.id));
    res.send();
  } catch (error) {
    res.status(309).send({ msg: error });
  }
};

export { getUserInfo, updateUserInfo, updateUserPassword, deleteAccount };
