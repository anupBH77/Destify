import React from 'react'
import getReservation from '../actions/getReservation'
import getCurrentUser from '../actions/GetCurrUser';
import ClientOnly from '@/components/clientOnly';
import EmptyState from '@/components/EmptyState';
import ReservationClient from './ReservationClient';

const Page = async () => {
  const curUser= await getCurrentUser()
  const {getUserReservations}= getReservation();
  const myReservations = await getUserReservations(undefined,curUser?.id);
console.log("in the page",curUser,myReservations)
   if (!curUser) {
        return (
          <ClientOnly>
            <EmptyState
              title="Unauthorized"
              subtitle="Please login"
            />
          </ClientOnly>
        );
      }
    
    
      if (myReservations?.length === 0 || !myReservations) {
        return (
          <ClientOnly>
            <EmptyState
              title="there are no reservation."
              subtitle="Looks like no one has reserved your listing.."
            />
          </ClientOnly>
        );
      }
    if(myReservations && curUser)
      return (
        <ClientOnly>
          <ReservationClient
            reservations={myReservations}
            currentUser={curUser}
          />
        </ClientOnly>
      );
    
}
export default Page
