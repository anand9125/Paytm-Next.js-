import React from 'react'
import SendCard from 'components/SendCard'
import { BalanceCard } from 'components/BalanceCard'
import prisma from '@repo/db/client'
import { P2pOnRamptxn } from 'components/p2pOnRamptxn'
import { getServerSession } from 'next-auth'
import { authOptions } from 'app/lib/auth'
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
  const transactions = await getOnRampTransactions()

  const balance = await getBalance()
  return (<div className='w-full'>
    <div className='text-2xl text-purple-600 font-semibold ml-4'>Send Money</div>
    <div className='flex justify-between gap-4 pt-9'>
      <div className='flex-1 '> <SendCard></SendCard></div>
       <div className='flex-1'><BalanceCard amount={balance.amount } locked={balance.locked}></BalanceCard>
       <div className='pt-4'><P2pOnRamptxn transactions={transactions}></P2pOnRamptxn></div>
       </div>
    </div> 
      
  </div>
  )
}

export default page