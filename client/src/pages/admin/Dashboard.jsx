import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import BlogTableItem from '../../components/admin/BlogTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {

    const [dashboardData, setDashboardData] = useState({
        blogs: 0,
        comments: 0,
        drafts: 0,
        recentBlogs: []
    })

    const { axios } = useAppContext()

    const fetchDashboard = async () => {
        try {
            const { data } = await axios.get('/api/admin/dashboard')
            data.success ? setDashboardData(data.dashboardData) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchDashboard()
    }, [])

    return (
        <div className='w-full opacity-100 transition-opacity duration-300'>
            <div className='mb-12'>
                <h2 className='text-4xl font-serif text-text-dark mb-2'>Dashboard <span className='italic text-primary ml-1'>Overview</span></h2>
                <p className='text-text-muted'>A snapshot of your journal's growth and engagement.</p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
                <div className='flex items-center gap-6 bg-white p-8 rounded-[32px] border border-accent/10 shadow-sm hover:shadow-md transition-shadow cursor-pointer group'>
                    <div className='w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors'>
                        <img src={assets.dashboard_icon_1} className='w-8' alt="blogs" />
                    </div>
                    <div>
                        <p className='text-3xl font-serif text-text-dark'>{dashboardData.blogs}</p>
                        <p className='text-xs font-bold uppercase tracking-widest text-text-muted mt-1'>Total Stories</p>
                    </div>
                </div>

                <div className='flex items-center gap-6 bg-white p-8 rounded-[32px] border border-accent/10 shadow-sm hover:shadow-md transition-shadow cursor-pointer group'>
                    <div className='w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors'>
                        <img src={assets.dashboard_icon_2} className='w-8' alt="comments" />
                    </div>
                    <div>
                        <p className='text-3xl font-serif text-text-dark'>{dashboardData.comments}</p>
                        <p className='text-xs font-bold uppercase tracking-widest text-text-muted mt-1'>Reflections</p>
                    </div>
                </div>

                <div className='flex items-center gap-6 bg-white p-8 rounded-[32px] border border-accent/10 shadow-sm hover:shadow-md transition-shadow cursor-pointer group'>
                    <div className='w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center group-hover:bg-amber-100 transition-colors'>
                        <img src={assets.dashboard_icon_3} className='w-8' alt="drafts" />
                    </div>
                    <div>
                        <p className='text-3xl font-serif text-text-dark'>{dashboardData.drafts}</p>
                        <p className='text-xs font-bold uppercase tracking-widest text-text-muted mt-1'>Draftings</p>
                    </div>
                </div>
            </div>

            <div>
                <div className='flex items-center justify-between mb-8'>
                    <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center'>
                            <img src={assets.dashboard_icon_4} className='w-5' alt="" />
                        </div>
                        <h3 className='text-2xl font-serif text-text-dark'>Latest Entries</h3>
                    </div>
                    <button className='text-sm text-primary font-medium hover:underline'>View All</button>
                </div>

                <div className='bg-white rounded-[32px] border border-accent/10 shadow-sm overflow-hidden'>
                    <table className='w-full text-left'>
                        <thead className='bg-bg-base/50 text-[10px] uppercase tracking-[0.2em] font-bold text-text-muted border-b border-accent/10'>
                            <tr>
                                <th className='px-8 py-5'> # </th>
                                <th className='px-6 py-5'> Story Title </th>
                                <th className='px-6 py-5 hidden sm:table-cell'> Date </th>
                                <th className='px-6 py-5 hidden sm:table-cell'> Status </th>
                                <th className='px-8 py-5 text-right'> Actions </th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-accent/5'>
                            {dashboardData.recentBlogs && dashboardData.recentBlogs.map((blog, index) => {
                                return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index + 1} />
                            })}
                        </tbody>
                    </table>
                    {(!dashboardData.recentBlogs || dashboardData.recentBlogs.length === 0) && (
                        <div className='px-8 py-12 text-center text-text-muted italic bg-white'>
                            No recent stories found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard
