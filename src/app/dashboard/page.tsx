import Carousel from '@/components/carrusel'
import SidebarWrapper from '@/components/SidebarWrapper'
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Dashboard: React.FC<Props> = ({ children }) => {
  return (
    <div className='flex h-screen bg-background'>
      <SidebarWrapper>
        <Carousel />
        {children}
      </SidebarWrapper>
    </div>
  )
}

export default Dashboard