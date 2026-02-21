import React, { useState } from 'react'
import { blogCategories } from '../assets/assets'
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
    <div className='max-w-7xl mx-auto px-6 sm:px-12 md:px-24 mb-32'>
      <div className='flex flex-wrap justify-center gap-3 sm:gap-6 my-16'>
        {blogCategories.map((item) => (
          <div key={item} className='relative h-10'>
            <button
              onClick={() => setMenu(item)}
              className={`relative z-10 px-6 h-full cursor-pointer text-sm font-medium transition-colors duration-300 ${menu === item ? 'text-white' : 'text-text-muted hover:text-primary'}`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId='activeTab'
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className='absolute inset-0 -z-10 bg-primary rounded-full shadow-lg shadow-primary/20'
                ></motion.div>
              )}
            </button>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12'>
        {filteredBlogs().filter((blog) => menu === "All" ? true : blog.category === menu).map((blog) => <BlogCard key={blog._id} blog={blog} />)}
      </div>

      {filteredBlogs().filter((blog) => menu === "All" ? true : blog.category === menu).length === 0 && (
        <div className='text-center py-20'>
          <h3 className='text-3xl font-serif text-text-muted'>No stories found in this category.</h3>
          <p className='mt-4 text-text-muted/60'>Try searching for something else or explore all topics.</p>
        </div>
      )}
    </div>
  )
}

export default BlogList
