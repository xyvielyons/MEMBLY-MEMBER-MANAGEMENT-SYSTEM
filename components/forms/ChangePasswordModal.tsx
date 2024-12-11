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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { changePasswordSchema } from '@/zod/zod';
import { zodResolver } from "@hookform/resolvers/zod"
const ChangePasswordModal = ({isOpen,onOpenChange,Mysession}:{isOpen:any,onOpenChange:any,Mysession:any}) => {
    const {toast} = useToast()
    const { data: session } = authClient.useSession();
    const router = useRouter();
	  const [pending, setPending] = useState(false);
    const form = useForm<z.infer<typeof changePasswordSchema >>({
      resolver: zodResolver(changePasswordSchema),
      defaultValues: {
        newPassword:"",
        currentPassword:""
      },
    })
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof changePasswordSchema>,onClose:() => void) {
        await authClient.changePassword({
          newPassword: values.newPassword,
          currentPassword: values.currentPassword,
          revokeOtherSessions: true, // revoke all other sessions the user is signed into
        },{
        onRequest:()=>{
            setPending(true);
        },
        onSuccess:()=>{
            router.push("/");
            router.refresh();
            toast({
              title: "Success",
              description: "Your password was changed succesfully",
          });
        },
        onError:(ctx)=>{
            console.log("error",ctx);
            toast({
                title: "Something went wrong",
                description: ctx.error.message ?? "Something went wrong.",
                variant:"destructive"
            });
        }
        })
      
      setPending(false);
      onClose();
  }
  return (
    <div>
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">Edit Password</ModalHeader>
          <ModalBody>
            <p>{session?.user.name} change your default password by writing a new password below</p>
            <div className="">
            <Form {...form}>
            <form onSubmit={form.handleSubmit((values:any)=>onSubmit(values,onClose))} className="space-y-4">
              
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-bold text-[13px] text-slate-600'>Current Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Atleast 8 characters" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-bold text-[13px] text-slate-600'> Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Atleast 8 characters" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4 flex-row py-2">
              <Button color="danger" variant="light" onPress={onClose}>
                    Close
              </Button>
              <Button isLoading={pending} className='text-[15px] font-medium bg-gray-800 text-white' type="submit" radius='sm'>Change Password</Button>

              </div>
              
            </form>
          </Form>
                  </div>
                </ModalBody>
               
              </>
            )}
    </ModalContent>
    </Modal></div>
  )
}

export default ChangePasswordModal