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
const DeleteModal = ({isOpen,onOpenChange}:{isOpen:any,onOpenChange:any}) => {
    const {toast} = useToast()
    const { data: session } = authClient.useSession();
    const router = useRouter();
	  const [pending, setPending] = useState(false);
    const handleDeleteUser = async () => {
      try {
      //set pending to true
        setPending(true);
        //we call the authClient.signout function
        await authClient.deleteUser({
          fetchOptions: {
          //we listen to the onSuccess event
            onSuccess: () => {
            //if Success we route the user to the sign-in page
              toast({
                title: "Success",
                description:
                  "User deleted successfully",
              });
              router.push("/sign-in");
              router.refresh();
            },
          },
        });
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
            <p>{session?.user.name} are you sure you want to Delete your account</p>
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

export default DeleteModal