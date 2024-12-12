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
const AdminImpersonateModal = ({isOpen,onOpenChange,userData}:{isOpen:any,onOpenChange:any,userData:any}) => {
    const {toast} = useToast()
    const router = useRouter();
	  const [pending, setPending] = useState(false);
    const handlePersonationUser = async () => {
      try {
      //set pending to true
        setPending(true);
        //we call the authClient.signout function
        await authClient.admin.impersonateUser({
          userId: userData.id
        });
        router.push('/');
        toast({
          title: "Success",
          description:
            `You are now impersonating ${userData.name}`,
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
          <ModalHeader className="flex flex-col gap-1">Impersonate Account</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to Impersonate the selected account? {userData.name}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" onPress={handlePersonationUser} isLoading={pending}>
              Impersonate Account
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal></div>
  )
}

export default AdminImpersonateModal