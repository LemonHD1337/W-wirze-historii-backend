import { PrismaClient } from "@prisma/client";

interface Create {
  title: string;
  era: string;
  document: string;
  image: string;
}

export default class Events {
  static prisma = new PrismaClient();

  static async create(data: Create) {
    try {
      return await this.prisma.historicalEvents.create({
        data: {
          ...data,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async delete(id: number) {
    try {
      return await this.prisma.historicalEvents.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async getAllByEra(era: string) {
    try {
      return await this.prisma.historicalEvents.findMany({
        select: {
          id: true,
          title: true,
        },
        where: {
          era: era,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async getAll(skip: number, take: number) {
    try {
      return await this.prisma.historicalEvents.findMany({
        take: take,
        skip: skip,
        select: {
          id: true,
          title: true,
          image: true,
          era: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async get(id: number) {
    try {
      return await this.prisma.historicalEvents.findFirstOrThrow({
        select: {
          image: true,
          document: true,
          title: true,
          createAt: true,
        },
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async search(text: string, skip: number, limit: number) {
    try {
      return await this.prisma.historicalEvents.findMany({
        select: {
          id: true,
          title: true,
          image: true,
          era: true,
        },
        where: {
          title: {
            search: `${text}*`,
          },
        },
        take: limit,
        skip: skip,
      });
    } catch (err) {
      throw err;
    }
  }

  static async count() {
    try {
      return await this.prisma.historicalEvents.count();
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
}
