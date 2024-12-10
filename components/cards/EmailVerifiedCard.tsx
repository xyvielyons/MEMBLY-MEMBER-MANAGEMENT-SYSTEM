'use client'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import {Button} from "@nextui-org/react";
import { FaArrowRight } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
 const EmailVerifiedCard = () => {
    const router = useRouter()
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
        <div className="">
            <Card className='max-w-[600px]'>
                <CardHeader>
                    <CardTitle className="text-xl flex items-center justify-center text-green-600">Email Verified</CardTitle>
                    <CardDescription className='flex items-center justify-center text-center'>Your email has been successfully verified.</CardDescription>
                </CardHeader>
                <CardContent className='flex items-center justify-center'>
                    <div className="w-[200px]">
                        <DotLottieReact
                        src="/MessageSent.json"
                        loop
                        autoplay
                        width={1024}
                        height={1024}
                        
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="w-full">
                        <Button onClick={()=>router.push('/')} startContent={<FaArrowRight />} className='bg-gray-900 text-slate-50 w-full' radius="sm">Go to Home</Button>
                    </div>
                </CardFooter>
            </Card>

        </div>
    
    </div>
  )
}

export default EmailVerifiedCard