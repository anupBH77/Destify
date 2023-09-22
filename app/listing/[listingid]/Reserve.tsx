"use client"
import React, { useEffect, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
 
import { cn } from "@/lib/utils"

import { Calendar } from "@/components/ui/calendar"
import { Button } from '@/components/ui/button';
import CButton from '@/components/Button';
import { User } from '@prisma/client';
import getReservation from '@/app/actions/getReservation'
import addToReserve from '@/app/hooks/useReservation';
import useLoginModal from '@/app/hooks/useLoginModal';
import useLoading from '@/app/hooks/useLoading';
import getIndividualListing from '@/app/actions/getIndividualListing'
import { useRouter } from 'next/navigation'

interface reserveProps{
    price : number,
    currentUser:User | null,
    listingId:string,
    reservationDateRanges:DateRange[] | undefined 
   
}


const Reserve : React.FC<reserveProps>= ({price,currentUser,listingId,reservationDateRanges}) => {
    const loginModal = useLoginModal();
    const loading = useLoading();
    const router = useRouter()
    const [totalPrice,setTotalPrice]= useState(price)
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: undefined,
        to: undefined,
      })
      const onReserve=async ()=>{
                // const r= await getIndividualListing({listingid:listingId});
                // console.log(r)

    //  const reser=await getReservation({listingId});
    //  console.log(reser)
        const reservationData= {
            currentUser,
            startDate:date?.from,
            endDate:date?.to,
            totalPrice,
            listingId
        }
       loading.setLoading(true)
       const d =await addToReserve(reservationData) ;
       loading.setLoading(false)
       router.refresh();
      }
      useEffect(()=>{
        const loader = async()=>{
          // const r= await getCurrentUser();
          // console.log(r);
        }
        loader()
        if(date){
            if(date.from!=undefined && date.to!=undefined){
                const date1 = new Date(date.from);
                const date2 = new Date(date.to);
                const diffTime = date2.getTime()- date1.getTime()
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                setTotalPrice(diffDays*price)
                console.log(diffDays)
            }
        }
      },[date])

    // const loading = useLoding();
    return (

    <div 
    className="
    bg-white 
      rounded-xl 
      border-[1px]
    border-neutral-200 
      overflow-hidden
    "
  >
    {/* {loading.isLoading&&<Loader/>} */}
    <div className="
    flex flex-row items-center gap-1 p-4">
      <div className="text-2xl font-semibold">
         {price} 
      </div>
      <div className="font-light text-neutral-600">
       rupees night
      </div>
    </div>
    <hr />
    <div className=' py-4 flex justify-center'>

  <Popover>
     <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cn(
            "w-[300px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
            )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
              date.to ? (
              <>
                {format(date.from, "LLL dd, y")} -{" "}
                {format(date.to, "LLL dd, y")}
                </>
            ) : (
              format(date.from, "LLL dd, y")
            )
            ) : (
                <span>Pick a date</span>
                )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
        disabled={reservationDateRanges?reservationDateRanges:undefined}
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={(val)=>{setDate(val)}}
          numberOfMonths={2}
          className='w-full'
        />
      </PopoverContent>
    </Popover>
        </div>
    <hr />
    <div className="p-4">
      <CButton 
        // disabled={disabled} 
        label="Reserve" 
        onClick={onReserve}
        />
        </div>
    <hr />
    <div 
      className="
      p-4 
      flex 
      flex-row 
      items-center 
      justify-between
      font-semibold
      text-lg
      "
      >
      <div >
        Total
      </div>
      <div>
        {totalPrice} rupees
      </div>
    </div>
  </div>
    )
   
  
}

export default Reserve