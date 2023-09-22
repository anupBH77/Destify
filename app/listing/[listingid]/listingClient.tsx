"use client"
import Container from '@/components/container'
import React, { useEffect, useMemo } from 'react'
import ListingHead from './ListingHead'
import { Listing, User } from '@prisma/client'
import { Interface } from 'readline'
import ListingInfo from './ListingInfo'
import { categories } from '@/components/NevBar/Catagories'
import Button from '@/components/Button'
import Reserve from './Reserve'
import useLoading from '@/app/hooks/useLoading'
import Loader from '@/components/Loader'
import { DateRange } from 'react-day-picker'

interface ListingClientProps{
    listing: Listing & {user:User}  
      reservationDateRanges: undefined | DateRange[] 
      currentUser: User | null
}
const ListingClient :React.FC<ListingClientProps>= ({listing,currentUser,reservationDateRanges}) => {
  const loading = useLoading();
    const category = useMemo(() => {
        return categories.find((items) => 
         items.label === listing.category);
     }, [listing.category]);
    //  console.log(reservationDateRanges);


  return (
    
  
    

      <Container>
        {loading.isLoading? <Loader/>:(
      <div 
        className="
        max-w-screen-lg 
          mx-auto
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            country={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
            />
          <div 
            className="
            grid 
            grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
              "
              >
            <ListingInfo
            user={listing.user}
            category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              country={listing.locationValue}
            />
            <div 
            className="
            order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
              >
           <div>
            <Reserve price ={listing.price} currentUser={currentUser} listingId={listing.id} reservationDateRanges= {reservationDateRanges}/>
           </div>
            </div>
          </div>
        </div>
      </div>
            ) }
    </Container>
          
  )
}

export default ListingClient