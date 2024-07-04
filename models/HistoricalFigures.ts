import { PrismaClient } from "@prisma/client";

interface Create {
  name: string;
  image: string;
  document: string;
}

export default class HistoricalFigures {
  static prisma = new PrismaClient();

  static async create(data: Create) {
    try {
      return await this.prisma.historicalFigures.create({
        data: {
          ...data,
        },
      });
    } catch (err) {
      console.log("error", err);
      throw err;
    }
  }

  static async get(id: number) {
    try {
      return this.prisma.historicalFigures.findFirstOrThrow({
        where: {
          id: id,
        },
        select: {
          document: true,
          image: true,
          name: true,
        },
      });
    } catch (err) {
      console.log("error", err);
      throw err;
    }
  }

  static async getAll() {
    try {
      return await this.prisma.historicalFigures.findMany({
        select: {
          id: true,
          name: true,
        },
      });
    } catch (e) {
      console.log("error", e);
      throw e;
    }
  }

  static async paginated(skip: number, take: number) {
    try {
      return await this.prisma.historicalFigures.findMany({
        select: {
          id: true,
          image: true,
          name: true,
        },
        skip: skip,
        take: take,
      });
    } catch (err) {
      console.log("error", err);
      throw err;
    }
  }

  static async delete(id: number) {
    try {
      return await this.prisma.historicalFigures.delete({
        where: {
          id: id,
        },
      });
    } catch (err) {
      console.log("error", err);
      throw err;
    }
  }

  static async search(text: string, skip: number, take: number) {
    try {
      return await this.prisma.historicalFigures.findMany({
        skip: skip,
        take: take,
        select: {
          id: true,
          document: true,
          image: true,
          name: true,
        },
        where: {
          name: {
            search: `${text}*`,
          },
        },
      });
    } catch (err) {
      console.log("error", err);
      throw err;
    }
  }

  static async count() {
    try {
      return await this.prisma.historicalFigures.count();
    } catch (err) {
      console.log("error", err);
      throw err;
    }
  }
}
