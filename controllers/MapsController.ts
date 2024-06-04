import Maps from "../models/Maps";
import { Request, Response } from "express";

export default class MapsController {
  async create(req: Request, res: Response) {
    try {
      await Maps.create(req.body);
      res.send({ msg: "dodano mapę" });
    } catch (err) {
      res.status(309).send({ msg: err });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await Maps.delete(Number(req.params.id));
      res.send({ msg: "Mapa została usunięta" });
    } catch (err) {
      res.status(309).send({ msg: err });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const data = await Maps.get(Number(req.params.id));
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(309).send(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      await Maps.update(Number(req.params.id), req.body);
      res.send();
    } catch (error) {
      res.status(309).send(error);
    }
  }

  async getAllByEra(req: Request, res: Response) {
    try {
      const data = await Maps.getAll(req.params.era);
      res.send(data);
    } catch (err) {
      res.status(309).send(err);
    }
  }
}
