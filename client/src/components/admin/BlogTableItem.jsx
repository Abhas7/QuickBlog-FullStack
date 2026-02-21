import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const BlogTableItem = ({ blog, fetchBlogs, index }) => {

  const { title, createdAt } = blog;
  const BlogDate = new Date(createdAt)

  const { axios } = useAppContext();

  const deleteBlog = async () => {
    const confirm = window.confirm('Are you sure you want to delete this blog?')
    if (!confirm) return;
    try {
      const { data } = await axios.post('/api/blog/delete', { id: blog._id })
      if (data.success) {
        toast.success(data.message)
        await fetchBlogs()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const togglePublish = async () => {
    try {
      const { data } = await axios.post('/api/blog/toggle-publish', { id: blog._id })
      if (data.success) {
        toast.success(data.message)
        await fetchBlogs()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

  }

  return (
    <tr className='hover:bg-canvas/20 transition-colors group'>
      <th className='px-10 py-6 text-[11px] font-bold text-primary/30'>{index}</th>
      <td className='px-6 py-6 font-normal text-ink group-hover:text-primary transition-colors'> {title} </td>
      <td className='px-6 py-6 max-sm:hidden text-primary/40 text-[11px] font-bold uppercase tracking-widest'> {BlogDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} </td>
      <td className='px-6 py-6 max-sm:hidden'>
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase ${blog.isPublished ? "bg-secondary/10 text-secondary" : "bg-accent/10 text-accent"}`}>
          {blog.isPublished ? 'Live' : 'Draft'}
        </span>
      </td>
      <td className='px-10 py-6 text-[10px] font-bold tracking-widest uppercase text-right'>
        <div className='flex items-center justify-end gap-6'>
          <button onClick={togglePublish} className='text-primary hover:text-ink transition-colors cursor-pointer border-b border-primary/20 pb-0.5'>{blog.isPublished ? 'Unpublish' : 'Publish'}</button>
          <button onClick={deleteBlog} className='text-accent hover:text-primary transition-colors cursor-pointer border-b border-accent/20 pb-0.5'>Delete</button>
        </div>
      </td>
    </tr>
  )
}

export default BlogTableItem
