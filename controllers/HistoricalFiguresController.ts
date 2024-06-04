import { Request, Response } from "express";
import mammoth from "@igormadeira/mammoth";
import fs from "node:fs";
import HistoricalFigures from "../models/HistoricalFigures";

interface IBody {
  name: string;
  birth: string;
  death: string;
  image: string;
  text: string;
}

interface IPaginationResult {
  totalCount: number;
  totalPage: number;
  currentPage: number;
  next?: {
    page: number;
    limit: number;
  };
  previous?: {
    page: number;
    limit: number;
  };
  last?: {
    page: number;
    limit: number;
  };
  // paginateData: ReturnType<typeof HistoricalFigures.getAll>;
  paginateData: any;
  currentCountPerPage?: number;
  range?: number;
}

//TODO zmienic metode create
export default class HistoricalFiguresController {
  async create(req: Request, res: Response) {
    const filename = req.files["doc"][0].filename;
    const path = process.env.PATHFOLDER + filename;

    const imgName = req.files["pic"][0].filename;
    const { name, birth, death } = req.body;

    mammoth
      .convertToHtml({ path: path })
      .then(async result => {
        const html = result.value; // The generated HTML

        const data: IBody = {
          birth: birth,
          text: html,
          death: death,
          name: name,
          image: imgName,
        };

        await HistoricalFigures.create(data);

        res.send({ msg: "treść dodana!" });

        fs.unlink(path, err => {
          if (err) {
            console.log("błąd nie usnięto pliku", err);
          }
        });
      })
      .catch(() => {
        res.status(309).send({ msg: "coś poszło nie tak" });
      });
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const deletedRecord = await HistoricalFigures.delete(id);
      res.send();
      fs.unlink(process.env.PATHFOLDER + deletedRecord!.image, err => {
        if (err) {
          console.log("nie unięto zdjęcia" + deletedRecord!.image, err);
        }
      });
    } catch (err) {
      res.status(309).send({ msg: err });
    }
  }

  async get(req: Request, res: Response) {
    const id: number = Number(req.params.id);
    try {
      const data = await HistoricalFigures.get(id);
      res.send(data);
    } catch (err) {
      res.status(309).send({ msg: err });
    }
  }

  async getAll(req: Request, res: Response) {
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
      result.paginateData = await HistoricalFigures.getAll(skip, limit);
      res.status(200).json(result);
    } catch (e) {
      console.log("error", e);
      return res.status(500).send({ msg: e });
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
    } catch (err) {
      res.status(309).send({ msg: err });
    }
  }
}
