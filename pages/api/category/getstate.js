import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async (req, res)=> {
   
    
   // console.log('req.body');
   // console.log(req.body.description);
    //const taskCreate=await prisma.tasks.create({data:req.body})
   // const taskCreate=await prisma.tasks.create({data:req.body})

   const state = await prisma.state.findMany()

   await prisma.$disconnect()
    return res.status(201).json(state)
}