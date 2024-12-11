import React from 'react'
import Image from "next/image"
const MemblyLogo = () => {
  return (
    <div>
        <div className="p-4">
            <Image src="/logo.svg" width={100} height={100} alt='logo'></Image>
        </div>
    </div>
  )
}

export default MemblyLogo