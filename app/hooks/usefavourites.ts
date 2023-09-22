import { Listing, Prisma, User } from "@prisma/client";
import prisma from '../lib/prismadb'
import axios from "axios";
import { useCallback } from "react";
import {useRouter} from "next/navigation";
import useLoginModal from "./useLoginModal";

interface useFavouritesProps{
    listingId:Listing["id"],
    currentUser:User | null 
}
const useFavourites= ({listingId,currentUser}:useFavouritesProps)=>{
  const loginModal= useLoginModal()
    const router= useRouter()
  
    const favId= currentUser?.favoriteIds
    const payload = {listingId,action:""}
 const hasFavourited= favId?.includes(listingId);
 const toggleFavourite = useCallback( async ()=>{
  if(!currentUser){
    console.log("im here bir")
    return loginModal.onOpen();
  }
  if(hasFavourited){
    payload.action="DELETE"
    console.log(hasFavourited,payload.action)
    const removefav = await axios.post(`/pages/api/favourite`,payload);
    router.refresh()
  }
  else{
    payload.action="POST"
    console.log(hasFavourited,payload.action)
    const addTofav = await axios.post(`/pages/api/favourite`,payload);
    router.refresh()
  }
 },[listingId,hasFavourited,currentUser,router])

 
 return {
    hasFavourited,
    toggleFavourite
}
}
export default useFavourites