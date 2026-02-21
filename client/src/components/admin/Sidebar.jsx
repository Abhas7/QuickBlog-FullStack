import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Sidebar = () => {
  const links = [
    { to: '/admin', label: 'Dashboard', icon: assets.home_icon, end: true },
    { to: '/admin/addBlog', label: 'Add Stories', icon: assets.add_icon },
    { to: '/admin/listBlog', label: 'Journal Lists', icon: assets.list_icon },
    { to: '/admin/comments', label: 'Reflections', icon: assets.comment_icon },
  ];

  return (
    <div className='flex flex-col bg-white border-r border-accent/10 min-h-full py-8 w-16 md:w-72 transition-all duration-300'>
      <div className='flex flex-col gap-2'>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => `
              flex items-center gap-4 py-4 px-6 mx-3 rounded-2xl transition-all duration-300 cursor-pointer group
              ${isActive
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "text-text-muted hover:bg-primary/5 hover:text-primary"}
            `}
          >
            <img
              src={link.icon}
              alt={link.label}
              className={`w-5 h-5 transition-all duration-300 ${isActive ? 'brightness-0 invert' : 'opacity-60 group-hover:opacity-100 group-hover:scale-110'}`}
            />
            <p className='hidden md:inline-block font-medium text-sm tracking-wide'>{link.label}</p>
          </NavLink>
        ))}
      </div>

      <div className='mt-auto px-8 py-6 hidden md:block'>
        <div className='p-6 bg-accent/5 rounded-3xl border border-accent/10'>
          <p className='text-xs font-bold text-primary uppercase tracking-widest mb-2'>Pro Tip</p>
          <p className='text-[11px] text-text-muted leading-relaxed'>
            Consistent posting builds trust and authority. Aim for 2 insights per week.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
