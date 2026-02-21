import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Sidebar = () => {
  return (
    <div className='flex flex-col border-r border-primary/5 min-h-full py-12 px-4 space-y-2 bg-white/30'>

      <NavLink end={true} to='/admin' className={({ isActive }) => `flex items-center gap-4 py-4 px-8 rounded-2xl transition-all duration-500 group ${isActive ? "bg-primary text-white shadow-xl shadow-primary/10" : "text-primary/60 hover:bg-white hover:text-primary"}`}>
        <img src={isActive ? assets.home_icon : assets.home_icon} alt="" className={`w-5 transition-all ${isActive ? "invert brightness-200" : "opacity-40"}`} />
        <p className='hidden md:inline-block text-[13px] font-bold tracking-widest uppercase'>Dashboard</p>
      </NavLink>

      <NavLink to='/admin/addBlog' className={({ isActive }) => `flex items-center gap-4 py-4 px-8 rounded-2xl transition-all duration-500 group ${isActive ? "bg-primary text-white shadow-xl shadow-primary/10" : "text-primary/60 hover:bg-white hover:text-primary"}`}>
        <img src={isActive ? assets.add_icon : assets.add_icon} alt="" className={`w-5 transition-all ${isActive ? "invert brightness-200" : "opacity-40"}`} />
        <p className='hidden md:inline-block text-[13px] font-bold tracking-widest uppercase'>Add Story</p>
      </NavLink>

      <NavLink to='/admin/listBlog' className={({ isActive }) => `flex items-center gap-4 py-4 px-8 rounded-2xl transition-all duration-500 group ${isActive ? "bg-primary text-white shadow-xl shadow-primary/10" : "text-primary/60 hover:bg-white hover:text-primary"}`}>
        <img src={isActive ? assets.list_icon : assets.list_icon} alt="" className={`w-5 transition-all ${isActive ? "invert brightness-200" : "opacity-40"}`} />
        <p className='hidden md:inline-block text-[13px] font-bold tracking-widest uppercase'>Manage Files</p>
      </NavLink>

      <NavLink to='/admin/comments' className={({ isActive }) => `flex items-center gap-4 py-4 px-8 rounded-2xl transition-all duration-500 group ${isActive ? "bg-primary text-white shadow-xl shadow-primary/10" : "text-primary/60 hover:bg-white hover:text-primary"}`}>
        <img src={isActive ? assets.comment_icon : assets.comment_icon} alt="" className={`w-5 transition-all ${isActive ? "invert brightness-200" : "opacity-40"}`} />
        <p className='hidden md:inline-block text-[13px] font-bold tracking-widest uppercase'>Reflections</p>
      </NavLink>

    </div>
  )
}

export default Sidebar
