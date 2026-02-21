import React from 'react'
import { assets, footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-canvas pt-32 pb-12 border-t border-primary/5'>
      <div className='max-w-7xl mx-auto px-8 sm:px-20'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-16 mb-24'>
          <div className='md:col-span-5'>
            <img src={assets.logo} alt="logo" className='w-44 mb-10' />
            <p className='text-lg text-primary/60 font-light leading-relaxed max-w-sm'>
              ClearPath is a gentle blogging space dedicated to clarity, growth, and the intersection of technology and humanity.
            </p>
          </div>

          <div className='md:col-span-7 flex flex-wrap justify-between gap-12'>
            {footer_data.map((section, index) => (
              <div key={index} className='min-w-[150px]'>
                <h4 className='text-[10px] font-bold tracking-[0.2em] uppercase text-primary mb-8'>{section.title}</h4>
                <ul className='space-y-4'>
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className='text-[15px] font-light text-primary/60 hover:text-primary transition-colors duration-300'>{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col sm:flex-row justify-between items-center pt-12 border-t border-primary/5 gap-8'>
          <p className='text-[11px] font-bold tracking-widest text-primary/30 uppercase'>© 2026 ClearPath Platform • All Rights Reserved</p>
          <div className='flex gap-10 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700'>
            <a href="#"><img src={assets.facebook_icon} className='w-5' alt="" /></a>
            <a href="#"><img src={assets.twitter_icon} className='w-5' alt="" /></a>
            <a href="#"><img src={assets.googleplus_icon} className='w-5' alt="" /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
