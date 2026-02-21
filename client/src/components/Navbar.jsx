import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const { navigate, token } = useAppContext()

  return (
    <nav className='sticky top-0 z-50 bg-bg-base/80 backdrop-blur-md border-b border-accent/10'>
      <div className='flex justify-between items-center py-4 px-6 sm:px-12 md:px-24 max-w-7xl mx-auto'>
        <div onClick={() => navigate('/')} className='flex items-center gap-2 cursor-pointer'>
          <img src={assets.logo} alt="logo" className='w-32 sm:w-40 drop-shadow-sm' />
        </div>

        <div className='flex items-center gap-6'>
          <button
            onClick={() => navigate('/admin')}
            className='group flex items-center gap-2 rounded-full text-sm font-medium cursor-pointer bg-primary text-white px-8 py-2.5 transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95'
          >
            {token ? 'Dashboard' : 'Login'}
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
