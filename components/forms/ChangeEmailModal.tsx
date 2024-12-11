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
import { ChangeEmailSchema } from '@/zod/zod';
import { zodResolver } from "@hookform/resolvers/zod"
const ChangeEmailModal = ({isOpen,onOpenChange,Mysession}:{isOpen:any,onOpenChange:any,Mysession:any}) => {
    const {toast} = useToast()
    const { data: session } = authClient.useSession();
    const router = useRouter();
	  const [pending, setPending] = useState(false);
    const form = useForm<z.infer<typeof ChangeEmailSchema >>({
      resolver: zodResolver(ChangeEmailSchema),
      defaultValues: {
        email:Mysession.user.email
      },
    })
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof ChangeEmailSchema>,onClose:() => void) {
        await authClient.changeEmail({
          newEmail: values.email,
          callbackURL: "/", //to redirect after verification
        },{
        onRequest:()=>{
            setPending(true);
        },
        onSuccess:()=>{
            router.push("/");
            router.refresh();
            toast({
              title: "Success",
              description: "A link to verify your email has been sent to your email",
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
          <ModalHeader className="flex flex-col gap-1">Edit email</ModalHeader>
          <ModalBody>
            <p>{session?.user.name} change your email by writing a new email below</p>
            <div className="">
            <Form {...form}>
            <form onSubmit={form.handleSubmit((values:any)=>onSubmit(values,onClose))} className="space-y-4">
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-bold text-[13px] text-slate-600'>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="JohnDoe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4 flex-row py-2">
              <Button color="danger" variant="light" onPress={onClose}>
                    Close
              </Button>
              <Button isLoading={pending} className='text-[15px] font-medium bg-gray-800 text-white' type="submit" radius='sm'>Change Email</Button>

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

export default ChangeEmailModal