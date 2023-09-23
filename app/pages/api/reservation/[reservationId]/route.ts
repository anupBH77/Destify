import getCurrentUser from "@/app/actions/GetCurrUser";
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";
import { Reservation } from "@prisma/client";
// import getCurrentUser from "@/app/actions/getCurrentUser";
// import prisma from "@/app/libs/prismadb";

interface IParams {
  reservationId: string |null |undefined;
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid ID');
  }
console.log(reservationId,"about to deleter it ")
  const reservation = await prisma?.reservation.delete({
    where: {
     id:reservationId
      ,
      OR: [
       
        { userId:currentUser.id },
        { listing:{userId:currentUser.id} }
      ]
    }
  });



  return NextResponse.json(reservation);
}