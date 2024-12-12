'use client'
import React from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
  } from "@nextui-org/react";
import { authClient } from '@/auth-client';
import { useRouter } from "next/navigation";
import { useState} from "react";
import { useToast } from '@/hooks/use-toast';
const AdminDeleteModal = ({isOpen,onOpenChange,userData}:{isOpen:any,onOpenChange:any,userData:any}) => {
    const {toast} = useToast()
    const router = useRouter();
	  const [pending, setPending] = useState(false);
    const handleDeleteUser = async () => {
      try {
      //set pending to true
        setPending(true);
        //we call the authClient.signout function
        await authClient.admin.removeUser({
          userId: userData.id
        });
        toast({
          title: "Success",
          description:
            `User was deleted successfully`,
        });
        router.refresh()
      } catch (error) {
      //here we throw an errro
        console.error("Error Deleting user", error);
        toast({
          title: "Error",
          description:
            `Something went wrong ${error}`,
          variant:"destructive"
        });
      } finally {
      //when it finishes we set is pending to false
        setPending(false);
        onOpenChange(false);
      }
    };
  return (
    <div>
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">Delete Account</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete the selected account?{userData.name}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={handleDeleteUser} isLoading={pending}>
              delete Account
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal></div>
  )
}

export default AdminDeleteModal