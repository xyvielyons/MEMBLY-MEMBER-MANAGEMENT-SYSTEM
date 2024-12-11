'use client'
import React from 'react'
import {
    useDisclosure,
} from "@nextui-org/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from '@nextui-org/react'
import LogoutModal from '../forms/LogoutModal';
import DeleteModal from '../forms/DeleteModal';
const UserInformation = ({session}:{session:any}) => {
    const {isOpen:isOpenLogout, onOpen:onOpenLogout, onOpenChange:onOpenChangeLogout} = useDisclosure();
    const {isOpen:isOpenDelete, onOpen:onOpenDelete, onOpenChange:onOpenChangeDelete} = useDisclosure();
  return (
    <div className="">
        <div className='py-[100px] px-[16px]'>
                <Card className=''>
                    <CardHeader>
                        <CardTitle className='text-[20px]'>Your Profile</CardTitle>
                        <CardDescription>{session.user.name} you can manage your profile here</CardDescription>
                    </CardHeader>
                    <CardContent>
                        
                        <div className="flex items-center justify-between  border-b-1 border-gray-200 py-2 w-full">
                            <div className="flex gap-2 md:items-center items-start justify-center  flex-col md:flex-row">
                                <h1 className='font-bold text-[16px] text-gray-700'>Name</h1>
                                <p className='text-gray-600 text-right text-[16px] md:text-[16px] '>{session.user.name}</p>
                            </div>
                            
                            <Button className='' variant='flat' radius='sm'>edit</Button>
                        </div>
                        <div className="flex items-center justify-between  border-b-1 border-gray-200 py-2 w-full">
                            <div className="flex gap-2 md:items-center items-start justify-center  flex-col md:flex-row">
                                <h1 className='font-bold text-[16px] text-gray-700'>Email</h1>
                                <p className='text-gray-600 text-right text-[16px] md:text-[16px] '>{session.user.email}</p>
                            </div>
                            
                            <Button className='' variant='flat' radius='sm'>edit</Button>
                        </div>
                        <div className="flex items-center justify-between  border-b-1 border-gray-200 py-2 w-full">
                            <div className="flex gap-2 md:items-center items-start justify-center  flex-col md:flex-row">
                                <h1 className='font-bold text-[16px] text-gray-700'>Role</h1>
                                <p className='text-gray-600 text-right text-[16px] md:text-[16px] '>{session.user.role}</p>
                            </div>
                            
                            <Button className='' variant='flat' radius='sm'>edit</Button>
                        </div>
                        <div className="flex items-center justify-between  border-b-1 border-gray-200 py-2 w-full">
                            <div className="flex gap-2 md:items-center items-start justify-center  flex-col md:flex-row">
                                <h1 className='font-bold text-[16px] text-gray-700'>Password</h1>
                                <p className='text-gray-600 text-right text-[16px] md:text-[16px] '>**********</p>
                            </div>
                            
                            <Button className='' variant='flat' radius='sm'>edit</Button>
                        </div>
                        
                        
                    </CardContent>
                    <CardFooter className='flex gap-4'>
                        <Button className='text-red-500' variant='light' radius='sm' onPress={onOpenDelete}>Delete Account</Button>
                        <Button radius="sm" onPress={onOpenLogout} className='bg-gray-800 text-white' variant='solid'>Logout</Button>
                    </CardFooter>
                </Card>
            </div>
            <LogoutModal isOpen={isOpenLogout} onOpenChange={onOpenChangeLogout}></LogoutModal>
            <DeleteModal isOpen={isOpenDelete} onOpenChange={onOpenChangeDelete}></DeleteModal>
    </div>
    
  )
}

export default UserInformation