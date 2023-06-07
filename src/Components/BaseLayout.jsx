import React from 'react'

const BaseLayout = ({children}) => {
  return (
    <div className=' flex mx-auto md:w-[70%] h-screen justify-center items-center rounded-lg'>
        {children}
    </div>
  )
}

export default BaseLayout