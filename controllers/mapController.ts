import { Request, Response } from "express-serve-static-core";
import CRUD from "../prisma/CRUD";

const crud = new CRUD();

const createMap = async (req: Request, res: Response) => {
  try {
    const result = await crud.createMap(req.body);
    res.send({ msg: "dodano mapę" });
  } catch (err) {
    res.status(309).send({ msg: err });
  }
};

const deleteMap = async (req: Request, res: Response) => {
  try {
    const result = await crud.deleteMap(Number(req.params.id));
    res.send({ msg: "Mapa została usunięta" });
  } catch (err) {
    res.status(309).send({ msg: err });
  }
};

const getMaps = async (req: Request, res: Response) => {
  try {
    const data = await crud.getMaps(req.body.era);
    res.send(data);
  } catch (err) {
    res.status(309).send(err);
  }
};

const getMapById = async (req: Request, res: Response) => {
  try {
    const data = await crud.getMapById(Number(req.params.id));
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(309).send(error);
  }
};

const updateMapById = async (req: Request, res: Response) => {
  try {
    await crud.updateMapById(Number(req.params.id), req.body);
    res.send();
  } catch (error) {
    res.status(309).send(error);
  }
};

export { getMaps, createMap, deleteMap, getMapById, updateMapById };
