"use client"
import React, { useState } from 'react'
import { Center } from '@repo/ui/Center'
import { TextInput } from '@repo/ui/TextInput'
import { Button } from '@repo/ui/button'
import { p2pTransfer } from 'app/lib/actions/p2ptransfer'
import { number } from 'zod'
import Card from '@repo/ui/Card'
function SendCard() {
  const[number,setNumber]=useState("")
  const[amount,setAmount]=useState("")


  return (
     
        <Center>
          <Card title="Send">
            <div className=''>
              <TextInput placeholder={'9125911042'} label={"Number"} onChange={(value)=>{setNumber(value)
              }}>
              </TextInput>
              <TextInput placeholder={'Amount'} label={"Amount"} onChange={(value)=>{ setAmount((value))
              }}>
             </TextInput>
             <div className='pt-3'>
              <Button onClick={async()=>{
                await p2pTransfer(number,Number(amount)*100)
              }}>Send</Button>
             </div>
          </div>
          </Card>
    </Center>
      
  )
}

export default SendCard