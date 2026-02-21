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
    <div className='px-6 sm:px-12 md:px-24 pt-16 pb-20 relative overflow-hidden'>
      <div className='max-w-4xl mx-auto text-center relative z-10'>

        <div className='inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-primary/20 bg-primary/5 rounded-full text-sm font-medium text-primary'>
          <span className='relative flex h-2 w-2'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75'></span>
            <span className='relative inline-flex rounded-full h-2 w-2 bg-primary'></span>
          </span>
          <p className='text-xs sm:text-sm'>Modern blogging for professional growth</p>
        </div>

        <h1 className='text-5xl sm:text-7xl md:text-8xl font-serif text-text-dark leading-[1.05] tracking-tight mb-8'>
          Share Your <span className='italic text-primary'>Perspective</span> <br /> with Elegance.
        </h1>

        <p className='text-lg sm:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed mb-12'>
          A refined space for therapists, coaches, and thinkers to share insights and inspire positive change through soulful writing.
        </p>

        <form onSubmit={onSubmitHandler} className='flex items-center bg-white p-2 rounded-full border border-accent/30 shadow-xl shadow-primary/5 max-w-lg mx-auto transition-focus-within focus-within:border-primary/50'>
          <div className='flex-1 flex items-center pl-4'>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input ref={inputRef} type="text" placeholder='Search for insights...' required className='w-full pl-3 pr-4 py-2 bg-transparent outline-none text-text-dark placeholder:text-gray-400' />
          </div>
          <button type="submit" className='bg-primary text-white px-8 py-3 rounded-full font-medium transition-all hover:bg-primary/90 active:scale-95 cursor-pointer shadow-lg shadow-primary/20'>
            Search
          </button>
        </form>

        {input && (
          <div className='mt-6'>
            <button onClick={onClear} className='text-sm text-text-muted hover:text-primary transition-colors flex items-center justify-center gap-2 mx-auto cursor-pointer'>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              Clear search: "{input}"
            </button>
          </div>
        )}
      </div>

      {/* Abstract decorative elements common in ClearPath */}
      <div className='absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl'></div>
      <div className='absolute top-1/2 -left-24 w-64 h-64 bg-accent/20 rounded-full blur-3xl'></div>
    </div>
  )
}

export default Header
