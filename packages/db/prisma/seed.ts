import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const anand = await prisma.user.upsert({
    where: { number: "9125911042" },
    update: {},
    create: {
      number: "9125911042",
      email: "akdon9936@gmail.com",
      name: "Anand",
      password: await bcrypt.hash("anand", 10),
      Balance: {
        create: {
          amount: 9999,
          locked: 0,
        },
      },
      onRanpTransition: {
        create: {
          startTime: new Date(),
          status: "Success",
          token: "token_2",
          provider: "HDFC Bank",
          amount: 20000,
        },
      },
    },
  });

  const jeetu = await prisma.user.upsert({
    where: { number: "6387995853" },
    update: {},
    create: {
      number: "6387995853",
      email: "jeetupal.pal31@gmail.com",
      name: "Jeetu pal",
      password: await bcrypt.hash("jeetu", 10),
      Balance: {
        create: {
          amount: 9999,
          locked: 0,
        },
      },
      onRanpTransition: {
        create: {
          startTime: new Date(),
          status: "Success",
          token: "token_1",
          provider: "HDFC Bank",
          amount: 20000,
        },
      },
    },
  });

  console.log({ anand, jeetu });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
