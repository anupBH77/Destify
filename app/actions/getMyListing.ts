import React from 'react'
import prisma from '../lib/prismadb'
import getCurrentUser from './GetCurrUser'
const getMyListing = async () => {
    const curUser = await getCurrentUser()
    const response = await prisma.listing.findMany({
        where:{
            userId:curUser?.id
        }
    })
    return response;
  
 
}

export default getMyListing