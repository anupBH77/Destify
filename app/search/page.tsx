import ListingContainer from '@/components/listingContainer';
import Image from 'next/image'

import ListingCard from '@/components/listings/ListingCard';
import EmptyState from '@/components/EmptyState';
import getListnigs, { IListingsParams } from '@/app/actions/getListing';
interface homeProps{
  searchParams: IListingsParams
}
export default async function Home({searchParams}:homeProps) {

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
