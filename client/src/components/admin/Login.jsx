import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast';

const Login = () => {

  const { axios, setToken } = useAppContext();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/admin/login', { email, password })

      if (data.success) {
        setToken(data.token)
        localStorage.setItem('token', data.token)
        axios.defaults.headers.common['Authorization'] = data.token;
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='min-h-screen bg-bg-base flex items-center justify-center p-6'>
      <div className='w-full max-w-lg bg-white p-12 rounded-[48px] border border-accent/10 shadow-2xl shadow-primary/5'>
        <div className='text-center mb-12'>
          <div className='inline-block px-4 py-1.5 bg-primary/5 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-4'>
            Secure Portal
          </div>
          <h1 className='text-4xl md:text-5xl font-serif text-text-dark leading-tight'>
            Admin <span className='italic text-primary'>Login</span>
          </h1>
          <p className='text-text-muted mt-4'>Enter your credentials to manage the journal.</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-2'>
            <label className='text-xs font-bold uppercase tracking-widest text-text-dark ml-4'> Email </label>
            <input
              onChange={e => setEmail(e.target.value)}
              value={email}
              type="email"
              required
              placeholder='admin@clearpath.com'
              className='w-full px-8 py-4 bg-bg-base border border-accent/20 rounded-full outline-none focus:border-primary/50 transition-all text-text-dark'
            />
          </div>

          <div className='space-y-2'>
            <label className='text-xs font-bold uppercase tracking-widest text-text-dark ml-4'> Password </label>
            <input
              onChange={e => setPassword(e.target.value)}
              value={password}
              type="password"
              required
              placeholder='••••••••'
              className='w-full px-8 py-4 bg-bg-base border border-accent/20 rounded-full outline-none focus:border-primary/50 transition-all text-text-dark'
            />
          </div>

          <button
            type="submit"
            className='w-full py-4 mt-8 font-medium bg-primary text-white rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-95 cursor-pointer'
          >
            Enter Dashboard
          </button>
        </form>

        <div className='mt-12 text-center text-xs text-text-muted/60'>
          © {new Date().getFullYear()} ClearPath Studio. All Rights Reserved.
        </div>
      </div>
    </div>
  )
}

export default Login
