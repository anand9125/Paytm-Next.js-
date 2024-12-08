import React from 'react'
import prisma from '@repo/db/client'
import AddMoneyCard from 'components/AddMoneyCard'
import { BalanceCard } from 'components/BalanceCard'
import { getServerSession } from 'next-auth'
import { authOptions } from 'app/lib/auth'
import { OnRampTransactions } from 'components/onRamptxn'
 async function getBalance(){
   const session = await getServerSession(authOptions)
   const Balance = await prisma.balance.findFirst({
    where:{
      userId:Number(session?.user?.id)
    }
  });
  return{
    amount:Balance?.amount||0,
    locked:Balance?.locked||0,
  }
}
async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRanpTransition.findMany({
      where: {
          userId: Number(session?.user?.id)
      }
  });
  return txns.map(t => ({
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider
  }))
}
async function page() {
   const balance = await getBalance()
   const transactions = await getOnRampTransactions()

  return (<div className='w-full'>
    <div className='text-2xl text-purple-600 font-semibold ml-4 pt-9'>Trasnfer </div>
       <div className="flex justify-between gap-4">
          <div className="flex-1">
          <AddMoneyCard />
          </div>
          <div className="flex-1">
          <BalanceCard amount={balance.amount } locked={balance.locked} />
          <div className="pt-4">
          <OnRampTransactions transactions={transactions}
          ></OnRampTransactions>
        </div>
       </div>
      </div>
     </div>
    
  );
  
}

export default page