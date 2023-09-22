"use client"

import {Popup} from 'reactjs-popup'
import React, { useState } from 'react'
import Container from '../container'
import {CalendarHeartIcon,XIcon} from 'lucide-react'
import Modal from '../Modal'
const Planner = () => {
    const [isClicked,setClicked]= useState(false);
    const handleClose=()=>{
        setClicked(false)
    }
  return (
<div onClick={()=>{setClicked(true)}} className='fixed bottom-10 right-10 z-[50000] bg-blue-500 flex p-2 rounded-full cursor-pointer hover:opacity-90 shadow-2xl  transition  ' >
<CalendarHeartIcon className=' h-5 w-5 m-2 text-white'/> 
<Modal modalIsOpen={isClicked} title='filter' modalClose={handleClose}>
    </Modal>
</div>
  )
}

export default Planner