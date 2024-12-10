"use client"
import React, { useState } from 'react'
import { Center } from '@repo/ui/Center'
import { TextInput } from '@repo/ui/TextInput'
import { Button } from '@repo/ui/button'
import { p2pTransfer } from 'app/lib/actions/p2ptransfer'
import { number } from 'zod'
import Swal from 'sweetalert2'
import { showSwalAlert } from './Showalert'
import Card from '@repo/ui/Card'
function SendCard() {
  const[number,setNumber]=useState("")
  const[amount,setAmount]=useState("")


  return (
     
        
          <Card title="Send">
            <div className=''>
              <TextInput placeholder={'9125911042'} label={"Number"} onChange={(value)=>{setNumber(value)
              }}>
              </TextInput>
              <TextInput placeholder={'Amount'} label={"Amount"} onChange={(value)=>{ setAmount((value))
              }}>
             </TextInput>
             <div className='pt-3 flex justify-center'>
              <Button onClick={async()=>{
               
                try {
                  // Perform the p2p transfer
                  await p2pTransfer(number, Number(amount) * 100);
            
                  // Call the success alert function
                  showSwalAlert("success", "Done", "Payment has been completed successfully.", '<a href="#">Why do I have this issue?</a>');
                } catch (error) {
                  // Call the error alert function
                  showSwalAlert("error", "Error", "Something went wrong with the transfer.", '<a href="#">Contact support</a>');
                }
            
               
              }}>Send</Button>
             </div>
          </div>
          </Card>
    
      
  )
}

export default SendCard