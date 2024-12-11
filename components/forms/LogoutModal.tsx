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
import { useState } from "react";
import { useToast } from '@/hooks/use-toast';


const LogoutModal = ({isOpen,onOpenChange}:{isOpen:any,onOpenChange:any}) => {
    const { data: session } = authClient.useSession();
    const router = useRouter();
    const {toast} = useToast()

	const [pending, setPending] = useState(false);
//we call the handlesignout function
	const handleSignOut = async () => {
		try {
		//set pending to true
			setPending(true);
			//we call the authClient.signout function
			await authClient.signOut({
				fetchOptions: {
				//we listen to the onSuccess event
					onSuccess: () => {
					//if Success we route the user to the sign-in page
						router.push("/sign-in");
						router.refresh();
            toast({
              title: "Success",
              description:
                "User Logged out successfully",
            });
					},
				},
			});
		} catch (error) {
		//here we throw an errro
			console.error("Error signing out:", error);
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
          <ModalHeader className="flex flex-col gap-1">Logout</ModalHeader>
          <ModalBody>
            <p>{session?.user.name} are you sure you want to Logout</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" radius='sm' variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" radius='sm' onPress={handleSignOut} isLoading={pending}>
              Logout Account
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal></div>
  )
}

export default LogoutModal