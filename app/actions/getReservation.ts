import { DateRange } from "react-day-picker"
import prisma from "@/app/lib/prismadb";

const getReservation=() =>{
    
      const getReseervationRanges=async(listingId:string)=>
      {
        const reservationDates= await prisma?.reservation.findMany({
            where:{
                listingId
            },
            select:{
                startDate:true,
                endDate:true
            }
        })
        const ReservedDateRanges=reservationDates?.map((date)=>{
            return <DateRange>{from:date.startDate,
                to:date.endDate,
            }
        })
        return ReservedDateRanges
      }
  
    const getUserReservations=async (userId?:string ,listerId?:string,listingId?:string)=>{
        const query:any = {};
        console.log("in the getreservation",listerId,userId,userId);
        if (listingId) {
          query.listingId = listingId;
        };
    
        if (userId) {
          query.userId = userId;
        }
    
        if (listerId) {
          query.listing = { userId: listerId };
        }
    
            const userReservations = await prisma.reservation.findMany({
                where:query,
                include:{
                    listing:true
                }
            })
            return userReservations;
        
    }
    return {getReseervationRanges,getUserReservations}
}
export default getReservation;