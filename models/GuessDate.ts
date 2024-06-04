import {PrismaClient} from "@prisma/client";

interface Create {
    title: string;
    day: string;
    month: string;
    year: string;
}

interface Update {
    id: number;
    title: string;
    day: string;
    month: string;
    year: string;
}

export default class GuessDate {
    static prisma = new PrismaClient()

    static async get(id: number) {
        try {
            return await this.prisma.guessDate.findFirst({
                select: {
                    day: true,
                    month: true,
                    year: true,
                    title: true,
                },
                where: {
                    id: id,
                },
            });
        } catch (err) {
            throw err;
        }
    }


    static async update(id: number, data: Update) {
        try {
            return await this.prisma.guessDate.update({
                data: {
                    ...data
                },
                where: {
                    id: id
                },
            });
        } catch (err) {
            throw err;
        }
    }

    static async count(): Promise<number> {
        try {
            return await this.prisma.guessDate.count();
        } catch (err: any) {
            return err
        }
    }

    static async create(data: Create) {
        try {
            return await this.prisma.guessDate.create({
                data: {
                    ...data
                },
            });
        } catch (err) {
            throw err;
        }
    }

    static async getAll() {
        try {
            return await this.prisma.guessDate.findMany({
                select: {
                    id: true,
                    title: true,
                },
            });
        } catch (err) {
            throw err;
        }
    }

}