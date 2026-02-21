import React from 'react'

const Newsletter = () => {
  return (
    <section className='max-w-7xl mx-auto px-8 sm:px-20 mb-40'>
      <div className='bg-canvas rounded-[64px] py-24 px-12 text-center relative overflow-hidden'>
        {/* Subtle texture or shapes */}
        <div className='absolute inset-0 opacity-[0.03] pointer-events-none' style={{ backgroundImage: 'radial-gradient(#3B5241 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

        <div className='relative z-10'>
          <span className='text-[10px] font-bold tracking-[0.3em] text-primary uppercase mb-8 inline-block'>Gentle Reminders</span>
          <h2 className='text-4xl sm:text-7xl font-normal text-ink mb-8 leading-tight font-serif italic'>Join our <br /> thoughtful community.</h2>
          <p className='text-lg sm:text-2xl text-primary/60 mb-12 max-w-2xl mx-auto font-light leading-relaxed'>No noise. Just weekly insights on personal growth and clarity, delivered with care.</p>

          <form className='flex flex-col sm:flex-row items-center gap-4 max-w-xl mx-auto'>
            <input
              className='w-full px-10 py-5 bg-white border border-primary/10 rounded-full outline-none focus:ring-4 ring-primary/5 transition-all text-ink font-light'
              type="email"
              placeholder='Enter your email address'
              required
            />
            <button type='submit' className='w-full sm:w-auto px-12 py-5 text-white bg-primary rounded-full font-bold text-[13px] tracking-widest uppercase hover:bg-ink transition-all duration-700 cursor-pointer whitespace-nowrap shadow-xl shadow-primary/10'>
              Subscribe
            </button>
          </form>
          <p className='text-[10px] text-primary/30 mt-8 font-bold tracking-widest uppercase'>Unsubscribe anytime • Shared with empathy</p>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
