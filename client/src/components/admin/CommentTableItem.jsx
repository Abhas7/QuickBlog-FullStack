import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const CommentTableItem = ({ comment, fetchComments }) => {

  const { blog, createdAt, _id } = comment;
  const BlogDate = new Date(createdAt);

  const { axios } = useAppContext()

  const approveComment = async () => {
    try {
      const { data } = await axios.post('/api/admin/approve-comment', { id: _id })
      if (data.success) {
        toast.success(data.message)
        fetchComments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteComment = async () => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this comment?');
      if (!confirm) return;

      const { data } = await axios.post('/api/admin/delete-comment', { id: _id })
      if (data.success) {
        toast.success(data.message)
        fetchComments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }


  return (
    <tr className='hover:bg-canvas/20 transition-all duration-500 group'>
      <td className='px-10 py-8'>
        <div className='flex items-center gap-3 mb-2'>
          <span className='px-3 py-1 bg-canvas text-primary text-[10px] font-bold tracking-widest uppercase rounded-md border border-primary/5'>{blog.title}</span>
          <span className='text-[10px] text-primary/30 font-bold uppercase tracking-widest'>by {comment.name}</span>
        </div>
        <p className='text-[15px] text-ink font-light italic leading-relaxed mt-4 group-hover:text-primary transition-colors'>"{comment.content}"</p>
      </td>
      <td className='px-6 py-8 max-sm:hidden text-primary/40 text-[11px] font-bold uppercase tracking-widest'>
        {BlogDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
      </td>
      <td className='px-10 py-8 text-right'>
        <div className='flex items-center justify-end gap-6'>
          {
            !comment.isApproved ?
              <button onClick={approveComment} className='text-[10px] font-bold tracking-widest uppercase text-secondary hover:text-primary transition-colors cursor-pointer border-b border-secondary/20 pb-0.5'>Approve</button>
              :
              <span className='px-3 py-1 bg-secondary/10 text-secondary text-[9px] font-bold tracking-widest uppercase rounded-full'>Approved</span>
          }
          <button onClick={deleteComment} className='text-[10px] font-bold tracking-widest uppercase text-accent hover:text-primary transition-colors cursor-pointer border-b border-accent/20 pb-0.5'>Delete</button>
        </div>
      </td>
    </tr>
  )
}

export default CommentTableItem
