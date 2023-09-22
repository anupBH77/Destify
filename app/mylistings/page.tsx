import getReservation from '../actions/getReservation';
import getCurrentUser from '../actions/GetCurrUser';
import ClientOnly from '@/components/clientOnly';
import EmptyState from '@/components/EmptyState';
import BookingClient from './mylistingClient';
import getMyListing from '../actions/getMyListing';
import MyListingClient from './mylistingClient';

 async function Page()  {

   
    const curUser = await getCurrentUser()
    const MyListings=await getMyListing();

 
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
    
    
      if (MyListings?.length === 0) {
        return (
          <ClientOnly>
            <EmptyState
              title="there are no listings you made."
              subtitle="Looks pretty empty."
            />
          </ClientOnly>
        );
      }
    if(MyListings && curUser)
      return (
        <ClientOnly>
          <MyListingClient
            myListings={MyListings}
            currentUser={curUser}
          />
        </ClientOnly>
      );
    
}
export default Page
