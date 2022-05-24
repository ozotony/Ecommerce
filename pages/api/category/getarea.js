import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { useRouter } from "next/router";

export default async (req, res) => {
  // const router = useRouter()
  // console.log('router.query');
  // console.log(router.query);

  // console.log('req.body');
  // console.log(req.body.description);
  //const taskCreate=await prisma.tasks.create({data:req.body})
  // const taskCreate=await prisma.tasks.create({data:req.body})
  let stateid = req.body.id;

  const areas = await prisma.area.findMany({
    where: {
      stateId: {
        equals: stateid, // Default mode
      },
    },
  });

  // const state = await prisma.state.findMany()
  await prisma.$disconnect();

  return res.status(201).json(areas);
};
