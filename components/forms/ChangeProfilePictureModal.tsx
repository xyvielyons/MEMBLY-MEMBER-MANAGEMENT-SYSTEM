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
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ImageUploaderSchema} from '@/zod/zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { ImageUploader } from '../ImageUploader';
import { useUploadThing } from '@/utils/uploadthing';
const ChangeEmailModal = ({isOpen,onOpenChange,Mysession}:{isOpen:any,onOpenChange:any,Mysession:any}) => {
    const {toast} = useToast()
    const [files,setFiles] = useState<File[]>([])
    const router = useRouter();
	  const [pending, setPending] = useState(false);
    const {startUpload} = useUploadThing('imageUploader')
    const form = useForm<z.infer<typeof ImageUploaderSchema >>({
      resolver: zodResolver(ImageUploaderSchema),
      defaultValues: {
        url:""
      },
    })
    const {reset} = form;
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof ImageUploaderSchema>,onClose:() => void) {
      setPending(true);
      let uploadedImageUrl = values.url
      if(files.length > 0){
        const uploadedImages = await startUpload(files)

        if(!uploadedImages){
            return
        }
        uploadedImageUrl = uploadedImages[0].url
      }
      console.log(uploadedImageUrl)
        await authClient.updateUser({
          image:uploadedImageUrl
        },{
        onRequest:()=>{
            setPending(true);
        },
        onSuccess:()=>{
            router.push("/");
            router.refresh();
            reset()
            toast({
              title: "Success",
              description: "Your Profile image has been successfully changed",
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
          <ModalHeader className="flex flex-col gap-1">Change Profile Picture</ModalHeader>
          <ModalBody>
            <div className="">
            <Form {...form}>
            <form onSubmit={form.handleSubmit((values:any)=>onSubmit(values,onClose))} className="space-y-4">
              
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='font-bold text-sm text-slate-600'>Uploaded picture</FormLabel>
                    <FormControl>
                      <ImageUploader onFieldChange={field.onChange} imageUrl={field.value} setFiles={setFiles}></ImageUploader>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4 flex-row py-2">
              <Button color="danger" variant="light" onPress={onClose}>
                    Close
              </Button>
              <Button isLoading={pending} className='text-[15px] font-medium bg-gray-800 text-white' type="submit" radius='sm'>Change Picture</Button>

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