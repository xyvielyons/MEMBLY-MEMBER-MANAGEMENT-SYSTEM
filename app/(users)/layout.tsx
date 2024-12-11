import React from 'react'

const RootLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className='bg-gray-100 h-screen p-2 max-w-7xl mx-auto'>{children}</div>
  )
}

export default RootLayout