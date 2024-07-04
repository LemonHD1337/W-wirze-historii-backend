import { Request, Response } from "express";
import HistoricalFigures from "../models/HistoricalFigures";

interface IBody {
  name: string;
  image: string;
  document: string;
}

export default class HistoricalFiguresController {
  async create(req: Request, res: Response) {
    //@ts-expect-error
    const filename = req.files["doc"][0].filename;
    //@ts-expect-error
    const imgName = req.files["pic"][0].filename;
    const { name } = req.body;

    try {
      const data: IBody = {
        name: name,
        image: imgName,
        document: filename,
      };

      await HistoricalFigures.create(data);
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await HistoricalFigures.delete(id);
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.status(500).send({ msg: e });
    }
  }

  async get(req: Request, res: Response) {
    const id: number = Number(req.params.id);
    try {
      const data = await HistoricalFigures.get(id);
      res.send(data);
    } catch (e) {
      console.log(e);
      res.status(500).send({ msg: e });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const data = await HistoricalFigures.getAll();
      res.send(data);
    } catch (e) {
      console.log(e);
      res.status(500).send({ msg: e });
    }
  }

  async paginated(req: Request, res: Response) {
    try {
      const query = req.query;
      const page = Number(query.page);
      const limit = Number(query.limit);
      const skip = Number(query.skip);
      const totalRecords = await HistoricalFigures.count();
      const totalPage = Math.ceil(totalRecords / limit);
      let result: any = {};
      result.totalPages = totalPage;
      result.currentPage = page;
      result.paginateData = await HistoricalFigures.paginated(skip, limit);
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.status(500).send({ msg: e });
    }
  }

  async search(req: Request, res: Response) {
    try {
      const query = req.query;
      const searchedValue = String(req.query.search);
      const page = Number(query.page);
      const limit = Number(query.limit);
      const skip = Number(query.skip);
      const totalRecords = await HistoricalFigures.count();
      const totalPage = Math.ceil(totalRecords / limit);
      let result: any = {};
      result.totalPages = totalPage;
      result.currentPage = page;
      result.paginateData = await HistoricalFigures.search(
        searchedValue,
        skip,
        limit,
      );
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.status(500).send({ msg: e });
    }
  }
}
