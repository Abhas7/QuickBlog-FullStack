import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Header = () => {

  const { setInput, input } = useAppContext()
  const inputRef = useRef()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value)
  }

  const onClear = () => {
    setInput('')
    inputRef.current.value = ''
  }

  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
      <div className='text-center mt-24 mb-12'>

        <div className='inline-flex items-center justify-center gap-2 px-4 py-1 mb-8 border border-black/10 bg-black/5 rounded-full text-[10px] uppercase tracking-widest font-bold text-black'>
          <p>Featured Insights • 2024</p>
        </div>

        <h1 className='text-5xl sm:text-7xl xl:text-8xl font-black tracking-tight text-black leading-[1.1] mb-6'>
          Level Up Your <br className='hidden sm:block' /> Blogging Game.
        </h1>

        <p className='my-8 max-w-xl m-auto text-lg sm:text-xl text-gray-600 leading-relaxed font-medium'>
          Practical tips to help you unlock actionable insights, shared through minimalist storytelling.
        </p>

        <form onSubmit={onSubmitHandler} className='flex justify-between max-w-lg mx-auto border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all'>
          <input ref={inputRef} type="text" placeholder='Search fresh reads...' required className='w-full pl-6 py-4 outline-none text-black font-semibold' />
          <button type="submit" className='bg-black text-white px-10 py-4 font-bold uppercase tracking-wide hover:bg-gray-800 transition-colors cursor-pointer'>
            Explore
          </button>
        </form>

      </div>

      <div className='text-center'>
        {
          input && <button onClick={onClear} className='mt-4 border-2 border-black font-bold text-xs py-2 px-6 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all cursor-pointer uppercase'>Clear Search</button>
        }
      </div>

      <div className='absolute -top-40 -left-40 w-96 h-96 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob'></div>
      <div className='absolute -top-40 -right-40 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000'></div>
    </div>
  )
}

export default Header
