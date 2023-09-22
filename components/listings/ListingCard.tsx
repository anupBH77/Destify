"use client"
import { Listing, Reservation, User } from "@prisma/client";
import Image from "next/image";
import React, { useCallback, useMemo } from "react";
import HeartButton from "./HeartButton";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import CButton from "../Button";
import {IndianRupeeIcon} from 'lucide-react'
import { BiRupee } from "react-icons/bi";

interface listingCardProps {
  curUser: User | null,
  data: Listing,
  reservation?: Reservation,
  onCancel?: (id: string) => void,
  totalPrice?: number | undefined
  actionLabel?: string,
  currentUser?: User | null;


}
const ListingCard: React.FC<listingCardProps> = ({ data,
  curUser
  , reservation,
  actionLabel,
  currentUser,
  totalPrice,
  onCancel



}) => {

  const router = useRouter();
  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);
  const handleCancel = useCallback(
    () => {

      if (onCancel && data) {
        console.log('oncancel started')

        onCancel(data.id)
      }
    }, [])

  return (
<div className={`${reservation?"flex flex-col":""} `}>
    <div
      className="col-span-1 cursor-pointer group"
      >
      <div className="flex flex-col gap-2 w-full">

        <div
        className="
        aspect-square 
        w-full 
        relative 
        overflow-hidden 
        rounded-xl
        "
        >
          <Image
                onClick={() => router.push(`/listing/${data.id}`)}

            fill
            className="
            object-cover 
            h-full 
            w-full 
            group-hover:scale-110 
            transition
            "
            src={data.imageSrc}
            alt="Listing"
            />
          <div className="
            absolute
            top-3
            right-3
            ">
            <HeartButton
              listingId={data.id}
              currentUser={curUser}
              />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {data.locationValue}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          {totalPrice ? (<div className="font-semibold">
             {totalPrice} rupees
          </div>) : (
            <div className="font-semibold">
               {data.price} rupees
            </div>
          )}

          {!reservation && (
            <div className="font-light">night</div>
            )}
        </div>

      </div>
    </div>
    { actionLabel && (
          <CButton
          small
          label={actionLabel}
          onClick={handleCancel}
          />
          )}
      </div>
  );
  // );
}
export default ListingCard