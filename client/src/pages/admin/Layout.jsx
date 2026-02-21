import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {

  const { axios, setToken, navigate } = useAppContext()

  const logout = () => {
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null;
    setToken(null)
    navigate('/')
  }

  return (
    <div className='min-h-screen bg-canvas'>
      <header className='sticky top-0 z-50 glass border-b border-primary/5 bg-white/70'>
        <div className='max-w-[1600px] mx-auto flex items-center justify-between py-5 px-6 sm:px-12'>
          <img src={assets.logo} alt="logo" className='w-36 cursor-pointer hover:opacity-75 transition-all' onClick={() => navigate('/')} />
          <div className='flex items-center gap-6'>
            <span className='hidden sm:inline-block text-[10px] font-bold tracking-widest text-primary/40 uppercase'>Administrator Mode</span>
            <button onClick={logout} className='text-[11px] font-bold tracking-widest uppercase px-10 py-3 bg-primary text-white rounded-full cursor-pointer hover:bg-ink transition-all shadow-lg shadow-primary/10'>Logout</button>
          </div>
        </div>
      </header>
      <div className='flex h-[calc(100vh-80px)] max-w-[1600px] mx-auto'>
        <Sidebar />
        <main className='flex-1 overflow-y-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
