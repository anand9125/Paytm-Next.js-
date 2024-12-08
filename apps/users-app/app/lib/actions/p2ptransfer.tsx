"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if (!from) {
        return {
            message: "Error while sending"
        }
    }
    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    });

    if (!toUser) {
        return {
            message: "User not found"
        }
    }
    await prisma.$transaction(async (tx) => {
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
        const fromBalance = await tx.balance.findUnique({   //he where clause for findUnique or update queries must use a unique field defined in your schema
            //so make sure when we update osmthing or finduniq somthing we have to  put userID to be @uniqe i
            where: { userId: Number(from) },
          });
          if (!fromBalance || fromBalance.amount < amount) {
            throw new Error('Insufficient funds');
          }

          await tx.balance.update({
            where: { userId: Number(from) },
            data: { amount: { decrement: amount } },
          });

          await tx.balance.update({
            where: { userId: toUser.id },
            data: { amount: { increment: amount } },
          });
          await tx.p2pTransfer.create({
            data:{
                fromUserId:Number(from),
                toUserId:toUser.id,
                amount,
                timestamp:new Date()

            }
          })
       
    });
}

//what is ts and waht is uyse here
//it provides a scoped version of the Prisma Client that ensures all database operations within it are executed as a single transaction
//If any operation within the transaction fails
//all the changes made during the transaction will be rolled back.
//The tx context behaves like the regular prisma instance but is specific to the current transaction