import {PrismaClient} from "@prisma/client";

interface Create {
    latitude: number;
    longitude: number;
    title: string;
    mapId: number;
    historicalEventsId: number;
}

export default class Waypoints {
    static prisma = new PrismaClient()

    static async create(data: Create) {
        try {
            return await this.prisma.waypoints.create({
                data: {
                    ...data,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    static async getAllByMap(mapId: number) {
        try {
            return await this.prisma.waypoints.findMany({
                select: {
                    id: true,
                    title: true,
                    EventId: {
                        select: {
                            id: true,
                        },
                    },
                    latitude: true,
                    longitude: true,
                },
                where: {
                    mapId: mapId,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    static async delete(id: number) {
        try {
            return await this.prisma.waypoints.delete({
                where: {
                    id: id,
                },
            });
        } catch (error) {
            throw error;
        }
    }
}