import React, { useEffect, useState } from 'react'
import { comments_data } from '../../assets/assets'
import CommentTableItem from '../../components/admin/CommentTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Comments = () => {

  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState('Not Approved')

  const { axios } = useAppContext();

  const fetchComments = async () => {
    try {
      const { data } = await axios.get('/api/admin/comments')
      data.success ? setComments(data.comments) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  return (
    <div className='flex-1 p-8 sm:p-12 overflow-y-auto'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 mb-12'>
        <div>
          <h2 className='text-3xl font-normal font-serif italic text-ink mb-2'>Reflections</h2>
          <p className='text-[10px] font-bold tracking-[0.2em] text-primary/40 uppercase'>Community voices and perspectives</p>
        </div>

        <div className='flex p-1 bg-canvas/50 rounded-full border border-primary/5'>
          <button
            onClick={() => setFilter('Approved')}
            className={`px-8 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-500 ${filter === 'Approved' ? 'bg-primary text-white shadow-lg shadow-primary/10' : 'text-primary/40 hover:text-primary'}`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter('Not Approved')}
            className={`px-8 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-500 ${filter === 'Not Approved' ? 'bg-primary text-white shadow-lg shadow-primary/10' : 'text-primary/40 hover:text-primary'}`}
          >
            Pending
          </button>
        </div>
      </div>

      <div className='relative overflow-hidden bg-white rounded-[48px] shadow-2xl shadow-primary/5 border border-primary/5'>
        <table className="w-full text-sm text-primary/60">
          <thead className="text-[10px] font-bold tracking-[0.2em] text-primary/40 uppercase text-left bg-canvas/30 border-b border-primary/5">
            <tr>
              <th scope="col" className="px-10 py-6"> Source & Content </th>
              <th scope="col" className="px-6 py-6 max-sm:hidden"> Timestamp </th>
              <th scope="col" className="px-10 py-6 text-right"> Operations </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-primary/5'>
            {comments.filter((comment) => {
              if (filter === "Approved") return comment.isApproved === true;
              return comment.isApproved === false;
            }).map((comment, index) => <CommentTableItem key={comment._id} comment={comment} index={index + 1} fetchComments={fetchComments} />)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Comments
