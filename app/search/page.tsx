import ListingContainer from '@/components/listingContainer';

import EmptyState from '@/components/EmptyState';
import getListnigs, { IListingsParams } from '@/app/actions/getListing';
interface homeProps{
  searchParams: IListingsParams
}
async function Page({searchParams}:homeProps) {

  const listings = await getListnigs(searchParams);
  // const listings = await prisma?.listing.findMany();

  
  console.log(listings)
  return (
    <main>
      {/* {listings && listings.map(li=><ListingCard curUser={currentUser} data={li}/>)} */}
      {listings &&(listings.length>0? <ListingContainer listings={listings} ></ListingContainer>:<EmptyState title='no rentable listings found. ' subtitle='looks like no has listed there property yet'  />)}
    </main>
  )
}
export default Page