"use client"
import getIndividualListing from '@/app/actions/getIndividualListing'
import { SearchIcon } from 'lucide-react'
import React from 'react'

const Search = () => {
  const onSubmit= async()=>{
    const f= "gfgrgr"
    console.log("clicker")
    const get = await getIndividualListing({listingid:f})
    console.log(get)
  }
  return (
    <div className='flex justify-around outline outline-1  outline-gray-300  px-1 py-2 w '>
        <input   className='outline-none w-[80%]' placeholder='Search by hotels'></input>
        <button className='w-[20%]'>

        <SearchIcon onClick={()=>{onSubmit}} className='h-4 w-4 m-1 text-blue-500  '></SearchIcon>
        </button>
    </div>
  )
}

export default Search