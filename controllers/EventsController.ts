import { Request, Response } from "express";
import Events from "../models/Events";
import mammoth from "@igormadeira/mammoth";
import fs from "node:fs";

export default class EventsController {
  async create(req: Request, res: Response) {
    try {
      const filename: string = req.files["doc"][0].filename;
      const path = process.env.PATHFOLDER + filename;
      const image = req.files["pic"][0].filename;
      const result = await mammoth.convertToHtml({ path: path });
      const content = result.value;

      const data = {
        title: req.body.title,
        content: content,
        day: req.body.day,
        month: req.body.month,
        year: req.body.year,
        era: req.body.era,
        image: image,
      };

      await Events.create(data);
      res.send();

      fs.unlink(path, err => {
        if (err) {
          console.log("nie usunięto pliku word " + filename, err);
        }
      });
    } catch (err) {
      res.status(309).send({ msg: err });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id: number = Number(req.params.id);
      const result = await Events.delete(id);
      res.send();

      fs.unlink(process.env.PATHFOLDER + result.image, err => {
        if (err) {
          console.log("nie usunięto zdjecia " + result.image);
        }
      });
    } catch (error) {
      res.status(309).send({ msg: error });
    }
  }

  async getEventByEra(req: Request, res: Response) {
    try {
      const data = await Events.getAllByEra(req.body.era);
      res.send(data);
    } catch (error) {
      res.status(309).send({ msg: error });
    }
  }

  async getAll(req: Request, res: Response) {
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
    } catch (error) {
      console.log(error);
      res.status(309).send({ msg: error });
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
    } catch (error) {
      console.log(error);
      res.status(309).send({ msg: error });
    }
  }
}
