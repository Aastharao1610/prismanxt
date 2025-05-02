import { PrismaClient } from "./prisma/src/generated/prisma/index.js";
import bcrypt from "bcrypt";

const Prisma = new PrismaClient();

async function main() {
  await Prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash(process.env.PASSWORD, 10);
  console.log(hashedPassword);
  try {
    const admin = await Prisma.user.create({
      data: {
        email: process.env.EMAIL,
        password: hashedPassword,
        role: "admin",
      },
    });
    console.log(admin);
  } catch (error) {
    console.log(error);
  }
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
