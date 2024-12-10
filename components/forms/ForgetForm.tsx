'use client'
import React,{useState} from 'react'
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
import { forgotPasswordSchema } from '@/zod/zod'
import { authClient } from '@/auth-client'
import { useToast } from "@/hooks/use-toast"

const ForgetForm = () => {
    const [pending, setPending] = useState(false);
    const { toast } = useToast()
        // 1. Define your form.
        const form = useForm<z.infer<typeof forgotPasswordSchema>>({
          resolver: zodResolver(forgotPasswordSchema),
          defaultValues: {
            email:"",
          },
        })
       
        // 2. Define a submit handler.
        async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
           //we set the is pending to true
            setPending(true);
            //we parse in the email from the form to authClient.forgetPassword
            const { error } = await authClient.forgetPassword({
            //we set the email
              email: values.email,
            //we set where to redirect to if the user exists
              redirectTo: "/reset-password",
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
                description:
                  "If an account exists with this email, you will receive a password reset link.",
              });
            }
            //we then set ispending to false
            setPending(false);
        }
      
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold text-[13px] text-slate-600'>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
       
        <Button isLoading={pending} className='w-full text-[15px] font-medium bg-gray-800 text-white' type="submit" radius='sm'>Send Recovery Email</Button>
      </form>
    </Form>
  )
}

export default ForgetForm