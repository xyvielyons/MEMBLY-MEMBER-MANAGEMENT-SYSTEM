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
import { signUpSchema } from '@/zod/zod'
import { authClient } from '@/auth-client'
import { useToast } from "@/hooks/use-toast"

const SignUpForm = () => {
    const [pending, setPending] = useState(false);
    const { toast } = useToast()

        // 1. Define your form.
        const form = useForm<z.infer<typeof signUpSchema>>({
          resolver: zodResolver(signUpSchema),
          defaultValues: {
            name:"",
            email:"",
            password:"",
            confirmPassword:""
          },
        })
        const {reset} = form;
       
        // 2. Define a submit handler.
        async function onSubmit(values: z.infer<typeof signUpSchema>) {
            await authClient.signUp.email(
                {
                    email: values.email,
                    password: values.password,
                    name: values.name,
                    image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                },
                {
                    onRequest:()=>{
                        setPending(true);
                    },
                    onSuccess:()=>{
                        toast({
                            title: "Account created",
                            description:
                                "Your account has been created. Check your email for a verification link.",
                        });    
                    },
                    onError:(ctx)=>{
                        console.log("error",ctx);
                        toast({
                            title: "Something went wrong",
                            description: ctx.error.message ?? "Something went wrong.",
                        });
                    }
                }
            )
            reset()
            setPending(false);
        }
      
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold text-[13px] text-slate-600'>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold text-[13px] text-slate-600'>Password</FormLabel>
              <FormControl>
                <Input placeholder="Atleast 8 characters" {...field} type="password" />
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
                <Input placeholder="Atleast 8 characters" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button isLoading={pending} className='w-full text-[15px] font-medium bg-gray-800 text-white' type="submit" radius='sm'>Create Account</Button>
      </form>
    </Form>
  )
}

export default SignUpForm