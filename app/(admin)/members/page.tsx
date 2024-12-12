import React from 'react'
import MemberTable from '@/components/tables/MemberTables'
const page = () => {
  return (
    <div className='py-[16px] px-[16px] space-y-4'>
      <div className="">
        <h1 className='text-[30px] font-bold'>Members</h1>
      </div>
      <MemberTable/>
    </div>
  )
}

export default page