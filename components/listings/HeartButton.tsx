'use client';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

// import { SafeUser } from "@/app/types";
import { User } from "@prisma/client";
import useFavourites from "@/app/hooks/usefavourites";
import { useRouter } from "next/navigation";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useCallback, useState } from "react";
import useLoading from "@/app/hooks/useLoading";



interface HeartButtonProps {
  listingId: string
  currentUser: User | null 
}

const HeartButton: React.FC<HeartButtonProps> = ({ 

  listingId,
  currentUser
}) => {
  const loading = useLoading();
  
  const {hasFavourited,toggleFavourite} = useFavourites({
    listingId,
    currentUser
  });
   

  return (
    <div 
      onClick={ async ()=>

        { 
          const resp =  await toggleFavourite();

      }}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
      
    >
      <AiOutlineHeart
        size={28}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <AiFillHeart
        size={24}
        className={
          hasFavourited? 'fill-rose-500' : 'fill-neutral-500/70'
        }
       
      />
    </div>
   );
}
 
export default HeartButton;