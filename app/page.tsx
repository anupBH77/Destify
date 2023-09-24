import ListingContainer from '@/components/listingContainer';
import Image from 'next/image'
import getCurrentUser from './actions/GetCurrUser';
import ListingCard from '@/components/listings/ListingCard';
import EmptyState from '@/components/EmptyState';
import getListnigs, { IListingsParams } from './actions/getListing';
export const dynamic = 'force-dynamic'
interface homeProps{
  searchParams: IListingsParams
}
export default async function Home({searchParams}:homeProps) {

  const listings = await getListnigs(searchParams);
  // const listings = await prisma?.listing.findMany();

  const currentUser=await getCurrentUser();
  console.log(listings)
  return (
    <main>
      {/* {listings && listings.map(li=><ListingCard curUser={currentUser} data={li}/>)} */}
      {listings &&(listings.length>0? <ListingContainer listings={listings} curUser={currentUser}></ListingContainer>:<EmptyState title='no rentable listings found. ' subtitle='looks like no has listed there property yet'  />)}
    </main>
  )
}
