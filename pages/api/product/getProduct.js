import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { useRouter } from "next/router";

export default async (req, res) => {
  // const router = useRouter()
  // console.log('router.query');
  //console.log("inside server ");
  //console.log(req.body.userid);

  // console.log('req.body');
  // console.log(req.body.description);
  //const taskCreate=await prisma.tasks.create({data:req.body})
  // const taskCreate=await prisma.tasks.create({data:req.body})
  let userid = req.body.userid;

  const areas = await prisma.product.findMany({
    include: {
      category: true,
      subCategory: true,
      state: true,
      area: true,
      productstatus: true,
    },

    where: {
      userId: {
        equals: parseInt(userid), // Default mode
      },
    },
  });

  // const state = await prisma.state.findMany()

  console.log("products ");
  console.log(areas);

  await prisma.$disconnect();
  return res.status(201).json(areas);
};
