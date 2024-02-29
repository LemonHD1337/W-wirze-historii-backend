import { Request, Response } from "express";
import CRUD from "../prisma/CRUD";
import mammoth from "@igormadeira/mammoth";
import fs from "node:fs";

const crud = new CRUD();

const pathFolder = "C:/Users/patry/Desktop/backend-szkolny-projekt/uploads/";

const createEvent = async (req: Request | any, res: Response) => {
  try {
    const filename = req.files["doc"][0].filename;
    const path = pathFolder + filename;
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
    await crud.createEvent(data);
    res.send();

    fs.unlink(path, (err) => {
      if (err) {
        console.log("nie usunięto pliku word " + filename, err);
      }
      console.log("usunięto plik word" + filename);
    });
  } catch (err) {
    res.status(309).send({ msg: err });
  }
};

const deleteEvent = async (req: Request, res: Response) => {
  try {
    const id: number = Number(req.params.id);
    const result = await crud.deleteEvent(id);
    res.send();

    fs.unlink(pathFolder + result.image, (err) => {
      if (err) {
        console.log("nie usunięto zdjecia " + result.image);
      }
      console.log("usunięto zdjecia " + result.image);
    });
  } catch (error) {
    console.log(error);
    res.status(309).send({ msg: error });
  }
};

const getEventsByEra = async (req: Request, res: Response) => {
  try {
    const data = await crud.getEventsByEra(req.body.era);
    res.send(data);
  } catch (error) {
    res.status(309).send({ msg: error });
  }
};

const getEvents = async (req: Request, res: Response) => {
  try {
    const data = await crud.getEvents();
    res.send(data);
  } catch (error) {
    res.status(309).send({ msg: error });
  }
};

const getEventById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await crud.getEventById(Number(id));
    res.send(data);
  } catch (error) {
    res.status(309).send({ msg: error });
  }
};

const searchEvents = async (req: Request, res: Response) => {
  try {
    const data = await crud.searchEvents(req.body.search);
    res.send(data);
  } catch (error) {
    res.status(309).send({ msg: error });
  }
};

export {
  createEvent,
  deleteEvent,
  getEventsByEra,
  getEvents,
  getEventById,
  searchEvents,
};
