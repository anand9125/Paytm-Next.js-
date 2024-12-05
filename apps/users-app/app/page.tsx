"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import Dashboard from "./(dashboard)/dashboard/page";
import { SidebarItem } from "component/SidebarItem";
export default function Page(): JSX.Element {
  const session = useSession();
  console.log(session)
  return (
    <div>
       <div className="bg-zinc-100 w-full h-screen">
        <Appbar onSignin={signIn} onSignout={signOut}user={session.data?.user} />
        <div>
          <Dashboard></Dashboard>
          
        </div>
         
       </div>
   </div>
   
  );
}
