"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/client"

export async function onRampTrasnition(amount:number,provider:string){
    const token = Math.random().toString()
    const session = await getServerSession(authOptions)
    const userId = session?.user.id
    if(!userId){
        return {
            messsage:"User is not looged in"
        }
    }
    await db.onRanpTransition.create({
        data:{
           userId:Number(userId),
           amount:amount,
           status:"Processing",
           provider,
           startTime:new Date(),
           token:token
        }
    })
    return{
        message:"On ramp transition added"
    }



}