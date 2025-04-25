

import { PrismaClient } from './src/generated/prisma/index.js'

const Prisma =new PrismaClient()

async function main() {
    await Prisma.user.create({
      data: {
        name: 'Alice',
        email: 'alice@prisma.io',
        posts: {
          create: { title: 'Hello World' },
        },
        profile: {
          create: { bio: 'I like turtles' },
        },  
      },
    })
  
    const allUsers = await Prisma.user.findMany({
      include: {
        posts: true,
        profile: true,
      },
    })
    console.dir(allUsers, { depth: null })
  }
main()
.then(async()=>{
    await Prisma.$disconnect()

})
.catch(async(e)=>{
    console.error(e)
    await Prisma.$disconnect()
    process.exit(1)
})