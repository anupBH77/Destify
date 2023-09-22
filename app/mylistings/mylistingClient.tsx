"use client"
import Heading from '@/components/Heading';
import Container from '@/components/container';
import ListingCard from '@/components/listings/ListingCard';
import { Listing, Reservation, User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast';
import useLoading from '../hooks/useLoading';
import Loader from '@/components/Loader';
interface TripsClientProps {
    myListings: Listing[],
    currentUser: User | null ,
  } 
const MyListingClient : React.FC<TripsClientProps>=({myListings,currentUser}) => {
    const router = useRouter();
    const loading = useLoading();
    const onRemove =async (id:string) => {
       console.log("onremove clicked")
        loading.setLoading(true);
        const res= await axios.delete(`pages/api/listings/${id}`)
        loading.setLoading(false)
        router.refresh();

        console.log(res.data);
       
        //   router.refresh();
       
        //   toast.error('something went wrong')
     
        
      };
    
  return (
    <Container>
        {loading.isLoading?<Loader/>:(
            <div>

            <Heading
            title="Your listings"
      subtitle="manage all the listings you've listed so far."
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
      {myListings.map((listing) => (
          <ListingCard
          key={listing.id}
          data={listing}
          curUser={currentUser}
          onCancel = {onRemove}
          totalPrice={listing.price} 
          actionLabel='Unlist'       
          />
          ))}
    </div>
          </div>
  )}
  </Container>
 );
}

export default MyListingClient