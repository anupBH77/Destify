'use client';

import Image from "next/image";

import useCountries from "@/app/hooks/useCountries";
// import { SafeUser } from "@/app/types";
import Heading from "@/components/Heading";
import HeartButton from "@/components/listings/HeartButton";
import { User } from "@prisma/client";

// import Heading from "../Heading";
// import HeartButton from "../HeartButton";

interface ListingHeadProps {
  title: string;
  country: string;
  imageSrc: string;
  id: string;
  currentUser: User | null
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  country,
  imageSrc,
  id,
  currentUser
}) => {
  const { getByValue } = useCountries();

  const location = country

  return ( 
    <>
      <Heading
        title={title}
        subtitle={`${location}`}
      />
      <div className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
      >
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
          <HeartButton 
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
   );
}
 
export default ListingHead;