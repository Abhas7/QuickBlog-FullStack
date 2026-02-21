import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets'
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
        fetchComments() // Refresh comments
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
    window.scrollTo(0, 0);
  }, [id])

  return data ? (
    <div className='min-h-screen bg-bg-base transition-colors duration-500'>
      <Navbar />

      <article className='max-w-4xl mx-auto px-6 pt-20 pb-32'>
        <header className='text-center mb-16'>
          <div className='inline-flex items-center gap-3 mb-8 px-4 py-2 bg-primary/5 rounded-full border border-primary/10'>
            <span className='text-xs font-semibold uppercase tracking-widest text-primary'>{data.category}</span>
            <span className='w-1 h-1 rounded-full bg-accent'></span>
            <span className='text-xs text-text-muted font-medium'>{Moment(data.createdAt).format('MMMM Do, YYYY')}</span>
          </div>

          <h1 className='text-5xl md:text-7xl font-serif text-text-dark leading-[1.1] mb-8'>
            {data.title}
          </h1>

          <div className='flex items-center justify-center gap-4'>
            <div className='w-12 h-12 rounded-full overflow-hidden bg-accent/20 border-2 border-white shadow-md'>
              <img src={assets.user_icon} alt="Author" className='w-full h-full object-cover opacity-70' />
            </div>
            <div className='text-left text-sm'>
              <p className='font-bold text-text-dark'>Michael Brown</p>
              <p className='text-text-muted'>Guide & Contributor</p>
            </div>
          </div>
        </header>

        <div className='mb-20'>
          <img src={data.image} alt={data.title} className='w-full rounded-[48px] shadow-2xl shadow-primary/10 object-cover aspect-[16/9]' />
        </div>

        <div className='rich-text max-w-3xl mx-auto mb-32' dangerouslySetInnerHTML={{ __html: data.description }}></div>

        <hr className='border-accent/10 mb-20' />

        {/* Comments Section */}
        <section className='max-w-2xl mx-auto'>
          <h3 className='text-4xl font-serif text-text-dark mb-12'>Reflections <span className='text-text-muted italic text-2xl ml-2'>({comments.length})</span></h3>

          <div className='space-y-8 mb-20'>
            {comments.map((item, index) => (
              <div key={index} className='bg-white border border-accent/10 p-8 rounded-[32px] shadow-sm hover:shadow-md transition-shadow'>
                <div className='flex justify-between items-start mb-4'>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs'>
                      {item.name.charAt(0)}
                    </div>
                    <p className='font-bold text-text-dark'>{item.name}</p>
                  </div>
                  <span className='text-xs text-text-muted'>{Moment(item.createdAt).fromNow()}</span>
                </div>
                <p className='text-sm text-text-muted leading-relaxed pl-11'>{item.content}</p>
              </div>
            ))}
          </div>

          {/* Add Comment Section */}
          <div className='bg-primary/5 p-10 rounded-[40px]'>
            <h4 className='text-2xl font-serif text-text-dark mb-6'>Join the conversation</h4>
            <form onSubmit={addComment} className='flex flex-col gap-5'>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder='Your Name'
                required
                className='w-full px-6 py-4 bg-white border border-accent/20 rounded-full outline-none focus:border-primary/50 transition-colors shadow-sm'
              />

              <textarea
                onChange={(e) => setContent(e.target.value)}
                value={content}
                placeholder='Share your thoughts...'
                className='w-full px-6 py-5 bg-white border border-accent/20 rounded-[32px] outline-none focus:border-primary/50 transition-colors shadow-sm min-h-[160px]'
                required
              ></textarea>

              <button
                type="submit"
                className='bg-primary text-white rounded-full py-4 px-10 hover:shadow-xl hover:shadow-primary/30 transition-all cursor-pointer font-medium active:scale-95 self-start'
              >
                Post Comment
              </button>
            </form>
          </div>
        </section>

        {/* Share Buttons */}
        <div className='mt-32 text-center'>
          <p className='text-xs uppercase tracking-[0.2em] font-bold text-text-muted mb-6'>Spread the Insight</p>
          <div className='flex justify-center gap-6'>
            {[assets.facebook_icon, assets.twitter_icon, assets.googleplus_icon].map((icon, i) => (
              <button key={i} className='w-14 h-14 rounded-full border border-accent/20 flex items-center justify-center grayscale hover:grayscale-0 hover:bg-white hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer'>
                <img src={icon} className='w-6 opacity-60' alt="Social" />
              </button>
            ))}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  ) : <Loader />
}

export default Blog
