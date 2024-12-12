'use client'
import React,{Suspense, useState} from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from '@nextui-org/react'
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
import { resetPasswordSchema } from '@/zod/zod'
import { authClient } from '@/auth-client'
import { useToast } from "@/hooks/use-toast"
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from 'next/navigation'
const ResetForm = () => {
    const [pending, setPending] = useState(false);
    const { toast } = useToast()
    const router = useRouter()
    const searchParams = useSearchParams();
    const error = searchParams.get("error");

        // 1. Define your form.
        const form = useForm<z.infer<typeof resetPasswordSchema>>({
          resolver: zodResolver(resetPasswordSchema),
          defaultValues: {
            newPassword:"",
            confirmPassword:""
          },
        })
        const {reset} = form;
       
        // 2. Define a submit handler.
        async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
           //we set the is pending to true
            setPending(true);
            //we parse in the email from the form to authClient.forgetPassword
            const { error } = await authClient.resetPassword({
              newPassword:values.newPassword
            });
        //if error we show the toast with the error from the auth server
            if (error) {
              toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
              });
            } else {
            //if success we show the success message
              toast({
                title: "Success",
                description: "Password reset successful. Login to continue.",
              });
              router.push("/sign-in");
            }
            //we then set ispending to false
            reset()
            setPending(false);
        }
        if (error === "INVALID_TOKEN") {
          //if error occurs in the search params we show that the token in invalid
            return (
              <div className="grow flex items-center justify-center p-4">
                <Card className="w-full max-w-md">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center text-gray-800">
                      Invalid Reset Link
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-center text-gray-600">
                        This password reset link is invalid or has expired.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          }
      
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold text-[13px] text-slate-600'>New Password</FormLabel>
              <FormControl>
                <Input placeholder="Atleast 8 characters" {...field} type='password'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold text-[13px] text-slate-600'>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="Atleast 8 characters" {...field} type='password'/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
       
        <Button isLoading={pending} className='w-full text-[15px] font-medium bg-gray-800 text-white' type="submit" radius='sm'>Change Password</Button>
      </form>
    </Form>
  )
}

export default function ResetPassword(){
  return(
    <Suspense>
      <ResetForm></ResetForm>
    </Suspense>
  )
}