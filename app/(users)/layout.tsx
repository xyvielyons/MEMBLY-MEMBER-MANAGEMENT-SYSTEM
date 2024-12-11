import React from 'react'

const RootLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className='bg-gray-100 h-full max-w-7xl mx-auto'>{children}</div>
  )
}

export default RootLayout