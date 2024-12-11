import React from 'react'

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <div className='max-w-7xl mx-auto px-2 md:px-8 lg:px-[60px] xl:px-[80px]'>{children}</div>
  )
}

export default layout