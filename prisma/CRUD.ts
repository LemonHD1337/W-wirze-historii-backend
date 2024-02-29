import { PrismaClient } from "@prisma/client";

interface RegisterUser {
  name: string;
  surname: string;
  email: string;
  password: string;
  roleId: number;
}

interface historicalFigure {
  birth: string;
  content: string;
  death: string;
  name: string;
  imgName: string;
}

interface Map {
  title: string;
  era: string;
  imageURL: string;
  source: string;
}

interface UpdateMap {
  title: string;
  imageURL: string;
  source: string;
}

interface GuessDate {
  title: string;
  day: string;
  month: string;
  year: string;
}

interface UpdateGuessDate {
  id: number;
  title: string;
  day: string;
  month: string;
  year: string;
}

interface Waypoint {
  latitude: string;
  longitude: string;
  title: string;
  mapId: number;
  historicalEventsId: number;
}

interface UpdateUserInfo {
  id: number;
  name: string;
  surname: string;
  email: string;
}

interface UpdateUserPassword {
  id: number;
  password: string;
}

interface CreateEvent {
  title: string;
  day: string;
  month: string;
  year: string;
  era: string;
  content: string;
  image: string;
}

export default class CRUD {
  prisma: any;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getMapById(id: number) {
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
      throw error;
    }
  }

  async updateMapById(id: number, data: UpdateMap) {
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

  async deleteMap(id: number) {
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

  async getMaps(era: string) {
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

  async registerUser(data: RegisterUser) {
    try {
      const { name, surname, email, password, roleId } = data;
      return await this.prisma.user.create({
        data: {
          name: name,
          surname: surname,
          email: email,
          password: password,
          roleId: roleId,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async createHistoricalFigure(data: historicalFigure) {
    try {
      const { birth, death, name, imgName, content } = data;
      return await this.prisma.historicalFigures.create({
        data: {
          birth: birth,
          death: death,
          name: name,
          image: imgName,
          text: content,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async getHistoricalFigures() {
    try {
      return await this.prisma.historicalFigures.findMany({
        select: {
          id: true,
          image: true,
          name: true,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async getHistoricalFiguresById(id: number) {
    try {
      return this.prisma.historicalFigures.findFirstOrThrow({
        where: {
          id: id,
        },
        select: {
          birth: true,
          death: true,
          text: true,
          image: true,
          name: true,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async searchEvents(text: string) {
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
      });
    } catch (err) {
      throw err;
    }
  }

  async searchHistoricalFigures(text: string) {
    try {
      return await this.prisma.historicalFigures.findMany({
        select: {
          id: true,
          birth: true,
          death: true,
          text: true,
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
      console.log(err);
      throw err;
    }
  }

  async deleteHistoricalFigure(id: number) {
    try {
      return await this.prisma.historicalFigures.delete({
        where: {
          id: id,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async login(email: string) {
    try {
      return await this.prisma.user.findFirstOrThrow({
        where: {
          email: email,
        },
        select: {
          password: true,
          id: true,
          role: true,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async createMap(data: Map) {
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

  async getDateGuessDate(randomId: number) {
    try {
      return await this.prisma.guessDate.findFirst({
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
    } catch (err) {
      throw err;
    }
  }

  async getRecordGuessDate(id: number) {
    try {
      return await this.prisma.guessDate.findFirst({
        select: {
          title: true,
          day: true,
          month: true,
          year: true,
        },
        where: {
          id: id,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async updateDataGuessDate(data: UpdateGuessDate) {
    try {
      return await this.prisma.guessDate.update({
        data: {
          title: data.title,
          day: data.day,
          month: data.month,
          year: data.year,
        },
        where: {
          id: Number(data.id),
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async guessDateCount() {
    try {
      return await this.prisma.guessDate.count();
    } catch (err) {
      return err;
    }
  }

  async createDateGuessDate(data: GuessDate) {
    try {
      const { title, day, month, year } = data;
      return await this.prisma.guessDate.create({
        data: {
          title: title,
          day: day,
          month: month,
          year: year,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async getDataGuessDate() {
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

  async getUserInfo(id: number) {
    try {
      return await this.prisma.user.findFirst({
        select: {
          name: true,
          surname: true,
          email: true,
        },
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateUserInfo({ name, surname, id, email }: UpdateUserInfo) {
    try {
      return await this.prisma.user.update({
        data: {
          name: name,
          surname: surname,
          email: email,
        },
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateUserPassword({ id, password }: UpdateUserPassword) {
    try {
      return await this.prisma.user.update({
        data: {
          password: password,
        },
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteAccount(id: number) {
    try {
      return await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async createEvent(data: CreateEvent) {
    try {
      return await this.prisma.historicalEvents.create({
        data: {
          ...data,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteEvent(id: number) {
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

  async getEventsByEra(era: string) {
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
      console.log(error);
      throw error;
    }
  }

  async getEvents() {
    try {
      return await this.prisma.historicalEvents.findMany({
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

  async getEventById(id: number) {
    try {
      return await this.prisma.historicalEvents.findFirstOrThrow({
        select: {
          image: true,
          day: true,
          month: true,
          year: true,
          content: true,
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

  async createWaypoint(data: Waypoint) {
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

  async getWaypoints(mapId: number) {
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

  async deleteWaypointById(id: number) {
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
