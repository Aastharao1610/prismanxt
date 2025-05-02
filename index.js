import { PrismaClient } from "./prisma/src/generated/prisma/index.js";
import bcrypt from "bcrypt";

const Prisma = new PrismaClient();
const hashedPassword = await bcrypt.hash("1234", 10);
console.log(hashedPassword);

async function main() {
  const user = await Prisma.user.create({
    data: {
      role: "user",
      email: "alice12@gmail.com",
      name: "Aastha rao",
      password: hashedPassword,
    },
  });
  console.log(user);
  // const allUsers = await Prisma.user.findMany({
  //   include: {
  //     posts: true,
  //     profile: true,
  //   },
  // })
  // console.dir(allUsers, { depth: null })
}
main()
  .then(async () => {
    await Prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await Prisma.$disconnect();
    process.exit(1);
  });
