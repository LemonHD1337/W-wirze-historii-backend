import prisma from "../prisma/prismaClient";
import { Response, Request } from "express";

export async function getDataForGuessDate(res: Response) {
  try {
    const rows = await prisma.guessDate.count();
    const randomId = Math.floor(Math.random() * rows) + 1;

    const data = await prisma.guessDate.findFirst({
      select: {
        day: true,
        month: true,
        year: true,
        title: true,
      },
      where: {
        id: randomId,
      },
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(309).json(error);
  }
}

export async function insertDataForGuessDate(req: Request, res: Response) {
  try {
    const { title, day, month, year } = req.body;
    const record = await prisma.guessDate.create({
      data: {
        title: title,
        day: day,
        month: month,
        year: year,
      },
    });

    res.status(200).send({ msg: "stworzono rekord" });
  } catch (error) {
    res.status(309).send({ msg: error });
  }
}
