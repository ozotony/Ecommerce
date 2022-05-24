import { PrismaClient, Prisma } from "@prisma/client";
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  let password = req.body.password;
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);

  let user = {
    email: req.body.email,
    password: hash,
    usertype: "user",
    profile: {
      create: {
        firstname: req.body.firstname,
        surname: req.body.surname,
        address: req.body.address,
        phonenumber: req.body.phonenumber,
      },
    },
  };
  //  console.log('req.body');
  // console.log(req.body.description);
  //const taskCreate=await prisma.tasks.create({data:req.body})
  // const taskCreate=await prisma.tasks.create({data:req.body})

  const createUser = await prisma.users.create({ data: user });

  // const taskCreate = await prisma.category.create({
  //   data: {
  //       Name: req.body.name2 ,

  //    },
  //  })

  console.log(createUser);
  await prisma.$disconnect();

  return res.status(201).json({ message: createUser });
};
