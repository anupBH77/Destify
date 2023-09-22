"use client"
import { cn } from '@/lib/utils';
import axios from 'axios'
import { Montserrat } from 'next/font/google';
import { useRouter } from 'next/navigation';

import React from 'react'
const poppins = Montserrat ({ weight: '600', subsets: ['latin'] });

const Logo = () => {
  const router = useRouter();
  return (
    <div >
    <h1  onClick={()=>router.push('/')} className={cn("text-2xl font-bold hover:cursor-pointer",poppins.className)}>Destify</h1>
    </div>
  )
}

export default Logo