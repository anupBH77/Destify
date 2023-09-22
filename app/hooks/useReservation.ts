import { User } from "@prisma/client";

import React, { FC, useCallback } from "react";
import useLoginModal from "./useLoginModal";
import axios from "axios";
// import useLoding from "./useLoading";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
// import { useRouter } from "next/navigation";

interface useReservationProps{
    currentUser:User | null,
    listingId:string | null,
    startDate: Date | undefined,
    endDate:Date | undefined
    totalPrice:number
}

    
    async function  addToReserve({currentUser,listingId,startDate,endDate,totalPrice}:useReservationProps) {
        // const loginModal = useLoginModal();
        // const router = useRouter()
        console.log(currentUser,listingId,listingId,startDate,endDate);
      
        if(!listingId){
            return toast.error('hotel not found.')
            
        }
        const reservationPayload ={userId:currentUser?.id,listingId,startDate,endDate,totalPrice}
        console.log(reservationPayload)
        try{
            // Loading.setLoading(true);
            const reservation = await axios.post('/pages/api/reservation',reservationPayload)
            console.log(reservation)
            // Loading.setLoading(false);
            toast.success('reservation completed.')
            return reservation;
    
        }catch{
            // Loading.setLoading(false);
            toast.error('action could not be completed');
        }
        
    }
   
    


export default addToReserve