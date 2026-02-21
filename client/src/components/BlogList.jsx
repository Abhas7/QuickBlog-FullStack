import React, { useState } from 'react'
import { blog_data, blogCategories } from '../assets/assets'
import { motion } from "motion/react"
import BlogCard from './BlogCard'
import { useAppContext } from '../context/AppContext'

const BlogList = () => {

  const [menu, setMenu] = useState("All")
  const { blogs, input } = useAppContext()

  const filteredBlogs = () => {
    if (input === '') {
      return blogs
    }
    return blogs.filter((blog) => blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()))
  }

  return (
    <section className='bg-white'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex justify-center items-center flex-wrap gap-4 sm:gap-14 py-16 border-b border-primary/5'>
          {blogCategories.map((item) => (
            <div key={item} className='relative group'>
              <button onClick={() => setMenu(item)}
                className={`cursor-pointer px-2 py-1 text-[13px] font-bold tracking-[0.1em] uppercase transition-all duration-500 ${menu === item ? 'text-primary' : 'text-primary/40 hover:text-primary'}`}>
                {item}
                {menu === item && (
                  <motion.div layoutId='underline'
                    transition={{ type: 'spring', stiffness: 200, damping: 30 }}
                    className='absolute -bottom-1 left-0 right-0 h-0.5 bg-primary'></motion.div>
                )}
              </button>
            </div>
          ))}
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 py-24 px-8 sm:px-20'>
          {filteredBlogs().filter((blog) => menu === "All" ? true : blog.category === menu).map((blog) => <BlogCard key={blog._id} blog={blog} />)}
        </div>
      </div>
    </section>
  )
}

export default BlogList
