import React, { useEffect, useState } from 'react'
import { assets, dashboard_data } from '../../assets/assets'
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
        <div className='flex-1 p-8 sm:p-12 overflow-y-auto'>
            <div className='mb-12'>
                <h2 className='text-3xl font-normal font-serif italic text-ink mb-2'>Overview</h2>
                <p className='text-[10px] font-bold tracking-[0.2em] text-primary/40 uppercase'>Your platform at a glance</p>
            </div>

            <div className='flex flex-wrap gap-8 mb-16'>
                <div className='flex items-center gap-6 bg-white p-10 min-w-80 rounded-[40px] shadow-2xl shadow-primary/5 border border-primary/5 hover:scale-[1.02] transition-all duration-500 cursor-pointer group'>
                    <div className='p-4 bg-primary/5 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-500'>
                        <img src={assets.dashboard_icon_1} alt="" className='w-8 group-hover:invert group-hover:brightness-200' />
                    </div>
                    <div>
                        <p className='text-3xl font-normal text-ink'>{dashboardData.blogs}</p>
                        <p className='text-[10px] font-bold tracking-widest text-primary/40 uppercase mt-1'>Total Stories</p>
                    </div>
                </div>

                <div className='flex items-center gap-6 bg-white p-10 min-w-80 rounded-[40px] shadow-2xl shadow-primary/5 border border-primary/5 hover:scale-[1.02] transition-all duration-500 cursor-pointer group'>
                    <div className='p-4 bg-primary/5 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-500'>
                        <img src={assets.dashboard_icon_2} alt="" className='w-8 group-hover:invert group-hover:brightness-200' />
                    </div>
                    <div>
                        <p className='text-3xl font-normal text-ink'>{dashboardData.comments}</p>
                        <p className='text-[10px] font-bold tracking-widest text-primary/40 uppercase mt-1'>Reflections</p>
                    </div>
                </div>

                <div className='flex items-center gap-6 bg-white p-10 min-w-80 rounded-[40px] shadow-2xl shadow-primary/5 border border-primary/5 hover:scale-[1.02] transition-all duration-500 cursor-pointer group'>
                    <div className='p-4 bg-primary/5 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-500'>
                        <img src={assets.dashboard_icon_3} alt="" className='w-8 group-hover:invert group-hover:brightness-200' />
                    </div>
                    <div>
                        <p className='text-3xl font-normal text-ink'>{dashboardData.drafts}</p>
                        <p className='text-[10px] font-bold tracking-widest text-primary/40 uppercase mt-1'>Drafts</p>
                    </div>
                </div>
            </div>

            <section>
                <div className='flex items-center gap-4 mb-8 translate-x-2'>
                    <div className='w-1.5 h-6 bg-accent rounded-full'></div>
                    <h3 className='text-xl h-full font-normal font-serif italic text-ink'>Recent Activity</h3>
                </div>

                <div className='relative overflow-hidden bg-white rounded-[48px] shadow-2xl shadow-primary/5 border border-primary/5'>
                    <table className='w-full text-sm text-primary/60'>
                        <thead className='text-[10px] font-bold tracking-[0.2em] text-primary/40 uppercase text-left bg-canvas/30 border-b border-primary/5'>
                            <tr>
                                <th scope='col' className='px-10 py-6'> # </th>
                                <th scope='col' className='px-6 py-6'> Story Title </th>
                                <th scope='col' className='px-6 py-6 max-sm:hidden'> Timestamp </th>
                                <th scope='col' className='px-6 py-6 max-sm:hidden'> Visibility </th>
                                <th scope='col' className='px-10 py-6'> Operations </th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-primary/5'>
                            {dashboardData.recentBlogs.map((blog, index) => {
                                return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index + 1} />
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}

export default Dashboard
