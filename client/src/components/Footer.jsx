import React from 'react'
import { assets, footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-white border-t border-accent/10'>
      <div className='max-w-7xl mx-auto px-6 sm:px-12 md:px-24 py-20'>
        <div className='flex flex-col md:flex-row justify-between gap-16'>

          <div className='max-w-xs'>
            <img src={assets.logo} alt="logo" className='w-32 sm:w-40 grayscale opacity-80 hover:grayscale-0 transition-all duration-500' />
            <p className='mt-8 text-text-muted leading-relaxed'>
              Empowering individuals through thoughtful writing and professional insights. A space dedicated to growth and clarity.
            </p>
            <div className='flex gap-4 mt-8'>
              {/* Optional Social Icons could go here */}
            </div>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-16'>
            {footer_data.map((section, index) => (
              <div key={index}>
                <h4 className='font-semibold text-text-dark mb-6 tracking-wide uppercase text-xs'>
                  {section.title}
                </h4>
                <ul className='space-y-4'>
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className='text-text-muted hover:text-primary transition-colors text-sm'>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-20 pt-8 border-t border-accent/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted/60'>
          <p>© {new Date().getFullYear()} QuickBlog Platform. All rights reserved.</p>
          <div className='flex gap-8'>
            <a href="#" className='hover:text-primary transition-colors'>Privacy Policy</a>
            <a href="#" className='hover:text-primary transition-colors'>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
