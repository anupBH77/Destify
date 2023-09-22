
import React from 'react'
import Container from '../container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import { User } from '@prisma/client'
import Categories from './Catagories'
import MobileSidebar from './MobileSideBar'
interface nevBarProps{
  curUser?: User | null
}
const NevBar :React.FC<nevBarProps>= ({curUser}) => {
 
  // console.log(curUser)
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
    <div
      className="
     
        py-4 
        border-b-[1px]
      "
    >
    <Container>
      <div 
        className="
          flex 
          flex-row 
          items-center 
          justify-between
          gap-3
          md:gap-0
        "
      >
        <div className=' hidden md:block'>
        <Logo />
        </div>
        <div>
          <MobileSidebar curUser= {curUser}/>
        </div>
        <Search />
        <div className=' hidden md:block'>
        <UserMenu  curUser={curUser} />
        </div>
      </div>
      <Categories/>
    </Container>
  </div>
  {/* <Categories /> */}
</div>
  )
}

export default NevBar