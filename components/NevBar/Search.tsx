"use client"
import getIndividualListing from '@/app/actions/getIndividualListing'
import { SearchIcon } from 'lucide-react'
import React, { useState } from 'react'
// import Router from 'next/navigation'
import queryString from 'query-string'
import { useRouter } from 'next/navigation'
const Search = () => {
  const [input,setInput]= useState('')
  const router= useRouter();
  const onSubmit=()=>{
    const query= {title:input}
   const url =queryString.stringifyUrl({
    url:'/',
    query:query

   },{skipNull:true})
   router.push(url)
    

   
  }
  return (
    <div className='flex justify-around outline outline-1  outline-gray-300  px-1 py-2 w '>
        <input   className='outline-none w-[80%]' placeholder='Search by hotels' value={input} onChange={(e)=>setInput(e.target.value)}></input>
        <button className='w-[20%]'>

        <SearchIcon onClick={()=>{onSubmit()}} className='h-4 w-4 m-1 text-blue-500  '></SearchIcon>
        </button>
    </div>
  )
}

export default Search