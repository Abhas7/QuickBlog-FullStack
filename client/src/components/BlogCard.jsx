import React from 'react'
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {

  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate()

  return (
    <article onClick={() => navigate(`/blog/${_id}`)} className='group relative w-full rounded-[32px] overflow-hidden bg-white border border-primary/5 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700 cursor-pointer'>
      <div className='overflow-hidden aspect-[4/5]'>
        <img src={image} alt={title} className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000' />
      </div>
      <div className='p-8'>
        <div className='flex items-center gap-3 mb-5'>
          <span className='px-4 py-1.5 bg-canvas text-primary text-[10px] font-bold tracking-[0.15em] uppercase rounded-full'>{category}</span>
          <span className='w-1 h-1 bg-primary/20 rounded-full'></span>
          <span className='text-[10px] text-primary/40 font-bold uppercase tracking-widest'>6 min read</span>
        </div>
        <h3 className='text-3xl font-normal text-ink group-hover:text-primary transition-colors duration-500 leading-snug mb-4 font-serif italic'>{title}</h3>
        <p className='text-sm text-primary/60 line-clamp-2 font-light leading-relaxed' dangerouslySetInnerHTML={{ "__html": description }}></p>
      </div>
    </article>
  )
}

export default BlogCard
