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

  const taskCreate = await prisma.subcategory.create({
    data: {
      Name: req.body.name2,
      categoryId: req.body.category,
    },
  });

  console.log(taskCreate);
  await prisma.$disconnect();

  return res
    .status(201)
    .json({ message: "subcategory saved successu", task: "taskCreate" });
};
