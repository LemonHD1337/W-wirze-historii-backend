import { Request, Response } from "express";
import Events from "../models/Events";

export default class EventsController {
  async create(req: Request, res: Response) {
    try {
      //@ts-expect-error
      const filename = req.files["doc"][0].filename;
      //@ts-expect-error
      const image = req.files["pic"][0].filename;

      const data = {
        title: req.body.title,
        document: filename,
        era: req.body.era,
        image: image,
      };

      await Events.create(data);
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: err });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id: number = Number(req.params.id);
      const result = await Events.delete(id);
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: err });
    }
  }

  async getEventByEra(req: Request, res: Response) {
    try {
      const selectUnused = req.query.selectUnused;

      const stringToBool = (a: any) => {
        if (typeof a === "undefined") return;
        if (a === "true") return false;
        return true;
      };

      const data = await Events.getAllByEra(
        req.params.era,
        stringToBool(selectUnused),
      );
      res.send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: err });
    }
  }

  async paginated(req: Request, res: Response) {
    try {
      const query = req.query;
      const page = Number(query.page);
      const limit = Number(query.limit);
      const skip = Number(query.skip);
      const totalRecords = await Events.count();
      const totalPage = Math.ceil(totalRecords / limit);
      let result: any = {};
      result.totalPages = totalPage;
      result.currentPage = page;
      result.paginateData = await Events.getAll(skip, limit);
      res.status(200).json(result);
    } catch (error) {
      console.log("error", error);
      return res.status(500).send({ msg: error });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = await Events.get(id);
      res.send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: err });
    }
  }

  async search(req: Request, res: Response) {
    try {
      const query = req.query;
      const searchedValue = String(req.query.search);
      const page = Number(query.page);
      const limit = Number(query.limit);
      const skip = Number(query.skip);
      const totalRecords = await Events.count();
      const totalPage = Math.ceil(totalRecords / limit);
      let result: any = {};
      result.totalPages = totalPage;
      result.currentPage = page;
      result.paginateData = await Events.search(searchedValue, skip, limit);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).send({ msg: err });
    }
  }
}
