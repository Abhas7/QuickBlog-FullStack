import React from 'react'
import { assets, footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-black text-white'>
      <div className='flex flex-col md:flex-row items-start justify-between gap-12 py-20 border-b border-white/10'>

        <div className='md:w-1/3'>
          <div className='flex items-center gap-2 mb-8'>
            <div className='w-10 h-10 bg-white flex items-center justify-center'>
              <span className='text-black font-black text-2xl'>B</span>
            </div>
            <span className='text-3xl font-black tracking-tighter'>BLOGGE<span className='text-gray-500'>RR</span></span>
          </div>
          <p className='text-gray-400 font-medium leading-relaxed'>Empowering writers with minimalist tools to share their story. Built on the philosophy of simplicity and speed.</p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 gap-12 w-full md:w-auto'>
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className='font-black text-[10px] uppercase tracking-widest text-white mb-6'>{section.title}</h3>
              <ul className='space-y-3'>
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className='text-gray-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-wide'>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
      <div className='flex flex-col sm:flex-row justify-between items-center py-10 gap-4'>
        <p className='text-xs font-bold uppercase tracking-widest text-gray-500'>© 2026 BLOGGERR  • All Right Reserved</p>
        <div className='flex gap-6'>
          <a href="#" className='text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors'>Twitter</a>
          <a href="https://linkedin.com/in/abhassomkuwar03" target="_blank" rel="noopener noreferrer" className='text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors'>LinkedIn</a>
        </div>
      </div>
    </div>
  )
}

export default Footer
