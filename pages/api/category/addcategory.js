import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // console.log('req.body');
  // console.log(req.body.description);
  //const taskCreate=await prisma.tasks.create({data:req.body})
  // const taskCreate=await prisma.tasks.create({data:req.body})

  const taskCreate = await prisma.category.create({
    data: {
      Name: req.body.name2,
    },
  });

  await prisma.$disconnect();
  console.log(taskCreate);

  return res
    .status(201)
    .json({ message: "category saved successu", task: "taskCreate" });
};
