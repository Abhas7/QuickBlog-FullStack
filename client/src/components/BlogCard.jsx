import React from 'react'
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {

  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate()

  return (
    <div onClick={() => navigate(`/blog/${_id}`)} className='group w-full border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] duration-200 cursor-pointer overflow-hidden flex flex-col'>
      <div className='overflow-hidden border-b-2 border-black'>
        <img src={image} alt={title} className='aspect-video object-cover group-hover:scale-105 duration-500' />
      </div>
      <div className='p-6 flex flex-col flex-grow'>
        <div className='flex items-center gap-3 mb-4'>
          <span className='px-3 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-wider'>{category}</span>
          <span className='text-[10px] text-gray-400 font-bold uppercase tracking-wider'>5 min read</span>
        </div>
        <h3 className='text-xl sm:text-2xl font-black text-black leading-tight mb-3 group-hover:text-gray-700 transition-colors'>{title}</h3>
        <p className='text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2 font-medium' dangerouslySetInnerHTML={{ "__html": description.slice(0, 100) + '...' }}></p>

        <div className='mt-auto flex items-center justify-between pt-4 border-t border-gray-100'>
          <span className='text-[11px] font-bold uppercase text-black'>Read Article</span>
          <svg className='w-4 h-4 transform group-hover:translate-x-1 duration-200' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
