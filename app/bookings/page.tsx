import getReservation from '../actions/getReservation';
import getCurrentUser from '../actions/GetCurrUser';
import ClientOnly from '@/components/clientOnly';
import EmptyState from '@/components/EmptyState';
import BookingClient from './BookingClient';

 async function Page()  {

   
    const curUser = await getCurrentUser()
    const {getUserReservations} = getReservation();
    const reservationsData = await getUserReservations(curUser?.id);
 
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
    
    
      if (reservationsData?.length === 0) {
        return (
          <ClientOnly>
            <EmptyState
              title="there are no trip."
              subtitle="Looks like you have not planned a trip yet.."
            />
          </ClientOnly>
        );
      }
    if(reservationsData && curUser)
      return (
        <ClientOnly>
          <BookingClient
            reservations={reservationsData}
            currentUser={curUser}
          />
        </ClientOnly>
      );
    
}
export default Page
