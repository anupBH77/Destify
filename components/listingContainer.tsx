"use client"
import React, { useEffect, useState } from 'react'
import Container from './container'
import Loader from './Loader';
import { User } from '@prisma/client';
import ListingCard from './listings/ListingCard';
interface listingContainerProps{
    listings:any,
    curUser:User | null 
}
const ListingContainer :React.FC<listingContainerProps>=({listings,curUser}) => {
    const [isLoading, setIsLoading]= useState(true);
    useEffect(()=>{
        if(listings)
        setIsLoading(false);
        if(!listings){
            setIsLoading(true);
        }
    },
    [listings])
    console.log(isLoading,listings)

  return (
    <div>
        {isLoading?(<Container>
            <Loader/>
            </Container>
            ):(
                <Container>
                <div className='  pt-24
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-3   
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8' >
                
                {listings?.map((val:any)=><ListingCard curUser={curUser} data={val} />)}
                </div>
                </Container>
        )}
    </div>
  )
}

export default ListingContainer