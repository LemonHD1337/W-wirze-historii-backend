import { Response, Request } from "express";
import CRUD from "../prisma/CRUD";

const crud = new CRUD();

async function getRecordForGuessDate(req: Request, res: Response) {
  try {
    const rows = await crud.guessDateCount();
    console.log(rows);
    const randomId = Math.floor(Math.random() * rows) + 1;
    console.log(randomId);
    const data = await crud.getDateGuessDate(randomId);

    res.status(200).json(data);
  } catch (error) {
    res.status(309).json(error);
  }
}

async function insertDataForGuessDate(req: Request, res: Response) {
  try {
    const record = await crud.createDateGuessDate(req.body);

    res.status(200).send({ msg: "stworzono rekord" });
  } catch (error) {
    res.status(309).send({ msg: error });
  }
}

async function getDataForGuessDate(req: Request, res: Response) {
  try {
    const data = await crud.getDataGuessDate();
    res.send(data);
  } catch (error) {
    res.status(309).send({ msg: error });
  }
}

async function getRecordGuessDateById(req: Request, res: Response) {
  try {
    const data = await crud.getRecordGuessDate(Number(req.body.id));
    res.send(data);
  } catch (error) {
    res.status(309).send({ msg: error });
  }
}

async function updateDataGuessDate(req: Request, res: Response) {
  try {
    await crud.updateDataGuessDate(req.body);
    res.send();
  } catch (error) {
    res.status(309).send({ msg: error });
  }
}

export {
  getRecordForGuessDate,
  insertDataForGuessDate,
  getDataForGuessDate,
  getRecordGuessDateById,
  updateDataGuessDate,
};
