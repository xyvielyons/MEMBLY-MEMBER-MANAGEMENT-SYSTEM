'use client'
import React from 'react'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
const NavButtons = () => {
    const router = useRouter()
  return (
    <div>
        <Button onClick={()=>router.push("/dashboard")} variant='solid' radius='sm' size='md' className='bg-gray-900 text-slate-100'>Dashboard</Button>
    </div>
  )
}

export default NavButtons