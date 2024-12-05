import express from "express";
import db from "@repo/db/client"
const app = express();
interface PaymentInfo{
    token :string,
    userId : string,
    amount:string
}

app.post("/hdfcWebhook", async(req, res) => {
    //TODO: Add zod validation here?
    //Check if this request acutally come fron hdfc bank ,use a webhook secret here 
    const paymentInformation:PaymentInfo = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    // Update balance in db, add txn
    try{
        await db.$transaction([
            db.balance.updateMany({
                where:{
                    userId:Number(paymentInformation.userId)   //Look for rows in the balance table where the userId column matches the value of Number(paymentInformation.userId).
                },
                data:{
                    amount:{
                        increment:Number(paymentInformation.amount)
                    }
                }

            }),
            db.onRanpTransition.updateMany({
                where:{
                   token:paymentInformation.token 
                },
                data:{
                  status:"Success"
                }
            })
        ])
        res.status(200).json({
        message:"Caputered"
        })   
    }
    catch(e){
        console.log(e);
        res.status(411).json({
            message:"erroe while processing webhook"
        })
        
    }
})

app.listen(3003)