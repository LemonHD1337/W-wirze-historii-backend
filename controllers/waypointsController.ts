import { Request, Response } from "express";
import CRUD from "../prisma/CRUD";

const crud = new CRUD();

const addWaypoint = async (req: Request, res: Response) => {
  try {
    await crud.createWaypoint(req.body);
    res.send();
  } catch (error) {
    res.status(309).send({ msg: error });
  }
};

const getWaypoints = async (req: Request, res: Response) => {
  try {
    const data = await crud.getWaypoints(Number(req.params.id));
    res.send(data);
  } catch (error) {
    res.status(309).send({ msg: error });
  }
};

const deleteWaypointById = async (req: Request, res: Response) => {
  try {
    await crud.deleteWaypointById(Number(req.params.id));
    res.send();
  } catch (error) {
    res.status(309).send({ msg: error });
  }
};

export { addWaypoint, getWaypoints, deleteWaypointById };
