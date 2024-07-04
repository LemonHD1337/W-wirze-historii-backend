import nodemailer from "nodemailer";
import generateRandomSixDigit from "./generateRandomSixDigit";
import { PrismaClient } from "@prisma/client";

const sendMail = async (email: string, id: number) => {
  const transporter = nodemailer.createTransport({});
  const prisma = new PrismaClient();

  const code = await generateRandomSixDigit();

  try {
    await prisma.verifyCodes.create({
      data: {
        code: code,
        userId: id,
      },
    });
  } catch (e) {
    throw e;
  }

  const mailOptions = {
    from: "",
    to: email,
    subject: "Reset your password!",
    text: `Your verifing code: ${code}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw error;
    }
  });
};

export default sendMail;
