import Card from '@repo/ui/Card';
import React from 'react';
import { FaArrowsRotate } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { GiConfirmed } from "react-icons/gi";
import Swal from 'sweetalert2';




export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions By The Bank">
        <div className="pt-2 ">
            {transactions.map(t => <div className="flex justify-between  border-b border-slate-300">
                   <div >
                        <div>
                           {t.status=="Success" ?(
                           <div className="text-sm text-green-500"> Received INR </div>
                           ):(
                           <div></div>  
                            )}  
                           </div>
                           
                           {t.status=="Failure" ?(
                           <div className="text-sm text-red-600 "> Failure</div>):(
                           <div></div>
                            )}
                            {t.status=="Processing" ?(
                           <div className="text-sm text-yellow-500"> Processing </div>):(
                           <div></div>
                            )}
                           <div className="text-slate-600 text-xs">
                            {t.time.toDateString()}
                           </div>
                   </div>
                    <div>
                       {t.status=="Failure" ?(
                          <div className="flex flex-col justify-center text-red-600">
                            <div className='flex '>
                                <div className='p-2'> <RxCrossCircled /></div>
                                <div className='pt-1'>Rs {t.amount / 100}</div>
                            </div>
                          </div> ):(
                           <div></div>
                      )}
                      {t.status=="Success" ?(
                          <div className="flex flex-col justify-center text-green-600">
                             <div className='flex '>
                                <div className='p-2'> <GiConfirmed /></div>
                                <div className='pt-1'>Rs {t.amount / 100}</div>
                             </div>
                          </div> ):(
                           <div></div>
                      )}
                      {t.status=="Processing" ?(
                          <div className="flex flex-col justify-center text-yellow-500">
                            <div className='flex '>
                                <div className='p-2'> <FaArrowsRotate /></div>
                                <div className='pt-1'>Rs {t.amount / 100}</div>
                            </div>
                          </div> ):(
                           <div></div>
                      )}
                   </div>
                   {/*  */}
                     
                    
                     
            </div>)}
        </div>
    </Card>
}

{/* <div className="flex flex-col justify-center">
                        + Rs {t.amount / 100}
                    </div> */}
                   // +  Rs {t.amount / 100}