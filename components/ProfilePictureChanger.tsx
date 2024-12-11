'use client'
import React,{useState} from 'react'
import { Button } from '@nextui-org/react'
import {
  useDisclosure,
} from "@nextui-org/react";
import ChangeProfilePictureModal from './forms/ChangeProfilePictureModal';
const ProfilePictureChanger = ({session}:{session:any}) => {
  const {isOpen:isOpenProfile, onOpen:onOpenProfile, onOpenChange:onOpenChangeProfile} = useDisclosure();

  return (
    <div className=''>
      <div className="flex gap-2">
        <Button variant="light" className='text-sm' size='sm' onPress={onOpenProfile}>Change</Button>
      </div>
      <ChangeProfilePictureModal isOpen={isOpenProfile} onOpenChange={onOpenChangeProfile} Mysession={session}></ChangeProfilePictureModal>
    </div>
  )
}

export default ProfilePictureChanger