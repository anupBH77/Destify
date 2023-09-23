"use client"
import Heading from '@/components/Heading';
import Container from '@/components/container';
import ListingCard from '@/components/listings/ListingCard';
import { Reservation, User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast';
import useLoading from '../hooks/useLoading';
import Loader from '@/components/Loader';
interface TripsClientProps {
    reservations: Reservation[],
    currentUser: User | null ,
  } 
const BookingClient : React.FC<TripsClientProps>=({reservations,currentUser}) => {
    const router = useRouter();
    const loading = useLoading();
    const onCancel =async (id:string) => {
       console.log(id);
        loading.setLoading(true);
        const res= await axios.delete(`pages/api/reservation/${id}`)
        router.refresh();
        loading.setLoading(false)

        console.log(res.data);
       
        //   router.refresh();
       
        //   toast.error('something went wrong')
     
        
      };
    
  return (
    <Container>
        {loading.isLoading?<Loader/>:(
            <div>

            <Heading
            title="Trips"
      subtitle="Where you've been and where you're going"
      />
    <div 
    className="
    mt-10
    grid 
    grid-cols-1 
    sm:grid-cols-2 
    md:grid-cols-3 
    lg:grid-cols-4
    xl:grid-cols-5
    2xl:grid-cols-6
    gap-8
    "
    >
      {reservations.map((reservation) => (
          <ListingCard
          key={reservation.id}
          data={reservation.listing}
          reservation={reservation}
          curUser={currentUser}
          onCancel = {onCancel}
          totalPrice = {reservation.totalPrice}  
          actionLabel='cancel booking'       
          />
          ))}
    </div>
          </div>
  )}
  </Container>
 );
}

export default BookingClient