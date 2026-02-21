import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const { navigate, token } = useAppContext()

  return (
    <nav className='sticky top-0 z-50 glass border-b border-primary/5'>
      <div className='max-w-7xl mx-auto flex justify-between items-center py-6 px-8 sm:px-20'>
        <img onClick={() => navigate('/')} src={assets.logo} alt="logo" className='w-40 cursor-pointer hover:opacity-75 transition-all duration-500' />
        <div className='flex items-center gap-8'>
          <button onClick={() => navigate('/admin')} className='group flex items-center gap-3 rounded-full text-[13px] font-medium tracking-wide uppercase cursor-pointer text-primary border border-primary/20 bg-white/50 px-8 py-3 hover:bg-primary hover:text-white transition-all duration-500 shadow-sm'>
            {token ? 'Dashboard' : 'Sign In'}
            <img src={assets.arrow_blue_icon} className='w-3 group-hover:invert transition-all opacity-60' alt="" />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
