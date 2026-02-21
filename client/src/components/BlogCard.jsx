import React from 'react'
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {

  const { title, description, category, image, _id } = blog;
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/blog/${_id}`)}
      className='group w-full rounded-[32px] overflow-hidden bg-white border border-accent/20 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 cursor-pointer flex flex-col'
    >
      <div className='relative overflow-hidden aspect-[16/10]'>
        <img src={image} alt={title} className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105' />
        <div className='absolute top-4 left-4'>
          <span className='px-4 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-primary text-[10px] uppercase tracking-widest font-bold shadow-sm'>
            {category}
          </span>
        </div>
      </div>

      <div className='p-8 flex flex-col flex-1'>
        <h3 className='text-2xl font-serif text-text-dark group-hover:text-primary transition-colors duration-300 leading-tight mb-4'>
          {title}
        </h3>
        <p
          className='text-sm text-text-muted leading-relaxed line-clamp-2 mt-auto'
          dangerouslySetInnerHTML={{ "__html": description.slice(0, 100) + '...' }}
        ></p>

        <div className='mt-6 pt-6 border-t border-accent/10 flex items-center gap-2 text-primary font-medium text-sm transition-all group-hover:gap-3'>
          Read Story
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
