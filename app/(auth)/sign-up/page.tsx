import React from 'react'
import Image from 'next/image'
import SignUpForm from '@/components/forms/SignUpForm'
import Link from 'next/link'
import Socials from '@/components/shared/Socials'
import { assets } from '@/public/assets'
const page = () => {
  return (
    <div className="flex flex-col md:flex-row max-w-screen-xl mx-auto">
      {/* Left Section */}
      <div className="pt-6 px-4 space-y-[28px] md:w-1/2">
        <div>
          <Image src={assets.logo} alt="logo1" width={100} height={100} />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Create account</h1>
          <p className="text-gray-600">
            Effortless Member Management Starts Here – Create Your Account Today!
          </p>
          <SignUpForm />
        </div>
        <div className="">
          <Socials></Socials>
        </div>
        <div className="">
          <span className='text-sm text-gray-600'>Have an account? <Link href="/sign-in" className='text-gray-800 font-semibold hover:text-gray-500 active:text-gray-500'>Login</Link></span>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-[16px]">
        <div className="w-full max-w-[500px] p-8 bg-white relative">
          <Image
            src={assets.signUp}
            alt="sign up image"
            layout="intrinsic"
            width={1000}
            height={1000}
            className="object-cover rounded-lg"
          />
          <div className="text-white absolute bottom-[50px] p-[20px]">
            <h1 className='text-[20px] font-bold'>Join Membly</h1>
            <p className='text-[16px] wrap '>Managing Members, simplyfying connections</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
