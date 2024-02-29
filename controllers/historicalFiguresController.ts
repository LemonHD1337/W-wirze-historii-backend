import { Request, Response } from "express";
import mammoth from "@igormadeira/mammoth";
import CRUD from "../prisma/CRUD";
import fs from "node:fs";

const crud = new CRUD();

const pathFolder = "C:/Users/patry/Desktop/backend-szkolny-projekt/uploads/";

const addContentHistoricalFigures = async (req: Request | any, res: Response) => {
  const filename: any = req.files["doc"][0].filename;
  const path = pathFolder + filename;

  const imgName = req.files["pic"][0].filename;
  const { name, birth, death } = req.body;

  mammoth
    .convertToHtml({ path: path })
    .then(async (result) => {
      var html = result.value; // The generated HTML
      const data = {
        birth: birth,
        content: html,
        death: death,
        name: name,
        imgName: imgName,
      };

      const createdHistoricalFigure = await crud.createHistoricalFigure(data);

      res.send({ msg: "treść dodana!" });

      fs.unlink(path, (err) => {
        if (err) {
          console.log("błąd nie usnięto pliku", err);
        }
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(309).send({ msg: "coś poszło nie tak" });
    });
};

const getContentHistoricalFigures = async (req: Request, res: Response) => {
  const crud = new CRUD();
  const data = await crud.getHistoricalFigures();
  res.send(data);
};

const getInfoHistoricalFigure = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  try {
    const data = await crud.getHistoricalFiguresById(id);
    res.send(data);
  } catch (err) {
    res.status(309).send({ msg: err });
  }
};

const searchHistoricalFigure = async (req: Request, res: Response) => {
  try {
    const results = await crud.searchHistoricalFigures(req.body.search);
    res.send(results);
  } catch (err) {
    res.status(309).send({ msg: err });
  }
};

async function deleteHistoricalFigure(req: Request, res: Response) {
  try {
    const result = await crud.deleteHistoricalFigure(Number(req.body.id));
    res.send();
    fs.unlink(pathFolder + result.image, (err) => {
      if (err) {
        console.log("nie unięto zdjęcia" + result.image, err);
      }
      console.log("usnięto zdjecie" + result.image);
    });
  } catch (err) {
    res.status(309).send({ msg: err });
  }
}

export {
  getContentHistoricalFigures,
  addContentHistoricalFigures,
  getInfoHistoricalFigure,
  searchHistoricalFigure,
  deleteHistoricalFigure,
};
