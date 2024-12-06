"use client"
import React, { useState } from 'react'
import Card from '@repo/ui/Card'
import { TextInput } from '@repo/ui/TextInput'
import { Select } from '@repo/ui/Select'
import { Center } from '@repo/ui/Center'
import { Button } from '@repo/ui/button'
const SUPPORT_BANKS=[{
    name:"HDFC BANK",
    redirectURl:"https://netbanking.hdcbank.com"
},{
    name:"Axis Bank",
    redirectURl:"https://www.axiosbank.com"
}
]

function AddMoneyCard() {
    const[redirectURl,setRedirectUrl] = useState(SUPPORT_BANKS[0]?.redirectURl) //optional chaining  SUPPORT_BANKS is empty, SUPPORT_BANKS[0] will be undefined.
//?. operator checks if the left-hand side (SUPPORT_BANKS[0]) is null or undefined before accessing redirectURl. If SUPPORT_BANKS[0] is undefined, the entire expression evaluates to undefined without throwing an error.
  console.log(redirectURl)
  return (
    <Card title={"Add Money"}>
     <div className='w-full'>
       <TextInput placeholder={"Amount"} label='Amount' onChange={()=>{}}></TextInput>
     </div>
     <div className='pt-3'>Bank</div>
      <Select Selected={(value)=>{
        setRedirectUrl(SUPPORT_BANKS.find(x=>x.name==value)?.redirectURl||"")
      }} options={SUPPORT_BANKS.map(x=>({
        key:x.name,
        value:x.name
      }))}></Select>
      <div className='mt-4 flex justify-center'>
      <Button  onClick={()=>{
        window.location.href=redirectURl||""
      }}>Add Money</Button>
      </div>

      
    
    </Card>
          
  )
}

export default AddMoneyCard

//The options array is generated by mapping  over Support bank
// options={SUPPORT_BANKS.map(x=>({
//   key:x.name,
//   value:x.name
// }))}
// provided snippet creates an options array by mapping over SUPPORT_BANKS. For each item in SUPPORT_BANKS