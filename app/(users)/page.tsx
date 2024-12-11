import React from 'react'
import Navbar from '@/components/shared/Navbar'
import {auth} from '@/auth'
import { headers } from "next/headers";
import { assets } from '@/public/assets';
import Image from 'next/image';
import UserInformation from '@/components/cards/UserInformation';
import ProfilePictureChanger from '@/components/ProfilePictureChanger';
const page = async() => {
  const session:any = await auth.api.getSession({
		headers:await headers()
	})
  if(!session){
    return <h1>Loading....</h1>
  }
  return (
    <div className="w-full">
        <div className="">
          <Navbar session={session}></Navbar>
        </div>
        <div className="flex relative flex-col">
          <div className="p-[16px]">
            <Image src={assets.hero} alt="hero" className='w-full object-cover h-[200px] rounded-md opacity-85'></Image>
          </div>
          <div className="absolute md:left-[50px] left-[30px] bottom-[-70px] w-[120px] h-[120px] md:w-[150px] md:h-[150px]">
            <Image src={session?.user.image} width={150} height={150} alt="image" className='rounded-sm md:w-[150px] md:h-[150]'></Image>
          </div>
          <div className="absolute md:left-[210px] md:bottom-[-50px] left-[155px] bottom-[-50px]">
            <h1 className='text-xl font-bold text-gray-800'>{session?.user.name}</h1>
            <p className='md:text-md text-sm text-gray-600'>{session?.user.email}</p>
          </div>
          <div className="absolute md:left-[50px] md:bottom-[-100px] left-[20px] bottom-[-100px]">
              <ProfilePictureChanger session={session}></ProfilePictureChanger>
          </div>
        </div>
        <div className="">
          <UserInformation session={session}></UserInformation>
        </div>
    </div>
  )
}

export default page