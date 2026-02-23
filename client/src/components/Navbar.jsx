import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';

const Navbar = () => {


    const { navigate, token } = useAppContext()

    return (
        <div className='flex justify-between items-center py-8 mx-8 sm:mx-20 xl:mx-32'>
            <div onClick={() => navigate('/')} className='flex items-center gap-2 cursor-pointer group'>
                <div className='w-10 h-10 bg-black flex items-center justify-center'>
                    <span className='text-white font-black text-2xl'>B</span>
                </div>
                <span className='text-2xl font-black tracking-tighter text-black'>BLOGGE<span className='text-gray-400'>RR</span></span>
            </div>
            <button onClick={() => navigate('/admin')} className='border-2 border-black px-8 py-2.5 font-bold uppercase tracking-wider text-sm bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer'>
                {token ? 'Dashboard' : 'Sign In'}
            </button>
        </div>
    )
}

export default Navbar
