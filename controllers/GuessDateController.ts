import { Request, Response } from "express";
import GuessDate from "../models/GuessDate";

export default class GuessDateController {
  async create(req: Request, res: Response) {
    try {
      await GuessDate.create(req.body);
      res.status(200).send({ msg: "stworzono rekord" });
    } catch (error) {
      res.status(309).send({ msg: error });
    }
  }

  async getRandom(req: Request, res: Response) {
    try {
      const rows: Awaited<number> = await GuessDate.count();
      const randomId = Math.floor(Math.random() * rows) + 1;
      const data = await GuessDate.get(randomId);
      res.status(200).json(data);
    } catch (error) {
      res.status(309).json(error);
    }
  }

  async get(req: Request, res: Response) {
    try {
      const data = await GuessDate.get(Number(req.params.id));
      res.send(data);
    } catch (error) {
      console.log(error);
      res.status(309).send({ msg: error });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const data = await GuessDate.getAll();
      res.send(data);
    } catch (error) {
      res.status(309).send({ msg: error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      console.log(id);
      await GuessDate.update(id, req.body);
      res.send();
    } catch (error) {
      console.log(error);
      res.status(309).send({ msg: error });
    }
  }
}
