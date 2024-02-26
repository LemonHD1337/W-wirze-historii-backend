import { Request, Response } from "express";
import CRUD from "../prisma/CRUD";
import mammoth from "@igormadeira/mammoth";

const crud = new CRUD();

const createEvent = async (req: Request, res: Response) => {
  try {
    const filename = req.files["doc"][0].filename;
    const path = "C:/Users/patry/Desktop/backend-szkolny-projekt/uploads/" + filename;
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
  } catch (err) {
    res.status(309).send({ msg: err });
  }
};

const deleteEvent = async (req: Request, res: Response) => {
  try {
    const id: number = Number(req.params.id);
    await crud.deleteEvent(id);
    res.send();
  } catch (error) {
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

export { createEvent, deleteEvent, getEventsByEra, getEvents, getEventById };
