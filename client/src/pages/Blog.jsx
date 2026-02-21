import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, blog_data, comments_data } from '../assets/assets'
import Navbar from '../components/Navbar'
import Moment from 'moment'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Blog = () => {

  const { id } = useParams()

  const { axios } = useAppContext()

  const [data, setData] = useState(null)
  const [comments, setComments] = useState([])
  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`)
      data.success ? setData(data.blog) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchComments = async () => {
    try {
      const { data } = await axios.post('/api/blog/comments', { blogId: id })
      if (data.success) {
        setComments(data.comments)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/blog/add-comment', { blog: id, name, content });
      if (data.success) {
        toast.success(data.message)
        setName('')
        setContent('')
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchBlogData()
    fetchComments()
  }, [])

  return data ? (
    <div className='bg-white selection:bg-primary/10'>
      <Navbar />

      <article className='max-w-4xl mx-auto px-6 sm:px-12 py-24'>
        {/* Article Breadcrumb & Metadata */}
        <header className='text-center mb-20'>
          <div className='flex items-center justify-center gap-4 mb-8 translate-y-4 animate-fade-in'>
            <span className='px-4 py-1.5 bg-canvas text-primary text-[10px] font-bold tracking-[0.2em] uppercase rounded-full'>{data.category}</span>
            <span className='w-1 h-1 bg-primary/20 rounded-full'></span>
            <span className='text-[10px] text-primary/40 font-bold uppercase tracking-widest'>{Moment(data.createdAt).format('MMMM D, YYYY')}</span>
          </div>

          <h1 className='text-5xl sm:text-8xl font-normal text-ink leading-[1.1] mb-12 font-serif italic max-w-3xl mx-auto'>
            {data.title}
          </h1>

          <div className='flex items-center justify-center gap-4 mt-12'>
            <div className='w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center text-primary font-serif italic text-2xl border border-primary/5'>
              {data.author ? data.author.charAt(0) : 'C'}
            </div>
            <div className='text-left'>
              <p className='text-sm font-bold text-ink whitespace-nowrap'>{data.author || 'ClearPath Curator'}</p>
              <p className='text-[11px] text-primary/40 font-bold uppercase tracking-widest'>Contributor</p>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className='relative aspect-video rounded-[64px] overflow-hidden mb-24 shadow-2xl shadow-primary/5'>
          <img src={data.image} alt={data.title} className='w-full h-full object-cover' />
        </div>

        {/* Content Body */}
        <div className='max-w-2xl mx-auto'>
          <div className='rich-text mb-32 font-light leading-relaxed text-xl text-primary/80 selection:text-ink' dangerouslySetInnerHTML={{ __html: data.description }}></div>

          {/* Interaction Bar */}
          <div className='flex flex-col sm:flex-row items-center justify-between py-12 border-y border-primary/5 mb-32 gap-8'>
            <div className='flex items-center gap-6'>
              <p className='text-[10px] font-bold tracking-[0.3em] text-primary/40 uppercase'>Share Wisdom</p>
              <div className='flex gap-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700'>
                <a href="#" className='p-3 rounded-full hover:bg-canvas transition-colors'><img src={assets.facebook_icon} className='w-4' alt="" /></a>
                <a href="#" className='p-3 rounded-full hover:bg-canvas transition-colors'><img src={assets.twitter_icon} className='w-4' alt="" /></a>
                <a href="#" className='p-3 rounded-full hover:bg-canvas transition-colors'><img src={assets.googleplus_icon} className='w-4' alt="" /></a>
              </div>
            </div>
            <div className='flex gap-4'>
              <span className='text-[10px] font-bold tracking-widest text-primary/30 uppercase'>#ClearPathPerspective</span>
            </div>
          </div>

          {/* Comments Section */}
          <section className='mb-40'>
            <div className='flex items-center gap-4 mb-16'>
              <h3 className='text-3xl font-normal font-serif italic text-ink'>Community Reflections</h3>
              <span className='px-3 py-1 bg-canvas text-primary text-[10px] font-bold rounded-full'>{comments.length}</span>
            </div>

            <div className='space-y-12 mb-24'>
              {comments.map((item, index) => (
                <div key={index} className='p-10 rounded-[48px] bg-canvas/30 border border-primary/5 hover:border-primary/10 transition-colors duration-500 relative group'>
                  <div className='flex items-center gap-4 mb-6'>
                    <div className='w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary text-xs font-bold border border-primary/5'>
                      {item.name.charAt(0)}
                    </div>
                    <div className='flex-1'>
                      <p className='font-bold text-[13px] text-ink'>{item.name}</p>
                      <p className='text-[10px] text-primary/30 font-bold uppercase tracking-wider'>{Moment(item.createdAt).fromNow()}</p>
                    </div>
                  </div>
                  <p className='text-[15px] text-primary/70 leading-relaxed font-light italic'>"{item.content}"</p>
                </div>
              ))}
            </div>

            {/* Comment Form */}
            <div className='p-12 sm:p-16 rounded-[64px] bg-canvas relative overflow-hidden'>
              <div className='absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl -mr-16 -mt-16'></div>
              <div className='relative z-10'>
                <h4 className='text-2xl font-normal font-serif italic text-ink mb-10'>Add your reflection</h4>
                <form onSubmit={addComment} className='space-y-6'>
                  <div className='space-y-2'>
                    <label className='text-[10px] font-bold tracking-widest text-primary uppercase ml-6'>Your Name</label>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      type="text"
                      placeholder='e.g. Robin'
                      required
                      className='w-full px-8 py-5 bg-white rounded-3xl border border-primary/5 outline-none focus:ring-4 ring-primary/5 transition-all text-sm font-light'
                    />
                  </div>
                  <div className='space-y-2'>
                    <label className='text-[10px] font-bold tracking-widest text-primary uppercase ml-6'>Message</label>
                    <textarea
                      onChange={(e) => setContent(e.target.value)}
                      value={content}
                      placeholder='What did this provoke in you?'
                      className='w-full px-8 py-6 bg-white rounded-[32px] border border-primary/5 outline-none focus:ring-4 ring-primary/5 h-48 text-sm font-light leading-relaxed'
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className='w-full sm:w-auto px-16 py-5 bg-primary text-white rounded-full font-bold text-[13px] tracking-widest uppercase hover:bg-ink transition-all duration-700 cursor-pointer shadow-xl shadow-primary/10'>
                    Publish Reflection
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </article>

      <Footer />
    </div>
  ) : <Loader />
}

export default Blog
