"use client"
import { usePathname, useRouter } from "next/navigation";
import React from "react";
//usePathname is a Client Component hook that lets you read the current URL's pathname
export const SidebarItem = ({ href, title, icon }: { href: string; title: string; icon: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname()
    console.log(pathname)
    const selected = pathname === href  //pathname:This variable holds the current URL path

    return <div className={` flex ${selected ?  "text-purple-600" : "text-slate-500"} cursor-pointer  p-2 pl-8`} onClick={() => {
        router.push(href);
    }}>
        <div className="">
            {icon}
        </div>
        <div className={`font-bold ${selected ? "text-purple-600" : "text-slate-500"}`}>
            {title}
        </div>
    </div>
}