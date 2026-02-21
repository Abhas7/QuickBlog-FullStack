import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { parse } from 'marked'

const AddBlog = () => {

    const { axios } = useAppContext()
    const [isAdding, setIsAdding] = useState(false)
    const [loading, setLoading] = useState(false)

    const editorRef = useRef(null)
    const quillRef = useRef(null)

    const [image, setImage] = useState(false);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [category, setCategory] = useState('Startup');
    const [isPublished, setIsPublished] = useState(false);

    const generateContent = async () => {
        if (!title) return toast.error('Please enter a title')

        try {
            setLoading(true);
            const { data } = await axios.post('/api/blog/generate', { prompt: title })
            if (data.success) {
                quillRef.current.root.innerHTML = parse(data.content)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            setIsAdding(true)

            const blog = {
                title, subTitle,
                description: quillRef.current.root.innerHTML,
                category, isPublished
            }

            const formData = new FormData();
            formData.append('blog', JSON.stringify(blog))
            formData.append('image', image)

            const { data } = await axios.post('/api/blog/add', formData);

            if (data.success) {
                toast.success(data.message);
                setImage(false)
                setTitle('')
                setSubTitle('')
                quillRef.current.root.innerHTML = ''
                setCategory('Startup')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsAdding(false)
        }

    }

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
        }
    }, [])

    return (
        <div className='animate-in slide-in-from-bottom-4 duration-700'>
            <div className='mb-12'>
                <h2 className='text-4xl font-serif text-text-dark mb-2'>Create New <span className='italic text-primary ml-1'>Insight</span></h2>
                <p className='text-text-muted'>Draft your next story with elegance and clarity.</p>
            </div>

            <form onSubmit={onSubmitHandler} className='bg-white rounded-[40px] border border-accent/10 shadow-sm p-10 md:p-16 max-w-4xl'>
                <div className='space-y-10'>

                    <div>
                        <label className='text-xs font-bold uppercase tracking-widest text-text-dark mb-4 block'>Thumbnail Image</label>
                        <label htmlFor="image" className='group relative block w-40 aspect-video rounded-2xl overflow-hidden border-2 border-dashed border-accent/30 hover:border-primary/50 transition-colors cursor-pointer'>
                            <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className={`w-full h-full object-cover transition-transform group-hover:scale-105 ${!image && 'p-8 opacity-40'}`} />
                            <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required={!image} />
                        </label>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                        <div className='space-y-3'>
                            <label className='text-xs font-bold uppercase tracking-widest text-text-dark ml-4'>Story Title</label>
                            <input
                                type="text"
                                placeholder='The path to mindfulness...'
                                required
                                className='w-full px-8 py-4 bg-bg-base border border-accent/20 rounded-full outline-none focus:border-primary/50 transition-all text-text-dark'
                                onChange={e => setTitle(e.target.value)}
                                value={title}
                            />
                        </div>

                        <div className='space-y-3'>
                            <label className='text-xs font-bold uppercase tracking-widest text-text-dark ml-4'>Journal Tagline</label>
                            <input
                                type="text"
                                placeholder='A brief reflection...'
                                required
                                className='w-full px-8 py-4 bg-bg-base border border-accent/20 rounded-full outline-none focus:border-primary/50 transition-all text-text-dark'
                                onChange={e => setSubTitle(e.target.value)}
                                value={subTitle}
                            />
                        </div>
                    </div>

                    <div className='space-y-3'>
                        <label className='text-xs font-bold uppercase tracking-widest text-text-dark ml-4'>Journal Content</label>
                        <div className='relative overflow-hidden rounded-[32px] border border-accent/20'>
                            <div ref={editorRef} className='min-h-[300px] border-none'></div>
                            <div className='mt-2'></div> {/* Spacer for Quill toolbar */}

                            {loading && (
                                <div className='absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-[2px] z-20'>
                                    <div className='w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin'></div>
                                </div>)}

                            <button
                                disabled={loading}
                                type='button'
                                onClick={generateContent}
                                className='absolute bottom-4 right-4 z-10 flex items-center gap-2 px-6 py-2 bg-text-dark text-white rounded-full text-xs font-medium hover:bg-black transition-all shadow-lg active:scale-95 cursor-pointer disabled:opacity-50'
                            >
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z" /></svg>
                                Generate with AI
                            </button>
                        </div>
                    </div>

                    <div className='flex flex-wrap items-center gap-12 pt-4'>
                        <div className='space-y-3'>
                            <label className='text-xs font-bold uppercase tracking-widest text-text-dark ml-4'>Classification</label>
                            <select
                                onChange={e => setCategory(e.target.value)}
                                name="category"
                                value={category}
                                className='block w-64 px-8 py-4 bg-bg-base border border-accent/20 rounded-full outline-none focus:border-primary/50 transition-all text-text-dark appearance-none cursor-pointer'
                            >
                                <option value="">Select category</option>
                                {blogCategories.map((item, index) => {
                                    return <option key={index} value={item}>{item}</option>
                                })}
                            </select>
                        </div>

                        <div className='flex items-center gap-4 bg-bg-base px-8 py-4 rounded-full border border-accent/10'>
                            <span className='text-sm font-medium text-text-dark'>Publish Immediately</span>
                            <input
                                type="checkbox"
                                checked={isPublished}
                                className='w-5 h-5 accent-primary cursor-pointer'
                                onChange={e => setIsPublished(e.target.checked)}
                            />
                        </div>
                    </div>

                    <button
                        disabled={isAdding}
                        type="submit"
                        className='w-full sm:w-64 py-4 bg-primary text-white rounded-full font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-95 cursor-pointer disabled:opacity-50'
                    >
                        {isAdding ? 'Sharing insight...' : 'Share Stories'}
                    </button>

                </div>
            </form>
        </div>
    )
}

export default AddBlog
