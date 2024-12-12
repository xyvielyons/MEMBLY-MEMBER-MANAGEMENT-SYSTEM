'use client'
import React,{useState} from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
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
import { signInSchema } from '@/zod/zod'
import { authClient } from '@/auth-client'
import { useToast } from "@/hooks/use-toast"
import Link from 'next/link'
const SignInForm = () => {
    const [pending, setPending] = useState(false);
    const { toast } = useToast()
    const router = useRouter()
        // 1. Define your form.
        const form = useForm<z.infer<typeof signInSchema>>({
          resolver: zodResolver(signInSchema),
          defaultValues: {
            email:"",
            password:"",
          },
        })
        const {reset} = form;
       
        // 2. Define a submit handler.
        async function onSubmit(values: z.infer<typeof signInSchema>) {
            await authClient.signIn.email(
                {
                    email: values.email,
                    password: values.password,
                },
                {
                    onRequest:()=>{
                        setPending(true);
                    },
                    onSuccess:()=>{
                        router.push("/");
                        router.refresh();
                    },
                    onError:(ctx)=>{
                        console.log("error",ctx);
                        toast({
                            title: "Something went wrong",
                            description: ctx.error.message ?? "Something went wrong.",
                            variant:"destructive"
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
         <div className="flex justify-end">
           <Link href="/forgot-password" className='text-gray-500 font-medium hover:text-gray-700 active:text-gray-700 text-sm'>Forgot password?</Link>
        </div>
        <Button isLoading={pending} className='w-full text-[15px] font-medium bg-gray-800 text-white' type="submit" radius='sm'>Sign In</Button>
      </form>
    </Form>
  )
}

export default SignInForm