// "use client"
import getIndividualListing from '@/app/actions/getIndividualListing'
import ClientOnly from '@/components/clientOnly'
import React from 'react'
import ListingClient from './listingClient'
import getCurrentUser from '@/app/actions/GetCurrUser'
import useLoading from '@/app/hooks/useLoading'
import Loader from '@/components/Loader'
import getReservation from '@/app/actions/getReservation'
interface IParams{
    listingid:string
}
const Page = async ({ params }: { params: IParams }) => {
  

    const currentUser =await getCurrentUser()
    const {listingid}= params
    console.log(listingid)
    const listing = await getIndividualListing({listingid})
    const {getReseervationRanges} = getReservation()
    const  ReservedDateRanges= await getReseervationRanges(listingid)
  return (
    
    <ClientOnly>
      { ((listing && ReservedDateRanges)?( <ListingClient
      listing={listing}
      reservationDateRanges={ReservedDateRanges}
      currentUser={currentUser}
    />):(<Loader/>))}
     
   
  </ClientOnly>

  )
}

export default Page