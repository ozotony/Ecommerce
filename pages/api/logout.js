import { PrismaClient, Prisma } from "@prisma/client";
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";

export default async (req, res) => {
  res.setHeader("Set-Cookie", [
    serialize("user", "", {
      maxAge: -1,
      path: "/",
    }),
    serialize("mytoken2", "", {
      maxAge: -1,
      path: "/",
    }),
  ]);

  let rsp = { message: "Logout Successfull" };

  console.log("rsp");
  console.log(rsp);

  // console.log(getTask);
  await prisma.$disconnect();

  return res.status(201).json(rsp);
};
