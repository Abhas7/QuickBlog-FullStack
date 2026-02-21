import React from 'react'

const Loader = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-canvas'>
      <div className='relative flex items-center justify-center'>
        <div className='animate-ping absolute inline-flex h-12 w-12 rounded-full bg-primary opacity-20'></div>
        <div className='relative inline-flex rounded-full h-8 w-8 bg-primary'></div>
      </div>
      <p className='mt-8 text-[10px] font-bold tracking-[0.3em] text-primary uppercase animate-pulse'>Gathering thoughts...</p>
    </div>
  )
}

export default Loader
