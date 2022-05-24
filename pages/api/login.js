import { PrismaClient, Prisma } from "@prisma/client";
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  let rsp = { success: false, message: "" };
  let email = req.body.email;
  // const JWT_SECRET = process.env.JWT_SECRET

  const JWT_SECRET = "#ozo333666";

  const user2 = await prisma.users.findUnique({
    where: {
      email: email,
    },
    select: {
      email: true,
      password: true,
      usertype: true,
      id: true,

      profile: {
        select: {
          firstname: true,
          surname: true,
          phonenumber: true,
        },
      },
    },
  });

  console.log("users selected ");
  console.log(user2);

  // let result =bcrypt.compareSync("ozotony", users.password);
  let result = bcrypt.compareSync(req.body.password, user2.password);

  if (result) {
    var user_data_from_for_token = { id: 1, name: "codeTechFry" };
    const token = jwt.sign(
      {
        // iat: Math.floor(Date.now() / 1000) - 30,  // 30 Seconds back
        userid: user2.id,
        email: user2.email,
        firstname: user2.profile.firstname,
        surname: user2.profile.surname,
        phone: user2.profile.phonenumber,
        usertype: user2.usertype,
        // role:users.Role // 1 Hour from current time
      },
      JWT_SECRET
    );
    rsp = { message: token };
  } else {
    rsp = { message: "Invalid Login Details" };
  }

  console.log("rsp");
  console.log(rsp);

  // console.log(getTask);
  await prisma.$disconnect();

  return res.status(201).json(rsp);
};
