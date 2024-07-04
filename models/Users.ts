import { PrismaClient } from "@prisma/client";

interface Register {
  name: string;
  surname: string;
  email: string;
  password: string;
  roleId: number;
}

interface UpdateDetails {
  id: number;
  name: string;
  surname: string;
  email: string;
}

export default class Users {
  static prisma = new PrismaClient();

  static async register(data: Register) {
    try {
      return await this.prisma.user.create({
        data: {
          ...data,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  static async login(email: string) {
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

  static async get(id: number) {
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

  static async update(id: number, data: UpdateDetails) {
    try {
      return await this.prisma.user.update({
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

  static async updatePassword(id: number, password: string) {
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

  static async delete(id: number) {
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

  static async checkEmail(email: string) {
    try {
      return await this.prisma.user.findFirstOrThrow({
        select: {
          id: true,
        },
        where: {
          email: email,
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  static async checkCode(userId: number) {
    try {
      return await this.prisma.verifyCodes.findFirstOrThrow({
        select: {
          code: true,
          id: true,
        },
        where: {
          userId: userId,
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  static async deleteCode(id: number) {
    try {
      return await this.prisma.verifyCodes.delete({
        where: {
          id: id,
        },
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
