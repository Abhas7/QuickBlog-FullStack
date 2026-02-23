import React from 'react'

const Newsletter = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center py-32 bg-gray-50 border-y-2 border-black'>
      <h2 className='text-4xl sm:text-5xl font-black text-black mb-4 uppercase tracking-tighter'>Fresh Reads, Same Grind.</h2>
      <p className='text-lg text-gray-600 font-medium mb-12 max-w-xl'>Get the hottest blogging hacks — smart ways to make your content work harder, and tricks to keep your readers engaged.</p>
      <form className='flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-8 max-w-3xl'>
        <input className='border-2 border-black h-16 outline-none w-full px-6 text-black font-bold placeholder:text-gray-400 bg-white' type="email" placeholder='Enter your email...' required />
        <button type='submit' className='h-16 px-12 bg-black text-white font-black uppercase tracking-widest hover:bg-gray-800 transition-all cursor-pointer border-2 border-black w-full sm:w-auto shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-x-[-2px] translate-y-[-2px] hover:translate-x-0 hover:translate-y-0'>
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default Newsletter
