"use client"
import React from 'react'
import { Appbar } from '@repo/ui/appbar';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from "next-auth/react";
function AppbarItem() {
    const session = useSession();
    const router = useRouter()
    console.log(session)
    return (
      <div>
         <div className=" w-full ">
          <Appbar onSignin={signIn} onSignout={async()=>{
            await signOut()
            router.push("/api/auth/signin")
          }}user={session.data?.user} />
          <div>
          
            
          </div>
           
         </div>
     </div>
     
    );
}

export default AppbarItem