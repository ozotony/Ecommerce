import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  // console.log('req.body');
  // console.log(req.body.description);
  //const taskCreate=await prisma.tasks.create({data:req.body})
  // const taskCreate=await prisma.tasks.create({data:req.body})

  // const category = await prisma.category.findMany()

  const category = await prisma.category.findMany({
    select: {
      catname: true,
      id: true,
      subcategory: {
        select: {
          id: true,
          subname: true,
        },
      },
    },
  });

  await prisma.$disconnect();
  return res.status(201).json(category);
};
