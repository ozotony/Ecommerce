import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()
export default async (req, res)=> {
    
    const tasks = await prisma.test.findMany({
        select: {
         
          description: true
  
        }
      })
    
    res.status(200).json({student:tasks })
}