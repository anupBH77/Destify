import prisma from "../lib/prismadb"
interface listingProps{
    listingid:string | null | undefined
    
}
export default async function getIndividualListing({listingid}:listingProps) {
    if(!listingid){
        return null
    }
    const listing =await prisma?.listing.findUnique({
        where:{
            id:listingid
        },
        include:{
            user:true,
        }
    })
    if(!listing){
        return null
    }
    return listing
}