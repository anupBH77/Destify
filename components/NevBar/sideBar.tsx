"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from 'next/font/google'
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, UserCircle2Icon, VideoIcon ,} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentaModal from "@/app/hooks/useRentModal";

const poppins = Montserrat ({ weight: '600', subsets: ['latin'] });



export const Sidebar = ({curUser}:{curUser:User | null | undefined}) => {
  const loginmodal = useLoginModal()
  const registermodal =useRegisterModal()
  const rentmodal = useRentaModal()
  const router = useRouter()
  let routes: {
    label: string;
    icon?: React.ComponentType; // Include the appropriate type for icon components if needed
    onclick: any;
    color?: string;
  }[] 
if(curUser){ 
  routes= [
  {
    label: 'List your property',
    // icon: LayoutDashboard,
    onclick:()=>{rentmodal.onOpen()},
   
  },
  {
    label: 'Verify',
   
    onclick:()=>{},
    color: "text-violet-500",
  },
  {
    label: 'Upcoming trips',
    
    color: "text-pink-700",
    // href: '/image',
    onclick :()=>{router.push('/bookings')}
  },
  {
    label: 'Favourites',
    // icon: VideoIcon,
    color: "text-orange-700",
    // href: '/video',
    onclick:()=>{router.push('/favourites')}
  },
  {
    label: 'Manage reservations',
    // icon: Music,
    color: "text-emerald-500",
    onclick:()=>{router.push('/reservations')}

  },
  {
    label: 'Manage listings',
    // icon: Code,
    color: "text-green-700",
    onclick:()=>{router.push('/mylistings')}

  },
  {
    label: 'Logout',
    // icon: Settings,
    onclick:()=>{signOut()}

  },
];}
else{
  routes=[ {
    label: 'Login',
    // icon: Settings,
    onclick: ()=>{loginmodal.onOpen()}
  },
  {
    label: 'Register',
    // icon: Settings,
    onclick: ()=>{registermodal.onOpen()},
  },
]
}
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-14">
          <div className="relative h-8 w-8 mr-4">
            {curUser?.image ?<Image fill alt="Logo" src={curUser.image} />:<UserCircle2Icon className=" h-5 w-5"/>}
            
          </div>
          <h1 onClick={()=>router.push('/')} className={cn("text-2xl font-bold", poppins.className)}>
            Destify
          </h1>
        </Link>
        <div className="space-y-1">

          {routes.map((route) => (
            <div
             
          onClick={route.onclick}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
               
              )}
            >
              <div className="flex items-center flex-1">
               
                {route.label}
              </div>
              </div>
          ))}
        </div>
      </div>
     
    </div>
  );
};