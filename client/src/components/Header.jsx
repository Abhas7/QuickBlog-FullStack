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
    <header className='relative bg-canvas overflow-hidden'>
      {/* Organic Shapes for Background */}
      <div className='absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl -mr-64 -mt-32 -z-1'></div>
      <div className='absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl -ml-32 -mb-32 -z-1'></div>

      <div className='max-w-6xl mx-auto text-center pt-32 pb-40 px-8'>
        <div className='inline-block px-4 py-1.5 mb-10 border border-primary/10 bg-white/50 rounded-full text-[10px] font-bold tracking-[0.2em] text-primary uppercase animate-fade-in'>
          Thoughtful Stories • Integrated AI
        </div>

        <h1 className='text-5xl sm:text-[100px] font-normal tracking-tight leading-[0.9] text-ink mb-10'>
          A gentle space to <br />
          <span className='italic font-serif text-primary'>express & grow.</span>
        </h1>

        <p className='mb-16 max-w-2xl mx-auto text-lg sm:text-2xl text-primary/70 font-light leading-relaxed'>
          Discover a curated collection of insights designed for personal evolution.
          Your journey to clarity begins with a single word.
        </p>

        <form onSubmit={onSubmitHandler} className='flex items-center gap-2 max-w-2xl mx-auto p-2 bg-white rounded-full shadow-2xl shadow-primary/5 transition-transform hover:scale-[1.01] duration-500'>
          <input ref={inputRef} type="text" placeholder='Explore topics, stories, insights...' required className='flex-1 pl-8 py-4 outline-none text-ink bg-transparent font-light' />
          <button type="submit" className='bg-primary text-[13px] font-bold tracking-widest uppercase text-white px-12 py-5 rounded-full hover:bg-ink transition-all duration-700 cursor-pointer'>
            Search
          </button>
        </form>

        <div className='mt-12'>
          {input && (
            <button onClick={onClear} className='text-[10px] font-bold tracking-widest uppercase text-accent border-b border-accent/30 pb-1 hover:text-primary hover:border-primary transition-all cursor-pointer'>
              Clear active filters
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
