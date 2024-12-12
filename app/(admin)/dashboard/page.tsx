import React from 'react'
import MemberCountChart from '@/components/cards/MemberCountChart'
import prisma from '@/lib/prisma'
const page = async() => {
  const members = await prisma.user.findMany()
  return (
    <div>
      <div className="px-[16px] pt-[16px]">
        <MemberCountChart members={members}></MemberCountChart>
      </div>
    </div>
  )
}

export default page