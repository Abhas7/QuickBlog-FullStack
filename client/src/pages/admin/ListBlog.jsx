import React, { useEffect, useState } from 'react'
import { blog_data } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ListBlog = () => {

    const [blogs, setBlogs] = useState([]);
    const { axios } = useAppContext()

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/admin/blogs')
            if (data.success) {
                setBlogs(data.blogs)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    return (
        <div className='flex-1 p-8 sm:p-12 overflow-y-auto'>
            <div className='mb-12'>
                <h2 className='text-3xl font-normal font-serif italic text-ink mb-2'>Manage Files</h2>
                <p className='text-[10px] font-bold tracking-[0.2em] text-primary/40 uppercase'>Organize and edit your growing collection</p>
            </div>

            <div className='relative overflow-hidden bg-white rounded-[48px] shadow-2xl shadow-primary/5 border border-primary/5'>
                <table className='w-full text-sm text-primary/60'>
                    <thead className='text-[10px] font-bold tracking-[0.2em] text-primary/40 uppercase text-left bg-canvas/30 border-b border-primary/5'>
                        <tr>
                            <th scope='col' className='px-10 py-6 text-center'> # </th>
                            <th scope='col' className='px-6 py-6'> Story Title </th>
                            <th scope='col' className='px-6 py-6 max-sm:hidden'> Timestamp </th>
                            <th scope='col' className='px-6 py-6 max-sm:hidden'> Visibility </th>
                            <th scope='col' className='px-10 py-6 text-right'> Operations </th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-primary/5'>
                        {blogs.map((blog, index) => {
                            return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index + 1} />
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListBlog
