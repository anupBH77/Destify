import getCurrentUser from "@/app/actions/GetCurrUser";
import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";


export async function  POST(req:Request,res:NextApiResponse){
    const curUser = await getCurrentUser();
    const getUpdatedUser = async()=>{
        const user=await prisma?.user.update({
            where:{
                id:curUser?.id
            },
            data:{
                favoriteIds:favoriteIds
            }
        })
        return user;
    }
  
    const favoriteIds= curUser?.favoriteIds
    const body= await req.json() ;
    const {action,listingId} = body

    if(action == "POST"){
        favoriteIds?.push(listingId)
        const user=await getUpdatedUser();
        return NextResponse.json(user);
    }

    else if(action=="DELETE"){
        favoriteIds?.splice(favoriteIds.indexOf(listingId),1);
        const user=await getUpdatedUser()
        return NextResponse.json(user)
    }
   

}