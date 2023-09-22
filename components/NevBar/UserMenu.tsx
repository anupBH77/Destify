"use client"
import React, { useCallback, useState } from 'react'
import { MenuIcon, UserCircle2Icon } from "lucide-react"
import { MenuItem } from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import Avatar from '../avatar';
import useRentaModal from '@/app/hooks/useRentModal';
import getIndividualListing from '@/app/actions/getIndividualListing';
import getReservation from '@/app/actions/getReservation';
import { useRouter } from 'next/navigation';
interface useerMenuProps{
    curUser: User | null | undefined
    
}
const UserMenu :React.FC<useerMenuProps>=({curUser}) => {
    const router = useRouter() 
    const rentModal= useRentaModal()
    const {onOpen,onClose,isOpen:modalopen}= useRegisterModal();
    const [isOpen, setOpen] = useState(false);
    const handleOpen = useCallback(() => {
        setOpen(value => !value)
    }, [])
    const loginModal= useLoginModal();
;
    
    return (
        <div className='relative'>

            <div className='  border-[1px]  border-neutral-200    items-center    rounded-full  cursor-pointer  hover:shadow-md  transition' onClick={handleOpen}>
                <Avatar src={curUser?.image}/>
            </div>
            {isOpen?(
                 <div className=" absolute  rounded-xl  shadow-md  w-[40vh]  bg-white  overflow-hidden  right-0  top-12  text-sm ">
                    {curUser?(
                         <div className="flex flex-col cursor-pointer">
                        
                         <MenuItem
                                label="Profile"
                             onClick={()=>{loginModal.onOpen()}}
                         />
                         <MenuItem
                             label="verify"
                             onClick={()=>{onOpen(),console.log("is clicked",modalopen)}}
                         />
                         <MenuItem
                             label="Upcoming trips"
                             onClick={()=>{router.push('/bookings')}}
                         />
                         <MenuItem
                             label="favourites"
                             onClick={()=>{onOpen(),console.log("is clicked",modalopen)}}
                         />
                         
                        
                         <MenuItem
                             label="List your property"
                             onClick={()=>{rentModal.onOpen()}}
                         />
                         <MenuItem
                             label="Manage reservations"
                             onClick={()=>{router.push('/reservations')}}
                         />
                         <MenuItem
                             label="Manage listings"
                             onClick={()=>{router.push('/mylistings')}}
                         />
                         <MenuItem
                             label="logout"
                             onClick={()=>{signOut()}}
                         />
                         </div> 
                    ): (

                 <div className="flex flex-col cursor-pointer">
                        
                    <MenuItem
                        label="Login"
                        onClick={()=>{loginModal.onOpen()}}
                    />
                    <MenuItem
                        label="Sign up"
                        onClick={()=>{onOpen(),console.log("is clicked",modalopen)}}
                    />
                    </div> 
                    )}
            </div>

            ):null}
            
    </div>
    )
}

export default UserMenu