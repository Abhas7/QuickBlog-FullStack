import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast';
import { data } from 'react-router-dom';

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
    <div className='flex items-center justify-center min-h-screen bg-canvas'>
      <div className='w-full max-w-lg p-16 bg-white rounded-[64px] shadow-2xl shadow-primary/5 mx-6 relative overflow-hidden'>
        <div className='absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl -mr-16 -mt-16'></div>

        <div className='text-center mb-12 relative z-10'>
          <h1 className='text-4xl font-normal font-serif italic text-ink mb-4'>Welcome back</h1>
          <p className='text-[10px] text-primary/40 font-bold uppercase tracking-[0.3em]'>Curator Authentication</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-10 relative z-10'>
          <div className='space-y-3'>
            <label className='text-[10px] font-bold tracking-widest text-primary uppercase ml-6'>Administrative Email</label>
            <input
              onChange={e => setEmail(e.target.value)}
              value={email}
              type="email"
              required
              placeholder='admin@clearpath.com'
              className='w-full px-8 py-5 bg-canvas/50 rounded-3xl border border-primary/5 outline-none focus:ring-4 ring-primary/5 transition-all text-sm font-light'
            />
          </div>

          <div className='space-y-3'>
            <label className='text-[10px] font-bold tracking-widest text-primary uppercase ml-6'>Secure Password</label>
            <input
              onChange={e => setPassword(e.target.value)}
              value={password}
              type="password"
              required
              placeholder='••••••••'
              className='w-full px-8 py-5 bg-canvas/50 rounded-3xl border border-primary/5 outline-none focus:ring-4 ring-primary/5 transition-all text-sm font-light'
            />
          </div>

          <button type="submit" className='w-full py-5 bg-primary text-white rounded-full font-bold text-[13px] tracking-widest uppercase hover:bg-ink transition-all duration-700 cursor-pointer shadow-xl shadow-primary/10 mt-4'>
            Enter Dashboard
          </button>
        </form>

        <p className='text-center mt-12 text-[10px] text-primary/20 font-bold uppercase tracking-widest'>Protected by ClearPath Cryptography</p>
      </div>
    </div>
  )
}

export default Login
