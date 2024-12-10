'use client'
import React, { useState } from 'react'
import { Button } from '@nextui-org/react'
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { authClient } from '@/auth-client';
import { useRouter } from 'next/navigation';
import { ErrorContext } from "@better-fetch/fetch";
import { useToast } from '@/hooks/use-toast';
const Socials = () => {
    const router = useRouter()
    const {toast} = useToast();
    const [pendingGithub, setPendingGithub] = useState(false);
    const [pendingGoogle, setPendingGoogle] = useState(false);
    const handleSignInWithGithub = async()=>{
        await authClient.signIn.social(
            {
                provider:"github"
            },
            {
                onRequest:()=>{
                    setPendingGithub(true)
                },
                onSuccess:async()=>{
                    router.push('/');
                    router.refresh();
                },
                onError: (ctx: ErrorContext) => {
					toast({
						title: "Something went wrong",
						description: ctx.error.message ?? "Something went wrong.",
						variant: "destructive",
					});
				},
            }
        )
        setPendingGithub(false)
    }
    const handleSignInWithGoogle = async()=>{
        await authClient.signIn.social(
            {
                provider:"google"
            },
            {
                onRequest:()=>{
                    setPendingGoogle(true)
                },
                onSuccess:async()=>{
                    router.push('/');
                    router.refresh();
                },
                onError: (ctx: ErrorContext) => {
					toast({
						title: "Something went wrong",
						description: ctx.error.message ?? "Something went wrong.",
						variant: "destructive",
					});
				},
            }
        )
        setPendingGoogle(false)
    }
  return (
    <div className='flex flex-col gap-2'>
        <div className="flex flex-row items-center justify-center gap-4">
            <div className="w-full h-[1px] bg-slate-300"></div>
            <div className="text-gray-500">or</div>
            <div className="w-full h-[1px] bg-slate-300"></div>
        </div>
        <div className="flex-row flex gap-4">
            <div className="w-full">
                <Button isLoading={pendingGithub} onClick={handleSignInWithGithub} className='w-full bg-gray-200' startContent={<FaGithub className='w-[24px] h-[24px]' />} radius='sm'>Github</Button>
            </div>
            <div className="w-full">
                <Button isLoading={pendingGoogle} onClick={handleSignInWithGoogle} className='w-full bg-gray-200' startContent={<FcGoogle className='w-[24px] h-[24px]' />} radius='sm'>Google</Button>
            </div>
        </div>
        
    </div>
  )
}

export default Socials