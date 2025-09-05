import './EditPost.css'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { getPost, editPost } from '../../utils/posts'
import ImageUploadField from '../ImageUploadField/ImageUploadField'

export default function EditPostForm(){
    const {postId} = useParams()
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [errors, setErrors] = useState({}) 
    const [post, setPost] = useState(null)

    const [formData, setFormData] = useState({
        title: '',
        body: '',
        media_url: '',
        type: 'text',
    })


    
    useEffect(() => {
        const getPostData = async() => {
            setIsLoading(true)
            setErrors({})
            try {
                const {data} = await getPost(postId)
                setPost(data)
                setFormData(data)
            } catch (error) {
                
                setErrors(error)
            } finally {
                setIsLoading(false)
            }
        }
    getPostData()
    },[postId])


    const handleSubmit = async(e) => {
            e.preventDefault()
            setSubmitting(true)
            setErrors({})
            try {
                const {data} = await editPost(postId, formData)
                navigate(`/posts/${data.id}`)
            } catch (error) {
                console.log(error)
                setErrors(error.response.data)
            } finally {
                setSubmitting(false)
            }
        }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleTypeChange = (e) => {
        setFormData({ ...formData, type: e.target.value })
    }

    const setMediaUrl = (url) =>{
        setFormData({...formData, media_url: url})
    }

    const buttonLabel = isUploading
        ? 'Uploading cover art...'
        : submitting
        ? 'submitting...'
        : 'Save Changes'

    if (isLoading) return <p>Loading…</p>
    if (!post) return <p>Where's the post?</p>

    return(
        <form className='editPostForm' onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
                <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Update the title"
                />
            {errors.title && <p className='error-message'>{errors.title}</p>}


            {post.type === 'text' ? (
                <>
            <label htmlFor="body">Body</label>
                <textarea
                id="body"
                name="body"
                rows={8}
                value={formData.body}
                onChange={handleChange}
                placeholder="Update the body"
                />
                {errors.body && <p className="error-message">{errors.body}</p>}
            </>
            ) : (
            <>
                <ImageUploadField image="media_url" setImage ={setMediaUrl} imageUrl={formData.media_url} setIsUploading={setIsUploading} type={formData.type}/>
                
            </>
            )}
            <button className='saveChanges' disabled={isUploading || submitting}type="submit">{buttonLabel}</button>
        </form>
    )
}