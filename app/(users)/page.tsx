import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
const page = () => {
  return (
    <div className="w-full h-screen p-2">
        <div className="w-full h-screen flex items-center justify-center p-2">
        <Card className='w-[500px]'>
        <CardHeader>
            <CardTitle className='text-[24px] font-bold text-gray-800'>Member Profile</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="">
                <div className=""></div>
            </div>
        </CardContent>
        </Card>
        </div>
    </div>
  )
}

export default page