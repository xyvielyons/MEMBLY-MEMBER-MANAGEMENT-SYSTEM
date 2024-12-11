import React from 'react'
import Image from 'next/image'
import { assets } from '@/public/assets'
import NavButtons from '../NavButtons'

const Navbar = async({session}:{session:any}) => {

  return (
    <div className='bg-white justify-between w-full h-[50px] flex items-center p-[16px] border-b-1 border-gray-200'>
        <div className="">
          <Image src={assets.logo} width={100} height={100} alt="logo"></Image>
        </div>
        <div className="flex gap-4 items-center">
          <div className="w-[30px] h-[30px]">
              <Image className='rounded-md' src={session.user.image} width={100} height={100} alt="user"></Image>
          </div>
          {session.user.role === 'admin' && (
            <div className="">
            <NavButtons></NavButtons>
            </div>
          )}
          
        </div>
        
    </div>
  )
}

export default Navbar