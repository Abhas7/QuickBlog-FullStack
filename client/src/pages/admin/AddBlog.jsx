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
        // Initiate Quill only once
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
        }
    }, [])

    return (
        <div className='flex-1 p-8 sm:p-12 overflow-y-auto'>
            <div className='mb-12'>
                <h2 className='text-3xl font-normal font-serif italic text-ink mb-2'>Create New Story</h2>
                <p className='text-[10px] font-bold tracking-[0.2em] text-primary/40 uppercase'>Share your perspective with the world</p>
            </div>

            <div className='bg-white w-full max-w-4xl p-12 sm:p-16 rounded-[48px] shadow-2xl shadow-primary/5 border border-primary/5'>

                <div className='mb-12'>
                    <label className='text-[10px] font-bold tracking-[0.3em] text-primary uppercase ml-6 mb-4 block'>Story Thumbnail</label>
                    <label htmlFor="image" className='group block relative w-40 h-40 bg-canvas rounded-3xl overflow-hidden cursor-pointer border-2 border-dashed border-primary/10 hover:border-primary/30 transition-all'>
                        <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" className={`w-full h-full object-cover transition-all ${!image ? "opacity-20 scale-50 group-hover:scale-60" : "opacity-100"}`} />
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
                    </label>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mb-10'>
                    <div className='space-y-3'>
                        <label className='text-[10px] font-bold tracking-widest text-primary uppercase ml-6'>Story Title</label>
                        <input type="text" placeholder='e.g. The Silence of Growth' required className='w-full px-8 py-5 bg-canvas/50 rounded-3xl border border-primary/5 outline-none focus:ring-4 ring-primary/5 transition-all text-sm font-light' onChange={e => setTitle(e.target.value)} value={title} />
                    </div>
                    <div className='space-y-3'>
                        <label className='text-[10px] font-bold tracking-widest text-primary uppercase ml-6'>Subtitle / Excerpt</label>
                        <input type="text" placeholder='A short teaser...' required className='w-full px-8 py-5 bg-canvas/50 rounded-3xl border border-primary/5 outline-none focus:ring-4 ring-primary/5 transition-all text-sm font-light' onChange={e => setSubTitle(e.target.value)} value={subTitle} />
                    </div>
                </div>

                <div className='space-y-3 mb-10'>
                    <label className='text-[10px] font-bold tracking-widest text-primary uppercase ml-6'>Main Content</label>
                    <div className='relative overflow-hidden rounded-[32px] border border-primary/5 bg-canvas/30'>
                        <div ref={editorRef} className='min-h-[400px]'></div>
                        {loading && (
                            <div className='absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-20'>
                                <div className='w-10 h-10 rounded-full border-4 border-primary/10 border-t-primary animate-spin'></div>
                            </div>)}

                        <button disabled={loading} type='button' onClick={generateContent} className='absolute bottom-6 right-6 z-30 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-white bg-primary px-8 py-3 rounded-full hover:bg-ink transition-all cursor-pointer shadow-lg shadow-primary/20'>
                            <img src={assets.hash_icon} className='w-3 invert' alt="" />
                            Generate with AI
                        </button>
                    </div>
                </div>

                <div className='flex flex-wrap items-end gap-10 mb-12'>
                    <div className='space-y-3 min-w-[240px]'>
                        <label className='text-[10px] font-bold tracking-widest text-primary uppercase ml-6'>Classification</label>
                        <select onChange={e => setCategory(e.target.value)} name="category" className='w-full px-8 py-5 bg-canvas/50 rounded-3xl border border-primary/5 outline-none focus:ring-4 ring-primary/5 transition-all text-sm font-light text-primary/60 appearance-none'>
                            <option value="">Select category</option>
                            {blogCategories.map((item, index) => {
                                return <option key={index} value={item}>{item}</option>
                            })}
                        </select>
                    </div>

                    <div className='flex items-center gap-4 py-5 px-8 bg-canvas/50 rounded-3xl border border-primary/5'>
                        <label className='text-[10px] font-bold tracking-widest text-primary uppercase cursor-pointer' htmlFor='publish-now'>Publish Immediately</label>
                        <input type="checkbox" id='publish-now' checked={isPublished} className='w-5 h-5 accent-primary cursor-pointer' onChange={e => setIsPublished(e.target.checked)} />
                    </div>
                </div>

                <button disabled={isAdding} type="submit" className='w-full sm:w-auto px-16 py-6 bg-primary text-white rounded-full font-bold text-[13px] tracking-widest uppercase hover:bg-ink transition-all duration-700 cursor-pointer shadow-xl shadow-primary/20'>
                    {isAdding ? 'Archiving...' : 'Publish Story'}
                </button>

            </div>
        </div>
    )
}

export default AddBlog
