import getCurrentUser from "@/app/actions/GetCurrUser";
// import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { title } from "process";
import prisma from "@/app/lib/prismadb";
export async function POST(request:Request){
    const curUser=await getCurrentUser();
    if(!curUser){
        return NextResponse.error();
    }
    const body = await request.json();
    const {
           
    title,
    description ,
    imageSrc ,
    createdAt ,
    category  ,
    roomCount ,
    bathroomCount ,
    guestCount ,
    location ,
    price ,
}=body
const newListing= await prisma?.listing.create({
  data: { userId:curUser?.id,        
    title,
    description ,
    imageSrc ,
    createdAt ,
    category  ,
    roomCount ,
    bathroomCount ,
    guestCount ,
    locationValue:location.name ,
    price: Number(price)}
})
return NextResponse.json(newListing);
}
