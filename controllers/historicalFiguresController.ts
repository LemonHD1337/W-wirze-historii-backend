import { Request, Response } from "express";
import mammoth from "@igormadeira/mammoth";
import CRUD from "../prisma/CRUD";

const crud = new CRUD();

const addContentHistoricalFigures = async (req: Request, res: Response) => {
  const filename = req.files["doc"][0].filename;
  const path = "C:/Users/patry/Desktop/backend-szkolny-projekt/uploads/" + filename;

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
    })
    .catch((error) => {
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
    console.log(err);
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
    console.log(req.body.id);
    const result = await crud.deleteHistoricalFigure(Number(req.body.id));
    res.send(result);
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
