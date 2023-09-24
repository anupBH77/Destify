import ClientOnly from '@/components/clientOnly'
import './globals.css'

import type { Metadata } from 'next'
import { Inter, Nunito } from 'next/font/google'
import NevBar from '@/components/NevBar/NevBar'
import Planner from '@/components/tripPlanner/Planner'
import RegisterModal from '../components/registerModal'

import { Toaster } from 'react-hot-toast'
import LoginModal from '@/components/LoginModal'
import RentModal from '@/components/RentModal'

import Loader from '@/components/Loader'
import { cn } from '@/lib/utils'
import getCurrentUser from './actions/GetCurrUser'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Destify',
  description: 'hotel booking app',
}
const font = Nunito({subsets:["latin"]})
export default  async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currUser= await getCurrentUser();
  
  {console.log(currUser)}
  return (
    <html lang="en">
    <body className={cn(font.className," ")}>
      <ClientOnly>
       
        <Toaster/>
        <NevBar curUser={currUser} />
        <Planner/>
        <LoginModal/>
       <RegisterModal/>
       <RentModal/>
      </ClientOnly>
      <div className="pb-20 pt-28">
        
        {children}
      </div>
    </body>
  </html>
  )
}
