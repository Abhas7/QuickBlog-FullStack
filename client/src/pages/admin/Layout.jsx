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
    <div className='bg-bg-base min-h-screen text-text-dark flex flex-col'>
      <header className='flex items-center justify-between py-2 h-[80px] px-6 sm:px-12 bg-white border-b border-accent/10 shadow-sm sticky top-0 z-50'>
        <div className='flex items-center gap-4'>
          <img src={assets.logo} alt="logo" className='w-32 sm:w-40 cursor-pointer grayscale opacity-80 hover:grayscale-0 transition-all' onClick={() => navigate('/')} />
          <span className='h-6 w-[1px] bg-accent/30 mx-2'></span>
          <span className='text-xs font-bold uppercase tracking-widest text-text-muted'>Studio Admin</span>
        </div>
        <button onClick={logout} className='text-sm px-8 py-2.5 bg-primary text-white rounded-full font-medium transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95 cursor-pointer'>
          Logout
        </button>
      </header>

      <div className='flex flex-1'>
        <Sidebar />
        <main className='flex-1 p-6 md:p-12 overflow-y-auto'>
          <div className='max-w-6xl mx-auto'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout
