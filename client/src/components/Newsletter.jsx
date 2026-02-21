import React from 'react'

const Newsletter = () => {
  return (
    <div className='max-w-7xl mx-auto px-6 sm:px-12 md:px-24 mb-32'>
      <div className='relative overflow-hidden bg-primary/5 rounded-[48px] p-12 md:p-24 text-center'>
        <div className='relative z-10 max-w-2xl mx-auto'>
          <h2 className='text-4xl md:text-6xl font-serif text-text-dark mb-6 leading-tight'>
            Stay inspired with our <span className='italic text-primary'>weekly</span> journal.
          </h2>
          <p className='text-lg text-text-muted mb-12 leading-relaxed'>
            Join a community of 5,000+ readers. Get the latest insights on personal growth, mindfulness, and professional excellence delivered to your inbox.
          </p>

          <form className='flex flex-col sm:flex-row items-center gap-4 max-w-lg mx-auto'>
            <input
              className='w-full px-8 py-4 bg-white border border-accent/20 rounded-full outline-none focus:border-primary/50 transition-colors text-text-dark placeholder:text-gray-400 shadow-sm'
              type="email"
              placeholder='your@email.com'
              required
            />
            <button
              type='submit'
              className='w-full sm:w-auto px-10 py-4 text-white bg-primary hover:bg-primary/90 transition-all cursor-pointer rounded-full font-medium shadow-lg shadow-primary/20 active:scale-95 whitespace-nowrap'
            >
              Subscribe Now
            </button>
          </form>

          <div className='mt-8 text-xs text-text-muted/60'>
            We respect your privacy. Unsubscribe at any time.
          </div>
        </div>

        {/* Decorative elements */}
        <div className='absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-20 -left-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl'></div>
      </div>
    </div>
  )
}

export default Newsletter
