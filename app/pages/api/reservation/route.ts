import getCurrentUser from "@/app/actions/GetCurrUser";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function POST(req:Request
   
    ) {
      
    const body = await req.json();
    const {userId,listingId,startDate,endDate,totalPrice}= body;
    // return NextResponse.json({userId,listingId,startDate,endDate,totalPrice})
    const reservation = await prisma?.reservation.create({
        data:{
            userId,
            startDate,
            endDate,
            totalPrice,
            listingId
        }
    })
    return NextResponse.json(reservation);
}
