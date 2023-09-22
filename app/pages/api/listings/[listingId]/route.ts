import getCurrentUser from "@/app/actions/GetCurrUser"
import { NextResponse } from "next/server";
import { toast } from "react-hot-toast";

interface IParams{
    listingId:string
}
export async function DELETE(req:Request,{params}:{params:IParams}){
   const  curUser=await getCurrentUser();
   const {listingId}= params;
   try{

       const deletedListing = await prisma?.listing.delete({
        where:{
            id:listingId,
            userId:curUser?.id
        }
    })
    return NextResponse.json(deletedListing)
   }catch{
    return NextResponse.json("not found")
   }
}