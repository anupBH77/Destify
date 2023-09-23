"use client"

import {Popup} from 'reactjs-popup'
import React, { useState } from 'react'
import Container from '../container'
import {CalendarHeartIcon,XIcon} from 'lucide-react'
import Modal from '../Modal'
import TripModal from '../TripModal'
import useTripModal from '@/app/hooks/useTripModal'
const Planner = () => {
    const Tripmodal =useTripModal();
    const [isClicked,setClicked]= useState(false);
    const handleClose=()=>{
        Tripmodal.onClose()
    }

  return (
    <div>
{!(Tripmodal.isOpen) && <div onClick={()=>{Tripmodal.onOpen()}} className='fixed bottom-10 right-10 z-[50000] bg-blue-500 flex p-2 rounded-full cursor-pointer hover:opacity-90 shadow-2xl  transition  ' >
<CalendarHeartIcon className=' h-5 w-5 m-2 text-white'/> 
</div>}
<TripModal modalIsOpen={Tripmodal.isOpen} title='filter' modalClose={handleClose} />
    </div>
  )
}

export default Planner