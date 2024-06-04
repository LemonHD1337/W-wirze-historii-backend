import {PrismaClient} from "@prisma/client";

interface Create {
    title: string;
    era: string;
    imageURL: string;
    source: string;
}

interface Update {
    title: string;
    imageURL: string;
    source: string;
}

export default class Maps {
    static prisma = new PrismaClient()

    static async create(data: Create) {
        try {
            return await this.prisma.map.create({
                data: {
                    ...data,
                },
            });
        } catch (err) {
            throw err;
        }
    }

    static async get(id: number) {
        try {
            return await this.prisma.map.findFirstOrThrow({
                select: {
                    title: true,
                    source: true,
                    imageURL: true,
                },
                where: {
                    id: id,
                },
            });
        } catch (error) {
            throw error
        }
    }

    static async update(id: number, data: Update) {
        try {
            return await this.prisma.map.update({
                data: {
                    ...data,
                },
                where: {
                    id: id,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    static async delete(id: number) {
        try {
            return await this.prisma.map.delete({
                where: {
                    id: id,
                },
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    static async getAll(era: string) {
        try {
            return await this.prisma.map.findMany({
                select: {
                    id: true,
                    title: true,
                    source: true,
                    imageURL: true,
                },
                where: {
                    era: era,
                },
            });
        } catch (err) {
            throw err;
        }
    }
}